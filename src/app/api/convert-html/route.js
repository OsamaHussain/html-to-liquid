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
    } const prompt = `Convert the following HTML code to a professional Shopify Liquid template file. Follow these STRICT requirements:

1. PRESERVE ALL ORIGINAL STYLING: Keep ALL CSS classes, inline styles, and visual design EXACTLY as written in HTML
2. PRESERVE CSS STRUCTURE: Keep the entire <style> section exactly as is - do NOT modify any CSS
3. SMART CONTENT REPLACEMENT ONLY:
   - Replace text content in H1/H2/H3 tags → {{ section.settings.title }}, {{ section.settings.subtitle }}
   - Replace paragraph text → {{ section.settings.description }}
   - Replace button text → {{ section.settings.button_text }}
   - Replace image src URLs → {{ section.settings.image | img_url: 'master' }}
   - Replace anchor tag hrefs → {{ section.settings.link_url }} or {{ block.settings.link_url }}
   - Replace anchor tag text → {{ section.settings.link_text }} or {{ block.settings.link_text }}
   - Make ALL anchor tags editable through settings
4. IDENTIFY REPEATING ELEMENTS: If HTML has multiple similar cards/items, use {% for block in section.blocks %}
5. PRESERVE HTML STRUCTURE: Keep exact HTML structure, classes, and attributes
6. SCHEMA REQUIREMENTS:
   - Extract ACTUAL text from HTML as default values in schema
   - Use "text" type for short text, "textarea" for long text
   - Use "image_picker" for images (NO default values for image_picker)
   - Use "url" for ALL anchor tag links with actual href as default value
   - Use "text" for ALL anchor tag text content as editable settings
   - Include blocks section for repeating elements
   - Make EVERY anchor tag editable: both href and text content
7. NO GENERIC PLACEHOLDERS: Use real content from HTML in schema defaults
8. CRITICAL SHOPIFY RULE: Never add "default" attribute to "image_picker" settings
9. COMPLETE CONVERSION: Convert ALL sections including Shop, Education Center, Newsletter, and Footer
10. CREATE COMPREHENSIVE BLOCKS: Include blocks for products, testimonials, education guides, sustainability slides, transformation slides
11. MANDATORY ANCHOR TAG CONVERSION: Every single <a> tag MUST become editable:
    - Header/Navigation links: Use BLOCKS for dynamic header links (can add/remove from admin)
    - Footer links: <a href="{{ section.settings.footer_link_1_url }}">{{ section.settings.footer_link_1_text }}</a>
    - Multiple footer links: footer_link_2_url, footer_link_2_text, footer_link_3_url, footer_link_3_text, etc.
    - Button links: <a href="{{ section.settings.button_url }}">{{ section.settings.button_text }}</a>
    - Block links: <a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>
    - Social links: <a href="{{ section.settings.social_link_1_url }}">{{ section.settings.social_link_1_text }}</a>
    - Multiple social links: social_link_2_url, social_link_2_text, social_link_3_url, social_link_3_text, etc.
    - ALL other anchor tags: Create unique numbered settings for EACH anchor tag
12. DYNAMIC HEADER NAVIGATION HANDLING: For header/navigation anchor tags:
    - Convert header anchor tags to BLOCKS using {% for block in section.blocks %}
    - Create "header_link" block type for each navigation link
    - Each header link becomes a separate block with link_url and link_text settings
    - This allows admin to add/remove header links dynamically
    - Header navigation example: {% for block in section.blocks %}{% if block.type == 'header_link' %}<a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>{% endif %}{% endfor %}
13. SCHEMA MUST INCLUDE: For every anchor tag converted, add TWO settings in schema:
    - { "type": "url", "id": "link_name_url", "label": "Link URL", "default": "/" }
    - { "type": "text", "id": "link_name_text", "label": "Link Text", "default": "actual_link_text" }

CRITICAL: The liquid template should look IDENTICAL to the original HTML when rendered. Do NOT modify any CSS or styling. CONVERT THE ENTIRE HTML - ALL SECTIONS MUST BE INCLUDED.

HTML to convert:
\`\`\`html
${htmlContent}
\`\`\`

Return ONLY the liquid template with complete schema section. Include ALL CSS exactly as written in HTML. MUST include all sections from HTML.`; const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Shopify Liquid expert. Convert HTML to Liquid templates while preserving ALL original styling and CSS. Extract real content from HTML and use it as default values in schema. Create blocks for repeating elements. The converted template must look identical to the original HTML when rendered. NEVER use generic placeholders - always use actual content from the HTML. CRITICAL: image_picker fields in schema must NEVER have default values - this is invalid in Shopify. IMPORTANT: You must convert the ENTIRE HTML content - do not truncate or cut off any sections. Complete the full conversion including all sections, testimonials, and footer content. ANCHOR TAGS: Make ALL anchor tags editable - convert both href and text content to Liquid variables with corresponding schema settings. For URL-type settings in schema, always use 'default': '/' as the default value."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 8000,
      temperature: 0.05,
    }); const liquidContent = completion.choices[0]?.message?.content;

    if (!liquidContent) {
      return NextResponse.json(
        { error: 'Failed to generate Liquid content' },
        { status: 500 }
      );
    } let cleanedLiquidContent = liquidContent;

    cleanedLiquidContent = cleanedLiquidContent.replace(/^```liquid\s*/, '').replace(/\s*```$/, '');

    if (cleanedLiquidContent.includes('This Liquid template preserves')) {
      const explanationIndex = cleanedLiquidContent.indexOf('This Liquid template preserves');
      cleanedLiquidContent = cleanedLiquidContent.substring(0, explanationIndex).trim();
    }
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nThis Liquid template[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nThe above[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nNote:[\s\S]*$/i, '');

    cleanedLiquidContent = cleanedLiquidContent.replace(/```\s*$/g, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^```.*?\n/g, '');
    cleanedLiquidContent = cleanedLiquidContent.trim();

    if (!cleanedLiquidContent.includes('{% endschema %}')) {
      console.warn('Liquid conversion appears incomplete - missing endschema tag');
    }

    if (cleanedLiquidContent.includes('{% schema %}')) {
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /"label":\s*"([^"]*)"([^,\n}])/g,
        '"label": "$1",$2'
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /("type":\s*"image_picker"[\s\S]*?),\s*"default":\s*"[^"]*"/g,
        '$1'
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /"default":\s*"([^"]*)"([^,\n}])/g,
        '"default": "$1",$2'
      );
    }
    const liquidFileName = fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid';
    const sectionType = liquidFileName.replace('.liquid', ''); const jsonPrompt = `Create a Shopify page template JSON that matches the Liquid schema EXACTLY.

CRITICAL: The JSON template must use ONLY the block types defined in the Liquid schema.

Original HTML Content:
\`\`\`html
${htmlContent}
\`\`\`

Converted Liquid Template (WITH SCHEMA):
\`\`\`liquid
${cleanedLiquidContent}
\`\`\`

SCHEMA SYNCHRONIZATION RULES:
1. Section type must be "${sectionType}"
2. Block types in JSON must EXACTLY match block types in the Liquid schema
3. Every block setting in JSON must match the schema definition
4. Extract REAL content from HTML for default values
5. NO default values for image_picker fields
6. MANDATORY: Include settings for ALL anchor tags converted in Liquid template

ANCHOR TAG ANALYSIS - CRITICAL STEP:
1. Count ALL <a> tags in the original HTML
2. For EACH anchor tag, create TWO settings in JSON:
   - One for the URL (ending with _url): Extract actual href value
   - One for the text (ending with _text): Extract actual link text
3. HEADER/NAVIGATION ANCHOR TAGS: If there are multiple anchor tags in header/nav:
   - Create BLOCKS for header links (allows admin to add/remove dynamically)
   - Each header anchor tag becomes a "header_link" block
   - Extract actual href and text from each individual header anchor tag
   - This makes header navigation fully editable and expandable
4. Examples of anchor tag settings to include:
   - HEADER BLOCKS: Create "header_link" blocks for each navigation link
   - "footer_link_1_url": "/", "footer_link_1_text": "Contact Us"
   - "footer_link_2_url": "/", "footer_link_2_text": "Privacy Policy"
   - "button_url": "/", "button_text": "Shop Now"
   - "social_link_1_url": "/", "social_link_1_text": "Follow Us"
   - Create unique numbered settings for multiple similar links

ANALYSIS STEPS:
1. Find the {% schema %} section in the Liquid template
2. Identify all block types defined in schema.blocks
3. Use ONLY those block types in the JSON template
4. Count repeating elements in HTML and create blocks accordingly
5. Extract actual text content from HTML as default values
6. SCAN for ALL anchor tag settings in the schema and populate them

JSON STRUCTURE:
{
  "sections": {
    "main": {
      "type": "${sectionType}",
      "blocks": {
        "header-link-1": {
          "type": "header_link",
          "settings": {
            "link_url": "/",
            "link_text": "Home"
          }
        },
        "header-link-2": {
          "type": "header_link", 
          "settings": {
            "link_url": "/",
            "link_text": "Shop"
          }
        },
        "block-1": {
          "type": "EXACT_TYPE_FROM_SCHEMA",
          "settings": {
            "setting_id": "ACTUAL_CONTENT_FROM_HTML"
          }
        }
      },
      "block_order": ["header-link-1", "header-link-2", "block-1"],
      "settings": {
        "setting_id": "ACTUAL_CONTENT_FROM_HTML",
        "heading_size": "h1",
        "color_scheme": "scheme-1",
        "padding_top": 36,
        "padding_bottom": 36,
        "margin_top": 0,
        "margin_bottom": 0,
        "footer_link_1_url": "/", 
        "footer_link_1_text": "Contact",
        "footer_link_2_url": "/",
        "footer_link_2_text": "Privacy",
        "button_url": "/",
        "button_text": "Shop Now"
      }
    }
  },
  "order": ["main"]
}

CRITICAL: Use only block types that exist in the Liquid schema. Extract real content from HTML. Include ALL anchor tag settings.

Return ONLY valid JSON:`;
    `\`\`liquid
${liquidContent}
\`\`\`

IMPORTANT: Extract the ACTUAL content from the original HTML and use it as default values in the JSON template settings. Do NOT use generic placeholders.

Requirements for the JSON template:

1. Must include "sections" object with section references
2. Must include "order" array listing the sections in order  
3. Use EXACTLY the section type "${sectionType}" - this is the ONLY allowed section type
4. Extract REAL content from the original HTML for settings values
5. Follow this EXACT structure (DO NOT change the section type):

{
  "sections": {
    "main": {
      "type": "${sectionType}",      
      "settings": {        
        "title": "Actual title from HTML",
        "description": "Actual description from HTML",
        "image": "actual-image-filename.jpg",        
        "button_text": "Actual button text from HTML",
        "button_url": "/",
        "heading_size": "h1",
        "color_scheme": "scheme-1",
        "padding_top": 36,
        "padding_bottom": 36,
        "margin_top": 0,
        "margin_bottom": 0,
        "header_link_1_text": "Home",
        "header_link_1_url": "/",
        "header_link_2_text": "Shop", 
        "header_link_2_url": "/",
        "header_link_3_text": "About",
        "header_link_3_url": "/",
        "footer_link_1_text": "Contact",
        "footer_link_1_url": "/",
        "footer_link_2_text": "Privacy",
        "footer_link_2_url": "/",
        "social_link_1_text": "Follow Us",
        "social_link_1_url": "/"
      }
    }
  },
  "order": ["main"]
}

7. Make sure EVERY {{ section.settings.variable_name }} from the liquid template has a corresponding setting
8. Make sure EVERY {{ block.settings.variable_name }} from the liquid template has a corresponding block setting
9. Use the ACTUAL text content, headings, paragraphs, button texts, image names from the original HTML
10. For images, extract the actual filename from src attributes
11. For text content, use the real text from HTML elements, not "Sample text" or "Default title"
12. For colors, extract actual color values from style attributes or classes if present
13. ALWAYS include standard Shopify section settings:
    - "heading_size": "h1" (for heading size control)
    - "color_scheme": "scheme-1" (for color scheme selection)
    - "padding_top": 36 (top padding in pixels)
    - "padding_bottom": 36 (bottom padding in pixels)
    - "margin_top": 0 (top margin)
    - "margin_bottom": 0 (bottom margin)
14. For ALL anchor tags, create TWO settings: one for href (url type) and one for text (text type)
15. Extract actual href values and link text from HTML anchor tags
16. Make navigation links, footer links, buttons, and ALL clickable elements editable
16. SCAN EVERY <a> tag in HTML and create corresponding Liquid variables and schema settings
17. Examples of anchor tag conversions:
    - <a href="/shop">Shop Now</a> → <a href="{{ section.settings.shop_link_url }}">{{ section.settings.shop_link_text }}</a>
    - <a href="/contact">Contact</a> → <a href="{{ section.settings.contact_link_url }}">{{ section.settings.contact_link_text }}</a>
    - Multiple similar links: Use numbered settings like link_1_url, link_1_text, link_2_url, link_2_text
18. The settings should contain the real data so the website displays the original content
19. NEVER use section types like "hero", "features", "manual-input", etc. - ONLY use "${sectionType}"
20. CRITICAL: The website should look exactly like the original HTML when this template is applied
21. COUNT the repeating elements in HTML and create that many blocks with actual content
22. ALWAYS INCLUDE these standard section styling options in every JSON template:
    - "heading_size": "h1" (allows admin to control heading sizes)
    - "color_scheme": "scheme-1" (allows admin to select color schemes)
    - "padding_top": 36 (top padding control)
    - "padding_bottom": 36 (bottom padding control)
    - "margin_top": 0 (top margin control)
    - "margin_bottom": 0 (bottom margin control)

Return only the valid JSON template code with REAL content from the HTML as default values:`; const jsonCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system", content: `You are a Shopify expert who creates page template JSON files. CRITICAL RULES:
1. Section type must be "${sectionType}" 
2. Block types in JSON must EXACTLY match block types defined in the Liquid schema
3. Parse the Liquid schema first to identify valid block types
4. Extract REAL content from HTML - no placeholders
5. Count repeating elements and create blocks for each one
6. NEVER add default values to image fields
7. For image URLs, convert them to simple filenames (e.g., "image.jpg" not full URLs)
8. Return valid JSON only, no markdown formatting
9. Ensure ALL section settings and block settings match the Liquid schema exactly
10. Create the exact number of blocks as there are repeating elements in the HTML
11. ALWAYS include these standard Shopify styling settings in EVERY section:
    - "heading_size": "h1" (for heading size control)
    - "color_scheme": "scheme-1" (for color scheme selection) 
    - "padding_top": 36 (top padding in pixels)
    - "padding_bottom": 36 (bottom padding in pixels)
    - "margin_top": 0 (top margin)
    - "margin_bottom": 0 (bottom margin)
