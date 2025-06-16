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
    }    const isLargeFile = htmlContent.length > 8000 || htmlContent.split('\n').length > 400;
    
    const prompt = `You are an expert Shopify Liquid developer. Convert the following HTML code to a PERFECT Shopify Liquid section following the EXACT structure and requirements below. 

${isLargeFile ? '🚨 CRITICAL: This is a large HTML file. You MUST convert the ENTIRE HTML content completely. Do not truncate or stop mid-conversion. Ensure the complete liquid template with full schema is returned.' : ''}

🚨 MANDATORY: FOLLOW CLIENT FEEDBACK REQUIREMENTS EXACTLY 🚨

✅ **PROPER SECTION STRUCTURE**:
- Start: <section id="section-{{ section.id }}" class="[original-classes]">
- End: </section>
- NO DOCTYPE, html, head, body tags - ONLY section content
- ALL content must be inside section wrapper

✅ **RENDER LIQUID BASED ON SETTINGS**:
Convert ALL static content to dynamic Liquid using settings:
Example: <h2>{{ section.settings.hero_heading }}</h2>

✅ **LOOP THROUGH BLOCKS FOR REPEATABLE CONTENT**:
{% for block in section.blocks %}
  {% if block.type == 'testimonial' %}
    <div class="testimonial">
      <p>{{ block.settings.testimonial_text }}</p>
      <strong>{{ block.settings.testimonial_author }}</strong>
    </div>
  {% endif %}
{% endfor %}

✅ **BULLETPROOF IMAGE HANDLING WITH TRIPLE FALLBACK**:
For EVERY image, use this EXACT pattern:
<img src="{% if block.settings.image != blank %}{{ block.settings.image | image_url }}{% elsif block.settings.image_url != blank %}{{ block.settings.image_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Image{% endif %}" alt="{{ block.settings.alt_text | default: 'Default Alt' }}">

For background images:
style="background-image: url('{% if section.settings.bg_image != blank %}{{ section.settings.bg_image | image_url }}{% elsif section.settings.bg_image_url != blank %}{{ section.settings.bg_image_url }}{% else %}https://via.placeholder.com/1920x1080/cccccc/666666?text=Background{% endif %}')"

✅ **EXTRACT ALL IMAGE URLS AND MAKE EDITABLE**:
- Find ALL img src URLs and background-image URLs from HTML
- Create image_picker + fallback text field for EACH image
- Extract actual URLs and use as defaults in schema

✅ **PROPER CSS SCOPING TO PREVENT CONFLICTS**:
Wrap ALL CSS with scoped selectors:
<style>
#section-{{ section.id }} .original-class { 
  /* All original styles here */ 
}
#section-{{ section.id }} body,
#section-{{ section.id }} html { 
  /* Scope even body/html styles */ 
}
</style>

✅ **JAVASCRIPT THEME EDITOR COMPATIBILITY**:
<script>
// Theme editor compatibility
document.addEventListener('shopify:section:load', function(e) {
  if (e.detail.sectionId === '{{ section.id }}') {
    // Re-initialize section functionality
    console.log('Section reloaded in theme editor');
  }
});

// Main functionality
document.addEventListener('DOMContentLoaded', function() {
  // All original JavaScript here
});
</script>

✅ **SHOPIFY FORM COMPATIBILITY**:
<form method="post" action="/contact#contact_form">
  <input type="hidden" name="form_type" value="customer">
  <input type="hidden" name="utf8" value="✓">
  <!-- form fields -->
</form>

✅ **MAKE ALL CONTENT EDITABLE**:
- NO hardcoded text should remain
- ALL headings, paragraphs, buttons should use settings
- ALL URLs should be editable via settings

✅ **CDN LINKS AS COMMENTS**:
Add at top:
<!-- CDN Links: Add these to theme.liquid <head> section:
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">
-->

🚨 CRITICAL: Every conversion MUST start with section wrapper and end with closing section tag!

🚨 CRITICAL CLIENT FEEDBACK FIXES - FOLLOW EXACTLY 🚨:

🔥 **PROPER SHOPIFY LIQUID SECTION CONVERSION** 🔥:
1. MANDATORY SECTION WRAPPER WITH SCOPED ID:
   - Start with: <section id="section-{{ section.id }}" class="original-classes">
   - All content goes inside this section wrapper
   - End with: </section>
   - NO DOCTYPE, html, head, or body tags allowed!

🔥 **SHOPIFY-COMPATIBLE CSS HANDLING** 🔥:
2. CSS MUST BE SCOPED TO PREVENT CONFLICTS:
   - Wrap CSS: <style>
   - Scope all styles: #section-{{ section.id }} .class-name { styles }
   - Include within section, not in <head>
   - CDN links go in theme.liquid (mention in comments)

🔥 **SHOPIFY-COMPATIBLE JAVASCRIPT** 🔥:  
3. JAVASCRIPT THEME EDITOR COMPATIBILITY:
   - Wrap JS: <script>
   - Add theme editor support:
     document.addEventListener('shopify:section:load', function(e) {
       if (e.detail.sectionId === '{{ section.id }}') {
         // Re-initialize functionality
       }
     });
   - Include within section, works in customizer

🔥 **BULLETPROOF IMAGE HANDLING** 🔥:
4. MANDATORY TRIPLE-FALLBACK IMAGE SYSTEM:
   - Extract EVERY img src and background-image URL from HTML
   - Create image_picker + image_url + default_placeholder for EACH image
   - NEVER leave any image field empty - always provide working URL as default
   - Liquid syntax: {% if block.settings.image != blank %}{{ block.settings.image | image_url }}{% elsif block.settings.image_url != blank %}{{ block.settings.image_url }}{% else %}https://via.placeholder.com/800x600/cccccc/666666?text=DefaultImage{% endif %}

🔥 **FOOLPROOF HEADER ICONS IMPLEMENTATION** 🔥:
5. CONVERT ALL HEADER ICONS TO DEDICATED BLOCKS:
   - Find <i class="fas fa-search"> → Create header_search_icon block
   - Find <i class="fas fa-shopping-cart"> → Create header_cart_icon block  
   - Schema: {"type": "header_icon", "name": "Header Icon", "settings": [{"type": "text", "id": "icon_class", "default": "extracted-icon-class"}, {"type": "url", "id": "icon_link", "default": "#"}, {"type": "text", "id": "icon_text", "default": ""}]}
   - Liquid: {% for block in section.blocks %}{% if block.type == 'header_icon' %}<a href="{{ block.settings.icon_link }}" class="icon-link"><i class="{{ block.settings.icon_class }}"></i>{{ block.settings.icon_text }}</a>{% endif %}{% endfor %}

🔥 **BULLETPROOF MOBILE MENU SYSTEM** 🔥:
6. MANDATORY MOBILE MENU CONTROLS:
   - Schema settings: {"type": "checkbox", "id": "enable_mobile_menu", "label": "Enable Mobile Menu", "default": true}
   - {"type": "text", "id": "hamburger_icon", "label": "Hamburger Icon Class", "default": "fas fa-bars"}
   - {"type": "text", "id": "close_icon", "label": "Close Icon Class", "default": "fas fa-times"}
   - Liquid: <button class="hamburger-toggle" {% if section.settings.enable_mobile_menu %}id="hamburger-toggle"{% endif %}><i class="{{ section.settings.hamburger_icon }}"></i></button>

🔥 **GUARANTEED SECTION COMPLETION** 🔥:
7. MANDATORY SECTION VERIFICATION CHECKLIST:
   - Hero Section ✓ - Navigation ✓ - Products/Services ✓ - About/Stylist ✓
   - Testimonials ✓ - Sustainability/Features ✓ - Transformations/Gallery ✓
   - CTA/Shop ✓ - Education/Blog ✓ - Newsletter ✓ - Footer ✓
   - EACH section must have corresponding schema settings
   - EACH section must have proper block structure where applicable
   - WRAP ALL IN: <section id="section-{{ section.id }}" class="...">...content...</section>

🔥 **IRONCLAD SOCIAL ICONS SYSTEM** 🔥:
8. CONVERT ALL SOCIAL ICONS TO BLOCKS:
   - Find <i class="fab fa-facebook-f"> → Create social_facebook block
   - Find <i class="fab fa-instagram"> → Create social_instagram block
   - Schema: {"type": "social_link", "name": "Social Link", "settings": [{"type": "url", "id": "social_url", "default": "#"}, {"type": "text", "id": "social_icon", "default": "extracted-icon-class"}, {"type": "text", "id": "social_name", "default": "Social Platform"}]}

🔥 **COMPLETE CODE PRESERVATION GUARANTEE** 🔥:
9. MANDATORY SHOPIFY SECTION STRUCTURE:
   - Start: <section id="section-{{ section.id }}" class="maertin-hair-care-section">
   - Include: ALL content properly converted to Liquid
   - Include: <style> block with scoped CSS (#section-{{ section.id }} prefix)
   - Include: <script> block with theme editor compatibility
   - End: </section>
   - NO full HTML document structure (no DOCTYPE, html, head, body)
   - CDN links mentioned in comments for theme.liquid inclusion
   - ALL styles scoped to prevent conflicts: #section-{{ section.id }} .original-class

🔥 **ERROR-PROOF EXTRACTION SYSTEM** 🔥:
10. EXTRACTION VERIFICATION PROTOCOL:
   - Scan HTML for ALL img src="..." and extract URLs
   - Scan HTML for ALL background-image: url('...') and extract URLs
   - Scan HTML for ALL <i class="fa..." and extract icon classes
   - Scan HTML for ALL href="..." and extract link URLs
   - Scan HTML for ALL text content and make editable via settings
   - VERIFY: Every extracted element has corresponding schema setting
   - CONVERT TO: Proper Shopify Liquid section (no full HTML document)

🔥 **CLIENT COMPLAINT PREVENTION SYSTEM** 🔥:
11. MANDATORY PRE-DELIVERY CHECKLIST:
   - ✓ ALL images display properly (no blanks)
   - ✓ ALL icons render correctly  
   - ✓ Mobile menu functions perfectly
   - ✓ ALL sections present and functional
   - ✓ ALL JavaScript interactions work
   - ✓ ALL CSS styling preserved
   - ✓ ALL content editable via settings
   - ✓ Perfect visual match to original HTML
   - ✓ PROPER SHOPIFY SECTION FORMAT (no full HTML document)
   - ✓ Scoped CSS to prevent conflicts
   - ✓ Theme editor compatibility

🚨 CRITICAL IMAGE URL EXTRACTION & EDITABILITY REQUIREMENT 🚨:
YOU MUST EXTRACT ALL IMAGE URLS AND MAKE THEM EDITABLE WITH ROBUST FALLBACKS:
- Find all img src="URL" attributes and extract actual URLs from HTML
- Find all background-image: url('URL') in style attributes and extract URLs
- For image_picker fields: Use image_picker type but create parallel text settings for URL fallbacks
- For each image, create TWO settings:
  1. image_picker type: "product_image" (for new uploads)
  2. text type: "product_image_url" with default: "extracted-url-here.jpg" (for fallback)
- CRITICAL LIQUID SYNTAX: Use robust triple-fallback approach:
  {% if section.settings.product_image != blank %}{{ section.settings.product_image | image_url }}{% elsif section.settings.product_image_url != blank %}{{ section.settings.product_image_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Image{% endif %}
- Background image format: 
  style="background-image: url('{% if section.settings.bg_image != blank %}{{ section.settings.bg_image | image_url }}{% elsif section.settings.bg_image_url != blank %}{{ section.settings.bg_image_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Background{% endif %}')"
- CRITICAL: Use image_url filter (modern Shopify) instead of img_url
- IMPORTANT: For external images, always provide the full URL including https://
- PLACEHOLDER FALLBACK: Always provide placeholder image as final fallback to ensure images never break
- Schema structure for each image:  
  {"type": "image_picker", "id": "product_image", "label": "Product Image"},
  {"type": "text", "id": "product_image_url", "label": "Product Image URL (Fallback)", "default": "https://extracted-url-here.jpg"}
- This allows: Upload new images OR use existing URLs OR change URLs via text field OR show placeholder if nothing set

🚨 MANDATORY QUALITY ASSURANCE PROTOCOL 🚨:

BEFORE RETURNING ANY CONVERSION, RUN THIS CHECKLIST:

📋 **SHOPIFY SECTION FORMAT CHECKLIST**:
- [ ] Starts with <section id="section-{{ section.id }}" class="...">
- [ ] Ends with </section>
- [ ] NO DOCTYPE, html, head, or body tags
- [ ] CSS properly scoped with #section-{{ section.id }}
- [ ] JavaScript includes shopify:section:load compatibility
- [ ] CDN links mentioned in comments for theme.liquid

📋 **IMAGE VERIFICATION CHECKLIST**:
- [ ] Every img src URL extracted and added as default in schema
- [ ] Every background-image URL extracted and added as default  
- [ ] NO image field left as empty string ""
- [ ] All image URLs start with https:// (full URLs)
- [ ] Fallback placeholder provided for every image
- [ ] Test: {% if image != blank %}{{ image | image_url }}{% elsif image_url != blank %}{{ image_url }}{% else %}placeholder{% endif %}

📋 **ICON VERIFICATION CHECKLIST**:
- [ ] fa-search converted to searchable block or setting
- [ ] fa-shopping-cart converted to searchable block or setting
- [ ] ALL social media icons (fa-facebook-f, fa-instagram, fa-twitter, fa-pinterest-p) converted to blocks
- [ ] Mobile hamburger icon (fa-bars, fa-times) handled with settings
- [ ] Icon classes preserved exactly as in HTML

📋 **MOBILE MENU CHECKLIST**:
- [ ] Hamburger button present with proper ID
- [ ] Mobile menu div present with proper ID  
- [ ] JavaScript toggle functionality included
- [ ] CSS classes for mobile responsiveness preserved
- [ ] Schema includes mobile menu control settings

📋 **SECTION COMPLETENESS CHECKLIST**:
- [ ] Navigation section ✓
- [ ] Hero section ✓  
- [ ] Products/Services section ✓
- [ ] About/Team section ✓
- [ ] Testimonials section ✓
- [ ] Features/Benefits section ✓
- [ ] Gallery/Portfolio section ✓
- [ ] CTA/Contact section ✓
- [ ] Blog/News section ✓
- [ ] Newsletter section ✓
- [ ] Footer section ✓

📋 **CODE PRESERVATION CHECKLIST**:
- [ ] Section wrapper with unique ID included
- [ ] Complete content converted to Liquid markup 
- [ ] ALL CDN links noted for theme.liquid inclusion
- [ ] COMPLETE <style> section included with scoping
- [ ] COMPLETE <script> section included with theme editor support
- [ ] All CSS classes and IDs preserved
- [ ] All JavaScript functions preserved
- [ ] Proper Shopify section format (no full HTML document)

📋 **FUNCTIONALITY CHECKLIST**:
- [ ] Slideshow/carousel functionality preserved
- [ ] Form submission handling preserved  
- [ ] Mobile responsive behavior preserved
- [ ] Hover effects and animations preserved
- [ ] Click handlers and event listeners preserved

🚨 IF ANY CHECKBOX IS UNCHECKED, DO NOT RETURN THE CONVERSION! 🚨
🚨 FIX ALL ISSUES FIRST, THEN VERIFY AGAIN! 🚨

� **ULTRA-STRONG IMPLEMENTATION SOLUTIONS** 🚀:

🔥 **SOLUTION 1: BULLETPROOF IMAGE SYSTEM**
For EVERY image, implement this EXACT pattern:

SCHEMA:
{
  "type": "image_picker",
  "id": "hero_image", 
  "label": "Hero Image"
},
{
  "type": "text",
  "id": "hero_image_url",
  "label": "Hero Image URL (Fallback)", 
  "default": "https://extracted-from-html.jpg"
}

LIQUID:
<img src="{% if section.settings.hero_image != blank %}{{ section.settings.hero_image | image_url }}{% elsif section.settings.hero_image_url != blank %}{{ section.settings.hero_image_url }}{% else %}https://via.placeholder.com/800x600/cccccc/666666?text=DefaultImage{% endif %}" alt="{{ section.settings.hero_alt | default: 'Default Alt' }}">

BACKGROUND IMAGES:
style="background-image: url('{% if section.settings.hero_bg != blank %}{{ section.settings.hero_bg | image_url }}{% elsif section.settings.hero_bg_url != blank %}{{ section.settings.hero_bg_url }}{% else %}https://via.placeholder.com/1920x1080/cccccc/666666?text=Background{% endif %}')"

🔥 **SOLUTION 2: GUARANTEED HEADER ICONS**
Extract and implement EVERY header icon:

BLOCKS SCHEMA:
{
  "type": "header_icon",
  "name": "Header Icon", 
  "settings": [
    {"type": "text", "id": "icon_class", "label": "Icon Class", "default": "fas fa-search"},
    {"type": "url", "id": "icon_link", "label": "Icon Link", "default": "#"},
    {"type": "text", "id": "wrapper_class", "label": "Wrapper Classes", "default": "icon-link"}
  ]
}

LIQUID IMPLEMENTATION:
<div class="navbar-right">
  {% for block in section.blocks %}
    {% if block.type == 'header_icon' %}
      <a href="{{ block.settings.icon_link }}" class="{{ block.settings.wrapper_class }}">
        <i class="{{ block.settings.icon_class }}"></i>
      </a>
    {% endif %}
  {% endfor %}
</div>

JSON BLOCKS (AUTO-GENERATED):
"header-search": {
  "type": "header_icon",
  "settings": {
    "icon_class": "fas fa-search",
    "icon_link": "#",
    "wrapper_class": "icon-link"
  }
},
"header-cart": {
  "type": "header_icon", 
  "settings": {
    "icon_class": "fas fa-shopping-cart",
    "icon_link": "#",
    "wrapper_class": "icon-link"
  }
}

🔥 **SOLUTION 3: FOOLPROOF MOBILE MENU**
Complete mobile menu implementation:

SCHEMA SETTINGS:
{
  "type": "checkbox",
  "id": "enable_mobile_menu",
  "label": "Enable Mobile Menu",
  "default": true
},
{
  "type": "text", 
  "id": "hamburger_icon",
  "label": "Hamburger Icon",
  "default": "fas fa-bars"
},
{
  "type": "text",
  "id": "close_icon", 
  "label": "Close Icon",
  "default": "fas fa-times"
}

LIQUID TEMPLATE:
{% if section.settings.enable_mobile_menu %}
<button class="hamburger-toggle" id="hamburger-toggle" aria-label="Toggle navigation">
  <i class="{{ section.settings.hamburger_icon }}"></i>
</button>
<div class="mobile-menu" id="mobile-menu">
  {% for block in section.blocks %}
    {% if block.type == 'nav_link' %}
      <a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>
    {% endif %}
  {% endfor %}
</div>
{% endif %}

🔥 **SOLUTION 4: COMPREHENSIVE SECTION MAPPING**
Guarantee ALL sections are converted:

SECTION VERIFICATION MAP:
- Navigation → nav_link blocks + header_icon blocks
- Hero → hero settings + hero_image + hero_bg
- Products → product blocks (image, name, description, price, rating)
- About/Stylist → stylist settings + stylist_image  
- Testimonials → testimonial blocks (text, author, role)
- Features/Sustainability → feature/sustainability_slide blocks
- Gallery/Transformations → gallery/transformation_slide blocks  
- CTA/Shop → shop settings + shop_image
- Blog/Education → blog_card/guide blocks
- Newsletter → newsletter settings + form
- Footer → footer settings + social_link blocks + footer_column blocks

🔥 **SOLUTION 5: IRONCLAD SOCIAL ICONS**
Convert ALL social media references:

FIND IN HTML: <i class="fab fa-facebook-f">
CREATE BLOCK:
"social-facebook": {
  "type": "social_link",
  "settings": {
    "social_url": "#", 
    "social_icon": "fab fa-facebook-f",
    "social_name": "Facebook"
  }
}

LIQUID LOOP:
{% for block in section.blocks %}
  {% if block.type == 'social_link' %}
    <a href="{{ block.settings.social_url }}" class="social-link" title="{{ block.settings.social_name }}">
      <i class="{{ block.settings.social_icon }}"></i>
    </a>
  {% endif %}
{% endfor %}

🔥 **SOLUTION 6: PROPER SHOPIFY SECTION STRUCTURE**
Complete section format with scoped CSS and theme editor support:

<!-- CDN Links: Add these to theme.liquid <head> section:
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Didot:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap">
-->

<section id="section-{{ section.id }}" class="hair-care-landing-page">
  <!-- ALL LIQUID TEMPLATE CONTENT HERE -->
  
  <style>
    /* Scope all CSS to this section */
    #section-{{ section.id }} body,
    #section-{{ section.id }} html {
      /* ALL ORIGINAL CSS SCOPED */
    }
    
    #section-{{ section.id }} .luxehair-velvet {
      /* ALL ORIGINAL CSS SCOPED */
    }
    
    /* ... ALL OTHER CSS SCOPED ... */
  </style>
  
  <script>
    // Theme editor compatibility
    document.addEventListener('shopify:section:load', function(e) {
      if (e.detail.sectionId === '{{ section.id }}') {
        // Re-initialize sliders, mobile menu, etc.
        initializeMobileMenu();
        initializeSliders();
      }
    });
    
    // Original functionality wrapped in DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      // ALL ORIGINAL JAVASCRIPT HERE
    });
  </script>
</section>

🚨 SPECIFIC FIXES REQUIRED 🚨:
- SECTION FORMAT: Wrap everything in <section id="section-{{ section.id }}" class="...">
- HEADER ICONS: Any fa-search and fa-shopping-cart icons MUST be converted to header_icon blocks
- MOBILE MENU: Any hamburger menu or mobile navigation MUST have hamburger_toggle settings in schema
- BLOG/EDUCATION: Any "Hair Care Wisdom", "blog", or education cards MUST be converted to blog_card blocks
- ALL IMAGES: Every img tag must use {{ block.settings.image_name | image_url }} - NO blank images!
- NEVER leave any image setting as empty string - use placeholder text instead
- SCOPED CSS: All CSS must be scoped with #section-{{ section.id }}
- THEME EDITOR: JavaScript must include shopify:section:load compatibility

🚨 HEADER ICON IMPLEMENTATION REQUIREMENT 🚨:
If you see <i class="fas fa-search"> or <i class="fas fa-shopping-cart"> in HTML:
1. Extract exact icon classes and create header_icon blocks in schema
2. Liquid template: {% for block in section.blocks %}{% if block.type == 'header_icon' %}<a href="{{ block.settings.icon_link }}" class="{{ block.settings.icon_wrapper_class }}"><i class="{{ block.settings.icon_class }}"></i></a>{% endif %}{% endfor %}
3. Schema must include blocks: { "type": "header_icon", "name": "Header Icon", "settings": [{"type": "text", "id": "icon_class", "label": "Icon Class", "default": "fas fa-search"}, {"type": "url", "id": "icon_link", "label": "Icon Link", "default": "#"}, {"type": "text", "id": "icon_wrapper_class", "label": "Wrapper Class", "default": "icon-link"}]}
4. Create separate header_icon blocks for EACH icon found in HTML
5. JSON must include header_icon blocks for each icon with actual extracted classes

🚨 MOBILE MENU IMPLEMENTATION REQUIREMENT 🚨:
If you see hamburger menu or mobile navigation in HTML:
1. Include hamburger button: <button class="hamburger-toggle" id="hamburger-toggle" {% if section.settings.mobile_menu_enabled %}aria-label="Toggle navigation"{% endif %}>
2. Include mobile menu: <div class="mobile-menu" id="mobile-menu" {% unless section.settings.mobile_menu_enabled %}style="display: none;"{% endunless %}>
3. Schema settings: {"type": "checkbox", "id": "mobile_menu_enabled", "label": "Enable Mobile Menu", "default": true}, {"type": "text", "id": "hamburger_icon_class", "label": "Hamburger Icon Class", "default": "fas fa-bars"}
4. Preserve ALL mobile menu JavaScript functionality exactly as in HTML

🚨 STAR RATING IMPLEMENTATION REQUIREMENT 🚨:
Convert star ratings with EXACT styling preservation:
HTML: <i class="fas fa-star" style="color: #a13f4f;"></i>
LIQUID: {% for i in (1..5) %}<i class="fas fa-star{% if i > block.settings.rating %}-half-alt{% endif %}" style="color: #a13f4f;"></i>{% endfor %}
Include rating number and review count as separate settings.

1. PRESERVE ALL ORIGINAL STYLING: Keep ALL CSS classes, inline styles, and visual design EXACTLY as written in HTML
2. INCLUDE COMPLETE HTML STRUCTURE: DOCTYPE, html lang, head section with ALL meta tags, title, CDN links
3. PRESERVE CSS STRUCTURE: Include the COMPLETE <style> section exactly as is - do NOT modify any CSS
4. PRESERVE JAVASCRIPT: Include the COMPLETE <script> section exactly as is - do NOT modify any JavaScript  
5. INCLUDE CDN LINKS: Preserve ALL <link> tags for Tailwind CSS, FontAwesome, Google Fonts
6. MAINTAIN EXACT VISUAL APPEARANCE: The converted Liquid template must look IDENTICAL to the original HTML when rendered
4. COMPLETE CONTENT REPLACEMENT - MAKE EVERYTHING EDITABLE:
   - ALL heading text (H1/H2/H3/H4/H5/H6) → {{ section.settings.title }}, {{ section.settings.subtitle }}, {{ section.settings.heading_1 }}, etc.
   - ALL paragraph text → {{ section.settings.description }}, {{ section.settings.text_1 }}, {{ section.settings.text_2 }}, etc.
   - ALL button text → {{ section.settings.button_text }}, {{ section.settings.button_1_text }}, etc.
   - ALL span/div text content → {{ section.settings.label_1 }}, {{ section.settings.label_2 }}, etc.
   - ALL list items text → {{ section.settings.list_item_1 }}, {{ section.settings.list_item_2 }}, etc.
   - ALL image alt text → {{ section.settings.image_alt }}, {{ section.settings.image_1_alt }}, etc.
   - ALL image src URLs → {{ section.settings.image | image_url }}
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
5. PRESERVE EXACT HTML STRUCTURE: Keep all div containers, classes, IDs, and HTML structure exactly as written
6. MAINTAIN RESPONSIVE DESIGN: Keep all media queries and responsive CSS exactly as in original
7. EXACT VISUAL REPLICA: The final output must be visually indistinguishable from the original HTML
   - LITERALLY EVERY PIECE OF TEXT CONTENT MUST BE CONVERTED TO LIQUID VARIABLES!

4. IDENTIFY REPEATING ELEMENTS: If HTML has multiple similar cards/items, use {% for block in section.blocks %}
5. MANDATORY BLOCK CONVERSION: Convert ALL possible content into BLOCKS for maximum flexibility:
   - Navigation links → header_link blocks
   - Feature cards → feature blocks  
   - Product cards → product blocks
   - Testimonials → testimonial blocks
   - Team members → team_member blocks
   - Services → service blocks
   - Social media links → social_link blocks
   - Footer columns → footer_column blocks (CRITICAL: Preserve exact multi-column layout)
   - Footer links within columns → footer_link blocks
   - FAQ items → faq blocks
   - Gallery images → gallery blocks
   - Statistics → stat blocks
   - Process steps → step blocks
   - Benefits → benefit blocks   
   - Reviews → review blocks
   - Awards → award blocks
   - Partners → partner blocks
   - Contact info → contact_info blocks
   - Star ratings → product blocks with rating settings
   - Address info → address blocks
   - Blog cards → blog_card blocks
   - Newsletter signup → newsletter blocks
   - Header icons (search, cart) → header_icon blocks
   - ANY repeating or similar content → appropriate block type
6. PRESERVE HTML STRUCTURE: Keep exact HTML structure, classes, and attributes
7. COMPREHENSIVE SCHEMA REQUIREMENTS:
   - Extract ACTUAL text from HTML as default values in schema
   - Use "text" type for short text (under 100 characters)
   - Use "textarea" type for long text (over 100 characters)
   - Use "image_picker" for ALL images (NO default values for image_picker)
   - Convert ALL img src to {{ block.settings.image_name | image_url }} format
   - Extract actual image filenames from HTML src as schema labels for clarity
   - Use "url" for ALL anchor tag links with actual href as default value
   - Use "text" for ALL anchor tag text content as editable settings
   - Use "email" type for email addresses
   - Use "tel" type for phone numbers
   - Include blocks section for ALL repeating elements
   - Make EVERY single piece of content editable through settings
   - Create unique setting IDs for every text element

🚨 CRITICAL IMAGE HANDLING RULES 🚨:
- EXTRACT ACTUAL URLs FROM HTML - every single img src and background-image URL
- Convert img src="actual_url.jpg" to {{ block.settings.image_name | default: 'actual_url.jpg' }}
- For background images: style="background-image: url('{{ section.settings.bg_image | default: 'actual_extracted_url' }}')"
- Extract filename from HTML src and use as schema ID (logo.jpg → logo_image)  
- Use extracted URLs as DEFAULT VALUES in text type settings as fallbacks
- MANDATORY: Every image must have the actual extracted URL as default value in schema
8. NO GENERIC PLACEHOLDERS: Use real content from HTML in schema defaults
9. CRITICAL SHOPIFY RULE: Use extracted image URLs as default values in text settings for image fallbacks
10. COMPLETE CONVERSION: Include DOCTYPE html, head section, ALL meta tags, CDN links, complete CSS, complete JavaScript
11. MANDATORY SECTIONS: Header navigation, hero, content sections, testimonials, products, newsletter form, complete footer
12. CRITICAL MISSING ELEMENTS CHECK: Ensure these elements are NEVER missed:    - Header icons (search, cart, user icons) → header_icon blocks with icon_class, icon_link settings
    - Mobile menu toggle/hamburger button → mobile_menu_enabled, hamburger_icon_class settings  
    - Newsletter signup forms → newsletter blocks with email input, button, form action
    - Footer social icons → social_link blocks (Facebook, Instagram, Twitter, Pinterest, etc.)
    - Blog/article cards → blog_card blocks or education_guide blocks
    - Education guides → education_guide blocks with guide_image, guide_title, guide_description
    - CTA sections → cta blocks with image and text columns, call-to-action buttons
    - All form elements → preserve complete form structure with action, method, all inputs
    - CDN links in head → ALL <link> tags for Tailwind, FontAwesome, Google Fonts
    - Complete CSS styles → entire <style> section preserved exactly
    - Complete JavaScript → entire <script> section preserved exactly
13. JAVASCRIPT & INTERACTIVITY PRESERVATION:
    - Preserve ALL <script> tags exactly as written in HTML - COMPLETE JavaScript section
    - Keep slider functionality, auto-rotating scripts, click handlers for dots navigation
    - Maintain navigation dots, carousel controls, modal scripts with exact functionality
    - Add schema settings for JavaScript-controlled content (slide timing, autoplay settings)
    - Include mobile menu toggle scripts with proper event listeners and hamburger animations
    - Preserve hamburger menu animations, transitions, and mobile responsiveness
    - Keep ALL event listeners: click events, resize events, scroll events
    - Maintain slideshow auto-advance functionality and dot navigation clicks

🚨 COMPLETE DOCUMENT STRUCTURE REQUIREMENT 🚨:
- Start with: <!DOCTYPE html><html lang="en"><head>
- Include ALL meta tags: charset, viewport, title, description
- Include ALL CDN links: Tailwind CSS, FontAwesome, Google Fonts  
- Include COMPLETE <style> section with ALL CSS
- Include COMPLETE <script> section with ALL JavaScript
- End with: </script></body></html>

🚨 CRITICAL CSS PRESERVATION REQUIREMENTS 🚨:
- INCLUDE COMPLETE <style> SECTION: Copy entire CSS block from HTML exactly as written
- PRESERVE ALL CUSTOM CSS CLASSES: .luxehair-velvet, .maroon-shadow, .section-sep, .btn-shop, etc.
- NEVER remove or modify custom CSS class names or their definitions
- Keep ENTIRE <style> section exactly as written in HTML - ALL 500+ lines of CSS
- Preserve all Tailwind classes and custom gradients exactly as used in HTML
- Maintain all CSS animations, transitions, hover effects, and keyframes
- Keep responsive design and media queries intact with exact breakpoints
- Preserve all CSS variables, custom properties, and style calculations
- Include all CSS selectors: ::selection, @keyframes, @media queries
- Maintain exact color values, shadows, borders, and visual styling
13. CREATE COMPREHENSIVE BLOCKS: Include blocks for products, testimonials, education guides, sustainability slides, transformation slides, team members, features, services, etc.
12. MANDATORY ANCHOR TAG CONVERSION: Every single <a> tag MUST become editable:
    - Header/Navigation links: Use BLOCKS for dynamic header links (can add/remove from admin)
    - Header icons with links: Use header_icon blocks for search, cart, user icons
    - Footer links: <a href="{{ section.settings.footer_link_1_url }}">{{ section.settings.footer_link_1_text }}</a>
    - Multiple footer links: footer_link_2_url, footer_link_2_text, footer_link_3_url, footer_link_3_text, etc.
    - Footer social links: Use social_link blocks for Facebook, Instagram, Twitter, Pinterest icons/links    - Button links: <a href="{{ section.settings.button_url }}">{{ section.settings.button_text }}</a>

🚨 CRITICAL STAR RATING CONVERSION REQUIREMENTS 🚨:
13. STAR RATING ELEMENTS - MANDATORY CONVERSION PATTERNS:
    
    A) FontAwesome Star Icons (most common):
       HTML: <i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
       LIQUID: {% for i in (1..5) %}<i class="fas fa-star{% if i > block.settings.product_rating %}-half-alt{% endif %}"></i>{% endfor %}
    
    B) Unicode Star Symbols:
       HTML: ★★★★☆ or ★★★★★
       LIQUID: {% assign full_stars = block.settings.rating | floor %}{% for i in (1..full_stars) %}★{% endfor %}
    
    C) Star Rating with Numbers:
       HTML: <span class="rating-text">4.5 (128)</span>
       LIQUID: <span class="rating-text">{{ block.settings.product_rating }} ({{ block.settings.product_reviews }})</span>
    
    D) Complete Product Rating Block Example:
       <div class="product-rating">
         <div class="stars">
           {% for i in (1..5) %}
             <i class="fas fa-star{% if i > block.settings.product_rating %}-half-alt{% endif %}"></i>
           {% endfor %}
         </div>
         <span class="rating-text">{{ block.settings.product_rating }} ({{ block.settings.product_reviews }})</span>
       </div>
    
    E) Schema Settings for Star Ratings:
       - "type": "number", "id": "product_rating", "label": "Product Rating", "default": 4.5
       - "type": "number", "id": "product_reviews", "label": "Number of Reviews", "default": 128
    
    F) CRITICAL RULES:
       - ALWAYS convert individual star icons to dynamic Liquid loops
       - NEVER leave hardcoded star counts - make them editable via rating settings
       - Include both rating number AND review count as separate settings
       - Preserve exact CSS classes for styling (fas fa-star, fas fa-star-half-alt, etc.)
       - Handle both full stars and half stars dynamically
       - Convert rating text like "4.5 (128)" to separate editable settings
    - Block links: <a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>
    - Social links: <a href="{{ section.settings.social_link_1_url }}">{{ section.settings.social_link_1_text }}</a>
    - Multiple social links: social_link_2_url, social_link_2_text, social_link_3_url, social_link_3_text, etc.
    - ALL other anchor tags: Create unique numbered settings for EACH anchor tag
13. DYNAMIC HEADER NAVIGATION HANDLING: For header/navigation anchor tags:
    - Convert header anchor tags to BLOCKS using {% for block in section.blocks %}
    - Create "header_link" block type for each navigation link
    - Create "header_icon" block type for search, cart, user icons with links
    - Each header link becomes a separate block with link_url and link_text settings
    - Header icons get icon_type, icon_link, and icon_text settings for full customization
    - Add mobile menu toggle settings: mobile_menu_enabled, hamburger_style, menu_position
    - This allows admin to add/remove header links and icons dynamically
    - Header navigation example: {% for block in section.blocks %}{% if block.type == 'header_link' %}<a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>{% endif %}{% endfor %}
    - Header icons example: {% for block in section.blocks %}{% if block.type == 'header_icon' %}<a href="{{ block.settings.icon_link }}"><i class="{{ block.settings.icon_class }}"></i>{{ block.settings.icon_text }}</a>{% endif %}{% endfor %}

14. 🚨 CRITICAL MULTI-COLUMN FOOTER HANDLING 🚨:
    - PRESERVE EXACT FOOTER LAYOUT: Keep all CSS classes, grid structures, flexbox layouts, and responsive design EXACTLY as in HTML
    - CONVERT FOOTER COLUMNS TO BLOCKS: Each footer column becomes a "footer_column" block
    - FOOTER COLUMN STRUCTURE: Each footer column block should contain:
      * Column title/heading as editable text setting
      * Multiple footer links as sub-blocks or array of links
      * Preserve exact CSS classes and structure for each column    - 🚨 MANDATORY FOOTER LIQUID STRUCTURE - COPY THIS EXACTLY 🚨:
      <footer class="footer-container">
        <div class="footer-columns">
          {% for block in section.blocks %}
            {% if block.type == 'footer_column' %}
              <div class="footer-column">
                <h4 class="footer-title">{{ block.settings.column_title }}</h4>
                <ul class="footer-links">
                  {% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
                    <li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>
                  {% endif %}
                  {% if block.settings.link_2_url != blank and block.settings.link_2_text != blank %}
                    <li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>
                  {% endif %}
                  {% if block.settings.link_3_url != blank and block.settings.link_3_text != blank %}
                    <li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>
                  {% endif %}
                  {% if block.settings.link_4_url != blank and block.settings.link_4_text != blank %}
                    <li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>
                  {% endif %}
                  {% if block.settings.link_5_url != blank and block.settings.link_5_text != blank %}
                    <li><a href="{{ block.settings.link_5_url }}">{{ block.settings.link_5_text }}</a></li>
                  {% endif %}
                  {% if block.settings.link_6_url != blank and block.settings.link_6_text != blank %}
                    <li><a href="{{ block.settings.link_6_url }}">{{ block.settings.link_6_text }}</a></li>
                  {% endif %}
                </ul>
              </div>
            {% endif %}
          {% endfor %}
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ section.settings.copyright_year }} {{ section.settings.company_name }}. {{ section.settings.copyright_text }}</p>
          <div class="footer-bottom-links">
            {% if section.settings.privacy_url != blank %}<a href="{{ section.settings.privacy_url }}">{{ section.settings.privacy_text }}</a>{% endif %}
            {% if section.settings.terms_url != blank %}<a href="{{ section.settings.terms_url }}">{{ section.settings.terms_text }}</a>{% endif %}
          </div>
        </div>
      </footer>    
      - 🚨 CRITICAL: ENSURE ALL FOOTER LINKS ARE VISIBLE AND PROPERLY STYLED:
      * Each footer column MUST have both title AND visible links underneath
      * Footer links must be properly styled with color, hover effects, and spacing
      * The <ul> and <li> elements must be preserved exactly as in original HTML
      * Links must be clickable and visible - not hidden or transparent
      * Preserve ALL CSS for .footer-links, .footer-links li, .footer-links a classes
      * NEVER hide or remove footer link content - ALL links must be shown
      * Use proper conditional rendering: {% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
      * Each link must be wrapped: <li><a href="{{ block.settings.link_N_url }}">{{ block.settings.link_N_text }}</a></li>
      * Footer column structure MUST include: {% for block in section.blocks %}...{% if block.type == 'footer_column' %}...{% endif %}...{% endfor %}- FOOTER SCHEMA EXAMPLE:
      {
        "type": "footer_column",
        "name": "Footer Column",
        "settings": [
          {
            "type": "text",
            "id": "column_title",
            "label": "Column Title",
            "default": "Actual_Column_Title_From_HTML"
          },          {
            "type": "url",
            "id": "link_1_url",
            "label": "Link 1 URL",
            "default": "/"
          },
          {
            "type": "text",
            "id": "link_1_text",
            "label": "Link 1 Text",
            "default": "Link 1"
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
            "default": "Link 2"
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
            "default": "Link 3"
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
            "default": "Link 4"
          }
          {
            "type": "text",
            "id": "link_2_text",
            "label": "Link 2 Text",
            "default": "Actual_Link_Text"
          }
        ]
      }    
        - 🚨 CRITICAL FOOTER SCHEMA RULES 🚨:
      * EVERY footer column block MUST include ALL individual link settings (link_1_url, link_1_text, link_2_url, link_2_text, etc.)
      * NEVER create a footer_column block with only a column_title - it MUST have individual link settings
      * Count the actual links in each HTML footer column and create that many url/text pairs
      * Example: If HTML has 4 links in a column, schema MUST have link_1_url, link_1_text, link_2_url, link_2_text, link_3_url, link_3_text, link_4_url, link_4_text
      * ABSOLUTELY NEVER create settings with these IDs: "column_links", "footer_links", "links_array", "link_items"
      * ABSOLUTELY NEVER use these invalid types: "column_links", "links", "array", "list", "items", "collection"
      * Each link must be separate url/text pairs: link_1_url, link_1_text, link_2_url, link_2_text, etc.
      * Use only basic valid types: "text", "textarea", "url", "image_picker", "color", "number", "checkbox", "select"
      * Each setting MUST have "type" and "id" attributes at minimum
      * 🚨 VIOLATION WARNING: Creating "column_links" settings will cause CRITICAL schema validation errors
      * 🚨 VISUAL PRESERVATION: The converted footer must look EXACTLY like the original HTML - same colors, spacing, layout
      * PRESERVE ALL CSS CLASSES: Keep footer-container, footer-columns, footer-column, footer-links, footer-bottom classes exactly as written
      * MAINTAIN GRID LAYOUT: Keep display: grid and all grid properties exactly as in original CSS
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
16. SCHEMA MUST INCLUDE: For every piece of content, create appropriate settings:    - For anchor tags: { "type": "url", "id": "link_name_url", "label": "Link URL", "default": "/" } and { "type": "text", "id": "link_name_text", "label": "Link Text", "default": "actual_link_text" }
    - For headings: { "type": "text", "id": "heading_1", "label": "Heading Text", "default": "actual_heading_text" }
    - For paragraphs: { "type": "textarea", "id": "description_1", "label": "Description", "default": "actual_paragraph_text" }
    - For images: { "type": "image_picker", "id": "image_1", "label": "Image" } (NO default value for image_picker)
    - For all other text: { "type": "text", "id": "text_content_1", "label": "Text Content", "default": "actual_text" }    - 🚨 CRITICAL DEFAULT VALUES: ALL settings with "default" attribute MUST have non-empty values:
      * Text/textarea settings: Use actual text content from HTML as default (never empty strings)
      * URL settings: Use "/" or actual URL from HTML (never empty strings)
      * Number settings: Use actual numbers or 1 (never empty)
      * Color settings: Use "#000000" or actual color values
      * Email settings: Use "example@example.com" or actual email
      * Phone settings: Use "+1 (555) 123-4567" or actual phone
      * Image_picker settings: NEVER include default attribute
      * NEVER use empty strings (""), null, or undefined as default values
      * 🚨 FOOTER LINKS: Extract ACTUAL link text from HTML - use "All Products", "Contact Us", "Our Story" etc. as defaults, not generic "Link 1", "Link 2"- 🚨 CRITICAL SCHEMA VALIDATION: NEVER use invalid attributes in schema settings:
      * STRICTLY FORBIDDEN IDs: "column_links", "footer_links", "links_array", "link_items" - these cause validation errors
      * STRICTLY FORBIDDEN TYPES: "column_links", "links", "array", "list", "items", "collection" - these don't exist in Shopify
      * Do NOT use "min", "max", "step", or "item" attributes - these are invalid in Shopify schema
      * Use only valid schema attributes: "type", "id", "label", "default", "info", "options" (for select), "placeholder"
      * Use only valid schema types: "text", "textarea", "url", "image_picker", "color", "number", "range", "checkbox", "select", "richtext", "email", "tel"
      * Every setting MUST have both "type" and "id" attributes
      * Invalid attributes cause schema validation errors and break the section
      * 🚨 CRITICAL: Creating "column_links" or similar complex link settings WILL cause validation failures

17. TEXT CONTENT ANALYSIS: Scan the HTML and identify EVERY single text element:
    - Count all headings and create separate settings for each
    - Count all paragraphs and create separate settings for each
    - Count all buttons and create separate settings for each
    - Count all links and create separate settings for each
    - Count all labels/spans and create separate settings for each
    - Create numbered settings for multiple similar elements (title_1, title_2, etc.)

CRITICAL: The liquid template should look IDENTICAL to the original HTML when rendered. Do NOT modify any CSS or styling. CONVERT THE ENTIRE HTML - ALL SECTIONS MUST BE INCLUDED. MAKE EVERY SINGLE PIECE OF TEXT CONTENT EDITABLE!

🚨 VISUAL PRESERVATION REQUIREMENTS:
- The converted Liquid template must be visually indistinguishable from the original HTML
- ALL CSS classes, IDs, and styling must remain exactly the same
- Colors, fonts, spacing, layout must be preserved perfectly
- Responsive design and media queries must remain intact
- Grid layouts, flexbox, and positioning must be maintained exactly
- The end result should render identically to the original HTML file

🚨 MANDATORY OUTPUT FORMAT RULES:
1. MUST include COMPLETE HTML structure converted to Liquid (NOT just schema)
2. Start with HTML elements (divs, headers, sections) with Liquid variables
3. Include ALL CSS styles exactly as in original HTML
4. Include ALL JavaScript exactly as in original HTML  
5. End with complete {% schema %} section
6. Do NOT return only schema - include FULL HTML structure with Liquid variables
7. Schema MUST have valid presets structure: "presets": [{"name": "Default", "category": "Custom"}]

EXAMPLE STRUCTURE REQUIRED:
<div class="original-css-class">
  <h1>{{ section.settings.heading }}</h1>
  <p>{{ section.settings.description }}</p>
  <!-- ALL original HTML structure with Liquid variables -->
</div>
<style>
  /* ALL original CSS exactly as written */
</style>
<script>
  /* ALL original JavaScript exactly as written */
</script>
{% schema %}
{
  /* Complete schema with all settings */
}
{% endschema %}

HTML to convert:
\\\`\\\`\\\`html
${htmlContent}
\\\`\\\`\\\`

Return COMPLETE liquid template: HTML structure + CSS + JavaScript + Schema. NOT just schema alone!`; const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",        content: `You are a Shopify Liquid expert. Based on client feedback, the current conversion system has CRITICAL BUGS that must be fixed immediately.

