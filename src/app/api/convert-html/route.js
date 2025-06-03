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
    }

    const isLargeFile = htmlContent.length > 10000 || htmlContent.split('\n').length > 800; const prompt = `Convert the following HTML code to a professional Shopify Liquid template file. ${isLargeFile ? 'CRITICAL: This is a large HTML file. You MUST convert the ENTIRE HTML content completely. Do not truncate or stop mid-conversion. Ensure the complete liquid template with full schema is returned.' : ''} Follow these STRICT requirements:

🚨 MANDATORY: MAKE ALL HARDCODED CONTENT EDITABLE - NO HARDCODED TEXT SHOULD REMAIN! 🚨

1. PRESERVE ALL ORIGINAL STYLING: Keep ALL CSS classes, inline styles, and visual design EXACTLY as written in HTML
2. PRESERVE CSS STRUCTURE: Keep the entire <style> section exactly as is - do NOT modify any CSS
3. COMPLETE CONTENT REPLACEMENT - MAKE EVERYTHING EDITABLE:
   - ALL heading text (H1/H2/H3/H4/H5/H6) → {{ section.settings.title }}, {{ section.settings.subtitle }}, {{ section.settings.heading_1 }}, etc.
   - ALL paragraph text → {{ section.settings.description }}, {{ section.settings.text_1 }}, {{ section.settings.text_2 }}, etc.
   - ALL button text → {{ section.settings.button_text }}, {{ section.settings.button_1_text }}, etc.
   - ALL span/div text content → {{ section.settings.label_1 }}, {{ section.settings.label_2 }}, etc.
   - ALL list items text → {{ section.settings.list_item_1 }}, {{ section.settings.list_item_2 }}, etc.
   - ALL image alt text → {{ section.settings.image_alt }}, {{ section.settings.image_1_alt }}, etc.
   - ALL image src URLs → {{ section.settings.image | img_url: 'master' }}
   - ALL anchor tag hrefs → {{ section.settings.link_url }} or {{ block.settings.link_url }}
   - ALL anchor tag text → {{ section.settings.link_text }} or {{ block.settings.link_text }}
   - ALL form placeholder text → {{ section.settings.placeholder_text }}
   - ALL labels → {{ section.settings.label_text }}
   - ALL price text → {{ section.settings.price_text }}
   - ALL numbers/statistics → {{ section.settings.stat_number }}
   - ALL testimonial quotes → {{ section.settings.testimonial_text }}
   - ALL company names → {{ section.settings.company_name }}
   - ALL contact information → {{ section.settings.phone }}, {{ section.settings.email }}, {{ section.settings.address }}
   - ALL social media text → {{ section.settings.social_text }}
   - ALL copyright text → {{ section.settings.copyright_text }}
   - LITERALLY EVERY PIECE OF TEXT CONTENT MUST BE CONVERTED TO LIQUID VARIABLES!

4. IDENTIFY REPEATING ELEMENTS: If HTML has multiple similar cards/items, use {% for block in section.blocks %}
5. PRESERVE HTML STRUCTURE: Keep exact HTML structure, classes, and attributes
6. COMPREHENSIVE SCHEMA REQUIREMENTS:
   - Extract ACTUAL text from HTML as default values in schema
   - Use "text" type for short text (under 100 characters)
   - Use "textarea" type for long text (over 100 characters)
   - Use "image_picker" for ALL images (NO default values for image_picker)
   - Use "url" for ALL anchor tag links with actual href as default value
   - Use "text" for ALL anchor tag text content as editable settings
   - Use "email" type for email addresses
   - Use "tel" type for phone numbers
   - Include blocks section for ALL repeating elements
   - Make EVERY single piece of content editable through settings
   - Create unique setting IDs for every text element
7. NO GENERIC PLACEHOLDERS: Use real content from HTML in schema defaults
8. CRITICAL SHOPIFY RULE: Never add "default" attribute to "image_picker" settings
9. COMPLETE CONVERSION: Convert ALL sections including headers, navigation, hero, content, testimonials, products, forms, footer - EVERYTHING!
10. CREATE COMPREHENSIVE BLOCKS: Include blocks for products, testimonials, education guides, sustainability slides, transformation slides, team members, features, services, etc.
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
13. SCHEMA MUST INCLUDE: For every piece of content, create appropriate settings:
    - For anchor tags: { "type": "url", "id": "link_name_url", "label": "Link URL", "default": "/" } and { "type": "text", "id": "link_name_text", "label": "Link Text", "default": "actual_link_text" }
    - For headings: { "type": "text", "id": "heading_1", "label": "Heading Text", "default": "actual_heading_text" }
    - For paragraphs: { "type": "textarea", "id": "description_1", "label": "Description", "default": "actual_paragraph_text" }
    - For images: { "type": "image_picker", "id": "image_1", "label": "Image" }
    - For all other text: { "type": "text", "id": "text_content_1", "label": "Text Content", "default": "actual_text" }

14. TEXT CONTENT ANALYSIS: Scan the HTML and identify EVERY single text element:
    - Count all headings and create separate settings for each
    - Count all paragraphs and create separate settings for each
    - Count all buttons and create separate settings for each
    - Count all links and create separate settings for each
    - Count all labels/spans and create separate settings for each
    - Create numbered settings for multiple similar elements (title_1, title_2, etc.)

CRITICAL: The liquid template should look IDENTICAL to the original HTML when rendered. Do NOT modify any CSS or styling. CONVERT THE ENTIRE HTML - ALL SECTIONS MUST BE INCLUDED. MAKE EVERY SINGLE PIECE OF TEXT CONTENT EDITABLE!

HTML to convert:
\`\`\`html
${htmlContent}
\`\`\`

Return ONLY the liquid template with complete schema section. Include ALL CSS exactly as written in HTML. MUST include all sections from HTML.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a Shopify Liquid expert specializing in converting HTML to FULLY EDITABLE Liquid templates. 🚨 CRITICAL MISSION: Make EVERY single piece of hardcoded content editable through Liquid variables and schema settings. NO hardcoded text should remain in the final template - everything must be dynamic and editable from the Shopify admin. Convert HTML to Liquid templates while preserving ALL original styling and CSS. Extract EVERY piece of real content from HTML and make it editable through schema settings. Create blocks for repeating elements. The converted template must look identical to the original HTML when rendered. NEVER use generic placeholders - always use actual content from the HTML as default values in schema. CRITICAL: image_picker fields in schema must NEVER have default values - this is invalid in Shopify. IMPORTANT: You must convert the ENTIRE HTML content - do not truncate or cut off any sections. Complete the full conversion including all sections, testimonials, and footer content. MANDATORY: Make ALL text content editable - headings, paragraphs, buttons, links, labels, spans, form placeholders, alt text, phone numbers, emails, addresses, company names, testimonials, statistics, prices - EVERYTHING must be converted to Liquid variables with corresponding schema settings. ANCHOR TAGS: Make ALL anchor tags editable - convert both href and text content to Liquid variables with corresponding schema settings. For URL-type settings in schema, always use 'default': '/' as the default value. CRITICAL: You must ensure the COMPLETE conversion of large HTML files. Do not stop mid-conversion. Return the full liquid template with complete schema where EVERY piece of content is editable."
      },
      {
        role: "user",
        content: prompt
      }
      ],
      max_tokens: 16000,
      temperature: 0.05,
    });

    let liquidContent = completion.choices[0]?.message?.content;

    if (!liquidContent) {
      return NextResponse.json(
        { error: 'Failed to generate Liquid content' },
        { status: 500 }
      );
    }

    if (isLargeFile && !liquidContent.includes('{% endschema %}')) {
      console.warn('Large file conversion appears incomplete, attempting retry with different approach...');

      const retryCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "system",
          content: "You are a Shopify Liquid expert specializing in converting large HTML files to FULLY EDITABLE Liquid templates. 🚨 CRITICAL MISSION: Make EVERY single piece of hardcoded text/content editable through Liquid variables. NO hardcoded content should remain. CRITICAL: You must return the COMPLETE liquid template including the full schema section. Never truncate or stop mid-conversion. Ensure the response ends with {% endschema %} tag. Make ALL text content dynamic and editable from Shopify admin."
        },
        {
          role: "user",
          content: `URGENT: Complete the full conversion of this large HTML file to Shopify Liquid. You must include ALL sections and complete the full schema. Do not stop until the entire HTML is converted and the schema is complete with {% endschema %} tag.

