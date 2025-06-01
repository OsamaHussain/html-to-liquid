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
            );        }

        const prompt = `Convert the following HTML code to a proper Shopify Liquid template file. Follow these requirements:

1. Replace static text with Liquid variables where appropriate (e.g., {{ section.settings.title }}, {{ section.settings.description }})
2. Convert images to use Liquid filters (e.g., {{ 'image.jpg' | asset_url }})
3. Add proper Shopify section schema for customizable elements
4. Use Shopify best practices for liquid syntax
5. Make text content editable through section settings
6. Convert any hardcoded colors, fonts, or styles to be customizable
7. Add proper liquid loops for repeatable content if needed
8. Include responsive design considerations
9. Follow Shopify's liquid template structure and naming conventions
10. Only return the liquid template code, no explanations

HTML to convert:
\`\`\`html
${htmlContent}
\`\`\``;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert Shopify Liquid template developer with deep knowledge of Shopify theme development, liquid syntax, and section schemas. Convert HTML to production-ready Liquid templates with proper customization options."
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
            );        }        const jsonPrompt = `Create a proper Shopify page template JSON file for the following converted Liquid template. This JSON file will be used in the templates folder and must follow Shopify's page template structure.

IMPORTANT: The liquid template will be saved as a single section file, so you must use the correct section type name.

Converted Liquid Template:
\`\`\`liquid
${liquidContent}
\`\`\`

Requirements for the JSON template:

1. Must include "sections" object with section references
2. Must include "order" array listing the sections in order  
3. Use ONLY the section type name that matches the liquid file name (without .liquid extension)
4. If the liquid file will be named "converted.liquid", use type "converted"
5. If the liquid file will be named "custom-page.liquid", use type "custom-page"
6. Each section should have settings that correspond to ALL liquid variables used in the template
7. Follow this exact structure:

{
  "sections": {
    "main": {
      "type": "converted",
      "settings": {
        // All settings that match liquid variables from the template
      }
    }
  },
  "order": ["main"]
}

8. Make sure EVERY {{ section.settings.variable_name }} from the liquid template has a corresponding setting
9. Use appropriate setting types: text, textarea, richtext, image_picker, color, font_picker, number, checkbox, select, url, range
10. Include default values for all settings
11. CRITICAL: Only use section type names that will actually exist as liquid files
12. Use "converted" as the section type since that's the default liquid file name

Return only the valid JSON template code with proper structure:`;

        const jsonCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [                {
                    role: "system",
                    content: "You are a Shopify theme expert who creates proper page template JSON files. These JSON files go in the templates folder and define which sections appear on a page and their settings. You must follow the exact Shopify page template JSON structure with 'sections' and 'order' keys."
                },
                {
                    role: "user",
                    content: jsonPrompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.1,
        });        const jsonTemplate = jsonCompletion.choices[0]?.message?.content;

        // Get the liquid file name without extension to ensure section type matches
        const liquidFileName = fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid';
        const sectionType = liquidFileName.replace('.liquid', '');
        
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
