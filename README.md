# ⚡ Shopify Liquid Template Generator

A comprehensive web application that converts HTML files into complete Shopify Liquid section templates with schema blocks, custom JSON templates, and fully editable settings for the Shopify Theme Editor.

## 🌟 Features

- **Complete Liquid Sections**: Generates single-file Liquid templates with schema blocks and presets
- **Theme Editor Ready**: All content becomes editable in Shopify's visual editor
- **Custom JSON Templates**: Automatically creates matching page templates for specific pages
- **Advanced HTML Validation**: Real-time validation using HTMLHint with detailed error reporting
- **AI-Powered Conversion**: Uses OpenAI GPT-4 to generate production-ready Liquid code
- **Blocks & Settings**: Properly structures repeatable content as blocks with logical limits
- **No Hardcoded Content**: Converts all text, images, and links to dynamic settings
- **Responsive Design**: Maintains full responsiveness across all devices
- **Modern UI**: Beautiful, responsive interface with real-time feedback
- **HTML Preview**: View your HTML before conversion to verify structure
- **Schema Field Indicators**: Visual distinction between required and optional fields
- **Auto Schema Detection**: Warns about existing schema blocks to prevent conflicts
- **Section Type Validation**: Ensures schema types match filenames exactly

## 📋 Schema Field Requirements

### Required Fields ⚠️
These fields are **mandatory** for proper section functionality:

- **Section Name/Title** - Essential for identifying the section in Theme Editor
- **Block Type Fields** - Required for proper block functionality  
- **Primary Content Fields** - Main headings, primary text content
- **Navigation Links** - For sections with navigation elements
- **Form Actions** - For sections containing forms

### Optional Fields ✅  
These fields enhance functionality but have sensible defaults:

- **Description Fields** - Supplementary text content
- **Image Alt Text** - Recommended for accessibility (defaults to filename)
- **Color Scheme Settings** - Will use theme defaults if not specified
- **Advanced Settings** - Additional customization options
- **Decorative Elements** - Icons, dividers, background elements

### Field Identification in Theme Editor:
- **Required fields** are marked with `*` in field labels
- **Optional fields** show helpful placeholder text
- **All fields** include descriptions explaining their purpose
- **Default values** are provided for smoother setup experience

### Best Practices:
1. Always fill required fields first before customizing optional ones
2. Required fields prevent layout breaking if left empty
3. Optional fields can be left empty - they'll gracefully degrade
4. Use descriptive content in required fields for better SEO

## 🎯 Schema Block & Presets System

### Automatic Schema Structure
Every generated Liquid section includes:

- **Valid Schema Block**: `{% schema %}...{% endschema %}` with complete JSON structure
- **Required Presets Section**: Ensures sections appear in Shopify's page dropdown menu
- **Section Type Consistency**: Schema type exactly matches the section filename
- **Proper Naming**: Follows Shopify naming rules (kebab-case, no special characters)

### Schema Conflict Detection
The tool automatically detects and handles existing schema blocks:

- **Existing Schema Warning**: Alerts when schema blocks already exist in your content
- **Duplicate Prevention**: Skips adding new schema if one already exists (configurable)
- **Schema Validation**: Checks for incomplete or malformed schema blocks
- **Type Consistency**: Ensures section type matches filename exactly

### Examples:
```liquid
// File: custom-hero-section.liquid
{% schema %}
{
  "name": "Custom Hero Section",
  "type": "custom-hero-section",  // Matches filename exactly
  "settings": [...],
  "blocks": [...],
  "presets": [{                   // Required for page dropdown
    "name": "Default",
    "blocks": []
  }]
}
{% endschema %}
```

## 👁️ HTML Preview Feature

### Interactive Preview System
Before converting your HTML, you can preview exactly how it will look:

- **🖱️ One-Click Toggle**: Click "👁️ Preview ON/OFF" button after uploading HTML
- **📱 Live Rendering**: See your content rendered in real-time within the editor
- **🎯 Structure Verification**: Quickly spot layout issues or missing elements
- **💾 Preview Persistence**: Toggle on/off as needed while editing
- **🔄 Real-Time Updates**: Preview updates automatically as you modify HTML content

### When to Use Preview:
1. **After File Upload**: Verify the HTML loaded correctly
2. **Before Conversion**: Ensure layout and content are as expected  
3. **During Editing**: Check changes in real-time when pasting new content
4. **Layout Validation**: Confirm responsive design and styling work correctly

### Preview Features:
- **Responsive Layout**: Preview scales appropriately for the container
- **Live Iframe**: Isolated rendering environment prevents conflicts
- **Full HTML Support**: CSS, JavaScript, and all HTML elements render correctly
- **Quick Toggle**: Easily switch between code view and visual preview