🚨 CRITICAL REQUIREMENT: Make EVERY single piece of hardcoded content EDITABLE through Liquid variables and schema settings. NO hardcoded text should remain in the template! 🚨

HTML Content:
\`\`\`html
${htmlContent}
\`\`\`

MANDATORY Requirements:
1. Convert ENTIRE HTML - all sections must be included
2. Complete schema with {% endschema %} at the end
3. Preserve all CSS and styling exactly
4. Make ALL text content editable: headings, paragraphs, buttons, links, labels, spans, form text, alt text, phone numbers, emails, addresses, company names, testimonials, statistics, prices - EVERYTHING!
5. Make all anchor tags editable with Liquid variables (both href and text)
6. Extract real content for schema default values
7. Include blocks for repeating elements
8. Create numbered settings for multiple similar elements (title_1, title_2, etc.)
9. Use appropriate field types: "text" for short text, "textarea" for long text, "image_picker" for images, "url" for links, "email" for emails, "tel" for phones
10. NO hardcoded content should remain - make everything dynamic and editable from Shopify admin`
        }
        ],
        max_tokens: 16000,
        temperature: 0.01,
      });

      const retryLiquidContent = retryCompletion.choices[0]?.message?.content;
      if (retryLiquidContent && retryLiquidContent.includes('{% endschema %}')) {
        console.log('Retry successful - using complete conversion');
        liquidContent = retryLiquidContent;
      }
    }

    let cleanedLiquidContent = liquidContent;

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

      if (htmlContent.length > 5000) {
        console.log('Large HTML detected, checking for complete conversion...');

        const htmlLineCount = htmlContent.split('\n').length;
        const liquidLineCount = cleanedLiquidContent.split('\n').length;
        const conversionRatio = liquidLineCount / htmlLineCount;

        if (conversionRatio < 0.3) {
          console.warn(`Conversion ratio seems low: ${conversionRatio.toFixed(2)}`);
        }
      }
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
    const sectionType = liquidFileName.replace('.liquid', ''); const jsonPrompt = `Create a Shopify page template JSON that matches the Liquid schema EXACTLY and includes ALL dynamic content settings.

🚨 CRITICAL: The JSON template must use ONLY the block types defined in the Liquid schema AND include ALL editable content settings. 🚨

Original HTML Content:
\`\`\`html
${htmlContent}
\`\`\`

Converted Liquid Template (WITH SCHEMA):
\`\`\`liquid
${cleanedLiquidContent}
\`\`\`

COMPREHENSIVE SCHEMA SYNCHRONIZATION RULES:
1. Section type must be "${sectionType}"
2. Block types in JSON must EXACTLY match block types in the Liquid schema
3. Every block setting in JSON must match the schema definition
4. Extract REAL content from HTML for ALL default values
5. NO default values for image_picker fields
6. MANDATORY: Include settings for ALL text content that was made editable in Liquid template
7. CRITICAL: Include ALL heading settings (title, subtitle, heading_1, heading_2, etc.)
8. CRITICAL: Include ALL paragraph settings (description, text_1, text_2, etc.)
9. CRITICAL: Include ALL button settings (button_text, button_1_text, etc.)
10. CRITICAL: Include ALL link settings (both URL and text for every anchor tag)
11. CRITICAL: Include ALL label/span settings (label_1, label_2, etc.)
12. CRITICAL: Include ALL form settings (placeholder_text, etc.)
13. CRITICAL: Include ALL contact info settings (phone, email, address, etc.)

COMPLETE CONTENT ANALYSIS - MANDATORY STEP:
1. Scan the Liquid schema for ALL settings (not just anchor tags)
2. For EVERY setting in the schema, create corresponding JSON setting
3. Extract actual text content from HTML for each setting
4. Count ALL text elements and ensure each has a JSON setting:
   - All headings: title, subtitle, heading_1, heading_2, heading_3, etc.
   - All paragraphs: description, text_1, text_2, text_3, etc.
   - All buttons: button_text, button_1_text, button_2_text, etc.
   - All labels: label_1, label_2, label_3, etc.
   - All form elements: placeholder_text, input_label, etc.
   - All contact info: phone, email, address, company_name, etc.
   - All statistics/numbers: stat_1, stat_2, price_text, etc.
   - All testimonials: testimonial_text, author_name, etc.

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
4. Examples of settings to include:
   - ALL heading text from HTML
   - ALL paragraph text from HTML
   - ALL button text from HTML
   - ALL link URLs and text from HTML
   - ALL form placeholders from HTML
   - ALL contact information from HTML
   - ALL company/brand text from HTML

ANALYSIS STEPS:
1. Find the {% schema %} section in the Liquid template
2. Identify ALL settings defined in schema (not just blocks)
3. For each setting, extract corresponding content from HTML
4. Count repeating elements in HTML and create blocks accordingly
5. Extract actual text content from HTML as default values for ALL settings
6. SCAN for EVERY setting in the schema and populate them with real HTML content

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

    const jsonCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system", content: `You are a Shopify expert who creates comprehensive page template JSON files that capture ALL dynamic content. 🚨 CRITICAL RULES:
1. Section type must be "${sectionType}" 
2. Block types in JSON must EXACTLY match block types defined in the Liquid schema
3. Parse the Liquid schema first to identify ALL settings (not just block types)
4. Extract REAL content from HTML for ALL settings - no placeholders
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
12. COMPREHENSIVE CONTENT CAPTURE: You MUST scan the Liquid schema for ALL settings and populate them:
    - Find EVERY setting in the schema (headings, paragraphs, buttons, links, labels, forms, etc.)
    - Extract actual text content from HTML for each setting
    - Include ALL heading settings: title, subtitle, heading_1, heading_2, etc.
    - Include ALL paragraph settings: description, text_1, text_2, etc.
    - Include ALL button settings: button_text, button_1_text, etc.
    - Include ALL form settings: placeholder_text, input_label, etc.
    - Include ALL contact settings: phone, email, address, company_name, etc.
    - Include ALL anchor tag settings: both URL and text for every link
13. MANDATORY ANCHOR TAG HANDLING: 
    - Find every setting ending with "_url" and "_text" in the schema
    - Extract actual href values and link text from the original HTML
    - Create settings for navigation links, footer links, buttons, social links, etc.
    - For header/navigation: Create numbered settings or blocks for each navigation link
    - Each anchor tag gets corresponding URL and text settings
