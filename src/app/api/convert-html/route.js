import { NextResponse } from "next/server";
import {
  validateShopifyFilename,
  generateShopifyPaths,
} from "../../../utils/filenameValidation";
import { generateZip, addFileComment } from "../../../utils/zipGenerator";
import { fixSchemaQuotesInLiquid } from "../../../utils/quoteEscaping";
import { fixFileSchemaConsistency } from "../../../utils/fileSchemaConsistency";
import { generateLiquidTemplate } from "../../../utils/customHtmlToLiquid";
import {
  generateLiquidWithOpenAI,
  checkOpenAIConnection,
} from "../../../utils/openaiHtmlToLiquid";
import { shouldUseOpenAI, getConfig } from "../config/conversion.config.js";

export async function POST(request) {
  try {
    const { htmlContent, fileName } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    if (!fileName || !fileName.trim()) {
      return NextResponse.json(
        {
          error:
            "Filename is required for conversion. Please provide a section name before proceeding.",
        },
        { status: 400 }
      );
    }

    let finalFileName = fileName.trim();
    let filenameCorrected = false;
    const processingErrors = [];

    const filenameValidation = validateShopifyFilename(finalFileName);

    if (!filenameValidation.valid) {
      return NextResponse.json(
        {
          error: "Invalid filename for Shopify",
          details: filenameValidation.error,
          suggestion: filenameValidation.suggestions,
        },
        { status: 400 }
      );
    }

    if (
      filenameValidation.sanitized !== finalFileName.replace(/\.html?$/i, "")
    ) {
      finalFileName = filenameValidation.sanitized;
      filenameCorrected = true;
    } else {
      finalFileName = filenameValidation.sanitized;
    }

    const shopifyPaths = generateShopifyPaths(finalFileName);

    const config = getConfig();
    const useOpenAI = shouldUseOpenAI();

    const htmlLines = htmlContent.split("\n").length;
    if (config.ENABLE_LOGS) {
      console.log(`📏 [SIZE CHECK] HTML content has ${htmlLines} lines`);
      console.log(`⚙️ [CONFIG] Conversion mode: ${config.mode}`);
    }

    let openaiResult = null;
    let skippedOpenAI = false;

    if (!useOpenAI) {
      if (config.ENABLE_LOGS) {
        console.log(
          "⚙️ [CONFIG] CUSTOM_ONLY mode enabled - skipping OpenAI conversion"
        );
        console.log("🎯 [CUSTOM ONLY] Converting with custom algorithm only");
      }

      skippedOpenAI = true;
      openaiResult = {
        success: false,
        skipped: true,
        reason: "CUSTOM_ONLY mode enabled in configuration",
        metadata: {
          skippedAt: new Date().toISOString(),
          configMode: config.mode,
        },
      };
    } else if (htmlLines > config.SIZE_LIMIT) {
      if (config.ENABLE_LOGS) {
        console.log(
          `⚠️ [SIZE LIMIT] HTML content exceeds ${config.SIZE_LIMIT} lines - skipping OpenAI conversion`
        );
        console.log(
          `⏰ [WAIT] Waiting ${
            config.WAIT_TIME / 1000
          } seconds before starting custom conversion...`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, config.WAIT_TIME));

      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [WAIT COMPLETE] ${
            config.WAIT_TIME / 1000
          } seconds elapsed - starting custom conversion`
        );
        console.log("🎯 [CUSTOM ONLY] Converting with custom algorithm only");
      }

      skippedOpenAI = true;
      openaiResult = {
        success: false,
        skipped: true,
        reason: `Content exceeds ${config.SIZE_LIMIT} lines`,
        metadata: { skippedAt: new Date().toISOString() },
      };
    } else {
      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [SIZE CHECK] HTML content within limits - proceeding with OpenAI conversion"
        );
        console.log(
          "🔍 [PRECHECK] Checking OpenAI API status before conversion..."
        );
      }

      const openaiStatus = await checkOpenAIConnection();

      if (!openaiStatus.isWorking) {
        if (config.ENABLE_LOGS) {
          console.log(
            "❌ [PRECHECK] OpenAI API not working:",
            openaiStatus.error
          );
          console.log(
            "🚫 [BLOCKED] Custom conversion blocked - OpenAI API must be working"
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: OpenAI API is required but not working`,
            details: openaiStatus.error,
            status: openaiStatus.status,
            apiStatus: "failed",
          },
          { status: 503 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [PRECHECK] OpenAI API is working - proceeding with conversion"
        );
        console.log(
          "🤖 [STEP 1] Starting OpenAI HTML-to-Liquid conversion first..."
        );
      }

      openaiResult = await generateLiquidWithOpenAI(htmlContent, finalFileName);

      if (!openaiResult.success) {
        if (config.ENABLE_LOGS) {
          console.log(
            "❌ [STEP 1] OpenAI conversion failed:",
            openaiResult.error
          );
          console.log(
            "🚫 [BLOCKED] Custom conversion blocked - OpenAI conversion must complete first"
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: OpenAI conversion failed`,
            details: openaiResult.error,
            step: "openai_conversion",
            apiStatus: "conversion_failed",
          },
          { status: 500 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log("✅ [STEP 1] OpenAI conversion completed successfully");
        console.log(
          "📊 [STEP 1] OpenAI Usage - Tokens:",
          openaiResult.metadata.totalTokens
        );
      }
    }

    if (config.ENABLE_LOGS) {
      console.log(
        "🎯 [STEP 2] Now starting custom HTML-to-Liquid conversion..."
      );
    }
    const conversionResult = generateLiquidTemplate(htmlContent, finalFileName);

    let liquidContent = conversionResult.liquidContent;
    let jsonTemplate = conversionResult.jsonTemplate;
    let injectedBlocks = conversionResult.schema.blocks || [];
    let usedBlockTypes = injectedBlocks.map((block) => block.type);

    const pageType = conversionResult.pageType;
    const templateStructure = conversionResult.templateStructure;

    if (skippedOpenAI) {
      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [STEP 2] Custom conversion completed successfully for:",
          finalFileName
        );
        console.log(
          "🎯 [PAGE TYPE] Detected page type:",
          pageType?.type || "page"
        );
        console.log(
          "📁 [TEMPLATE] Template structure:",
          templateStructure?.templateType || "page"
        );
        console.log(
          "🎉 [COMPLETE] Custom conversion finished (OpenAI skipped:",
          openaiResult.reason + ")"
        );
      }
    } else {
      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [STEP 2] Custom conversion completed successfully for:",
          finalFileName
        );
        console.log(
          "� [PAGE TYPE] Detected page type:",
          pageType?.type || "page"
        );
        console.log(
          "📁 [TEMPLATE] Template structure:",
          templateStructure?.templateType || "page"
        );
        console.log(
          "�🎉 [COMPLETE] Both OpenAI and Custom conversions finished - returning Custom results"
        );
      }
    }

    try {
      const quoteFixResult = fixSchemaQuotesInLiquid(liquidContent);
      if (quoteFixResult.success) {
        liquidContent = quoteFixResult.content;
        if (quoteFixResult.issues && quoteFixResult.issues.length > 0) {
          processingErrors.push(
            `Fixed ${quoteFixResult.issues.length} quote issue${
              quoteFixResult.issues.length !== 1 ? "s" : ""
            } in schema`
          );
        }
      } else if (quoteFixResult.error) {
        processingErrors.push(
          `Quote escaping warning: ${quoteFixResult.error}`
        );
      }
    } catch (quoteError) {
      console.error("Quote escaping error:", quoteError);
      processingErrors.push(`Quote escaping failed: ${quoteError.message}`);
    }

    try {
      const consistencyResult = fixFileSchemaConsistency(
        finalFileName,
        liquidContent,
        jsonTemplate
      );

      if (consistencyResult.success) {
        if (consistencyResult.changes && consistencyResult.changes.length > 0) {
          liquidContent = consistencyResult.liquidContent;
          jsonTemplate = consistencyResult.jsonContent;
          processingErrors.push(
            `Consistency fixes: ${consistencyResult.changes.join(", ")}`
          );
        }
      }
    } catch (consistencyError) {
      console.error("Consistency validation error:", consistencyError);
      processingErrors.push(
        `Consistency validation failed: ${consistencyError.message}`
      );
    }
    const liquidWithComments = addFileComment(liquidContent || "", {
      fileName: `${finalFileName}.liquid`,
      generatedAt: new Date().toISOString(),
      converter: "Custom HTML-to-Liquid Converter",
      note: "Deterministic conversion - consistent output every time",
      pageType: pageType?.type || "page",
      templateType: templateStructure?.templateType || "page",
      hasLoop: pageType?.hasLoop || false,
    });

    const jsonTemplateFileName = templateStructure
      ? templateStructure.json.split("/").pop()
      : `page.${finalFileName}.json`;

    const jsonWithComments = addFileComment(jsonTemplate || "{}", {
      fileName: jsonTemplateFileName,
      generatedAt: new Date().toISOString(),
      converter: "Custom HTML-to-Liquid Converter",
      pageType: pageType?.type || "page",
      templateType: templateStructure?.templateType || "page",
    });

    const validationInfo = {
      hasSchema: liquidContent && liquidContent.includes("{% schema %}"),
      hasStylesheet:
        liquidContent && liquidContent.includes("{% stylesheet %}"),
      hasJavascript: liquidContent && liquidContent.includes("<script>"),
      liquidLineCount: liquidContent ? liquidContent.split("\n").length : 0,
      jsonLineCount: jsonTemplate.split("\n").length,
      conversionMethod: "custom-deterministic",
      conversionMode: config.mode,
      openaiGenerationCompleted: openaiResult?.success || false,
      openaiSkipped: skippedOpenAI,
      openaiSkipReason: skippedOpenAI ? openaiResult.reason : null,
      openaiMetadata: openaiResult?.metadata || null,
      apiValidated: !skippedOpenAI,
      sequentialProcessing: !skippedOpenAI,
      inputLines: htmlLines,
      sizeLimitApplied: htmlLines > config.SIZE_LIMIT,
      configUsed: config,
      featuredProducts: conversionResult.featuredProducts || {
        hasProducts: false,
      },
    };

    return NextResponse.json({
      success: true,
      liquidContent: liquidWithComments,
      jsonTemplate: jsonWithComments,
      headContent: conversionResult.headContent,
      validation: validationInfo,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        filenameCorrected: filenameCorrected,
        injectedBlocks: injectedBlocks,
        usedBlockTypes: usedBlockTypes,
        processingErrors: processingErrors,
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: jsonTemplateFileName,
        sectionType: finalFileName,
        pageType: pageType?.type || "page",
        templateType: templateStructure?.templateType || "page",
        hasLoop: pageType?.hasLoop || false,
        loopType: pageType?.loopType || null,
        detectionReason: pageType?.reason || "Default page template",
        htmlSize: htmlContent.length,
        htmlLines: htmlLines,
        conversionMethod: "Custom Deterministic Converter",
        conversionMode: config.mode,
        aiGenerationEnabled: !skippedOpenAI,
        openaiSkipped: skippedOpenAI,
        openaiSkipReason: skippedOpenAI ? openaiResult.reason : null,
        openaiTokensUsed: openaiResult?.metadata?.totalTokens || 0,
        processingSequence: skippedOpenAI
          ? config.mode === "CUSTOM_ONLY"
            ? "Custom-Only-By-Config"
            : "Custom-Only-After-Wait"
          : "OpenAI-First-Then-Custom",
        waitTimeApplied:
          skippedOpenAI && config.mode === "OPENAI_FIRST"
            ? `${config.WAIT_TIME / 1000} seconds`
            : null,
        configurationUsed: config,
        featuredProducts: conversionResult.featuredProducts || {
          hasProducts: false,
        },
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);

    return NextResponse.json(
      { error: `Conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}