CRITICAL FIXES REQUIRED:
1. CSS SCOPING: Use "#section-{{ section.id }} .classname" NOT "#section-{{ section.id }} classname"
2. LIQUID SYNTAX: Use "{% if forloop.first %}active{% endif %}" NOT "{% if forloop.first %}#section-{{ section.id }} active {% endif %}"
3. IMAGE SYNTAX: Use proper triple fallback - image_picker OR image_url OR placeholder
4. SECTION WRAPPER: Proper <section id="section-{{ section.id }}" class="original-classes">
5. SHOPIFY FORMS: Use action="/contact#contact_form" with hidden form_type fields

CLIENT COMPLAINTS TO FIX:
- System generates schema correctly but NOT working Liquid markup
- CSS selectors are malformed with invalid section IDs mixed into class names  
- Image handling has broken syntax
- Missing proper Shopify section structure
- JavaScript not compatible with theme editor

EXACT REQUIREMENTS:
✅ Render content using {{ section.settings.variable_name }}
✅ Loop blocks with {% for block in section.blocks %}{% if block.type == 'type' %}{% endif %}{% endfor %}
✅ Image fallback: src="{% if settings.image != blank %}{{ settings.image | image_url }}{% elsif settings.image_url != blank %}{{ settings.image_url }}{% else %}placeholder{% endif %}"
✅ CSS scoped: #section-{{ section.id }} .original-class { styles }
✅ JavaScript with: document.addEventListener('shopify:section:load', function(e) { if (e.detail.sectionId === '{{ section.id }}') { } });
✅ Shopify forms: <form method="post" action="/contact#contact_form"><input type="hidden" name="form_type" value="customer">

