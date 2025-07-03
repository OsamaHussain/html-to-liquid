import { NextResponse } from 'next/server';
import { validateShopifyFilename, generateShopifyPaths } from '../../../utils/filenameValidation';
import { generateZip, addFileComment } from '../../../utils/zipGenerator';
import { fixSchemaQuotesInLiquid } from '../../../utils/quoteEscaping';
import { fixFileSchemaConsistency } from '../../../utils/fileSchemaConsistency';
import { generateLiquidTemplate } from '../../../utils/customHtmlToLiquid';

export async function POST(request) {
  try {
    const { htmlContent, fileName } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    if (!fileName || !fileName.trim()) {
      return NextResponse.json(
        { error: 'Filename is required for conversion. Please provide a section name before proceeding.' },
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
          error: 'Invalid filename for Shopify',
          details: filenameValidation.error,
          suggestion: filenameValidation.suggestions
        },
        { status: 400 }
      );
    }

    if (filenameValidation.sanitized !== finalFileName.replace(/\.html?$/i, '')) {
      finalFileName = filenameValidation.sanitized;
      filenameCorrected = true;
    } else {
      finalFileName = filenameValidation.sanitized;
    }

    const shopifyPaths = generateShopifyPaths(finalFileName);

    console.log('Starting custom HTML-to-Liquid conversion for:', finalFileName);

    const conversionResult = generateLiquidTemplate(htmlContent, finalFileName);

    let liquidContent = conversionResult.liquidContent;
    let jsonTemplate = conversionResult.jsonTemplate;
    let injectedBlocks = conversionResult.schema.blocks || [];
    let usedBlockTypes = injectedBlocks.map(block => block.type);

    console.log('Custom conversion completed successfully');

    try {
      const quoteFixResult = fixSchemaQuotesInLiquid(liquidContent);
      if (quoteFixResult.success) {
        liquidContent = quoteFixResult.content;
        if (quoteFixResult.issues && quoteFixResult.issues.length > 0) {
          processingErrors.push(`Fixed ${quoteFixResult.issues.length} quote issue${quoteFixResult.issues.length !== 1 ? 's' : ''} in schema`);
        }
      } else if (quoteFixResult.error) {
        processingErrors.push(`Quote escaping warning: ${quoteFixResult.error}`);
      }
    } catch (quoteError) {
      console.error('Quote escaping error:', quoteError);
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
          processingErrors.push(`Consistency fixes: ${consistencyResult.changes.join(', ')}`);
        }
      }
    } catch (consistencyError) {
      console.error('Consistency validation error:', consistencyError);
      processingErrors.push(`Consistency validation failed: ${consistencyError.message}`);
    }

    const liquidWithComments = addFileComment(liquidContent || '', {
      fileName: `${finalFileName}.liquid`,
      generatedAt: new Date().toISOString(),
      converter: 'Custom HTML-to-Liquid Converter',
      note: 'Deterministic conversion - consistent output every time'
    });

    const jsonWithComments = addFileComment(jsonTemplate || '{}', {
      fileName: `page.${finalFileName}.json`,
      generatedAt: new Date().toISOString(),
      converter: 'Custom HTML-to-Liquid Converter'
    });

    const validationInfo = {
      hasSchema: liquidContent && liquidContent.includes('{% schema %}'),
      hasStylesheet: liquidContent && liquidContent.includes('{% stylesheet %}'),
      hasJavascript: liquidContent && liquidContent.includes('{% javascript %}'),
      liquidLineCount: liquidContent ? liquidContent.split('\n').length : 0,
      jsonLineCount: jsonTemplate.split('\n').length,
      conversionMethod: 'custom-deterministic'
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
        processingErrors: processingErrors
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length,
        conversionMethod: 'Custom Deterministic Converter'
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);

    return NextResponse.json(
      { error: `Conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}