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

        const prompt = `You are an expert in converting HTML to Shopify Liquid templates. Convert the following HTML code to a proper Liquid template format.

Requirements:
1. Convert static HTML elements to dynamic Liquid syntax where appropriate
2. Replace hardcoded text with Liquid variables/filters where it makes sense
3. Add Liquid logic for dynamic content (loops, conditionals)
4. Maintain the original structure and styling
5. Use proper Liquid syntax and best practices
6. Add comments explaining the Liquid logic where helpful
7. Ensure the output is a valid Liquid template

HTML Content to Convert:
\`\`\`html
${htmlContent}
\`\`\`

Please provide only the converted Liquid template code without any explanations or markdown formatting.`;

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
        }

        const metadata = {
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
                hasComments: liquidContent.includes('{%- comment')
            },
            recommendations: [
                "Review the converted Liquid template for accuracy",
                "Test the template in your Shopify theme development environment",
                "Customize variables and logic according to your specific needs",
                "Ensure all product data and collection variables are properly configured"
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