## 📊 Schema Field Requirements Visual Indicators

### Real-Time Field Analysis
After conversion, each file displays a comprehensive field requirements panel with:

- **🔴 Red Indicators**: Required fields (critical for functionality)
- **⚪ Gray Indicators**: Optional fields (have defaults or are decorative)  
- **📊 Statistics Display**: Shows total, required, and optional field counts
- **🎯 Block-by-Block Analysis**: Separate indicators for section settings and each block type
- **📋 Toggle Visibility**: Show/hide the indicators panel as needed

### Field Classification Logic:
- **Required Fields**: Text, textarea, titles, headings, button text, navigation links
- **Optional Fields**: Colors, fonts, checkboxes, decorative elements, image pickers
- **Auto-Detection**: Fields with `*` in labels are automatically marked as required

### Example Output:
```
Schema Field Requirements
📊 45 total fields • 28 required • 17 optional

Section Settings:
🔴 Section Title (required)
🔴 Button Text (required)  
⚪ Background Color (optional)

Header Link Block:
🔴 Link Text (required)
🔴 Link URL (required)
⚪ Link Color (optional)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd html-to-liquid
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
copy .env.example .env.local

# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 API Configuration

Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys) and add it to your `.env.local` file.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── convert-html/     # API route for HTML to Liquid conversion
│   ├── globals.css           # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Main page component
└── components/
    └── ErrorPopup.js        # Error popup component
```

## 🎯 How to Use

1. **Upload HTML File**: Click the upload area and select an HTML file, or paste HTML directly into the editor
2. **Validation**: The file will be automatically validated for HTML errors
3. **Convert to Liquid**: Click "Convert to Liquid" to transform HTML into a complete Shopify section
4. **Download Files**:
   - **Section File (.liquid)**: Upload to your theme's `sections/` folder
   - **Custom Template (.json)**: Upload to `templates/` folder for page assignment
   - **Metadata (.json)**: Conversion details and integration instructions

## 🏗️ Generated Output

### Liquid Section File
- Complete single-file Liquid template with schema
- All text, images, and links converted to editable settings
- Blocks for repeatable content (FAQs, testimonials, etc.)
- Responsive design preservation
- Organized with Liquid comments

### Custom Page Template
- Ready-to-use JSON template for page assignment
- Automatically generated when page-specific content is detected
- Allows direct assignment in Shopify Admin

### Shopify Integration
1. Upload the `.liquid` file to `sections/` folder in your theme
2. Upload the `.json` template to `templates/` folder (if provided)
3. All content becomes editable in Theme Editor
4. Assign custom template to specific pages in Shopify Admin

## 🔄 API Endpoints

### POST `/api/convert-html`

Converts HTML content to complete Shopify Liquid section with schema.

**Request Body:**
```json
{
  "htmlContent": "string",
  "fileName": "string"
}
```

**Response:**
```json
{
  "success": true,
  "liquidContent": "string",
  "metadata": {
    "conversion": { ... },
    "statistics": { ... },
    "features": { ... },
    "shopifyIntegration": {
      "sectionFile": { ... },
      "customTemplate": { ... }
    },
    "recommendations": [ ... ]
  }
}
```

## 🛠️ Built With

- **Next.js 15** - React framework
- **OpenAI API** - AI-powered HTML to Liquid conversion with GPT-4
- **HTMLHint** - HTML validation library
- **React 19** - UI library

## 📝 Conversion Features

### What Gets Converted:
- ✅ All hardcoded text → Dynamic settings (text, richtext)
- ✅ All images → Image picker settings with filters
- ✅ All links → URL settings
- ✅ All colors → Color picker settings
- ✅ Repeatable sections → Liquid blocks with limits
- ✅ Form actions → Dynamic URL settings
- ✅ CSS classes → Preserved exactly as-is
- ✅ IDs and data attributes → Kept intact

### Schema Features:
- ✅ Complete settings panel organization
- ✅ Logical field grouping
- ✅ Default values for all settings
- ✅ Proper setting types (text, richtext, image_picker, url, color, select, range)
- ✅ Block limits and validation
- ✅ Presets for Theme Editor

### Shopify Integration:
- ✅ Theme Editor compatible
- ✅ Custom page template generation
- ✅ Metafields ready (future expansion)
- ✅ Responsive design maintained
- ✅ No hardcoded content

## 📁 Example Output Structure

```
your-theme/
├── sections/
│   └── contact-us.liquid          # Main section file
├── templates/
│   └── page.contact-us.json       # Custom page template
└── locales/
    └── en.default.json            # (You can add translations)
```

---

**Perfect for:** Contact pages, About pages, Landing pages, Custom sections, any HTML that needs to be editable in Shopify's Theme Editor.