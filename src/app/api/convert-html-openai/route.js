import { NextResponse } from 'next/server';
import { generateLiquidWithOpenAI } from '../../../utils/openaiHtmlToLiquid';
import { validateShopifyFilename, generateShopifyPaths } from '../../../utils/filenameValidation';

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
        { error: 'Filename is required for conversion' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    let finalFileName = fileName.trim();
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

    finalFileName = filenameValidation.sanitized;
    const shopifyPaths = generateShopifyPaths(finalFileName);

    console.log('🤖 Starting OpenAI HTML-to-Liquid conversion with GPT-5 for:', finalFileName);

    const openaiResult = await generateLiquidWithOpenAI(htmlContent, finalFileName);

    if (!openaiResult.success) {
      return NextResponse.json(
        { error: `OpenAI conversion failed: ${openaiResult.error}` },
        { status: 500 }
      );
    }

    console.log('✅ OpenAI conversion completed successfully');

    const validationInfo = {
      hasSchema: openaiResult.liquidContent && openaiResult.liquidContent.includes('{% schema %}'),
      hasStylesheet: openaiResult.liquidContent && openaiResult.liquidContent.includes('{% stylesheet %}'),
      hasJavascript: openaiResult.liquidContent && openaiResult.liquidContent.includes('<script>'),
      liquidLineCount: openaiResult.liquidContent ? openaiResult.liquidContent.split('\n').length : 0,
      jsonLineCount: openaiResult.jsonTemplate.split('\n').length,
      conversionMethod: 'openai-gpt5'
    };

    return NextResponse.json({
      success: true,
      liquidContent: openaiResult.liquidContent,
      jsonTemplate: openaiResult.jsonTemplate,
      validation: validationInfo,
      openaiMetadata: openaiResult.metadata,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        conversionMethod: 'OpenAI GPT-5'
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length,
        conversionMethod: 'OpenAI GPT-5 Converter',
        tokensUsed: openaiResult.metadata.totalTokens
      }
    });

  } catch (error) {
    console.error('OpenAI conversion error:', error);

    return NextResponse.json(
      { error: `OpenAI conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}