14. Count ALL text elements in HTML and ensure each has corresponding JSON setting
15. Use actual href values (convert localhost URLs to relative paths like "/")
16. Use actual text content from HTML for all text settings
17. HEADER LINKS: If there are multiple anchor tags in header/nav section, create blocks or numbered settings for each one
18. CRITICAL: You must process the ENTIRE schema and create JSON for ALL settings. Do not truncate or skip any parts for large files.
19. MISSING CONTENT RULE: If a setting exists in schema but no corresponding content found in HTML, use appropriate default values`
      },
      {
        role: "user",
        content: jsonPrompt
      }
      ],
      max_tokens: 8000,
      temperature: 0.01,
    });

    const jsonTemplate = jsonCompletion.choices[0]?.message?.content;
    let correctedJsonTemplate = jsonTemplate;

    if (correctedJsonTemplate) {
      correctedJsonTemplate = correctedJsonTemplate.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      correctedJsonTemplate = correctedJsonTemplate.replace(/```\s*$/g, '');
      correctedJsonTemplate = correctedJsonTemplate.replace(/^```.*?\n/g, '');
      correctedJsonTemplate = correctedJsonTemplate.trim();

      try {
        const jsonData = JSON.parse(correctedJsonTemplate);

        if (jsonData.sections && jsonData.sections.main) {
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
            });

            Object.keys(jsonData.sections.main.settings).forEach(key => {
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
              const block = jsonData.sections.main.blocks[blockKey];

              if (!validBlockTypes.has(block.type)) {
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
              }

              if (block.settings) {
                Object.keys(block.settings).forEach(key => {
                  const setting = block.settings[key];
                  if (typeof setting === 'string' && key.includes('image') && (setting.startsWith('http') || setting.includes('.'))) {
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
        );

        correctedJsonTemplate = correctedJsonTemplate.replace(
          /"([^"]*image[^"]*)":\s*"[^"]*"/gm,
          '"$1": ""'
        );
      }
    }

    return NextResponse.json({
      success: true,
      liquidContent: cleanedLiquidContent,
      jsonTemplate: correctedJsonTemplate,
      metadata: {
        liquidFileName: liquidFileName,
        jsonFileName: fileName ? `page.${fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json',
        sectionType: sectionType,
        isLargeFile: isLargeFile,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length
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