Convert the ENTIRE HTML to working Shopify section format. Fix ALL the bugs mentioned above.`
      },
      {
        role: "user",        content: `CRITICAL: Fix the current conversion bugs and convert to COMPLETE SHOPIFY SECTION format.

CURRENT BUGS TO FIX:
❌ CSS: "fas fa-#section-{{ section.id }} star" should be "fas fa-star"  
❌ CSS: ".dot.#section-{{ section.id }} active" should be ".dot.active"
❌ Invalid setting names with special characters like "Mäertin_alt_text"
❌ Malformed Liquid syntax in CSS selectors
❌ Missing proper Shopify form structure

REQUIREMENTS:
1. Convert ALL HTML to Shopify section format (NO complete HTML page)
2. Remove DOCTYPE, html, head, body tags - start with section content only
3. Replace ALL hardcoded text with Liquid: {{ section.settings.variable_name }}
4. Create blocks for repeating content (navigation, products, testimonials, footer columns)
5. Include ALL CSS with proper scoping: #section-{{ section.id }} .classname
6. Include ALL JavaScript with theme editor compatibility
7. Proper image fallbacks: {% if image != blank %}{{ image | image_url }}{% elsif image_url != blank %}{{ image_url }}{% else %}placeholder{% endif %}
8. Shopify forms: <form method="post" action="/contact#contact_form">
9. Extract ALL image URLs and use as defaults in schema
10. Make EVERYTHING editable - NO hardcoded content

