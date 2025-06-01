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
        }        const prompt = `Convert the following HTML code to a proper Shopify Liquid template file. Follow these requirements:

1. Replace static text with Liquid variables where appropriate (e.g., {{ section.settings.title }}, {{ section.settings.description }})
2. Convert images to use Liquid filters (e.g., {{ 'image.jpg' | asset_url }})
3. Add proper Shopify section schema for customizable elements at the bottom of the file
4. Use Shopify best practices for liquid syntax
5. Make text content editable through section settings
6. Convert any hardcoded colors, fonts, or styles to be customizable
7. Add proper liquid loops for repeatable content if needed
8. Include responsive design considerations
9. Follow Shopify's liquid template structure and naming conventions
10. For links (href attributes), convert them to Liquid variables (e.g., {{ section.settings.link_url }} or {{ block.settings.link_url }})
11. Include a complete {% schema %} section at the end with all settings and blocks
12. In schema, use "/" as default value for all link_url fields
13. Only return the liquid template code with schema, no explanations

HTML to convert:
\`\`\`html
${htmlContent}
\`\`\``;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [                {
                    role: "system",
                    content: "You are an expert Shopify Liquid template developer with deep knowledge of Shopify theme development, liquid syntax, and section schemas. Convert HTML to production-ready Liquid templates with proper customization options. ALWAYS include a complete {% schema %} section at the end of the liquid template with all necessary settings, blocks, and presets. For link_url fields in schema, always use '/' as the default value."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 4000,
            temperature: 0.3,
        });

        const liquidContent = completion.choices[0]?.message?.content; if (!liquidContent) {
            return NextResponse.json(
                { error: 'Failed to generate Liquid content' },
                { status: 500 }
            );
        }        // Get the section type before creating the prompt
        const liquidFileName = fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid';
        const sectionType = liquidFileName.replace('.liquid', ''); const jsonPrompt = `Create a proper Shopify page template JSON file for the following converted Liquid template. This JSON file will be used in the templates folder and must follow Shopify's page template structure.

CRITICAL: The liquid template will be saved as "${liquidFileName}" so you MUST use section type "${sectionType}" - NO OTHER SECTION TYPE IS ALLOWED.

Original HTML Content:
\`\`\`html
${htmlContent}
\`\`\`

Converted Liquid Template:
\`\`\`liquid
${liquidContent}
\`\`\`

IMPORTANT: Extract the ACTUAL content from the original HTML and use it as default values in the JSON template settings. Do NOT use generic placeholders.

BLOCKS DETECTION: If the HTML contains repeating elements (like multiple cards, testimonials, products, features, team members, etc.), create BLOCKS for them. If the liquid template uses {% for block in section.blocks %}, then you MUST create blocks in the JSON.

Requirements for the JSON template:

1. Must include "sections" object with section references
2. Must include "order" array listing the sections in order  
3. Use EXACTLY the section type "${sectionType}" - this is the ONLY allowed section type
4. Extract REAL content from the original HTML for settings values
5. If HTML has repeating elements, create blocks structure like this:

{
  "sections": {
    "main": {
      "type": "${sectionType}",
      "blocks": {
        "block-1": {
          "type": "item",
          "settings": {
            "title": "Actual title from first item in HTML",
            "description": "Actual description from first item in HTML",
            "link_url": "/"
          }
        },
        "block-2": {
          "type": "item", 
          "settings": {
            "title": "Actual title from second item in HTML",
            "description": "Actual description from second item in HTML",
            "link_url": "/"
          }
        }
      },
      "block_order": ["block-1", "block-2"],
      "settings": {
        "main_title": "Overall section title from HTML"
      }
    }
  },
  "order": ["main"]
}

6. If NO repeating elements, use simple settings structure:

{
  "sections": {
    "main": {
      "type": "${sectionType}",
      "settings": {
        "title": "Actual title from HTML",
        "description": "Actual description from HTML",
        "link_url": "/"
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
13. For links, if HTML has href attributes use "/" as default value, but make them editable through settings
14. The settings should contain the real data so the website displays the original content
15. NEVER use section types like "hero", "features", "manual-input", etc. - ONLY use "${sectionType}"
16. CRITICAL: The website should look exactly like the original HTML when this template is applied
17. COUNT the repeating elements in HTML and create that many blocks with actual content

Return only the valid JSON template code with REAL content from the HTML as default values:`;
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
        "link_url": "/"
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
13. For links, if HTML has href attributes use "/" as default value, but make them editable through settings
14. The settings should contain the real data so the website displays the original content
15. NEVER use section types like "hero", "features", "manual-input", etc. - ONLY use "${sectionType}"
16. CRITICAL: The website should look exactly like the original HTML when this template is applied
17. COUNT the repeating elements in HTML and create that many blocks with actual content

Return only the valid JSON template code with REAL content from the HTML as default values:`;

        const jsonCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                role: "system",
                content: "You are a Shopify theme expert who creates proper page template JSON files. These JSON files go in the templates folder and define which sections appear on a page and their settings. You must follow the exact Shopify page template JSON structure with 'sections' and 'order' keys. IMPORTANT: Extract actual content from HTML and use it as default values in the JSON settings so the website displays the original content. CRITICAL: If the HTML has repeating elements (cards, features, testimonials, etc.), you MUST create blocks structure with 'blocks' and 'block_order' arrays."
            },
            {
                role: "user",
                content: jsonPrompt
            }
            ],
            max_tokens: 1000,
            temperature: 0.1,
        }); const jsonTemplate = jsonCompletion.choices[0]?.message?.content;

        // Replace any incorrect section types in the JSON with the correct one
        let correctedJsonTemplate = jsonTemplate;
        if (correctedJsonTemplate) {
            // Replace common incorrect section types with the correct one
            correctedJsonTemplate = correctedJsonTemplate.replace(
                /"type":\s*"[^"]*"/g,
                `"type": "${sectionType}"`
            );
        }

        return NextResponse.json({
            success: true,
            liquidContent,
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
