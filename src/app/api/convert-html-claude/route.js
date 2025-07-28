import { NextResponse } from 'next/server';
import { generateLiquidWithClaude } from '../../../utils/claudeHtmlToLiquid';
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

    if (!process.env.CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key is not configured' },
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

    console.log('🤖 Starting Claude HTML-to-Liquid conversion with Claude-3.5-Sonnet for:', finalFileName);

    const claudeResult = await generateLiquidWithClaude(htmlContent, finalFileName);

    if (!claudeResult.success) {
      return NextResponse.json(
        { error: `Claude conversion failed: ${claudeResult.error}` },
        { status: 500 }
      );
    }

    console.log('✅ Claude conversion completed successfully');

    const validationInfo = {
      hasSchema: claudeResult.liquidContent && claudeResult.liquidContent.includes('{% schema %}'),
      hasStylesheet: claudeResult.liquidContent && claudeResult.liquidContent.includes('{% stylesheet %}'),
      hasJavascript: claudeResult.liquidContent && claudeResult.liquidContent.includes('<script>'),
      liquidLineCount: claudeResult.liquidContent ? claudeResult.liquidContent.split('\n').length : 0,
      jsonLineCount: claudeResult.jsonTemplate.split('\n').length,
      conversionMethod: 'claude-3.5-sonnet'
    };

    return NextResponse.json({
      success: true,
      liquidContent: claudeResult.liquidContent,
      jsonTemplate: claudeResult.jsonTemplate,
      validation: validationInfo,
      claudeMetadata: claudeResult.metadata,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        conversionMethod: 'Claude 3.5 Sonnet'
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length,
        conversionMethod: 'Claude 3.5 Sonnet Converter',
        tokensUsed: claudeResult.metadata.totalTokens
      }
    });

  } catch (error) {
    console.error('Claude conversion error:', error);

    return NextResponse.json(
      { error: `Claude conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}