EXAMPLE CORRECT FORMAT:
<section id="section-{{ section.id }}" class="original-classes">
<!-- Navigation -->
<nav class="navbar">
  {% for block in section.blocks %}
    {% if block.type == 'nav_link' %}
      <a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a>
    {% endif %}
  {% endfor %}
</nav>

<!-- All content with proper Liquid syntax -->

<style>
#section-{{ section.id }} .original-class { 
  /* ALL original CSS properly scoped */ 
}
</style>

<script>
document.addEventListener('shopify:section:load', function(e) {
  if (e.detail.sectionId === '{{ section.id }}') {
    // Re-initialize functionality
  }
});
// ALL original JavaScript
</script>
</section>

{% schema %}
{
  "name": "Section Name",
  "settings": [...extracted settings...],
  "blocks": [...all block types...],
  "presets": [{"name": "Default", "category": "Custom"}]
}
{% endschema %}

HTML to convert:
${htmlContent}

Convert EVERYTHING to working Shopify section format with ALL bugs fixed!`
      }
      ],
      max_tokens: 16384,
      temperature: 0.01,
    });    let liquidContent = completion.choices[0]?.message?.content;

    // CRITICAL BUG FIXES - Based on client feedback
    console.log('🔧 Applying critical bug fixes...');
    
    // Fix CSS selector issues - malformed section ID patterns in CSS
    liquidContent = liquidContent.replace(/fas fa-#section-\{\{ section\.id \}\} (\w+)/g, 'fas fa-$1');
    liquidContent = liquidContent.replace(/#section-\{\{ section\.id \}\} (\w+)/g, '.$1');
    liquidContent = liquidContent.replace(/\.(\w+)\.#section-\{\{ section\.id \}\} (\w+)/g, '.$1.$2');
    liquidContent = liquidContent.replace(/(\w+)-#section-\{\{ section\.id \}\} (\w+)/g, '$1-$2');
    
    // Fix image syntax issues
    liquidContent = liquidContent.replace(/\{\{ section\.settings\.([^_]*_alt_text) \| default: '([^']+)' \}\}/g, 
      (match, setting, defaultText) => {
        const cleanSetting = setting.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        return `{{ section.settings.${cleanSetting} | default: '${defaultText}' }}`;
      });
    
    // Fix invalid Liquid syntax in class attributes
    liquidContent = liquidContent.replace(/class="([^"]*#section-\{\{ section\.id \}\}[^"]*)"/, 
      (match, className) => {
        const cleanClass = className.replace(/#section-\{\{ section\.id \}\}\s*/g, '');
        return `class="${cleanClass}"`;
      });
    
    // Fix star rating display issues
    liquidContent = liquidContent.replace(/\{\% for i in \(1\.\.5\) \%\}[\s\S]*?fa-#section-\{\{ section\.id \}\} star[\s\S]*?\{\% endfor \%\}/g,
      `{% for i in (1..5) %}
        <i class="fas fa-star" style="color: #a13f4f;"></i>
      {% endfor %}`);
    
    // Ensure proper section wrapper
    if (!liquidContent.includes('<section id="section-{{ section.id }}"')) {
      console.log('🚨 Adding missing section wrapper...');
      const sectionMatch = liquidContent.match(/^(.*?)(<nav|<div|<section)/s);
      if (sectionMatch) {
        liquidContent = liquidContent.replace(sectionMatch[2], 
          `<section id="section-{{ section.id }}" class="hair-care-landing-page">\n${sectionMatch[2]}`);
      }
    }
    
    // Ensure proper section closing
    if (!liquidContent.includes('</section>') || liquidContent.lastIndexOf('</section>') < liquidContent.lastIndexOf('{% endschema %}')) {
      console.log('🚨 Adding missing section closing tag...');
      const schemaIndex = liquidContent.lastIndexOf('{% schema %}');
      if (schemaIndex > -1) {
        liquidContent = liquidContent.substring(0, schemaIndex) + '</section>\n\n' + liquidContent.substring(schemaIndex);
      }
    }
    
    // Fix CSS scoping issues
    liquidContent = liquidContent.replace(/<style>([\s\S]*?)<\/style>/, (match, css) => {
      let fixedCSS = css;
      
      // Add section scoping to selectors that don't have it
      fixedCSS = fixedCSS.replace(/^([^{]*?\{)/gm, (match, selector) => {
        if (!selector.includes('#section-{{ section.id }}') && !selector.includes('@keyframes') && !selector.includes('@media')) {
          const cleanSelector = selector.replace('{', '').trim();
          if (cleanSelector && !cleanSelector.startsWith('/*')) {
            return `#section-{{ section.id }} ${cleanSelector} {`;
          }
        }
        return match;
      });
      
      return `<style>\n${fixedCSS}\n</style>`;
    });
    
    console.log('✅ Critical bug fixes applied');

    if (htmlContent.toLowerCase().includes('<footer') && liquidContent.includes('footer_column')) {
      console.log('🔍 Checking footer conversion quality...');

      const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);
      let hasIncompleteFooterColumns = false;
      let hasIncompleteFooterRendering = false;

      if (schemaMatch) {
        try {
          const schemaContent = schemaMatch[1].trim();
          const schemaObj = JSON.parse(schemaContent);

          if (schemaObj.blocks) {
            schemaObj.blocks.forEach(block => {
              if (block.type === 'footer_column' && block.settings) {
                const hasColumnTitle = block.settings.some(s => s.id === 'column_title');
                const hasLinkSettings = block.settings.some(s => s.id && s.id.match(/^link_\d+_(url|text)$/));

                if (hasColumnTitle && !hasLinkSettings) {
                  console.warn(`⚠️ INCOMPLETE footer_column block detected - only has title, missing link settings!`);
                  hasIncompleteFooterColumns = true;
                }
              }
            });
          }
        } catch (e) {
          console.log('Schema parsing error during footer check, continuing...');
        }
      }
      const footerSectionMatch = liquidContent.match(/<footer[\s\S]*?<\/footer>/);
      if (footerSectionMatch) {
        const footerLiquidCode = footerSectionMatch[0];

        const hasLinkConditions = footerLiquidCode.includes('block.settings.link_1_url') &&
          footerLiquidCode.includes('block.settings.link_1_text') &&
          footerLiquidCode.includes('{% if') &&
          footerLiquidCode.includes('!= blank');

        const hasLinkElements = footerLiquidCode.includes('<li><a href=') &&
          footerLiquidCode.includes('{{ block.settings.link_') &&
          footerLiquidCode.includes('<ul class="footer-links">');

        const hasFooterStructure = footerLiquidCode.includes('footer_column') &&
          footerLiquidCode.includes('{{ block.settings.column_title }}');

        if (!hasLinkConditions || !hasLinkElements || !hasFooterStructure) {
          console.warn('⚠️ INCOMPLETE footer rendering detected - footer links may not display correctly!');
          hasIncompleteFooterRendering = true;
        }
      } else {
        const footerBlockPattern = /{% for block in section\.blocks %}[\s\S]*?footer_column[\s\S]*?{% endfor %}/;
        if (!footerBlockPattern.test(liquidContent)) {
          console.warn('⚠️ MISSING footer block loop - footer may not render correctly!');
          hasIncompleteFooterRendering = true;
        }
      }

      if (hasIncompleteFooterColumns || hasIncompleteFooterRendering) {
        console.log('🔄 Retrying footer conversion with complete link rendering instructions...');
        const footerRetryCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{
            role: "system",
            content: "🚨 CRITICAL FOOTER FIX SPECIALIST: You MUST create complete footer rendering with visible clickable links. Include BOTH schema AND proper Liquid rendering code that displays ALL links."
          },
          {
            role: "user",
            content: `🚨 CRITICAL FOOTER FIX REQUIRED: The footer is not properly converted.

PROBLEM: Footer links are missing or not rendering properly.

Original HTML:
${htmlContent}

Current Liquid (INCOMPLETE):
${liquidContent}

🚨 MANDATORY FOOTER STRUCTURE - USE THIS EXACT PATTERN:

<footer class="footer-container">
  <div class="footer-columns">
    {% for block in section.blocks %}
      {% if block.type == 'footer_column' %}
        <div class="footer-column">
          <h4 class="footer-title">{{ block.settings.column_title }}</h4>
          <ul class="footer-links">
            {% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
              <li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>
            {% endif %}
            {% if block.settings.link_2_url != blank and block.settings.link_2_text != blank %}
              <li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>
            {% endif %}
            {% if block.settings.link_3_url != blank and block.settings.link_3_text != blank %}
              <li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>
            {% endif %}
            {% if block.settings.link_4_url != blank and block.settings.link_4_text != blank %}
              <li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>
            {% endif %}
            {% if block.settings.link_5_url != blank and block.settings.link_5_text != blank %}
              <li><a href="{{ block.settings.link_5_url }}">{{ block.settings.link_5_text }}</a></li>
            {% endif %}
            {% if block.settings.link_6_url != blank and block.settings.link_6_text != blank %}
              <li><a href="{{ block.settings.link_6_url }}">{{ block.settings.link_6_text }}</a></li>
            {% endif %}
          </ul>
        </div>
      {% endif %}
    {% endfor %}
  </div>
  <div class="footer-bottom">
    <p>&copy; {{ section.settings.copyright_year }} {{ section.settings.company_name }}. {{ section.settings.copyright_text }}</p>
    <div class="footer-bottom-links">
      {% if section.settings.privacy_url != blank %}<a href="{{ section.settings.privacy_url }}">{{ section.settings.privacy_text }}</a>{% endif %}
      {% if section.settings.terms_url != blank %}<a href="{{ section.settings.terms_url }}">{{ section.settings.terms_text }}</a>{% endif %}
    </div>
  </div>
</footer>

CRITICAL REQUIREMENTS:
1. Schema: Count actual links in each HTML footer column and create link_N_url, link_N_text settings for each
2. Rendering: Replace the footer section with the EXACT structure above
3. Extract real link text from HTML as default values (e.g., "All Products", "Contact Us", "Our Story")
4. Keep all CSS classes and structure exactly the same as HTML
5. ENSURE ALL FOOTER LINKS ARE VISIBLE AND CLICKABLE IN THE OUTPUT
6. Each footer column MUST have BOTH column title AND individual link settings in schema
7. The {% for block in section.blocks %} loop MUST be present for footer columns
8. Links MUST be wrapped in proper <ul><li><a> structure for styling

Return the complete fixed Shopify section with proper footer link rendering and complete schema.`
          }],
          max_tokens: 8000,
          temperature: 0.05,
        }); const fixedFooterContent = footerRetryCompletion.choices[0]?.message?.content;
        if (fixedFooterContent && fixedFooterContent.length > liquidContent.length) {
          console.log('✅ Footer retry successful - using fixed version');
          liquidContent = fixedFooterContent;
        }
      }
    }

    if (htmlContent.toLowerCase().includes('<footer') && liquidContent.includes('footer_column')) {
      console.log('🔧 Post-processing footer to ensure correct link rendering...');
      const badFooterPattern = /{% for link in block\.settings\.column_links %}[\s\S]*?{% endfor %}/g;
      const badFooterPattern2 = /{% for link in block\.settings\.footer_links %}[\s\S]*?{% endfor %}/g;
      const badFooterPattern3 = /{% for link in block\.settings\.links %}[\s\S]*?{% endfor %}/g;

      if (badFooterPattern.test(liquidContent) || badFooterPattern2.test(liquidContent) || badFooterPattern3.test(liquidContent)) {
        console.log('🔄 Fixing invalid footer loop patterns...');

        const correctFooterLinks = `{% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
                <li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>
              {% endif %}
              {% if block.settings.link_2_url != blank and block.settings.link_2_text != blank %}
                <li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>
              {% endif %}
              {% if block.settings.link_3_url != blank and block.settings.link_3_text != blank %}
                <li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>
              {% endif %}
              {% if block.settings.link_4_url != blank and block.settings.link_4_text != blank %}
                <li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>
              {% endif %}`;

        liquidContent = liquidContent.replace(badFooterPattern, correctFooterLinks);
        liquidContent = liquidContent.replace(badFooterPattern2, correctFooterLinks);
        liquidContent = liquidContent.replace(badFooterPattern3, correctFooterLinks);
      }

      const footerSectionMatch = liquidContent.match(/<footer[\s\S]*?<\/footer>/);
      if (footerSectionMatch) {
        const footerContent = footerSectionMatch[0];

        if (!footerContent.includes('{% for block in section.blocks %}') && footerContent.includes('footer-column')) {
          console.log('🔄 Adding missing footer block loop structure...');

          const columnsMatch = footerContent.match(/<div class="footer-columns"[\s\S]*?<\/div>/);
          if (columnsMatch) {
            const blockLoopStructure = `<div class="footer-columns">
    {% for block in section.blocks %}
      {% if block.type == 'footer_column' %}
        <div class="footer-column">
          <h4 class="footer-title">{{ block.settings.column_title }}</h4>
          <ul class="footer-links">
            {% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
              <li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>
            {% endif %}
            {% if block.settings.link_2_url != blank and block.settings.link_2_text != blank %}
              <li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>
            {% endif %}
            {% if block.settings.link_3_url != blank and block.settings.link_3_text != blank %}
              <li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>
            {% endif %}
            {% if block.settings.link_4_url != blank and block.settings.link_4_text != blank %}
              <li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>
            {% endif %}
            {% if block.settings.link_5_url != blank and block.settings.link_5_text != blank %}
              <li><a href="{{ block.settings.link_5_url }}">{{ block.settings.link_5_text }}</a></li>
            {% endif %}
            {% if block.settings.link_6_url != blank and block.settings.link_6_text != blank %}
              <li><a href="{{ block.settings.link_6_url }}">{{ block.settings.link_6_text }}</a></li>
            {% endif %}
          </ul>
        </div>
      {% endif %}
    {% endfor %}
  </div>`;

            const newFooterContent = footerContent.replace(columnsMatch[0], blockLoopStructure);
            liquidContent = liquidContent.replace(footerContent, newFooterContent);
          }
        }
      }
      console.log('✅ Footer post-processing completed');
    }

    if (liquidContent.includes('fa-star') || liquidContent.includes('★')) {
      console.log('🔧 Post-processing star ratings to ensure proper conversion...');

      const hardcodedStarPattern = /(<i class="fas fa-star"[^>]*><\/i>)\s*(<i class="fas fa-star"[^>]*><\/i>)\s*(<i class="fas fa-star"[^>]*><\/i>)\s*(<i class="fas fa-star"[^>]*><\/i>)\s*(<i class="fas fa-star[^>]*><\/i>)/g;

      if (hardcodedStarPattern.test(liquidContent)) {
        console.log('🔄 Converting hardcoded FontAwesome stars to dynamic Liquid...');
        liquidContent = liquidContent.replace(hardcodedStarPattern,
          `{% for i in (1..5) %}
            <i class="fas fa-star{% if i > block.settings.product_rating %}-half-alt{% endif %}"></i>
          {% endfor %}`
        );
      }

      const hardcodedRatingPattern = /(\d+\.?\d*)\s*\((\d+)\)/g;
      liquidContent = liquidContent.replace(hardcodedRatingPattern,
        '{{ block.settings.product_rating }} ({{ block.settings.product_reviews }})'
      );

      const unicodeStarPattern = /★{3,5}/g;
      if (unicodeStarPattern.test(liquidContent)) {
        console.log('🔄 Converting hardcoded Unicode stars to dynamic Liquid...');
        liquidContent = liquidContent.replace(unicodeStarPattern,
          `{% assign full_stars = block.settings.rating | floor %}{% for i in (1..full_stars) %}★{% endfor %}`
        );
      }
      console.log('✅ Star rating post-processing completed');
    }

    console.log('🖼️ Processing image URLs from HTML...');
    const imageUrls = [];
    const imageRegex = /src=["']([^"']+)["']/g;
    const backgroundImageRegex = /background-image:\s*url\(['"]([^'"]+)['"]\)/g;

    let match;
    while ((match = imageRegex.exec(htmlContent)) !== null) {
      const url = match[1];
      if (url && !url.startsWith('data:') && !imageUrls.includes(url)) {
        imageUrls.push(url);
      }
    }

    while ((match = backgroundImageRegex.exec(htmlContent)) !== null) {
      const url = match[1];
      if (url && !url.startsWith('data:') && !imageUrls.includes(url)) {
        imageUrls.push(url);
      }
    }

    console.log('📸 Found image URLs:', imageUrls.length);

    if (htmlContent.includes('fa-search') || htmlContent.includes('fa-shopping-cart')) {
      console.log('🔧 Post-processing header icons to ensure proper block structure...');

      if (liquidContent.includes('fas fa-search') && !liquidContent.includes('header_icon')) {
        console.log('🔄 Converting hardcoded search icon to header_icon block...');
        liquidContent = liquidContent.replace(
          /<a[^>]*><i[^>]*fas fa-search[^>]*><\/i><\/a>/g,
          '{% for block in section.blocks %}{% if block.type == "header_icon" and block.settings.icon_type == "search" %}<a href="{{ block.settings.icon_link }}"><i class="{{ block.settings.icon_class }}"></i></a>{% endif %}{% endfor %}'
        );
      }

      if (liquidContent.includes('fas fa-shopping-cart') && !liquidContent.includes('header_icon')) {
        console.log('🔄 Converting hardcoded cart icon to header_icon block...');
        liquidContent = liquidContent.replace(
          /<a[^>]*><i[^>]*fas fa-shopping-cart[^>]*><\/i><\/a>/g,
          '{% for block in section.blocks %}{% if block.type == "header_icon" and block.settings.icon_type == "cart" %}<a href="{{ block.settings.icon_link }}"><i class="{{ block.settings.icon_class }}"></i></a>{% endif %}{% endfor %}');
      }

      console.log('✅ Header icon post-processing completed');
    }

    if (imageUrls.length > 0) {
      console.log('🔧 Processing extracted image URLs...');


      console.log('✅ Image URL processing completed');
    }

    if (!liquidContent) {
      return NextResponse.json(
        { error: 'Failed to generate Liquid content' },
        { status: 500 }
      );
    } if (isLargeFile && (!liquidContent.includes('{% endschema %}') || liquidContent.split('{% schema %}')[0].trim().length < 500)) {
      console.warn('Large file conversion appears incomplete or missing HTML structure, attempting retry...'); const retryCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "system",
          content: "🚨 Convert to SHOPIFY SECTION format. Do NOT include <!DOCTYPE>, <html>, <head>, <body> tags. Start with section content and end with {% schema %}."
        },
        {
          role: "user",
          content: `WRONG: You returned complete HTML page with DOCTYPE, html, head, body tags.

CORRECT: Shopify section format:
<section class="hero">
  <h1>{{ section.settings.title }}</h1>
</section>
<style>css</style>
{% schema %}...{% endschema %}

Convert HTML to SHOPIFY SECTION (no DOCTYPE/html/head/body):
${htmlContent}

Return section content only with schema!`
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
    } let cleanedLiquidContent = liquidContent;

    cleanedLiquidContent = cleanedLiquidContent.replace(/^```liquid\s*/, '').replace(/\s*```$/, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^```html\s*/, '').replace(/\s*```$/, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^```\s*/, '').replace(/\s*```$/, '');

    cleanedLiquidContent = cleanedLiquidContent.replace(/^<!DOCTYPE[\s\S]*?>\s*/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<html[\s\S]*?>\s*/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<\/html>\s*/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<head>[\s\S]*?<\/head>\s*/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<body[\s\S]*?>\s*/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<\/body>\s*/gm, '');

    cleanedLiquidContent = cleanedLiquidContent.replace(/<html[\s\S]*?<\/html>/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/<head>[\s\S]*?<\/head>/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/<body[\s\S]*?>/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/<\/body>/gm, '');

    if (cleanedLiquidContent.includes('This Liquid template preserves')) {
      const explanationIndex = cleanedLiquidContent.indexOf('This Liquid template preserves');
      cleanedLiquidContent = cleanedLiquidContent.substring(0, explanationIndex).trim();
    }
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nThis Liquid template[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nThe above[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nNote:[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\n\*\*[\s\S]*$/i, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/\n\nExplanation:[\s\S]*$/i, '');

    cleanedLiquidContent = cleanedLiquidContent.replace(/```\s*$/g, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^```.*?\n/g, '');
    cleanedLiquidContent = cleanedLiquidContent.trim();    cleanedLiquidContent = cleanedLiquidContent.replace(/^<html[\s\S]*?<\/html>$/gm, '');
    cleanedLiquidContent = cleanedLiquidContent.replace(/^<!DOCTYPE[\s\S]*?>\s*/gm, '');
      // 🚨 CRITICAL: Enforce section wrapper requirement
    if (!cleanedLiquidContent.includes('<section id="section-{{ section.id }}')) {
      console.log('🔧 CRITICAL: Section wrapper missing - adding mandatory wrapper');
      
      // Find where schema starts to split content and schema
      const schemaIndex = cleanedLiquidContent.indexOf('{% schema %}');
      if (schemaIndex !== -1) {
        const htmlContent = cleanedLiquidContent.substring(0, schemaIndex).trim();
        const schemaContent = cleanedLiquidContent.substring(schemaIndex);
        
        // Wrap all content in section wrapper with scoped CSS
        const scopedCSS = htmlContent.replace(/<style>/g, '<style>\n#section-{{ section.id }} ').replace(/(\w+)\s*{/g, (match, selector) => {
          if (selector.includes('#section-{{ section.id }}')) return match;
          return `#section-{{ section.id }} ${selector} {`;
        });
        
        const wrappedContent = `<section id="section-{{ section.id }}" class="maertin-hair-care-section">\n${scopedCSS}\n</section>\n\n${schemaContent}`;
        cleanedLiquidContent = wrappedContent;
        console.log('✅ Section wrapper added successfully with scoped CSS');
      } else {
        console.error('⚠️ No schema found - cannot properly wrap content');
      }    } else {
      console.log('✅ Section wrapper already present');
        // Ensure CSS is properly scoped even if section wrapper exists
      if (cleanedLiquidContent.includes('<style>') && !cleanedLiquidContent.includes('#section-{{ section.id }}')) {
        console.log('🔧 Adding CSS scoping to existing styles');
        cleanedLiquidContent = cleanedLiquidContent.replace(/<style>\s*/g, '<style>\n/* Scoped styles for section */\n');
        cleanedLiquidContent = cleanedLiquidContent.replace(/([.#]?[\w\-]+)\s*{/g, (match, selector) => {
          // Skip if already scoped or is a keyframe/media query
          if (selector.includes('#section-{{ section.id }}') || selector.includes('@') || selector.includes('keyframes')) {
            return match;
          }
          return `#section-{{ section.id }} ${selector} {`;
        });
        console.log('✅ CSS scoping applied');
      }
        // Ensure theme editor JavaScript compatibility
      if (cleanedLiquidContent.includes('<script>') && !cleanedLiquidContent.includes('shopify:section:load')) {
        console.log('🔧 Adding theme editor JavaScript compatibility');
        cleanedLiquidContent = cleanedLiquidContent.replace(
          /(<script>\s*)/g, 
          '$1  // Theme editor compatibility\n  document.addEventListener(\'shopify:section:load\', function(e) {\n    if (e.detail.sectionId === \'{{ section.id }}\') {\n      // Re-initialize section functionality\n      console.log(\'Section reloaded in theme editor\');\n    }\n  });\n\n  '
        );
        console.log('✅ Theme editor JS compatibility added');
      }
    }
    
    if (!cleanedLiquidContent.includes('{% schema %}')) {
      console.error('Missing schema in Liquid template');
    }

    if (!cleanedLiquidContent.includes('{% endschema %}')) {
      console.error('Missing endschema in Liquid template');
    }
    if (cleanedLiquidContent.trim().startsWith('{% schema %}')) {
      console.error('AI returned only schema - need to regenerate with HTML structure');
      const htmlStructureCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "system",
          content: "🚨 Convert to SHOPIFY SECTION format. Remove DOCTYPE, html, head, body tags. Start with section content, end with {% schema %}."
        },
        {
          role: "user",
          content: `Convert to SHOPIFY SECTION format (NOT complete HTML page):

Required format:
<!-- Navigation -->
<nav class="navbar">
  <a href="{{ section.settings.link_url }}">{{ section.settings.link_text }}</a>
</nav>
<!-- Hero -->
<section class="hero">
  <h1>{{ section.settings.hero_title }}</h1>
</section>
<!-- All other sections -->
<style>css here</style>
{% schema %}schema here{% endschema %}

HTML to convert:
${htmlContent}

Return SHOPIFY SECTION format with ALL content + schema!`
        }
        ],
        max_tokens: 16000,
        temperature: 0.01,
      });

      const htmlStructureContent = htmlStructureCompletion.choices[0]?.message?.content;
      if (htmlStructureContent && !htmlStructureContent.trim().startsWith('{% schema %}')) {
        console.log('Successfully generated complete HTML structure');
        cleanedLiquidContent = htmlStructureContent;
      }
    }

    const htmlSectionCount = (htmlContent.match(/<(section|div|header|main|footer|article)/gi) || []).length;
    const liquidSectionCount = (cleanedLiquidContent.match(/<(section|div|header|main|footer|article)/gi) || []).length;

    if (liquidSectionCount < htmlSectionCount * 0.5) {
      console.warn('Partial conversion detected - regenerating complete version');

      const completeCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "system",
          content: "🚨 You gave a partial conversion. I need the COMPLETE HTML file converted to Liquid with ALL sections included."
        },
        {
          role: "user",
          content: `You only converted part of the HTML. I need ALL sections converted:

Original HTML has ${htmlSectionCount} sections/divs.
Your conversion only has ${liquidSectionCount} sections.

Convert the COMPLETE HTML file including:
- Header/Navigation
- Hero section
- Products section  
- Testimonials
- Sustainability slides
- Transformations
- Footer
- ALL other sections

COMPLETE HTML to convert:
${htmlContent}

Return COMPLETE conversion with ALL sections!`
        }
        ],
        max_tokens: 16000,
        temperature: 0.01,
      });

      const completeContent = completeCompletion.choices[0]?.message?.content;
      if (completeContent && completeContent.length > cleanedLiquidContent.length * 1.5) {
        console.log('Successfully generated complete conversion');
        cleanedLiquidContent = completeContent;
      }
    }

    const beforeSchemaContent = cleanedLiquidContent.split('{% schema %}')[0].trim();
    if (beforeSchemaContent.length < 500) {
      console.warn('Possible incomplete conversion - missing HTML structure before schema');

      if (beforeSchemaContent.length < 100) {
        console.log('Attempting to regenerate with stronger HTML structure requirements...');

        const structureCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{
            role: "system",
            content: "🚨 CRITICAL: You are returning ONLY schema when you need to return COMPLETE HTML structure converted to Liquid. You MUST include the full HTML template with Liquid variables - NOT just schema alone. Return: HTML structure + CSS + JavaScript + Schema."
          },
          {
            role: "user",
            content: `CRITICAL ERROR: You returned only schema. I need the COMPLETE HTML structure converted to Liquid format.

Required Output:
1. Start with HTML elements (divs, headers, sections, etc.) with Liquid variables
2. Include all CSS styles from original HTML
3. Include all JavaScript from original HTML  
4. End with schema section

Example of what I need:
<div class="hero-section">
  <h1>{{ section.settings.hero_title }}</h1>
  <p>{{ section.settings.hero_description }}</p>
</div>
<style>
/* Original CSS here */
</style>
<script>
/* Original JavaScript here */
</script>
{% schema %}
/* Schema here */
{% endschema %}

Original HTML:
\\\`\\\`\\\`html
${htmlContent}
\\\`\\\`\\\`

Return COMPLETE HTML structure converted to Liquid - NOT just schema!`
          }
          ],
          max_tokens: 16000,
          temperature: 0.01,
        });

        const structureContent = structureCompletion.choices[0]?.message?.content;
        if (structureContent && structureContent.includes('<') && structureContent.length > cleanedLiquidContent.length) {
          console.log('Successfully generated complete HTML structure');
          cleanedLiquidContent = structureContent;
        }
      }
    }

    if (cleanedLiquidContent.includes('{% schema %}')) {
      const schemaMatch = cleanedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);
      if (schemaMatch) {
        try {
          const schemaContent = schemaMatch[1].trim();
          let schemaObj = JSON.parse(schemaContent);
          if (!schemaObj.presets || !Array.isArray(schemaObj.presets)) {
            schemaObj.presets = [
              {
                "name": "Default",
                "category": "Custom"
              }
            ];
          }
          function removeInvalidAttributes(obj) {
            if (Array.isArray(obj)) {
              obj.forEach(item => removeInvalidAttributes(item));
            } else if (obj && typeof obj === 'object') {
              if (obj.settings && Array.isArray(obj.settings)) {
                obj.settings = obj.settings.filter(setting => {
                  if (setting && typeof setting === 'object') {
                    const problematicIds = ['column_links', 'footer_links', 'links_array', 'link_items'];
                    if (problematicIds.includes(setting.id)) {
                      console.warn(`Removing problematic setting with id: ${setting.id}`);
                      return false;
                    }

                    if (setting.id && (setting.id.match(/^link_\d+_(url|text)$/) || setting.id.match(/^social_\d+_(url|text)$/))) {
                      console.log(`Preserving valid link setting: ${setting.id}`);
                    }

                    delete setting.min;
                    delete setting.max;
                    delete setting.step;
                    delete setting.item;

                    if (!setting.type || !setting.id) {
                      console.warn(`Removing invalid setting: ${JSON.stringify(setting)}`);
                      return false;
                    }

                    const invalidTypes = ['column_links', 'links', 'array', 'list', 'items', 'collection'];
                    if (invalidTypes.includes(setting.type)) {
                      console.warn(`Removing setting with invalid type: ${setting.type}`);
                      return false;
                    }
                    const validAttributes = ['type', 'id', 'label', 'default', 'info', 'options', 'placeholder'];
                    Object.keys(setting).forEach(key => {
                      if (!validAttributes.includes(key)) {
                        delete setting[key];
                      }
                    });
                    if (setting.type === 'image_picker') {
                      delete setting.default;
                    } else if (setting.type === 'text' && setting.id && setting.id.includes('image_url') && imageUrls.length > 0) {
                      const imageUrlIndex = Math.floor(Math.random() * imageUrls.length);
                      if (!setting.default || setting.default === 'Sample text' || setting.default === '') {
                        setting.default = imageUrls[imageUrlIndex];
                        console.log(`✅ Set ${setting.id} default to ${imageUrls[imageUrlIndex]}`);
                      }
                    } else if (setting.hasOwnProperty('default')) {
                      if (setting.default === '' || setting.default === null || setting.default === undefined) {
                        switch (setting.type) {
                          case 'text':
                          case 'textarea':
                          case 'richtext':
                            setting.default = setting.label || 'Sample text';
                            break;
                          case 'url':
                            setting.default = '/';
                            break;
                          case 'email':
                            setting.default = 'example@example.com';
                            break;
                          case 'tel':
                            setting.default = '+1 (555) 123-4567';
                            break;
                          case 'number':
                          case 'range':
                            setting.default = 1;
                            break;
                          case 'checkbox':
                            setting.default = false;
                            break;
                          case 'color':
                            setting.default = '#000000';
                            break;
                          case 'select':
                            if (setting.options && setting.options.length > 0) {
                              setting.default = setting.options[0].value || setting.options[0];
                            } else {
                              setting.default = 'option1';
                            }
                            break;
                          default:
                            setting.default = 'Default value';
                        }
                      }
                    }

                    return true;
                  }
                  return false;
                });
              }
              Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'object') {
                  removeInvalidAttributes(obj[key]);
                }
              });

              if (obj.blocks && Array.isArray(obj.blocks)) {
                obj.blocks.forEach(block => {
                  if (block.type === 'footer_column' && block.settings) {
                    const hasColumnTitle = block.settings.some(s => s.id === 'column_title');
                    const hasLinkSettings = block.settings.some(s => s.id && s.id.match(/^link_\d+_(url|text)$/));

                    if (hasColumnTitle && !hasLinkSettings) {
                      console.warn('⚠️ CRITICAL: footer_column block only has column_title but no individual link settings!');
                      console.warn('This will cause missing links in the footer. Adding default link settings...');

                      for (let i = 1; i <= 4; i++) {
                        block.settings.push({
                          "type": "url",
                          "id": `link_${i}_url`,
                          "label": `Link ${i} URL`,
                          "default": "/"
                        });
                        block.settings.push({
                          "type": "text",
                          "id": `link_${i}_text`,
                          "label": `Link ${i} Text`,
                          "default": `Link ${i}`
                        });
                      }
                    }
                  }
                });
              }
            }
          }
          removeInvalidAttributes(schemaObj);

          if (htmlContent.toLowerCase().includes('<footer') && schemaObj.blocks) {
            const footerColumnBlocks = schemaObj.blocks.filter(block => block.type === 'footer_column');
            if (footerColumnBlocks.length > 0) {
              console.log(`Found ${footerColumnBlocks.length} footer_column blocks, verifying rendering...`);

              const footerRenderingRegex = /{% for block in section\.blocks %}[\s\S]*?{% if block\.type == ['"]footer_column['"] %}[\s\S]*?{% endif %}[\s\S]*?{% endfor %}/;
              const hasFooterLoop = footerRenderingRegex.test(cleanedLiquidContent);

              if (!hasFooterLoop) {
                console.warn('⚠️ MISSING footer rendering loop - adding default footer structure');

                const footerSectionMatch = cleanedLiquidContent.match(/<footer[\s\S]*?<\/footer>/);
                if (footerSectionMatch) {
                  const footerSection = footerSectionMatch[0];
                  const originalFooterClasses = footerSection.match(/class="([^"]*)"/) ? footerSection.match(/class="([^"]*)"/)[1] : 'footer-container';
                  const originalColumnClasses = footerSection.match(/<div[^>]*class="([^"]*footer-column[^"]*)"/) ? footerSection.match(/<div[^>]*class="([^"]*footer-column[^"]*)"/)[1] : 'footer-column';

                  const newFooterStructure = `<footer class="${originalFooterClasses}">
  <div class="footer-columns">
    {% for block in section.blocks %}
      {% if block.type == 'footer_column' %}
        <div class="${originalColumnClasses}">
          <h4 class="footer-title">{{ block.settings.column_title }}</h4>
          <ul class="footer-links">
            {% if block.settings.link_1_url != blank and block.settings.link_1_text != blank %}
              <li><a href="{{ block.settings.link_1_url }}">{{ block.settings.link_1_text }}</a></li>
            {% endif %}
            {% if block.settings.link_2_url != blank and block.settings.link_2_text != blank %}
              <li><a href="{{ block.settings.link_2_url }}">{{ block.settings.link_2_text }}</a></li>
            {% endif %}
            {% if block.settings.link_3_url != blank and block.settings.link_3_text != blank %}
              <li><a href="{{ block.settings.link_3_url }}">{{ block.settings.link_3_text }}</a></li>
            {% endif %}
            {% if block.settings.link_4_url != blank and block.settings.link_4_text != blank %}
              <li><a href="{{ block.settings.link_4_url }}">{{ block.settings.link_4_text }}</a></li>
            {% endif %}
            {% if block.settings.link_5_url != blank and block.settings.link_5_text != blank %}
              <li><a href="{{ block.settings.link_5_url }}">{{ block.settings.link_5_text }}</a></li>
            {% endif %}
            {% if block.settings.link_6_url != blank and block.settings.link_6_text != blank %}
              <li><a href="{{ block.settings.link_6_url }}">{{ block.settings.link_6_text }}</a></li>
            {% endif %}
          </ul>
        </div>
      {% endif %}
    {% endfor %}
  </div>
  <div class="footer-bottom">
    <p>&copy; {{ section.settings.copyright_year }} {{ section.settings.company_name }}. {{ section.settings.copyright_text }}</p>
    <div class="footer-bottom-links">
      {% if section.settings.privacy_url != blank %}<a href="{{ section.settings.privacy_url }}">{{ section.settings.privacy_text }}</a>{% endif %}
      {% if section.settings.terms_url != blank %}<a href="{{ section.settings.terms_url }}">{{ section.settings.terms_text }}</a>{% endif %}
    </div>
  </div>
</footer>`;

                  cleanedLiquidContent = cleanedLiquidContent.replace(footerSection, newFooterStructure);
                  console.log('✅ Added proper footer rendering structure');
                }
              }
            }
          }

          cleanedLiquidContent = cleanedLiquidContent.replace(
            /{% schema %}[\s\S]*?{% endschema %}/,
            `{% schema %}\n${JSON.stringify(schemaObj, null, 2)}\n{% endschema %}`
          );
        } catch (e) {
          console.log('Schema JSON parsing error, applying fallback fixes');
          let schemaSection = cleanedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/)[1];
          schemaSection = schemaSection.replace(/,(\s*[}\]])/g, '$1');

          schemaSection = schemaSection.replace(/{\s*"type":\s*"[^"]*",\s*"id":\s*"column_links"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"id":\s*"column_links"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"type":\s*"column_links"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/"min":\s*\d+,?\s*/g, '');
          schemaSection = schemaSection.replace(/"max":\s*\d+,?\s*/g, '');
          schemaSection = schemaSection.replace(/"step":\s*\d+,?\s*/g, '');
          schemaSection = schemaSection.replace(/"item":\s*[^,}]+,?\s*/g, '');

          schemaSection = schemaSection.replace(/"default":\s*""\s*,?/g, '"default": "Sample text",');
          schemaSection = schemaSection.replace(/"default":\s*null\s*,?/g, '"default": "Sample text",');
          schemaSection = schemaSection.replace(/"default":\s*undefined\s*,?/g, '"default": "Sample text",');

          schemaSection = schemaSection.replace(/("type":\s*"image_picker"[^}]*?),\s*"default":\s*"[^"]*"/g, '$1');

          schemaSection = schemaSection.replace(/{\s*"type":\s*"column_links"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"type":\s*"links"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"type":\s*"array"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"type":\s*"list"[^}]*},?/g, '');
          schemaSection = schemaSection.replace(/{\s*"type":\s*"items"[^}]*},?/g, '');

          schemaSection = schemaSection.replace(/{\s*(?![^}]*"type"\s*:)(?![^}]*"id"\s*:)[^}]*},?/g, '');

          schemaSection = schemaSection.replace(/,(\s*,)/g, '$1');
          schemaSection = schemaSection.replace(/,(\s*[}\]])/g, '$1');

          if (!schemaSection.includes('"presets": [')) {
            schemaSection = schemaSection.replace(
              /("blocks":\s*\[[\s\S]*?\]\s*)(}|\s*,\s*"presets")/,
              '$1,\n  "presets": [\n    {\n      "name": "Default",\n      "category": "Custom"\n    }\n  ]$2'
            );
          }

          cleanedLiquidContent = cleanedLiquidContent.replace(
            /{% schema %}[\s\S]*?{% endschema %}/,
            `{% schema %}\n${schemaSection}\n{% endschema %}`
          );
        }
      }
    }

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
    } if (cleanedLiquidContent.includes('{% schema %}')) {
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

      if (cleanedLiquidContent.includes('"presets"') && !cleanedLiquidContent.includes('"presets": [')) {
        cleanedLiquidContent = cleanedLiquidContent.replace(
          /"presets":\s*{/g,
          '"presets": [{'
        );
        cleanedLiquidContent = cleanedLiquidContent.replace(
          /}\s*}\s*{% endschema %}/g,
          '}]}\n{% endschema %}'
        );
      }

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /,(\s*[}\]])/g,
        '$1'
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
   - All form elements: placeholder_text, input_label, etc.   - All contact info: phone, email, address, company_name, etc.
   - All statistics/numbers: stat_1, stat_2, price_text, etc.
   - All star ratings: product_rating, product_reviews, rating_text, etc.
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
- Convert EVERY possible content element to BLOCKS in the JSON template
- Even single elements should be blocks if they might be repeated or customized
- Create blocks for ALL navigation links, footer links, social links, features, services, testimonials, team members, products, gallery items, FAQ items, contact info, addresses, statistics, reviews, awards, partners, benefits, process steps, etc.
- PREFER BLOCKS OVER SECTION SETTINGS whenever possible for maximum flexibility
- Each block should contain ALL its related content (title, description, image, link, etc.)
- This allows admins to add/remove/reorder elements dynamically

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
        "header-icon-search": {
          "type": "header_icon",
          "settings": {
            "icon_type": "search",
            "icon_link": "/search",
            "icon_text": "Search",
            "icon_class": "fas fa-search"
          }
        },
        "header-icon-cart": {
          "type": "header_icon",
          "settings": {
            "icon_type": "cart",
            "icon_link": "/cart",
            "icon_text": "Cart",
            "icon_class": "fas fa-shopping-cart"
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
        "blog-card-1": {
          "type": "blog_card",
          "settings": {
            "title": "Hair Care Tips",
            "description": "Expert advice for healthy hair",
            "link_url": "/blogs/hair-care",
            "link_text": "Read More"
          }
        },
        "newsletter-signup": {
          "type": "newsletter",
          "settings": {
            "title": "Subscribe to Newsletter",
            "description": "Get updates and exclusive offers",
            "placeholder_text": "Enter your email",
            "button_text": "Subscribe",
            "form_action": "/newsletter-signup"
          }
        },
        "social-link-facebook": {
          "type": "social_link",
          "settings": {
            "platform": "Facebook",
            "social_url": "https://facebook.com/brand",
            "icon_class": "fab fa-facebook-f"
          }
        },
        "social-link-instagram": {
          "type": "social_link",
          "settings": {
            "platform": "Instagram", 
            "social_url": "https://instagram.com/brand",
            "icon_class": "fab fa-instagram"
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
        "header-icon-search",
        "header-icon-cart",
        "product-block-1",
        "testimonial-1",
        "testimonial-2",
        "guide-1",
        "blog-card-1",
        "newsletter-signup",
        "social-link-facebook",
        "social-link-instagram",
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
        "footer_phone": "+1 (555) 123-4567",
        "mobile_menu_enabled": true,
        "hamburger_style": "lines",
        "menu_position": "right"
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
        content: `You are a Shopify expert who creates comprehensive page template JSON files that capture ALL dynamic content. 🚨 CRITICAL RULES:
1. Section type must be "${sectionType}" 
2. Block types in JSON must EXACTLY match block types defined in the Liquid schema
3. Parse the Liquid schema first to identify ALL settings (not just block types)
4. Extract REAL content from HTML for ALL settings - no placeholders
5. Count repeating elements and create blocks for each one
6. NEVER add default values to image_picker type fields - keep them empty
7. 🚨 CRITICAL CLIENT REQUIREMENT: For image handling create dual approach:
   - Keep image_picker fields empty as per Shopify standards  
   - Create companion text fields (product_image_url) with extracted URLs from HTML as values
   - This allows: Upload new images OR use existing URLs OR edit URLs manually
   - Example: "product_image": "" AND "product_image_url": "https://extracted-url.jpg"
8. Return valid JSON only, no markdown formatting
9. Ensure ALL section settings and block settings match the Liquid schema exactly
10. Create the exact number of blocks as there are repeating elements in the HTML
11. 🚨 MAXIMIZE BLOCK USAGE: Convert EVERYTHING possible to blocks in JSON for maximum flexibility:
    - Navigation links → header_link blocks
    - Footer links → footer_link blocks  
    - Features → feature blocks
    - Services → service blocks
    - Testimonials → testimonial blocks
    - Team members → team_member blocks
    - Products → product blocks
    - Gallery images → gallery blocks
    - Social links → social_link blocks
    - Contact info → contact_info blocks
    - Statistics → stat blocks
    - Benefits → benefit blocks
    - FAQ items → faq blocks
    - Reviews → review blocks
    - Awards → award blocks
    - Partners → partner blocks
    - Process steps → step blocks    
    - PREFER BLOCKS OVER SECTION SETTINGS for maximum admin flexibility
12. ALWAYS include these standard Shopify styling settings in EVERY section:
    - "heading_size": "h1" (for heading size control)
    - "color_scheme": "scheme-1" (for color scheme selection) 
    - "padding_top": 36 (top padding in pixels)
    - "padding_bottom": 36 (bottom padding in pixels)
    - "margin_top": 0 (top margin)    - "margin_bottom": 0 (bottom margin)
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
21. 🚨 BLOCK PRIORITY RULE: Always prefer creating BLOCKS over section settings when possible - this gives maximum flexibility to admins to add, remove, and reorder content elements dynamically
22. 🚨 CLIENT REQUIREMENT: For text type image settings, extract actual image URLs from HTML. Only image_picker type fields should be empty.`
      },
      {
        role: "user",
        content: jsonPrompt
      }
      ],
      max_tokens: 12000,
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
              const block = jsonData.sections.main.blocks[blockKey]; if (!validBlockTypes.has(block.type)) {
                if (blockKey.includes('header-link') && validBlockTypes.has('header_link')) {
                  block.type = 'header_link';
                } else if (blockKey.includes('header-icon') && validBlockTypes.has('header_icon')) {
                  block.type = 'header_icon';
                } else if (blockKey.includes('social-link') && validBlockTypes.has('social_link')) {
                  block.type = 'social_link';
                } else if (blockKey.includes('blog-card') && validBlockTypes.has('blog_card')) {
                  block.type = 'blog_card';
                } else if (blockKey.includes('newsletter') && validBlockTypes.has('newsletter')) {
                  block.type = 'newsletter';
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
                  if (typeof setting === 'object' && setting.type === 'image_picker' && setting.default) {
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
        ); correctedJsonTemplate = correctedJsonTemplate.replace(
          /("type":\s*"image_picker"[\s\S]*?),\s*"default":\s*"[^"]*"/g,
          '$1'
        );

      }
    }
    if (cleanedLiquidContent.includes('column_links') || cleanedLiquidContent.includes('"type": "links"') || cleanedLiquidContent.includes('"default": ""')) {
      console.warn('Detected remaining problematic settings, applying final cleanup...');

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /{\s*"type":\s*"column_links"[^}]*},?\s*/g,
        ''
      );
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /{\s*"id":\s*"column_links"[^}]*},?\s*/g,
        ''
      );
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /{\s*"type":\s*"links"[^}]*},?\s*/g,
        ''
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /"default":\s*""\s*,?/g,
        '"default": "Sample text",'
      );
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /"default":\s*null\s*,?/g,
        '"default": "Sample text",'
      );
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /"default":\s*undefined\s*,?/g,
        '"default": "Sample text",'
      );
      cleanedLiquidContent = cleanedLiquidContent.replace(/,(\s*,)/g, '$1');
      cleanedLiquidContent = cleanedLiquidContent.replace(/,(\s*[}\]])/g, '$1');
      cleanedLiquidContent = cleanedLiquidContent.replace(/\[\s*,/g, '[');
    }

    if (htmlContent.length > 5000) {
      console.log('🔧 Running client feedback compliance checks...');
      if (correctedJsonTemplate) {
        try {
          const jsonData = JSON.parse(correctedJsonTemplate);
          let hasBlankImages = false;
          let needsHeaderIcons = false;

          if (jsonData.sections?.main?.blocks) {
            Object.keys(jsonData.sections.main.blocks).forEach(blockKey => {
              const block = jsonData.sections.main.blocks[blockKey];
              if (block.settings) {
                Object.keys(block.settings).forEach(settingKey => {
                  if (settingKey.includes('_image') && block.settings[settingKey] === '') {
                    console.warn(`⚠️ Found blank image in ${blockKey}.${settingKey}`);
                    hasBlankImages = true;
                  }
                });
              }
            });

            const hasHeaderIconBlocks = Object.values(jsonData.sections.main.blocks).some(block => block.type === 'header_icon');
            if ((htmlContent.includes('fa-search') || htmlContent.includes('fa-shopping-cart')) && !hasHeaderIconBlocks) {
              console.warn('⚠️ Adding missing header_icon blocks to JSON template...');
              needsHeaderIcons = true;

              if (htmlContent.includes('fa-search')) {
                jsonData.sections.main.blocks['header-icon-search'] = {
                  "type": "header_icon",
                  "settings": {
                    "icon_type": "search",
                    "icon_link": "/search",
                    "icon_class": "fas fa-search"
                  }
                };
              }

              if (htmlContent.includes('fa-shopping-cart')) {
                jsonData.sections.main.blocks['header-icon-cart'] = {
                  "type": "header_icon",
                  "settings": {
                    "icon_type": "cart",
                    "icon_link": "/cart",
                    "icon_class": "fas fa-shopping-cart"
                  }
                };
              }
            }
          }

          if (hasBlankImages || needsHeaderIcons) {
            correctedJsonTemplate = JSON.stringify(jsonData, null, 2);
            if (needsHeaderIcons) {
              console.log('✅ Added missing header_icon blocks to JSON template');
            }
          }

          if (hasBlankImages) {
            console.warn('⚠️ Blank images detected in JSON template');
          }
        } catch (e) {
          console.warn('⚠️ Could not parse JSON for image check:', e.message);
        }
      }

      if (htmlContent.includes('fa-search') || htmlContent.includes('fa-shopping-cart')) {
        if (!cleanedLiquidContent.includes('header_icon') && !correctedJsonTemplate.includes('header_icon')) {
          console.warn('⚠️ Header search/cart icons found but not converted to header_icon blocks');
        }
      }

      if (htmlContent.includes('hamburger') || htmlContent.includes('mobile-menu')) {
        if (!cleanedLiquidContent.includes('hamburger-toggle')) {
          console.warn('⚠️ Mobile menu found but hamburger toggle missing from liquid');
        }
      }

      if (htmlContent.includes('Hair Care Wisdom') || htmlContent.includes('Education')) {
        if (!correctedJsonTemplate.includes('blog_card') && !correctedJsonTemplate.includes('guide') && !correctedJsonTemplate.includes('education')) {
          console.warn('⚠️ Blog/Education content found but not converted to proper blocks');
        }
      }

      if (htmlContent.includes('facebook') || htmlContent.includes('instagram') || htmlContent.includes('social')) {
        if (!correctedJsonTemplate.includes('social_link')) {
          console.warn('⚠️ Social media icons found but not converted to social_link blocks');
        }
      }

      const customClasses = ['luxehair-velvet', 'maroon-shadow'];
      customClasses.forEach(className => {
        if (htmlContent.includes(className) && !cleanedLiquidContent.includes(className)) {
          console.warn(`⚠️ Custom CSS class ${className} missing from liquid output`);
        }
      });

      if (htmlContent.includes('<script>') && !cleanedLiquidContent.includes('<script>')) {
        console.warn('⚠️ JavaScript found in HTML but missing from liquid output');
      }
      console.log('✅ Client feedback compliance check completed');
    }

    if (imageUrls && imageUrls.length > 0) {
      console.log('🖼️ Populating JSON template with extracted image URLs...');

      try {
        const jsonData = JSON.parse(correctedJsonTemplate);
        let imageIndex = 0;

        function updateImageSettings(obj) {
          if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
              if (typeof obj[key] === 'object') {
                updateImageSettings(obj[key]);
              } else if (typeof obj[key] === 'string' && key.includes('image_url') && obj[key] === '' && imageIndex < imageUrls.length) {
                obj[key] = imageUrls[imageIndex];
                console.log(`✅ Set ${key} = ${imageUrls[imageIndex]}`);
                imageIndex++;
              }
            }
          }
        }

        updateImageSettings(jsonData);
        correctedJsonTemplate = JSON.stringify(jsonData, null, 2);

      } catch (e) {
        console.log('JSON parsing error, using regex replacement for image URLs');

        let imageIndex = 0;
        correctedJsonTemplate = correctedJsonTemplate.replace(
          /"([^"]*image_url)":\s*""/g,
          (match, fieldName) => {
            if (imageIndex < imageUrls.length) {
              const url = imageUrls[imageIndex];
              imageIndex++;
              console.log(`✅ Set ${fieldName} = ${url}`);
              return `"${fieldName}": "${url}"`;
            }
            return match;
          }
        );
      }

      console.log('✅ Image URL population completed');
    }    if (imageUrls && imageUrls.length > 0) {
      console.log('🔧 Updating Liquid template to use robust image fallback syntax...');

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /\{\{\s*section\.settings\.([a-zA-Z_][a-zA-Z0-9_]*image)\s*(\|\s*img_url[^}]*)?\s*\}\}/g,
        '{% if section.settings.$1 != blank %}{{ section.settings.$1 | image_url }}{% elsif section.settings.$1_url != blank %}{{ section.settings.$1_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Image{% endif %}'
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /\{\{\s*block\.settings\.([a-zA-Z_][a-zA-Z0-9_]*image)\s*(\|\s*img_url[^}]*)?\s*\}\}/g,
        '{% if block.settings.$1 != blank %}{{ block.settings.$1 | image_url }}{% elsif block.settings.$1_url != blank %}{{ block.settings.$1_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Image{% endif %}'
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /style="([^"]*?)background-image:\s*url\(['"]?\{\{\s*(section|block)\.settings\.([a-zA-Z_][a-zA-Z0-9_]*image[^}]*)\}\}['"]?\)([^"]*?)"/g,
        'style="$1background-image: url(\'{% if $2.settings.$3 != blank %}{{ $2.settings.$3 | image_url }}{% elsif $2.settings.$3_url != blank %}{{ $2.settings.$3_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Background{% endif %}\')$4"'
      );

      cleanedLiquidContent = cleanedLiquidContent.replace(
        /src="\{\{\s*(section|block)\.settings\.([a-zA-Z_][a-zA-Z0-9_]*image[^}]*)\}\}"/g,
        'src="{% if $1.settings.$2 != blank %}{{ $1.settings.$2 | image_url }}{% elsif $1.settings.$2_url != blank %}{{ $1.settings.$2_url }}{% else %}https://via.placeholder.com/400x300/cccccc/666666?text=Image{% endif %}"'
      );      console.log('✅ Liquid template updated with robust dual image approach');
    }    // 🚨 FINAL COMPLIANCE ENFORCEMENT
    console.log('🔧 Final client compliance enforcement...');
    
    // Fix CSS scoping issues
    if (cleanedLiquidContent.includes('<style>')) {
      console.log('🔧 FINAL: Fixing CSS scoping syntax');
      // Fix malformed scoping like ".luxehair-#section-{{ section.id }} velvet"
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /\.([a-zA-Z-]+)-#section-\{\{ section\.id \}\}\s+([a-zA-Z-]+)/g,
        '#section-{{ section.id }} .$1-$2'
      );
      // Fix general scoping issues  
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /([.#][\w-]+):#section-\{\{ section\.id \}\}/g,
        '#section-{{ section.id }} $1'
      );
    }
    
    // Fix Shopify form structure for newsletter
    if (cleanedLiquidContent.includes('<form') && !cleanedLiquidContent.includes('form_type')) {
      console.log('🔧 FINAL: Adding Shopify form structure');
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /<form([^>]*?)>/g,
        '<form method="post" action="/contact#contact_form"$1>\n  <input type="hidden" name="form_type" value="customer">\n  <input type="hidden" name="utf8" value="✓">'
      );
    }
    
    // Add proper alt text to images
    cleanedLiquidContent = cleanedLiquidContent.replace(
      /alt="([^"]*?)"/g,
      'alt="{{ section.settings.$1_alt_text | default: \'$1\' }}"'
    );
    
    // Ensure theme editor JavaScript compatibility
    if (cleanedLiquidContent.includes('<script>') && !cleanedLiquidContent.includes('shopify:section:load')) {
      console.log('🔧 FINAL: Adding missing theme editor JS compatibility');
      cleanedLiquidContent = cleanedLiquidContent.replace(
        /(<script>\s*)/g, 
        '$1  // Theme editor compatibility\n  document.addEventListener(\'shopify:section:load\', function(e) {\n    if (e.detail.sectionId === \'{{ section.id }}\') {\n      // Re-initialize section functionality\n      console.log(\'Section reloaded in theme editor\');\n    }\n  });\n\n  '
      );
    }
    
    // Ensure CDN links are commented for theme.liquid
    if (!cleanedLiquidContent.includes('Add these to theme.liquid')) {
      const cdnComment = `<!-- CDN Links: Add these to theme.liquid <head> section:
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Didot:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap">
-->\n\n`;
      cleanedLiquidContent = cdnComment + cleanedLiquidContent;
    }
    
    console.log('✅ Final compliance enforcement completed');

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