12. MANDATORY ANCHOR TAG HANDLING: You MUST scan the Liquid schema for ALL anchor tag settings and populate them:
    - Find every setting ending with "_url" and "_text" in the schema
    - Extract actual href values and link text from the original HTML
    - Create settings for navigation links, footer links, buttons, social links, etc.
    - For header/navigation: Create numbered settings like "header_link_1_url", "header_link_1_text", "header_link_2_url", "header_link_2_text", etc.
    - Each header anchor tag gets its own unique numbered setting pair
    - Example: If schema has "header_link_1_url" and "header_link_1_text", populate both with real HTML data
13. Count ALL <a> tags in HTML and ensure each has corresponding URL and text settings in JSON
14. Use actual href values (convert localhost URLs to relative paths like "/")
15. Use actual link text from HTML anchor tags
16. HEADER LINKS: If there are multiple anchor tags in header/nav section, create "header_link" blocks for each one - this allows admin to dynamically add/remove header navigation links`
      },
      {
        role: "user",
        content: jsonPrompt
      }
      ],
      max_tokens: 4000,
      temperature: 0.01,
    }); const jsonTemplate = jsonCompletion.choices[0]?.message?.content;
    let correctedJsonTemplate = jsonTemplate;
    if (correctedJsonTemplate) {
      correctedJsonTemplate = correctedJsonTemplate.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      correctedJsonTemplate = correctedJsonTemplate.replace(/```\s*$/g, '');
      correctedJsonTemplate = correctedJsonTemplate.replace(/^```.*?\n/g, '');
      correctedJsonTemplate = correctedJsonTemplate.trim();

      try {
        const jsonData = JSON.parse(correctedJsonTemplate); if (jsonData.sections && jsonData.sections.main) {
          jsonData.sections.main.type = sectionType;
          if (jsonData.sections.main.settings) {
            const defaultStyleSettings = {
              "heading_size": "h1",
              "color_scheme": "scheme-1",
              "padding_top": 36,
              "padding_bottom": 36,
              "margin_top": 0,
              "margin_bottom": 0
            };

            Object.keys(defaultStyleSettings).forEach(key => {
              if (!jsonData.sections.main.settings.hasOwnProperty(key)) {
                jsonData.sections.main.settings[key] = defaultStyleSettings[key];
              }
            }); Object.keys(jsonData.sections.main.settings).forEach(key => {
              const setting = jsonData.sections.main.settings[key];
              if (typeof setting === 'object' && setting.type === 'image_picker' && setting.default) {
                delete setting.default;
              }
              else if (typeof setting === 'string' && key.includes('image') && (setting.startsWith('http') || setting.includes('.'))) {
                jsonData.sections.main.settings[key] = "";
              }
              else if (typeof setting === 'string' && key.includes('url') && setting.startsWith('http')) {
                if (setting.includes('localhost') || setting.includes('127.0.0.1')) {
                  jsonData.sections.main.settings[key] = '/';
                }
              }
            });
          }

          const validBlockTypes = new Set();
          if (cleanedLiquidContent.includes('{% schema %}')) {
            const schemaMatch = cleanedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);
            if (schemaMatch) {
              try {
                const schema = JSON.parse(schemaMatch[1]);
                if (schema.blocks) {
                  schema.blocks.forEach(block => {
                    if (block.type) {
                      validBlockTypes.add(block.type);
                    }
                  });
                }
              } catch (e) {
                console.log('Schema parsing error, using fallback block types');
              }
            }
          }

          if (jsonData.sections.main.blocks) {
            Object.keys(jsonData.sections.main.blocks).forEach(blockKey => {
              const block = jsonData.sections.main.blocks[blockKey]; if (!validBlockTypes.has(block.type)) {
                if (blockKey.includes('header-link') && validBlockTypes.has('header_link')) {
                  block.type = 'header_link';
                } else if (blockKey.includes('product') && validBlockTypes.has('product')) {
                  block.type = 'product';
                } else if (blockKey.includes('testimonial') && validBlockTypes.has('testimonial')) {
                  block.type = 'testimonial';
                } else if (blockKey.includes('sustainability') && validBlockTypes.has('sustainability_slide')) {
                  block.type = 'sustainability_slide';
                } else if (blockKey.includes('transformation') && validBlockTypes.has('transformation_slide')) {
                  block.type = 'transformation_slide';
                } else if (blockKey.includes('education') && validBlockTypes.has('education_guide')) {
                  block.type = 'education_guide';
                } else if (blockKey.includes('guide') && validBlockTypes.has('education_guide')) {
                  block.type = 'education_guide';
                } else if (blockKey.includes('hero') && validBlockTypes.has('hero')) {
                  block.type = 'hero';
                } else {
                  const firstValidType = Array.from(validBlockTypes)[0];
                  if (firstValidType) {
                    block.type = firstValidType;
                  }
                }
              } if (block.settings) {
                Object.keys(block.settings).forEach(key => {
                  const setting = block.settings[key];
                  if (typeof setting === 'string' && key.includes('image') && (setting.startsWith('http') || setting.includes('.'))) {
                    // Set hard-coded images to empty string
                    block.settings[key] = "";
                  } else if (typeof setting === 'object' && setting.type === 'image_picker' && setting.default) {
                    delete setting.default;
                  }
                  else if (typeof setting === 'string' && key.includes('url') && setting.startsWith('http')) {
                    if (setting.includes('localhost') || setting.includes('127.0.0.1')) {
                      block.settings[key] = '/';
                    }
                  }
                });
              }
            });
          }
        }

        correctedJsonTemplate = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        console.log('JSON parsing error, using string replacement fallback');
        correctedJsonTemplate = correctedJsonTemplate.replace(
          /"type":\s*"[^"]*"/g,
          (match, offset, string) => {
            const beforeMatch = string.substring(0, offset);
            const blockMatches = (beforeMatch.match(/"blocks"/g) || []).length;
            const sectionMatches = (beforeMatch.match(/"sections"/g) || []).length;

            if (blockMatches > sectionMatches) {
              return match;
            } else {
              return `"type": "${sectionType}"`;
            }
          }
        );

        correctedJsonTemplate = correctedJsonTemplate.replace(
          /("type":\s*"image_picker"[\s\S]*?),\s*"default":\s*"[^"]*"/g,
          '$1'
        ); correctedJsonTemplate = correctedJsonTemplate.replace(
          /"([^"]*image[^"]*)":\s*"[^"]*"/gm,
          '"$1": ""'
        );
      }
    } return NextResponse.json({
      success: true,
      liquidContent: cleanedLiquidContent,
      jsonTemplate: correctedJsonTemplate,
      metadata: {
        liquidFileName: liquidFileName,
        jsonFileName: fileName ? `page.${fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json',
        sectionType: sectionType
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);

    if (error.name === 'OpenAI API Error') {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}
