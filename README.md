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
- **Field Requirements System**: Clear distinction between required and optional schema fields

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