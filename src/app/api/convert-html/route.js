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
import {
  generateLiquidWithClaude,
  checkClaudeConnection,
} from "../../../utils/claudeHtmlToLiquid";
import { shouldUseOpenAI, shouldUseClaude, getConfig } from "../config/conversion.config.js";

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
    const useClaude = shouldUseClaude();

    const htmlLines = htmlContent.split("\n").length;
    if (config.ENABLE_LOGS) {
      console.log(`📏 [SIZE CHECK] HTML content has ${htmlLines} lines`);
      console.log(`⚙️ [CONFIG] Conversion mode: ${config.mode}`);
    }

    let aiResult = null;
    let skippedAI = false;

    if (!useOpenAI && !useClaude) {
      if (config.ENABLE_LOGS) {
        console.log(
          "⚙️ [CONFIG] CUSTOM_ONLY mode enabled - skipping AI conversion"
        );
        console.log("🎯 [CUSTOM ONLY] Converting with custom algorithm only");
      }

      skippedAI = true;
      aiResult = {
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
          `⚠️ [SIZE LIMIT] HTML content exceeds ${config.SIZE_LIMIT} lines - skipping AI conversion`
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

      skippedAI = true;
      aiResult = {
        success: false,
        skipped: true,
        reason: `Content exceeds ${config.SIZE_LIMIT} lines`,
        metadata: { skippedAt: new Date().toISOString() },
      };
    } else {
      const aiProvider = useOpenAI ? "OpenAI" : "Claude";
      const aiModel = useOpenAI ? "GPT-4o" : "Claude-3.5-Sonnet";
      
      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [SIZE CHECK] HTML content within limits - proceeding with ${aiProvider} conversion`
        );
        console.log(
          `🔍 [PRECHECK] Checking ${aiProvider} API status before conversion...`
        );
      }

      let apiStatus;
      if (useOpenAI) {
        apiStatus = await checkOpenAIConnection();
      } else {
        apiStatus = await checkClaudeConnection();
      }

      if (!apiStatus.isWorking) {
        if (config.ENABLE_LOGS) {
          console.log(
            `❌ [PRECHECK] ${aiProvider} API not working:`,
            apiStatus.error
          );
          console.log(
            `🚫 [BLOCKED] Custom conversion blocked - ${aiProvider} API must be working`
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: ${aiProvider} API is required but not working`,
            details: apiStatus.error,
            status: apiStatus.status,
            apiStatus: "failed",
          },
          { status: 503 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [PRECHECK] ${aiProvider} API is working - proceeding with conversion`
        );
        console.log(
          `🤖 [STEP 1] Starting ${aiProvider} HTML-to-Liquid conversion first...`
        );
      }

      if (useOpenAI) {
        aiResult = await generateLiquidWithOpenAI(htmlContent, finalFileName);
      } else {
        aiResult = await generateLiquidWithClaude(htmlContent, finalFileName);
      }

      if (!aiResult.success) {
        if (config.ENABLE_LOGS) {
          console.log(
            `❌ [STEP 1] ${aiProvider} conversion failed:`,
            aiResult.error
          );
          console.log(
            `🚫 [BLOCKED] Custom conversion blocked - ${aiProvider} conversion must complete first`
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: ${aiProvider} conversion failed`,
            details: aiResult.error,
            step: `${aiProvider.toLowerCase()}_conversion`,
            apiStatus: "conversion_failed",
          },
          { status: 500 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log(`✅ [STEP 1] ${aiProvider} conversion completed successfully`);
        console.log(
          `📊 [STEP 1] ${aiProvider} Usage - Tokens:`,
          aiResult.metadata.totalTokens
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

    const aiProvider = useOpenAI ? "OpenAI" : useClaude ? "Claude" : "None";
    
    if (skippedAI) {
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
          "🎉 [COMPLETE] Custom conversion finished (AI skipped:",
          aiResult.reason + ")"
        );
      }
    } else {
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
          `🎉 [COMPLETE] Both ${aiProvider} and Custom conversions finished - returning Custom results`
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
      aiGenerationCompleted: aiResult?.success || false,
      aiSkipped: skippedAI,
      aiSkipReason: skippedAI ? aiResult.reason : null,
      aiMetadata: aiResult?.metadata || null,
      aiProvider: aiProvider,
      apiValidated: !skippedAI,
      sequentialProcessing: !skippedAI,
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
        aiGenerationEnabled: !skippedAI,
        aiSkipped: skippedAI,
        aiSkipReason: skippedAI ? aiResult.reason : null,
        aiTokensUsed: aiResult?.metadata?.totalTokens || 0,
        aiProvider: aiProvider,
        processingSequence: skippedAI
          ? config.mode === "CUSTOM_ONLY"
            ? "Custom-Only-By-Config"
            : "Custom-Only-After-Wait"
          : `${aiProvider}-First-Then-Custom`,
        waitTimeApplied:
          skippedAI && (config.mode === "OPENAI_FIRST" || config.mode === "CLAUDE_FIRST")
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
