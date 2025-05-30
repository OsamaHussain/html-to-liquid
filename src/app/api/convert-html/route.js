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
            model: "gpt-4-turbo-preview",
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

        const liquidContent = completion.choices[0]?.message?.content;

        if (!liquidContent) {
            return NextResponse.json(
                { error: 'Failed to generate Liquid content' },
                { status: 500 }
            );
        } const metadata = {
            conversion: {
                timestamp: new Date().toISOString(),
                originalFileName: fileName || 'unknown.html',
                liquidFileName: fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid',
                status: 'success',
                apiModel: 'gpt-4-turbo-preview'
            },
            statistics: {
                originalHtmlLength: htmlContent.length,
                liquidContentLength: liquidContent.length,
                compressionRatio: (liquidContent.length / htmlContent.length).toFixed(2)
            },
            features: {
                hasLiquidVariables: liquidContent.includes('{{'),
                hasLiquidTags: liquidContent.includes('{%'),
                hasConditionals: liquidContent.includes('{% if'),
                hasLoops: liquidContent.includes('{% for'),
                hasFilters: liquidContent.includes('|'),
                hasComments: liquidContent.includes('{%- comment'),
                hasSchema: liquidContent.includes('{% schema %}'),
                hasBlocks: liquidContent.includes('section.blocks'),
                hasSettings: liquidContent.includes('section.settings')
            }, shopifyIntegration: {
                sectionFile: {
                    path: `sections/${fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid'}`,
                    description: "Upload this file to your theme's sections folder"
                },
                customTemplate: {
                    filename: fileName ? `page.${fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json',
                    path: 'templates/',
                    content: JSON.stringify({
                        "sections": {
                            "main": {
                                "type": fileName ? fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-') : 'converted',
                                "settings": {}
                            }
                        },
                        "order": ["main"]
                    }, null, 2),
                    description: "Create this JSON template file if you want to assign this section to a specific page"
                }
            },
            recommendations: [
                "Upload the .liquid file to your theme's sections/ folder",
                "Create a custom JSON template if this is for a specific page",
                "Test all settings in Shopify's Theme Editor",
                "Verify responsive behavior across devices",
                "Check that all images and links work with your content",
                "Consider adding more blocks if you need additional content sections",
                "Test with empty/null values to ensure graceful handling"
            ]
        };

        return NextResponse.json({
            success: true,
            liquidContent,
            metadata,
            message: 'HTML successfully converted to Liquid template'
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
