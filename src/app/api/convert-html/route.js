import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateShopifyFilename, generateShopifyPaths } from '../../../utils/filenameValidation';
import { processSchemaAndBlocks } from '../../../utils/schemaProcessor';
import { validateAndCorrectSchema } from '../../../utils/schemaFieldTypes';
import { generateZip, addFileComment } from '../../../utils/zipGenerator';

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

    if (!fileName || !fileName.trim()) {
      return NextResponse.json(
        { error: 'Filename is required for conversion. Please provide a section name before proceeding.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    let finalFileName = fileName.trim();
    let filenameCorrected = false;
    let filenameError = null;

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

    if (filenameValidation.sanitized !== finalFileName.replace(/\.html?$/i, '')) {
      finalFileName = filenameValidation.sanitized;
      filenameCorrected = true;
    } else {
      finalFileName = filenameValidation.sanitized;
    }

    const shopifyPaths = generateShopifyPaths(finalFileName);
    const isLargeFile = htmlContent.length > 10000 || htmlContent.split('\n').length > 800;
    const prompt = `Convert the following HTML code to a complete Shopify Liquid template file with the EXACT structure format below. ${isLargeFile ? 'CRITICAL: This is a large HTML file. You MUST convert the ENTIRE HTML content completely. Do not truncate or stop mid-conversion. Ensure the complete liquid template with full schema is returned.' : ''} 

🚨 MANDATORY OUTPUT FORMAT - ALWAYS INCLUDE ALL 4 SECTIONS IN THIS EXACT ORDER: 🚨

1. {% schema %} section with complete JSON schema
2. {% stylesheet %} section with all CSS exactly as in HTML
3. {% javascript %} section with all JavaScript functionality
4. HTML liquid template content with liquid variables

🚨 MANDATORY: MAKE ALL HARDCODED CONTENT EDITABLE - NO HARDCODED TEXT SHOULD REMAIN! 🚨

🚨 FIELD REQUIREMENTS SYSTEM - MARK REQUIRED FIELDS: 🚨
- REQUIRED fields (critical for functionality): Mark with * in label: "label": "Section Title *"
- OPTIONAL fields (have defaults): Regular label: "label": "Description"
- REQUIRED FIELDS include: Section titles, block types, navigation links, form actions, primary headings
- OPTIONAL FIELDS include: Descriptions, alt text, color schemes, advanced settings, decorative elements

STRICT REQUIREMENTS:
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
5. MANDATORY BLOCK CONVERSION: Convert ALL possible content into BLOCKS for maximum flexibility:
   - Navigation links → header_link blocks (COMPLETELY DYNAMIC: admin can add/remove nav items)
   - Feature cards → feature blocks (COMPLETELY DYNAMIC: admin can add/remove features)
   - Product cards → product blocks with review (COMPLETELY DYNAMIC: admin can add/remove products with reviews, ratings, and multiple review comments)
   - Product reviews → product_review blocks (COMPLETELY DYNAMIC: admin can add/remove individual product reviews)
   - Product ratings → dynamic rating systems within product blocks (COMPLETELY DYNAMIC: editable star ratings and review scores)
   - Testimonials → testimonial blocks (COMPLETELY DYNAMIC: admin can add/remove testimonials)
   - Team members → team_member blocks (COMPLETELY DYNAMIC: admin can add/remove team members)
   - Services → service blocks (COMPLETELY DYNAMIC: admin can add/remove services)
   - Social media links → social_link blocks (COMPLETELY DYNAMIC: admin can add/remove social links)
   - Footer columns → footer_column blocks (COMPLETELY DYNAMIC: admin can add/remove footer columns)
   - Footer links within columns → footer_link blocks (COMPLETELY DYNAMIC: admin can add/remove footer links)
   - Footer Bottom links → footer_link blocks (COMPLETELY DYNAMIC: admin can add/remove footer links)
   - FAQ items → faq blocks (COMPLETELY DYNAMIC: admin can add/remove FAQ items)
   - Gallery images → gallery blocks (COMPLETELY DYNAMIC: admin can add/remove gallery items)
   - Statistics → stat blocks (COMPLETELY DYNAMIC: admin can add/remove statistics)
   - Process steps → step blocks (COMPLETELY DYNAMIC: admin can add/remove process steps)
   - Benefits → benefit blocks (COMPLETELY DYNAMIC: admin can add/remove benefits)
   - Reviews → review blocks (COMPLETELY DYNAMIC: admin can add/remove reviews)
   - Awards → award blocks (COMPLETELY DYNAMIC: admin can add/remove awards)
   - Partners → partner blocks (COMPLETELY DYNAMIC: admin can add/remove partners)
   - Contact info → contact_info blocks (COMPLETELY DYNAMIC: admin can add/remove contact info)
   - Address info → address blocks (COMPLETELY DYNAMIC: admin can add/remove addresses)
   - Hero sections → hero blocks (COMPLETELY DYNAMIC: admin can add/remove hero sections)
   - About sections → about blocks (COMPLETELY DYNAMIC: admin can add/remove about sections)
   - CTA buttons → cta_button blocks (COMPLETELY DYNAMIC: admin can add/remove CTA buttons)
   - Image with text → image_text blocks (COMPLETELY DYNAMIC: admin can add/remove image-text combinations)
   - Video sections → video blocks (COMPLETELY DYNAMIC: admin can add/remove videos)
   - Newsletter signup → newsletter blocks (COMPLETELY DYNAMIC: admin can add/remove newsletter forms)
   - Social proof → social_proof blocks (COMPLETELY DYNAMIC: admin can add/remove social proof elements)
   - Pricing tables → pricing blocks (COMPLETELY DYNAMIC: admin can add/remove pricing options)
   - ANY repeating or similar content → appropriate block type (COMPLETELY DYNAMIC: everything editable)
6. PRESERVE HTML STRUCTURE: Keep exact HTML structure, classes, and attributes
7. COMPREHENSIVE SCHEMA REQUIREMENTS:
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
8. NO GENERIC PLACEHOLDERS: Use real content from HTML in schema defaults
9. CRITICAL SHOPIFY RULE: Never add "default" attribute to "image_picker" settings
12. COMPLETE CONVERSION: Convert ALL sections including headers, navigation, hero, content, testimonials, products, forms, footer - EVERYTHING!
13. CREATE COMPREHENSIVE BLOCKS: Include blocks for EVERYTHING to make it FULLY DYNAMIC:
    - Products (DYNAMIC: add/remove product cards)
    - Testimonials (DYNAMIC: add/remove customer testimonials)  
    - Education guides (DYNAMIC: add/remove educational content)
    - Sustainability slides (DYNAMIC: add/remove sustainability content)
    - Transformation slides (DYNAMIC: add/remove before/after content)
    - Team members (DYNAMIC: add/remove team member profiles)
    - Features (DYNAMIC: add/remove feature highlights)
    - Services (DYNAMIC: add/remove service offerings)
    - Hero sections (DYNAMIC: add/remove hero banners)
    - About sections (DYNAMIC: add/remove about content)
    - Contact forms (DYNAMIC: add/remove contact forms)
    - Social media (DYNAMIC: add/remove social links)
    - Navigation menu (DYNAMIC: add/remove menu items)
    - Footer sections (DYNAMIC: add/remove footer content)
    - Gallery items (DYNAMIC: add/remove images/videos)
    - FAQ sections (DYNAMIC: add/remove FAQ items)
    - Pricing tables (DYNAMIC: add/remove pricing options)
    - CTA buttons (DYNAMIC: add/remove call-to-action buttons)
    - Newsletter signup (DYNAMIC: add/remove newsletter forms)
    - Blog posts (DYNAMIC: add/remove blog content)
    - Awards/certifications (DYNAMIC: add/remove awards)
    - Partner logos (DYNAMIC: add/remove partner information)
    - Statistics/counters (DYNAMIC: add/remove stat counters)
    - Process steps (DYNAMIC: add/remove workflow steps)
    - Benefits/advantages (DYNAMIC: add/remove benefit points)
    - Reviews/ratings (DYNAMIC: add/remove customer reviews)
    - 🚨 CRITICAL: EVERYTHING should be blocks for maximum admin flexibility!
14. 🚨 CRITICAL SCHEMA STRUCTURE REQUIREMENTS 🚨:
    - MANDATORY PRESETS SECTION: Every schema MUST include a valid "presets" section:
      "presets": [{
        "name": "Default",
        "blocks": []
      }]
    - SECTION TYPE CONSISTENCY: The schema section type MUST exactly match the filename
    - If filename is "maertin-home-page.liquid", then schema should be: "type": "maertin-home-page"
    - NO EXTRA-LONG NAMES: Keep section types concise and matching Shopify naming rules
    - REQUIRED FIELD INDICATORS: Mark required fields with * in labels: "label": "Section Title *"
    - OPTIONAL FIELD INDICATORS: Regular labels for optional fields: "label": "Description"
12. MANDATORY ANCHOR TAG CONVERSION: Every single <a> tag MUST become editable:
    - Header/Navigation links: Use BLOCKS for dynamic header links (can add/remove from admin)
    - Footer links: <a href="{{ section.settings.footer_link_1_url }}">{{ section.settings.footer_link_1_text }}</a>
    - Multiple footer links: footer_link_2_url, footer_link_2_text, footer_link_3_url, footer_link_3_text, etc.
    - Button links: <a href="{{ section.settings.button_url }}">{{ section.settings.button_text }}</a>
    - Block links: <a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>
    - Social links: <a href="{{ section.settings.social_link_1_url }}">{{ section.settings.social_link_1_text }}</a>
    - Multiple social links: social_link_2_url, social_link_2_text, social_link_3_url, social_link_3_text, etc.
    - ALL other anchor tags: Create unique numbered settings for EACH anchor tag
13. DYNAMIC HEADER NAVIGATION HANDLING: For header/navigation anchor tags:
    - Convert header anchor tags to BLOCKS using {% for block in section.blocks %}
    - Create "header_link" block type for each navigation link
    - Each header link becomes a separate block with link_url and link_text settings
    - This allows admin to add/remove header links dynamically
    - Header navigation example: {% for block in section.blocks %}{% if block.type == 'header_link' %}<a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>{% endif %}{% endfor %}

14. 🚨 CRITICAL MULTI-COLUMN FOOTER HANDLING 🚨:
    - PRESERVE EXACT FOOTER LAYOUT: Keep all CSS classes, grid structures, flexbox layouts, and responsive design EXACTLY as in HTML
    - CONVERT FOOTER COLUMNS TO BLOCKS: Each footer column becomes a "footer_column" block
    - FOOTER COLUMN STRUCTURE: Each footer column block should contain:
      * Column title/heading as editable text setting
      * Multiple footer links as sub-blocks or array of links
      * Preserve exact CSS classes and structure for each column    - FOOTER LIQUID STRUCTURE EXAMPLE:
      {% for block in section.blocks %}
        {% if block.type == 'footer_column' %}
          <div class="original-footer-column-classes">
            <h4>{{ block.settings.column_title }}</h4>
            <ul class="original-footer-links-classes">
              {% if block.settings.link_1_url != blank %}<li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>{% endif %}
              {% if block.settings.link_2_url != blank %}<li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>{% endif %}
              {% if block.settings.link_3_url != blank %}<li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>{% endif %}
              {% if block.settings.link_4_url != blank %}<li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>{% endif %}
            </ul>
          </div>
        {% endif %}
      {% endfor %}
    - FOOTER SCHEMA EXAMPLE:
      {
        "type": "footer_column",
        "name": "Footer Column",
        "settings": [
          {
            "type": "text",
            "id": "column_title",
            "label": "Column Title",
            "default": "Actual_Column_Title_From_HTML"
          },
          {
            "type": "url",
            "id": "link_1_url",
            "label": "Link 1 URL",
            "default": "/"
          },
          {
            "type": "text",
            "id": "link_1_text",
            "label": "Link 1 Text",
            "default": "Actual_Link_Text"
          },
          {
            "type": "url",
            "id": "link_2_url",
            "label": "Link 2 URL",
            "default": "/"
          },
          {
            "type": "text",
            "id": "link_2_text",
            "label": "Link 2 Text",
            "default": "Actual_Link_Text"
          },
          {
            "type": "url",
            "id": "link_3_url",
            "label": "Link 3 URL",
            "default": "/"
          },
          {
            "type": "text",
            "id": "link_3_text",
            "label": "Link 3 Text",
            "default": "Actual_Link_Text"
          },
          {
            "type": "url",
            "id": "link_4_url",
            "label": "Link 4 URL",
            "default": "/"
          },
          {
            "type": "text",
            "id": "link_4_text",
            "label": "Link 4 Text",
            "default": "Actual_Link_Text"
          }
        ]
      }    
    - EXTRACT REAL FOOTER DATA: Extract actual column titles and links from HTML footer structure
    - MAINTAIN RESPONSIVE DESIGN: Keep all responsive CSS classes and media queries for footer columns

15. 🚨 CRITICAL FOOTER BOTTOM BAR HANDLING 🚨:
    - MAKE FOOTER BOTTOM BAR FULLY EDITABLE: Convert all footer bottom content to editable settings
    - FOOTER BOTTOM ELEMENTS TO CONVERT:
      * Copyright text → {{ section.settings.copyright_text }}
      * Company name → {{ section.settings.company_name }}
      * Year → {{ section.settings.copyright_year }}
      * Privacy policy link → {{ section.settings.privacy_url }} and {{ section.settings.privacy_text }}
      * Terms of service link → {{ section.settings.terms_url }} and {{ section.settings.terms_text }}
      * Social media links → {{ section.settings.social_1_url }}, {{ section.settings.social_1_text }}, etc.
      * Contact info → {{ section.settings.footer_phone }}, {{ section.settings.footer_email }}
      * Payment icons/text → {{ section.settings.payment_text }}
      * All other bottom bar text → appropriate numbered settings
    - FOOTER BOTTOM LIQUID STRUCTURE EXAMPLE:
      <div class="footer-bottom original-classes">
        <p>&copy; {{ section.settings.copyright_year }} {{ section.settings.company_name }}. {{ section.settings.copyright_text }}</p>
        <div class="footer-bottom-links">
          {% if section.settings.privacy_url != blank %}<a href="{{ section.settings.privacy_url }}">{{ section.settings.privacy_text }}</a>{% endif %}
          {% if section.settings.terms_url != blank %}<a href="{{ section.settings.terms_url }}">{{ section.settings.terms_text }}</a>{% endif %}
        </div>
        {% if section.settings.footer_email != blank %}<p>{{ section.settings.footer_email }}</p>{% endif %}
      </div>
    - FOOTER BOTTOM SCHEMA SETTINGS:
      * Copyright year: { "type": "text", "id": "copyright_year", "label": "Copyright Year", "default": "2024" }
      * Company name: { "type": "text", "id": "company_name", "label": "Company Name", "default": "Actual_Company_Name" }
      * Copyright text: { "type": "text", "id": "copyright_text", "label": "Copyright Text", "default": "All rights reserved" }
      * Privacy policy: { "type": "url", "id": "privacy_url", "label": "Privacy Policy URL", "default": "/" } and { "type": "text", "id": "privacy_text", "label": "Privacy Policy Text", "default": "Privacy Policy" }
      * Terms of service: { "type": "url", "id": "terms_url", "label": "Terms URL", "default": "/" } and { "type": "text", "id": "terms_text", "label": "Terms Text", "default": "Terms of Service" }
      * Contact info: { "type": "email", "id": "footer_email", "label": "Footer Email" } and { "type": "tel", "id": "footer_phone", "label": "Footer Phone" }
    - PRESERVE FOOTER BOTTOM STYLING: Keep all CSS classes and responsive design exactly as in HTML
16. SCHEMA MUST INCLUDE: For every piece of content, create appropriate settings:
    - For anchor tags: { "type": "url", "id": "link_name_url", "label": "Link URL", "default": "/" } and { "type": "text", "id": "link_name_text", "label": "Link Text", "default": "actual_link_text" }
    - For headings: { "type": "text", "id": "heading_1", "label": "Heading Text", "default": "actual_heading_text" }
    - For paragraphs: { "type": "textarea", "id": "description_1", "label": "Description", "default": "actual_paragraph_text" }
    - For images: { "type": "image_picker", "id": "image_1", "label": "Image" }
    - For all other text: { "type": "text", "id": "text_content_1", "label": "Text Content", "default": "actual_text" }

17. TEXT CONTENT ANALYSIS: Scan the HTML and identify EVERY single text element:
    - Count all headings and create separate settings for each
    - Count all paragraphs and create separate settings for each
    - Count all buttons and create separate settings for each
    - Count all links and create separate settings for each
    - Count all labels/spans and create separate settings for each
    - Create numbered settings for multiple similar elements (title_1, title_2, etc.)

CRITICAL: The liquid template should look IDENTICAL to the original HTML when rendered. Do NOT modify any CSS or styling. CONVERT THE ENTIRE HTML - ALL SECTIONS MUST BE INCLUDED. MAKE EVERY SINGLE PIECE OF TEXT CONTENT EDITABLE!

🚨 MANDATORY OUTPUT FORMAT - MUST ALWAYS INCLUDE ALL 4 SECTIONS: 🚨
1. {% schema %} ... {% endschema %} - Complete JSON schema with all settings and blocks
2. {% stylesheet %} ... {% endstylesheet %} - All CSS from HTML exactly as written
3. {% javascript %} ... {% endjavascript %} - All JavaScript functionality 
4. HTML liquid template content with all liquid variables

EXAMPLE OUTPUT STRUCTURE:
{% schema %}
{
  "name": "Template Name",
  "settings": [...],
  "blocks": [...],
  "presets": [...]
}
{% endschema %}

{% stylesheet %}
/* All CSS from HTML goes here exactly as written */
{% endstylesheet %}

{% javascript %}
// All JavaScript functionality goes here
{% endjavascript %}

<!-- HTML liquid template content with variables -->
<div>{{ section.settings.title }}</div>

HTML to convert:
\`\`\`html
${htmlContent}
\`\`\`

Return ONLY the liquid template with complete schema section. Include ALL CSS exactly as written in HTML. MUST include all sections from HTML.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a Shopify Liquid expert specializing in converting HTML to FULLY EDITABLE Liquid templates with CONSISTENT OUTPUT FORMAT. 🚨 CRITICAL MISSION: Always output the complete Liquid template in this EXACT 4-section structure: 1) {% schema %} section, 2) {% stylesheet %} section, 3) {% javascript %} section, 4) HTML liquid content. Make EVERY single piece of hardcoded content editable through Liquid variables and schema settings. NO hardcoded text should remain in the final template - everything must be dynamic and editable from the Shopify admin. Convert HTML to Liquid templates while preserving ALL original styling and CSS. Extract EVERY piece of real content from HTML and make it editable through schema settings. Create blocks for repeating elements. The converted template must look identical to the original HTML when rendered. NEVER use generic placeholders - always use actual content from the HTML as default values in schema. CRITICAL: image_picker fields in schema must NEVER have default values - this is invalid in Shopify. IMPORTANT: You must convert the ENTIRE HTML content - do not truncate or cut off any sections. Complete the full conversion including all sections, testimonials, and footer content. MANDATORY: Make ALL text content editable - headings, paragraphs, buttons, links, labels, spans, form placeholders, alt text, phone numbers, emails, addresses, company names, testimonials, statistics, prices - EVERYTHING must be converted to Liquid variables with corresponding schema settings. ANCHOR TAGS: Make ALL anchor tags editable - convert both href and text content to Liquid variables with corresponding schema settings. For URL-type settings in schema, always use 'default': '/' as the default value. CRITICAL: You must ensure the COMPLETE conversion of large HTML files. Do not stop mid-conversion. Return the full liquid template with complete schema where EVERY piece of content is editable. ALWAYS OUTPUT IN THIS EXACT FORMAT: {% schema %} section first, then {% stylesheet %} section, then {% javascript %} section, then HTML liquid template content."
      },
      {
        role: "user",
        content: prompt
      }],
      max_tokens: 16384,
      temperature: 0.01,
      seed: 12345,
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
          content: "You are a Shopify Liquid expert specializing in converting large HTML files to FULLY EDITABLE Liquid templates with CONSISTENT 4-SECTION FORMAT. 🚨 CRITICAL MISSION: Always output in this EXACT structure: 1) {% schema %} section, 2) {% stylesheet %} section, 3) {% javascript %} section, 4) HTML liquid content. Make EVERY single piece of hardcoded text/content editable through Liquid variables. NO hardcoded content should remain. CRITICAL: You must return the COMPLETE liquid template including all 4 sections. Never truncate or stop mid-conversion. Ensure the response includes schema, stylesheet, javascript, and HTML sections. Make ALL text content dynamic and editable from Shopify admin."
        },
        {
          role: "user",
          content: `URGENT: Complete the full conversion of this large HTML file to Shopify Liquid with CONSISTENT 4-SECTION FORMAT. You must include ALL 4 sections in this exact order:
1. {% schema %} ... {% endschema %}
2. {% stylesheet %} ... {% endstylesheet %}  
3. {% javascript %} ... {% endjavascript %}
4. HTML liquid template content

🚨 CRITICAL REQUIREMENT: Make EVERY single piece of hardcoded content EDITABLE through Liquid variables and schema settings. NO hardcoded text should remain in the template! 🚨

HTML Content:
\`\`\`html
${htmlContent}
\`\`\`

MANDATORY Requirements:
1. Convert ENTIRE HTML - all sections must be included
2. OUTPUT FORMAT: Schema section, then stylesheet section, then javascript section, then HTML liquid content
3. Complete schema with {% endschema %} at the end  
4. Complete stylesheet with {% endstylesheet %} at the end
5. Complete javascript with {% endjavascript %} at the end
6. Preserve all CSS and styling exactly
7. Make ALL text content editable: headings, paragraphs, buttons, links, labels, spans, form text, alt text, phone numbers, emails, addresses, company names, testimonials, statistics, prices - EVERYTHING!
8. Make all anchor tags editable with Liquid variables (both href and text)
9. Extract real content for schema default values
10. Include blocks for repeating elements
11. Create numbered settings for multiple similar elements (title_1, title_2, etc.)
12. Use appropriate field types: "text" for short text, "textarea" for long text, "image_picker" for images, "url" for links, "email" for emails, "tel" for phones
13. NO hardcoded content should remain - make everything dynamic and editable from Shopify admin`
        }
        ],
        max_tokens: 16384,
        temperature: 0.01,
        seed: 12345,
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

    const hasSchema = cleanedLiquidContent.includes('{% schema %}') && cleanedLiquidContent.includes('{% endschema %}');
    const hasStylesheet = cleanedLiquidContent.includes('{% stylesheet %}') && cleanedLiquidContent.includes('{% endstylesheet %}');
    const hasJavascript = cleanedLiquidContent.includes('{% javascript %}') && cleanedLiquidContent.includes('{% endjavascript %}');

    if (!hasSchema || !hasStylesheet || !hasJavascript) {
      console.warn('Missing required sections in liquid conversion:', {
        hasSchema,
        hasStylesheet,
        hasJavascript
      });
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

    const liquidFileName = fileName.replace(/\.html?$/i, '').trim() + '.liquid';
    const sectionType = liquidFileName.replace('.liquid', '');
    const htmlSections = htmlContent.match(/<(section|div|header|nav|main|footer|article)[^>]*>/gi) || [];
    const htmlSectionCount = htmlSections.length;

    const hasHeader = htmlContent.toLowerCase().includes('<header') || htmlContent.toLowerCase().includes('<nav');
    const hasFooter = htmlContent.toLowerCase().includes('<footer');
    const hasTestimonials = htmlContent.toLowerCase().includes('testimonial') || htmlContent.toLowerCase().includes('review');
    const hasProducts = htmlContent.toLowerCase().includes('product') || htmlContent.toLowerCase().includes('shop');
    const hasTeam = htmlContent.toLowerCase().includes('team') || htmlContent.toLowerCase().includes('member');
    const hasGallery = htmlContent.toLowerCase().includes('gallery') || htmlContent.toLowerCase().includes('portfolio');
    const hasContact = htmlContent.toLowerCase().includes('contact') || htmlContent.toLowerCase().includes('form');

    const structureAnalysis = {
      hasHeader,
      hasFooter,
      hasTestimonials,
      hasProducts,
      hasTeam,
      hasGallery,
      hasContact,
      sectionCount: htmlSectionCount
    };

    const jsonPrompt = `Create a comprehensive Shopify page template JSON that captures ALL HTML sections and includes EVERY piece of dynamic content.

🚨 HTML STRUCTURE ANALYSIS: 🚨
- Total sections detected: ${htmlSectionCount}
- Has header/navigation: ${hasHeader}
- Has footer: ${hasFooter}
- Has testimonials/reviews: ${hasTestimonials}
- Has products/shop elements: ${hasProducts}
- Has team/member sections: ${hasTeam}
- Has gallery/portfolio: ${hasGallery}
- Has contact/form sections: ${hasContact}

🚨 CRITICAL REQUIREMENTS - MISSING SECTIONS WILL CAUSE FAILURES: 🚨
1. The JSON must include ALL sections found in HTML (detected ${htmlSectionCount} major sections)
2. MANDATORY: Scan the ENTIRE Liquid schema and create JSON settings for EVERY SINGLE setting
3. NO SECTION SHOULD BE MISSING - include header, navigation, hero, features, testimonials, products, services, team, gallery, contact, footer, etc.
4. JSON template must use ONLY block types defined in the Liquid schema
5. Extract REAL content from HTML for ALL settings - no generic placeholders

🚨 SECTION COMPLETENESS CHECK: 🚨
- SCAN HTML FOR: headers, navigation, hero sections, about sections, features, services, products, testimonials, team members, gallery, contact forms, footer columns, footer bottom
- CREATE JSON BLOCKS FOR: Every repeating element found in HTML
- INCLUDE SETTINGS FOR: Every text element, link, image, and form field in HTML

Original HTML Content (${htmlContent.length} characters, ${htmlContent.split('\n').length} lines):
\`\`\`html
${htmlContent}
\`\`\`

Converted Liquid Template (WITH COMPLETE SCHEMA):
\`\`\`liquid
${cleanedLiquidContent}
\`\`\`

🚨 COMPREHENSIVE MAPPING REQUIREMENTS: 🚨
1. Section type must be "${sectionType}"
2. Block types in JSON must EXACTLY match block types in the Liquid schema
3. Every block setting in JSON must match the schema definition
4. Extract REAL content from HTML for ALL default values
5. NO default values for image_picker fields
6. 🚨 MANDATORY SCHEMA COMPLETENESS: 🚨
   - Parse the ENTIRE Liquid schema section by section
   - Count ALL settings in schema (both section settings and block settings)
   - Create JSON entry for EVERY SINGLE setting found in schema
   - If schema defines 45 settings, JSON must contain all 45 settings
   - NO SETTING SHOULD BE OMITTED - this causes missing sections
7. 🚨 HTML SECTION ANALYSIS: 🚨
   - Systematically scan HTML for ALL major sections
   - Header/Navigation: Extract all nav links and create header_link blocks
   - Hero Section: Extract title, subtitle, description, button text and URLs
   - Features/Services: Create blocks for each feature/service item
   - Products: Create blocks for each product card or listing
   - Testimonials: Create blocks for each testimonial
   - Team Members: Create blocks for each team member
   - Gallery: Create blocks for each gallery item
   - Contact Section: Extract all form fields and contact info
   - Footer Columns: Create blocks for each footer column with all links
   - Footer Bottom: Extract copyright, terms, privacy, social links
8. 🚨 CRITICAL CONTENT MAPPING: 🚨
   - ALL heading text → corresponding JSON settings with real HTML content
   - ALL paragraph text → corresponding JSON settings with real HTML content
   - ALL button text and URLs → corresponding JSON settings with real HTML content
   - ALL anchor tag text and URLs → corresponding JSON settings with real HTML content
   - ALL form labels and placeholders → corresponding JSON settings with real HTML content
   - ALL contact information → corresponding JSON settings with real HTML content
9. CRITICAL: Include ALL button settings (button_text, button_1_text, etc.)
10. CRITICAL: Include ALL link settings (both URL and text for every anchor tag)
11. CRITICAL: Include ALL label/span settings (label_1, label_2, etc.)
12. CRITICAL: Include ALL form settings (placeholder_text, etc.)
13. CRITICAL: Include ALL contact info settings (phone, email, address, etc.)

🚨 STEP-BY-STEP ANALYSIS REQUIRED: 🚨
STEP 1: SCHEMA ANALYSIS
- Parse the {% schema %} section completely
- Count ALL settings in schema (section + block settings)
- List ALL block types defined in schema
- Note every setting ID and type

STEP 2: HTML CONTENT ANALYSIS  
- Scan HTML systematically section by section
- Identify ALL major sections: header, nav, hero, about, features, services, products, testimonials, team, gallery, contact, footer
- Count repeating elements in each section
- Extract actual text content from HTML as default values for EACH setting

STEP 3: COMPREHENSIVE MAPPING
- Create JSON setting for EVERY schema setting
- Create JSON block for EVERY repeating HTML element
- Use actual HTML content as default values
- Ensure block types match schema exactly

STEP 4: VALIDATION
- Verify ALL schema settings are included in JSON
- Verify ALL HTML sections are represented
- Verify block types match schema definitions
- Ensure no content is missing or skipped

🚨 MANDATORY ANALYSIS CHECKLIST: 🚨
□ Header/Navigation: Count nav links → create header_link blocks (DYNAMIC: admin can add/remove nav items)
□ Hero Section: Extract title, subtitle, description, button → create hero blocks (DYNAMIC: admin can add/remove hero sections)
□ About Section: Extract headings, paragraphs, images → create about blocks (DYNAMIC: admin can add/remove about content)
□ Features: Count feature items → create feature blocks (DYNAMIC: admin can add/remove features)
□ Services: Count service items → create service blocks (DYNAMIC: admin can add/remove services)
□ Products: Count product cards → create product blocks (DYNAMIC: admin can add/remove products)
□ Testimonials: Count testimonials → create testimonial blocks (DYNAMIC: admin can add/remove testimonials)
□ Team: Count team members → create team_member blocks (DYNAMIC: admin can add/remove team members)
□ Gallery: Count images/items → create gallery blocks (DYNAMIC: admin can add/remove gallery items)
□ Contact: Extract form fields and contact info → create contact_form blocks (DYNAMIC: admin can add/remove contact forms)
□ Footer Columns: Count columns → create footer_column blocks (DYNAMIC: admin can add/remove footer columns)
□ Footer Bottom: Extract copyright, terms, privacy, social links → create footer_bottom blocks (DYNAMIC: admin can add/remove footer bottom elements)
□ FAQ Items: Count FAQ items → create faq blocks (DYNAMIC: admin can add/remove FAQ items)
□ Statistics: Count statistics → create stat blocks (DYNAMIC: admin can add/remove statistics)
□ Benefits: Count benefits → create benefit blocks (DYNAMIC: admin can add/remove benefits)
□ Process Steps: Count steps → create step blocks (DYNAMIC: admin can add/remove process steps)
□ Awards: Count awards → create award blocks (DYNAMIC: admin can add/remove awards)
□ Partners: Count partners → create partner blocks (DYNAMIC: admin can add/remove partners)
□ Reviews: Count reviews → create review blocks (DYNAMIC: admin can add/remove reviews)
□ CTA Buttons: Count CTA buttons → create cta_button blocks (DYNAMIC: admin can add/remove CTA buttons)
□ Newsletter: Count newsletter forms → create newsletter blocks (DYNAMIC: admin can add/remove newsletter forms)
□ Videos: Count video sections → create video blocks (DYNAMIC: admin can add/remove videos)
□ Social Links: Count social media links → create social_link blocks (DYNAMIC: admin can add/remove social links)
□ Pricing: Count pricing tables → create pricing blocks (DYNAMIC: admin can add/remove pricing options)

COMPLETE CONTENT ANALYSIS - MANDATORY STEP:
1. Scan the Liquid schema for ALL settings (not just anchor tags)
2. For EVERY setting in the schema, create corresponding JSON setting
3. Extract actual text content from HTML for each setting
4. Count ALL text elements and ensure each has a JSON setting:
   - All headings: title, subtitle, heading_1, heading_2, heading_3, etc.
   - All paragraphs: description, text_1, text_2, text_3, etc.
   - All buttons: button_text, button_1_text, button_2_text, etc.
   - All labels: label_1, label_2, label_3, etc.
   - All form elements: placeholder_text, input_label, etc.   - All contact info: phone, email, address, company_name, etc.
   - All statistics/numbers: stat_1, stat_2, price_text, etc.
   - All testimonials: testimonial_text, author_name, etc.
   - All footer bottom content: copyright_text, company_name, privacy_text, terms_text, etc.

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

🚨 CRITICAL BLOCK REQUIREMENT: MAXIMIZE BLOCK USAGE IN JSON 🚨
- Convert EVERY possible content element to BLOCKS in the JSON template for MAXIMUM ADMIN FLEXIBILITY
- Even single elements should be blocks if they might be repeated or customized
- 🚨 EVERYTHING MUST BE DYNAMIC AND ADDABLE/REMOVABLE BY ADMIN 🚨
- Create blocks for ALL content types:
  * Navigation links → header_link blocks (admin can add/remove nav items)
  * Footer links → footer_link blocks (admin can add/remove footer links)
  * Features → feature blocks (admin can add/remove features)
  * Services → service blocks (admin can add/remove services)
  * Testimonials → testimonial blocks (admin can add/remove testimonials)
  * Team members → team_member blocks (admin can add/remove team members)
  * Products → product blocks (admin can add/remove products)
  * Gallery images → gallery blocks (admin can add/remove gallery items)
  * Social links → social_link blocks (admin can add/remove social links)
  * Contact info → contact_info blocks (admin can add/remove contact details)
  * Statistics → stat blocks (admin can add/remove statistics)
  * Benefits → benefit blocks (admin can add/remove benefits)
  * FAQ items → faq blocks (admin can add/remove FAQ items)
  * Reviews → review blocks (admin can add/remove reviews)
  * Awards → award blocks (admin can add/remove awards)
  * Partners → partner blocks (admin can add/remove partners)
  * Process steps → step blocks (admin can add/remove process steps)
  * Hero sections → hero blocks (admin can add/remove hero banners)
  * About sections → about blocks (admin can add/remove about content)
  * CTA buttons → cta_button blocks (admin can add/remove call-to-action buttons)
  * Newsletter forms → newsletter blocks (admin can add/remove newsletter signups)
  * Video sections → video blocks (admin can add/remove videos)
  * Image with text → image_text blocks (admin can add/remove image-text combinations)
  * Pricing tables → pricing blocks (admin can add/remove pricing options)
  * Blog posts → blog_post blocks (admin can add/remove blog content)
  * Address information → address blocks (admin can add/remove addresses)
  * Social proof → social_proof blocks (admin can add/remove social proof elements)
- PREFER BLOCKS OVER SECTION SETTINGS whenever possible for maximum flexibility
- Each block should contain ALL its related content (title, description, image, link, etc.)
- This allows admins to add/remove/reorder elements dynamically without code changes
- 🚨 ADMIN EMPOWERMENT: Every piece of content should be manageable from Shopify admin

🚨 FOOTER MULTI-COLUMN LAYOUT PRESERVATION 🚨
- CRITICAL: Maintain exact footer column structure and CSS classes from HTML
- Each footer column must preserve its original CSS grid/flexbox classes
- Footer responsive design must remain identical to HTML version
- Extract actual footer content (column titles and links) from HTML
- Use "footer_column" block type for maximum flexibility and exact UI preservation

JSON STRUCTURE:
{
  "sections": {
    "main": {
      "type": "custom-home",
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
            "link_url": "/collections/all",
            "link_text": "Shop"
          }
        },
        "product-block-1": {
          "type": "product_card",
          "settings": {
            "product_title": "Smartwatch Nova",
            "product_price": "$199",
            "product_image_url": "shopify://product-image-1"
          }
        },
        "product-block-2": {
          "type": "product_card",
          "settings": {
            "product_title": "Smartwatch Nova",
            "product_price": "$199",
            "product_image_url": "shopify://product-image-2"
          }
        },
        "testimonial-1": {
          "type": "testimonial",
          "settings": {
            "quote": "Nova made my work faster!",
            "author": "Fatima"
          }
        },
        "testimonial-2": {
          "type": "testimonial",
          "settings": {
            "quote": "AI-powered and user-friendly.",
            "author": "Ali"
          }
        },
        "guide-1": {
          "type": "feature",
          "settings": {
            "title": "Voice Activation",
            "description": "Speak to command the assistant."
          }
        },
        "guide-2": {
          "type": "feature",
          "settings": {
            "title": "Voice Activation",
            "description": "Speak to command the assistant."
          }
        },          
        "footer-column-shop": {
          "type": "footer_column",
          "settings": {
            "column_title": "Shop",
            "link_1_url": "/collections/all",
            "link_1_text": "All Products",
            "link_2_url": "/collections/treatments",
            "link_2_text": "Treatments",
            "link_3_url": "/collections/styling",
            "link_3_text": "Styling",
            "link_4_url": "/collections/tools",
            "link_4_text": "Tools"
          }
        },
        "footer-column-help": {
          "type": "footer_column",
          "settings": {
            "column_title": "Help",
            "link_1_url": "/pages/contact",
            "link_1_text": "Contact Us",
            "link_2_url": "/pages/faqs",
            "link_2_text": "FAQs",
            "link_3_url": "/pages/shipping-returns",
            "link_3_text": "Shipping & Returns",
            "link_4_url": "/account",
            "link_4_text": "My Account"
          }
        },
        "footer-column-about": {
          "type": "footer_column",
          "settings": {
            "column_title": "About",
            "link_1_url": "/pages/our-story",
            "link_1_text": "Our Story",
            "link_2_url": "/pages/ingredients",
            "link_2_text": "Ingredients",
            "link_3_url": "/blogs/news",
            "link_3_text": "Blog",
            "link_4_url": "",
            "link_4_text": ""
          }
        }
      },
      "block_order": [
        "header-link-1",
        "header-link-2",
        "product-block-1",
        "testimonial-1",
        "testimonial-2",
        "guide-1",
        "footer-column-shop",
        "footer-column-help",
        "footer-column-about"
      ],      
      "settings": {
        "heading": "Welcome to Nova",
        "heading_size": "h1",
        "color_scheme": "scheme-2",
        "padding_top": 36,
        "padding_bottom": 36,
        "margin_top": 0,
        "margin_bottom": 0,
        "button_text": "Explore More",
        "button_url": "/collections/all",
        "copyright_year": "2024",
        "company_name": "Nova Technologies",
        "copyright_text": "All rights reserved.",
        "privacy_url": "/pages/privacy-policy",
        "privacy_text": "Privacy Policy",
        "terms_url": "/pages/terms-of-service",
        "terms_text": "Terms of Service",
        "footer_email": "contact@nova.com",
        "footer_phone": "+1 (555) 123-4567"
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
        role: "system",
        content: `You are a Shopify expert who creates COMPLETE page template JSON files that capture EVERY HTML section and ALL dynamic content with PERFECT SCHEMA SYNCHRONIZATION. 

🚨 CRITICAL ZERO-TOLERANCE RULE: NO SECTIONS OR SETTINGS CAN BE MISSING! 🚨

MANDATORY RESPONSIBILITIES:
1. Section type must be "${sectionType}" 
2. Parse Liquid schema COMPLETELY - extract ALL section settings and ALL block types
3. Create JSON entries for EVERY SINGLE setting defined in the schema
4. Scan HTML systematically for ALL sections: header, nav, hero, about, features, services, products, testimonials, team, gallery, contact, footer
5. Extract REAL content from HTML for ALL settings - never use placeholders
6. Count repeating elements in HTML and create exact number of blocks
7. 🚨 COMPLETENESS VALIDATION: If schema has 50 settings, JSON must have 50 settings 🚨

COMPREHENSIVE SECTION MAPPING:
- Header/Navigation → header_link blocks for each nav item (COMPLETELY DYNAMIC: admin can add/remove nav items)
- Hero Section → hero blocks for title, subtitle, description, button text/URLs (COMPLETELY DYNAMIC: admin can add/remove hero sections)
- Features/Services → feature/service blocks for each item (COMPLETELY DYNAMIC: admin can add/remove features/services)
- Products → product blocks for each product card with review (COMPLETELY DYNAMIC: admin can add/remove products with complete review systems and ratings)
- Testimonials → testimonial blocks for each testimonial (COMPLETELY DYNAMIC: admin can add/remove testimonials)
- Team Members → team_member blocks for each member (COMPLETELY DYNAMIC: admin can add/remove team members)
- Gallery → gallery blocks for each image/item (COMPLETELY DYNAMIC: admin can add/remove gallery items)
- Contact Forms → contact_form blocks for all form fields and contact info (COMPLETELY DYNAMIC: admin can add/remove contact forms)
- Footer Columns → footer_column blocks for each column with all links (COMPLETELY DYNAMIC: admin can add/remove footer columns)
- Footer Bottom → footer_bottom blocks for copyright, terms, privacy, social links (COMPLETELY DYNAMIC: admin can add/remove footer bottom elements)
- About Sections → about blocks for about content (COMPLETELY DYNAMIC: admin can add/remove about sections)
- CTA Buttons → cta_button blocks for call-to-action buttons (COMPLETELY DYNAMIC: admin can add/remove CTA buttons)
- FAQ Items → faq blocks for frequently asked questions (COMPLETELY DYNAMIC: admin can add/remove FAQ items)
- Statistics → stat blocks for counters and statistics (COMPLETELY DYNAMIC: admin can add/remove statistics)
- Benefits → benefit blocks for advantage points (COMPLETELY DYNAMIC: admin can add/remove benefits)
- Process Steps → step blocks for workflow steps (COMPLETELY DYNAMIC: admin can add/remove process steps)
- Awards → award blocks for certifications and awards (COMPLETELY DYNAMIC: admin can add/remove awards)
- Partners → partner blocks for partner logos and info (COMPLETELY DYNAMIC: admin can add/remove partners)
- Reviews → review blocks for customer reviews (COMPLETELY DYNAMIC: admin can add/remove reviews)
- Pricing → pricing blocks for pricing tables (COMPLETELY DYNAMIC: admin can add/remove pricing options)
- Newsletter → newsletter blocks for signup forms (COMPLETELY DYNAMIC: admin can add/remove newsletter forms)
- Video Sections → video blocks for embedded videos (COMPLETELY DYNAMIC: admin can add/remove videos)
- Social Media → social_link blocks for social media links (COMPLETELY DYNAMIC: admin can add/remove social links)

CRITICAL RULES:
- NEVER skip any schema setting - include ALL in JSON
- Extract actual text content from HTML for each setting
- Use empty strings ("") for image fields only
- Convert localhost URLs to relative paths ("/")
- Block types in JSON must EXACTLY match schema block types
- Create blocks for ALL repeating HTML elements
- Include standard Shopify settings: heading_size, color_scheme, padding_top, padding_bottom, margin_top, margin_bottom
13. COMPREHENSIVE CONTENT CAPTURE: You MUST scan the Liquid schema for ALL settings and populate them:
    - Find EVERY setting in the schema (headings, paragraphs, buttons, links, labels, forms, etc.)
    - Extract actual text content from HTML for each setting
    - Include ALL heading settings: title, subtitle, heading_1, heading_2, etc.
    - Include ALL paragraph settings: description, text_1, text_2, etc.
    - Include ALL button settings: button_text, button_1_text, etc.
    - Include ALL form settings: placeholder_text, input_label, etc.    - Include ALL contact settings: phone, email, address, company_name, etc.    
    - Include ALL anchor tag settings: both URL and text for every link
    - Include ALL footer bottom settings: copyright_text, company_name, privacy_url, terms_url, footer_email, etc.
14. MANDATORY ANCHOR TAG HANDLING:
    - Find every setting ending with "_url" and "_text" in the schema
    - Extract actual href values and link text from the original HTML    
    - Create settings for navigation links, footer links, buttons, social links, etc.
    - For header/navigation: Create numbered settings or blocks for each navigation link    
    - Each anchor tag gets corresponding URL and text settings
15. Count ALL text elements in HTML and ensure each has corresponding JSON setting
16. Use actual href values (convert localhost URLs to relative paths like "/")
17. Use actual text content from HTML for all text settings
18. HEADER LINKS: If there are multiple anchor tags in header/nav section, create blocks or numbered settings for each one
19. CRITICAL: You must process the ENTIRE schema and create JSON for ALL settings. Do not truncate or skip any parts for large files.
20. MISSING CONTENT RULE: If a setting exists in schema but no corresponding content found in HTML, use appropriate default values
21. 🚨 BLOCK PRIORITY RULE: EVERYTHING MUST BE BLOCKS FOR MAXIMUM ADMIN FLEXIBILITY 🚨
    - Always prefer creating BLOCKS over section settings when possible
    - This gives maximum flexibility to admins to add, remove, and reorder content elements dynamically
    - EVEN SINGLE ITEMS should be blocks if they can be repeated or customized
    - Admin should be able to manage ALL content from Shopify admin without touching code
    - Examples of EVERYTHING that should be blocks:
      * Single hero section → hero block (admin can add multiple hero sections)
      * Single about section → about block (admin can add multiple about sections)
      * Single contact form → contact_form block (admin can add multiple contact forms)
      * Single newsletter signup → newsletter block (admin can add multiple newsletter forms)
      * Single CTA button → cta_button block (admin can add multiple CTA buttons)
      * Single statistic → stat block (admin can add multiple statistics)
      * Single benefit → benefit block (admin can add multiple benefits)
      * Single feature → feature block (admin can add multiple features)
      * Single service → service block (admin can add multiple services)
      * Single testimonial → testimonial block (admin can add multiple testimonials)
      * Single team member → team_member block (admin can add multiple team members)
      * Single product → product block (admin can add multiple products)
      * Single gallery item → gallery block (admin can add multiple gallery items)
      * Single FAQ → faq block (admin can add multiple FAQ items)
      * Single award → award block (admin can add multiple awards)
      * Single partner → partner block (admin can add multiple partners)
      * Single review → review block (admin can add multiple reviews)
      * Single process step → step block (admin can add multiple process steps)
      * Single pricing option → pricing block (admin can add multiple pricing options)
      * Single video → video block (admin can add multiple videos)
      * Single social link → social_link block (admin can add multiple social links)
    - RESULT: Admin has complete control over ALL content without developer intervention
22. 🚨 IMAGE FIELD RULE: For ALL image-related settings in JSON, always use empty string ("") - never include .jpg, .png, or any file extensions`
      },
      {
        role: "user",
        content: jsonPrompt
      }
      ],
      max_tokens: 16384,
      temperature: 0.01,
      seed: 12345,
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
          } const validBlockTypes = new Set();
          let schemaSettings = [];
          let schemaBlocks = [];

          if (cleanedLiquidContent.includes('{% schema %}')) {
            const schemaMatch = cleanedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);
            if (schemaMatch) {
              try {
                const schema = JSON.parse(schemaMatch[1]);

                if (schema.settings) {
                  schemaSettings = schema.settings.map(s => s.id).filter(Boolean);
                }

                if (schema.blocks) {
                  schemaBlocks = schema.blocks;
                  schema.blocks.forEach(block => {
                    if (block.type) {
                      validBlockTypes.add(block.type);
                    }
                  });
                }

                const jsonSettingsCount = Object.keys(jsonData.sections.main.settings).length;
                const schemaSettingsCount = schemaSettings.length;

                console.log(`Schema validation: Schema has ${schemaSettingsCount} settings, JSON has ${jsonSettingsCount} settings`);

                const missingSettings = schemaSettings.filter(settingId =>
                  !jsonData.sections.main.settings.hasOwnProperty(settingId)
                );

                if (missingSettings.length > 0) {
                  console.warn('Missing settings in JSON:', missingSettings);

                  missingSettings.forEach(settingId => {
                    const schemaSetting = schema.settings.find(s => s.id === settingId);
                    if (schemaSetting) {
                      if (schemaSetting.type === 'text' || schemaSetting.type === 'textarea') {
                        jsonData.sections.main.settings[settingId] = schemaSetting.default || '';
                      } else if (schemaSetting.type === 'url') {
                        jsonData.sections.main.settings[settingId] = schemaSetting.default || '/';
                      } else if (schemaSetting.type === 'image_picker') {
                        jsonData.sections.main.settings[settingId] = '';
                      } else {
                        jsonData.sections.main.settings[settingId] = schemaSetting.default || '';
                      }
                    }
                  });
                }

              } catch (e) {
                console.log('Schema parsing error, using fallback block types');
              }
            }
          }

          if (jsonData.sections.main.blocks) {
            const blockTypes = Object.values(jsonData.sections.main.blocks).map(block => block.type);
            const uniqueBlockTypes = [...new Set(blockTypes)];

            console.log(`Block validation: JSON has ${Object.keys(jsonData.sections.main.blocks).length} blocks of ${uniqueBlockTypes.length} types`);
            console.log('Block types in JSON:', uniqueBlockTypes);
            console.log('Valid block types from schema:', Array.from(validBlockTypes));

            Object.keys(jsonData.sections.main.blocks).forEach(blockKey => {
              const block = jsonData.sections.main.blocks[blockKey];

              const schemaBlock = schemaBlocks.find(sb => sb.type === block.type);
              if (schemaBlock && schemaBlock.settings && block.settings) {
                const schemaBlockSettings = schemaBlock.settings.map(s => s.id).filter(Boolean);
                const missingBlockSettings = schemaBlockSettings.filter(settingId =>
                  !block.settings.hasOwnProperty(settingId)
                );

                if (missingBlockSettings.length > 0) {
                  console.warn(`Missing settings in block ${blockKey}:`, missingBlockSettings);

                  missingBlockSettings.forEach(settingId => {
                    const schemaBlockSetting = schemaBlock.settings.find(s => s.id === settingId);
                    if (schemaBlockSetting) {
                      if (schemaBlockSetting.type === 'text' || schemaBlockSetting.type === 'textarea') {
                        block.settings[settingId] = schemaBlockSetting.default || '';
                      } else if (schemaBlockSetting.type === 'url') {
                        block.settings[settingId] = schemaBlockSetting.default || '/';
                      } else if (schemaBlockSetting.type === 'image_picker') {
                        block.settings[settingId] = '';
                      } else {
                        block.settings[settingId] = schemaBlockSetting.default || '';
                      }
                    }
                  });
                }
              }
            });

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

        if (jsonData.sections && jsonData.sections.main && jsonData.sections.main.presets) {
          delete jsonData.sections.main.presets;
        }
        if (jsonData.presets) {
          delete jsonData.presets;
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

        correctedJsonTemplate = correctedJsonTemplate.replace(
          /,?\s*"presets":\s*\[[^\]]*\]/g,
          ''
        );
      }
    }

    let processingErrors = [];
    let injectedBlocks = [];
    let usedBlockTypes = [];

    try {
      const schemaProcessingResult = processSchemaAndBlocks(
        cleanedLiquidContent,
        correctedJsonTemplate,
        finalFileName
      );

      if (schemaProcessingResult.success) {
        cleanedLiquidContent = schemaProcessingResult.liquidContent;
        correctedJsonTemplate = schemaProcessingResult.jsonContent;
        injectedBlocks = schemaProcessingResult.injectedBlocks || [];
        usedBlockTypes = schemaProcessingResult.usedBlockTypes || [];

        if (schemaProcessingResult.warnings && schemaProcessingResult.warnings.length > 0) {
          processingErrors.push(...schemaProcessingResult.warnings.map(w => `Schema Warning: ${w}`));
        }

        if (schemaProcessingResult.hasExistingSchema) {
          processingErrors.push('Existing schema block detected and updated.');
        }

        if (schemaProcessingResult.schemaCheck && schemaProcessingResult.schemaCheck.warning) {
          processingErrors.push(`Schema Check: ${schemaProcessingResult.schemaCheck.warning}`);
        }

        try {
          let parsedSchema;
          try {
            parsedSchema = JSON.parse(correctedJsonTemplate);
          } catch (parseError) {
            console.error('Schema parsing error during validation:', parseError);
            processingErrors.push('Schema validation skipped due to JSON parsing error');
          }

          if (parsedSchema) {
            const schemaValidation = validateAndCorrectSchema(parsedSchema);

            if (!schemaValidation.valid) {
              correctedJsonTemplate = JSON.stringify(schemaValidation.corrected, null, 2);
              schemaValidation.errors.forEach(error => {
                processingErrors.push(`Schema Validation: ${error}`);
              });
              console.log('Schema validation corrected fields:', schemaValidation.errors);
            } else {
              console.log('Schema validation passed successfully');
            }
          }
        } catch (validationError) {
          console.error('Schema validation error:', validationError);
          processingErrors.push(`Schema validation failed: ${validationError.message}`);
        }

        try {
          let parsedJsonTemplate = JSON.parse(correctedJsonTemplate);

          if (parsedJsonTemplate.sections && parsedJsonTemplate.sections.main && parsedJsonTemplate.sections.main.presets) {
            delete parsedJsonTemplate.sections.main.presets;
            processingErrors.push('Removed presets from JSON template (presets belong only in Liquid schema)');
          }
          if (parsedJsonTemplate.presets) {
            delete parsedJsonTemplate.presets;
            processingErrors.push('Removed presets from JSON template (presets belong only in Liquid schema)');
          }

          correctedJsonTemplate = JSON.stringify(parsedJsonTemplate, null, 2);
        } catch (jsonValidationError) {
          console.error('JSON template validation error:', jsonValidationError);
          processingErrors.push(`JSON template validation failed: ${jsonValidationError.message}`);
        }
      } else {
        processingErrors = schemaProcessingResult.errors || [];

        if (schemaProcessingResult.error) {
          return NextResponse.json(
            {
              error: 'Invalid JSON structure generated',
              details: schemaProcessingResult.error,
              suggestion: 'Please try regenerating the content'
            },
            { status: 422 }
          );
        }
      }
    } catch (schemaError) {
      console.error('Schema processing error:', schemaError);
      processingErrors.push(`Schema processing failed: ${schemaError.message}`);
    }

    const liquidWithComments = addFileComment(
      cleanedLiquidContent,
      'liquid',
      shopifyPaths.liquid
    );

    const jsonWithComments = addFileComment(
      correctedJsonTemplate,
      'json',
      shopifyPaths.json
    );

    let validationInfo = {
      schemaSettingsCount: 0,
      jsonSettingsCount: 0,
      schemaBlockTypes: [],
      jsonBlockCount: 0,
      completenessCheck: 'passed',
      injectedBlocks: injectedBlocks,
      usedBlockTypes: usedBlockTypes,
      processingErrors: processingErrors
    };

    try {
      const parsedJson = JSON.parse(jsonWithComments);
      if (parsedJson.sections && parsedJson.sections.main) {
        validationInfo.jsonSettingsCount = Object.keys(parsedJson.sections.main.settings || {}).length;
        validationInfo.jsonBlockCount = Object.keys(parsedJson.sections.main.blocks || {}).length;
      }

      const schemaMatch = liquidWithComments.match(/{% schema %}([\s\S]*?){% endschema %}/);
      if (schemaMatch) {
        try {
          const schema = JSON.parse(schemaMatch[1]);
          if (schema.settings) {
            validationInfo.schemaSettingsCount = schema.settings.length;
          }
          if (schema.blocks) {
            validationInfo.schemaBlockTypes = schema.blocks.map(b => b.type);
          }

          if (validationInfo.schemaSettingsCount > validationInfo.jsonSettingsCount) {
            validationInfo.completenessCheck = 'missing_settings';
          }
        } catch (e) {
          validationInfo.completenessCheck = 'schema_parse_error';
        }
      }
    } catch (e) {
      validationInfo.completenessCheck = 'json_parse_error';
    }

    return NextResponse.json({
      success: true,
      liquidContent: liquidWithComments,
      jsonTemplate: jsonWithComments,
      validation: validationInfo,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        filenameCorrected: filenameCorrected,
        injectedBlocks: injectedBlocks,
        usedBlockTypes: usedBlockTypes,
        processingErrors: processingErrors
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        isLargeFile: isLargeFile,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length, htmlSectionCount: htmlSectionCount,
        structureAnalysis: structureAnalysis
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