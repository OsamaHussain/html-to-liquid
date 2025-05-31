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
        } const prompt = `You are an expert Shopify Liquid template developer. Convert the following HTML to a complete Shopify Liquid section file following these STRICT requirements:

REQUIREMENTS:
1. **Single File Structure**: Keep everything as one single .liquid file (no includes)
2. **Preserve Original HTML**: Keep ALL original HTML structure, Tailwind classes, IDs, and data attributes EXACTLY as they are - NO RENAMING
3. **Dynamic Content**: Replace ALL hardcoded text, links, and images with Liquid variables from settings
4. **Schema Block**: End with complete {% schema %} block including presets section for Shopify editor
5. **Organized Comments**: Use {% comment %} tags to organize and label sections
6. **Responsive**: Ensure full responsiveness (desktop, tablet, mobile)
7. **Settings Types**: Use proper setting types: text, richtext, image_picker, url, color, select, range
8. **Blocks for Repeatable**: Use blocks for repeatable items (FAQs, cards, testimonials) with logical limits
9. **No Empty Fields**: Handle empty/null field values gracefully
10. **Future-Ready**: Structure code to allow metafields integration later

CONVERSION RULES:
- Every text string → settings.text_field_name
- Every image → settings.image_field_name | image_url
- Every link → settings.link_field_name
- Every color → settings.color_field_name
- Repeatable items → {% for block in section.blocks %}
- Group related settings logically
- Add default values for all settings
- Include spacing/layout controls via select or range

BLOCK NAMING CONVENTIONS:
- FAQ items → "faq_item" type
- Features/Services → "feature" type  
- Testimonials → "testimonial" type
- Contact methods → "contact_method" type
- Generic content → "content_block" type

HTML Content to Convert:
\`\`\`html
${htmlContent}
\`\`\`

Provide ONLY the complete Liquid section code with schema - no explanations or markdown.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert Shopify Liquid template developer. Convert HTML to Liquid templates with proper syntax and best practices."
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
        }

        const jsonPrompt = `Create a Shopify page template JSON file for this liquid section:

LIQUID FILE:
${liquidContent}

REQUIREMENTS:
- Create a complete JSON template file that makes this section editable in Shopify Theme Editor
- Use proper Shopify template structure
- Include the section with appropriate settings
- Make it ready for assignment to pages in Shopify admin

Return ONLY the JSON code - no explanations.`;

        const jsonCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a Shopify theme expert. Create proper JSON template files for Shopify pages."
                },
                {
                    role: "user",
                    content: jsonPrompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.1,
        }); const jsonTemplate = jsonCompletion.choices[0]?.message?.content;

        return NextResponse.json({
            success: true,
            liquidContent,
            jsonTemplate,
            metadata: {
                liquidFileName: fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid',
                jsonFileName: fileName ? `page.${fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json'
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
