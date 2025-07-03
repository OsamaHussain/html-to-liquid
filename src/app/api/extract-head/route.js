import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { htmlContent, fileName } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    } const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

    if (!headMatch) {
      return NextResponse.json({
        headContent: '',
        metadata: {
          fileName: fileName || 'theme-head-section',
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: 0,
          message: 'No head section found'
        }
      });
    }

    const headOnly = headMatch[1].trim();

    if (!headOnly) {
      return NextResponse.json({
        headContent: '',
        metadata: {
          fileName: fileName || 'theme-head-section',
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: 0,
          message: 'Head section is empty'
        }
      });
    }
    console.log('Using ONLY direct regex extraction - bypassing AI completely');

    let headContent = '';

    const linkPattern = /<link[\s\S]*?>/gis;
    const scriptPattern = /<script[\s\S]*?(?:>[\s\S]*?<\/script>|\/\s*>)/gis;

    const allLinkMatches = headOnly.match(linkPattern) || [];
    const allScriptMatches = headOnly.match(scriptPattern) || [];

    console.log('=== FIXED MULTI-LINE REGEX EXTRACTION ===');
    console.log('Input head content length:', headOnly.length);
    console.log('All link matches:', allLinkMatches);
    console.log('All script matches:', allScriptMatches);

    const externalLinks = allLinkMatches.filter(tag => {
      return tag.includes('http') || tag.includes('//');
    });

    const externalScripts = allScriptMatches.filter(tag => {
      return tag.includes('http') || tag.includes('//');
    });

    console.log('External links found:', externalLinks);
    console.log('External scripts found:', externalScripts);

    const allExternalTags = [...externalLinks, ...externalScripts];

    const uniqueTags = [...new Set(allExternalTags)].filter(tag => {
      const trimmed = tag.trim();
      return (trimmed.endsWith('>') || trimmed.endsWith('</script>')) && trimmed.length > 15;
    });

    const processedTags = uniqueTags.map(tag => {
      let cleanTag = tag.trim();

      if (cleanTag.includes('tailwindcss') && cleanTag.startsWith('<link')) {
        return '<script defer src="https://cdn.tailwindcss.com"></script>';
      }

      if (cleanTag.includes('@fortawesome') && cleanTag.includes('<link')) {
        const hrefMatch = cleanTag.match(/href\s*=\s*["']([^"']*)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          let href = hrefMatch[1].replace(/\s+/g, '');
          if (href.includes('@fortawesome') && !href.includes('fontawesome-free@')) {
            href = href.replace('@fortawesome/', '@fortawesome/fontawesome-free@6.5.1/');
          }
          cleanTag = cleanTag.replace(/href\s*=\s*["'][^"']*["']/i, `href="${href}"`);
        }
      }

      if (cleanTag.includes('fonts.googleapis.com') && cleanTag.includes('<link')) {
        const hrefMatch = cleanTag.match(/href\s*=\s*["']([^"']*)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          let href = hrefMatch[1].replace(/\s+/g, '');
          href = href.replace('css2?', 'css2?').replace('dis play=swap', 'display=swap');
          cleanTag = cleanTag.replace(/href\s*=\s*["'][^"']*["']/i, `href="${href}"`);
        }
      }

      cleanTag = cleanTag
        .replace(/\s+/g, ' ')
        .replace(/\s*=\s*/g, '=')
        .replace(/>\s+/g, '>')
        .replace(/\s+</g, '<')
        .replace(/\s+>/g, '>');

      return cleanTag;
    });

    console.log('Final processed tags:', processedTags);
    console.log('Total external resources found:', processedTags.length);

    if (processedTags.length > 0) {
      headContent = '\n    ' + processedTags.join('\n    ') + '\n    ';
    } else {
      headContent = '';
    }

    if (!headContent || headContent.toLowerCase().includes('no relevant') || headContent.toLowerCase().includes('nothing to extract') || headContent.toLowerCase().includes('no head content')) {
      const productionHeadContent = `<!doctype html>
<html lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_button }}">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>
      {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
    </title>
    <meta name="description" content="{{ page_description | escape }}">

    <!-- CSS -->
    {{ 'base.css' | asset_url | stylesheet_tag }}
    {{ 'theme.css' | asset_url | stylesheet_tag }}

    <!-- Scripts -->
    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    </script>

    {{ content_for_header }}
  </head>

  <body class="template-{{ template | handle }}">
    <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {{ content_for_footer }}

    <!-- JavaScript -->
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>`;

      return NextResponse.json({
        headContent: productionHeadContent,
        metadata: {
          fileName: fileName || 'theme-head-section',
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: productionHeadContent.length,
          message: 'No specific head content found - provided complete theme.liquid template'
        }
      });
    }

    return NextResponse.json({
      headContent: `<!doctype html>
<html lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_button }}">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>
      {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
    </title>
    <meta name="description" content="{{ page_description | escape }}">

    <!-- CSS -->
    {{ 'base.css' | asset_url | stylesheet_tag }}
    {{ 'theme.css' | asset_url | stylesheet_tag }}

    <!-- Scripts -->
    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    </script>

    {{ content_for_header }}${headContent}
  </head>

  <body class="template-{{ template | handle }}">
    <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {{ content_for_footer }}

    <!-- JavaScript -->
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>`,
      metadata: {
        fileName: fileName || 'theme-head-section',
        extractedAt: new Date().toISOString(),
        inputLength: htmlContent.length,
        outputLength: headContent ? headContent.length : 0,
        extractionMethod: 'REGEX-ONLY-NO-AI',
        version: 'FIXED-VERSION-6.0-URL-INTEGRITY-FIX'
      }
    });

  } catch (error) {
    console.error('Head extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to extract head section' },
      { status: 500 }
    );
  }
}
