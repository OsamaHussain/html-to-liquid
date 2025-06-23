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
        } const prompt = `Extract link tags from HTML head for Shopify theme.liquid. If you find TailwindCSS link, replace it with: <script defer src="https://cdn.tailwindcss.com"></script>
If there are no relevant link, script, or meta tags in the head section, return empty content.
Return raw HTML only for Shopify theme, no markdown, no code blocks, no formatting, no explanatory text.

${headOnly}`; const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                role: "system",
                content: "Extract relevant link, script, and meta tags for Shopify theme.liquid. Replace TailwindCSS links with script tag. If no relevant tags exist, return nothing. Return raw HTML tags only, no markdown formatting, no explanatory text."
            },
            {
                role: "user",
                content: prompt
            }
            ],
            temperature: 0.1,
            max_tokens: 4000,
        }); const headContent = completion.choices[0]?.message?.content?.trim();

        if (!headContent || headContent.toLowerCase().includes('no relevant') || headContent.toLowerCase().includes('nothing to extract') || headContent.toLowerCase().includes('no head content')) {
            return NextResponse.json({
                headContent: '',
                metadata: {
                    fileName: fileName || 'theme-head-section',
                    extractedAt: new Date().toISOString(),
                    inputLength: htmlContent.length,
                    outputLength: 0,
                    message: 'No relevant head content found'
                }
            });
        }

        return NextResponse.json({
            headContent,
            metadata: {
                fileName: fileName || 'theme-head-section',
                extractedAt: new Date().toISOString(),
                inputLength: htmlContent.length,
                outputLength: headContent.length
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
