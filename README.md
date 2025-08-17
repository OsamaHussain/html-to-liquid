Repository: osamahussain/html-to-liquid
Files analyzed: 44

Estimated tokens: 131.8k

Directory structure:
└── osamahussain-html-to-liquid/
    ├── README.md
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── src/
    │   ├── app/
    │   │   ├── globals.css
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   └── api/
    │   │       ├── config/
    │   │       │   └── conversion.config.js
    │   │       ├── convert-html/
    │   │       │   └── route.js
    │   │       ├── convert-html-claude/
    │   │       │   └── route.js
    │   │       ├── convert-html-openai/
    │   │       │   └── route.js
    │   │       └── extract-head/
    │   │           └── route.js
    │   ├── components/
    │   │   ├── AIGenerationPopup.js
    │   │   ├── CodeViewer.js
    │   │   ├── ConfirmationPopup.js
    │   │   ├── ConversionSection.js
    │   │   ├── ErrorPopup.js
    │   │   ├── FileUploadSection.js
    │   │   ├── GlobalStyles.js
    │   │   ├── Header.js
    │   │   ├── HowItWorksPopup.js
    │   │   ├── HtmlEditor.js
    │   │   ├── HtmlEditorTabs.js
    │   │   └── SchemaFieldIndicators.js
    │   └── utils/
    │       ├── blockTemplates.js
    │       ├── claudeHtmlToLiquid.js
    │       ├── customHtmlToLiquid.js
    │       ├── downloadHelper.js
    │       ├── featuredProductReplacer.js
    │       ├── filenameValidation.js
    │       ├── fileSchemaConsistency.js
    │       ├── headDeduplication.js
    │       ├── htmlValidation.js
    │       ├── openaiHtmlToLiquid.js
    │       ├── pageTypeDetection.js
    │       ├── quoteEscaping.js
    │       ├── schemaDetection.js
    │       ├── schemaFieldTypes.js
    │       ├── schemaProcessor.js
    │       └── zipGenerator.js
    ├── .github/
    │   └── workflows/
    │       ├── ubuntu-deploy.yml
    │       └── vercel-deploy.yml
    └── .scripts/
        └── deploy.sh


================================================
FILE: README.md
================================================
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


================================================
FILE: jsconfig.json
================================================
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}



================================================
FILE: next.config.mjs
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;



================================================
FILE: package.json
================================================
{
  "name": "html-to-liquid",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.57.0",
    "@monaco-editor/react": "^4.7.0",
    "axios": "^1.10.0",
    "cheerio": "^1.1.0",
    "file-saver": "^2.0.5",
    "htmlhint": "^1.2.0",
    "jszip": "^3.10.1",
    "next": "15.3.2",
    "openai": "^5.0.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}



================================================
FILE: postcss.config.mjs
================================================
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;



================================================
FILE: src/app/globals.css
================================================
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f7fa;
}

html {
  scroll-behavior: smooth;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

input, textarea {
  border: none;
  outline: none;
  font-family: inherit;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.transition {
  transition: all 0.3s ease;
}

.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.rounded {
  border-radius: 8px;
}

.rounded-lg {
  border-radius: 12px;
}

.rounded-xl {
  border-radius: 16px;
}

.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-4 {
  gap: 16px;
}

.gap-8 {
  gap: 32px;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .animated-logo-container {
    flex-direction: column !important;
    text-align: center !important;
    gap: 10px !important;
    padding: 15px 20px !important;
  }
  
  .floating-icon {
    margin-right: 0 !important;
  }
  
  .mobile-stack-buttons {
    flex-direction: column !important;
    width: 100% !important;
    gap: 10px !important;
  }
  
  .mobile-stack-buttons button {
    width: 100% !important;
    justify-content: center !important;
  }
  
  h1, h2, h3 {
    line-height: 1.2 !important;
  }
  
  .popup-mobile {
    margin: 10px !important;
    max-height: 90vh !important;
  }
}

@media (max-width: 640px) {
  * {
    -webkit-overflow-scrolling: touch;
  }
  
  ::selection {
    background-color: rgba(0, 212, 255, 0.3);
  }
  
  input, textarea, select {
    font-size: 16px !important;
    border-radius: 8px;
  }
  
  .mobile-vertical-stack {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  
  .mobile-vertical-stack > * {
    width: 100% !important;
    margin-bottom: 10px !important;
  }
  
  .mobile-compact-spacing {
    padding: clamp(8px, 2vw, 16px) !important;
    margin: clamp(4px, 1vw, 8px) !important;
  }
  
  .mobile-modal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 8px;
  }
  
  .line-numbers {
    display: none !important;
  }
  
  .mobile-code-editor {
    padding: 10px !important;
    font-size: 12px !important;
  }
  
  .mobile-compact-btn {
    padding: 8px 12px !important;
    font-size: 12px !important;
  }
  
  .mobile-filename {
    font-size: 12px !important;
    word-break: break-all !important;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 0 4px;
  }
  
  .ultra-compact {
    font-size: 11px !important;
    padding: 6px 8px !important;
  }
  
  .hide-on-tiny {
    display: none !important;
  }
}

@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px;
    min-width: 44px;
  }
  
  .touch-friendly {
    padding: 12px 16px !important;
  }
}

@media (max-width: 896px) and (orientation: landscape) {
  .landscape-adjust {
    max-height: 60vh !important;
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .high-dpi-text {
    font-weight: 500;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0a0a0f;
    color: #ffffff;
  }
}

.hw-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

*:focus {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}

button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #00ff88;
  outline-offset: 2px;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}


================================================
FILE: src/app/layout.js
================================================
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HTML to Liquid Converter",
  description: "Convert HTML code to Liquid template format",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}



================================================
FILE: src/app/page.js
================================================
"use client";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import FileUploadSection from "../components/FileUploadSection";
import HtmlEditor from "../components/HtmlEditor";
import HtmlEditorTabs from "../components/HtmlEditorTabs";
import ConversionSection from "../components/ConversionSection";
import GlobalStyles from "../components/GlobalStyles";
import HowItWorksPopup from "../components/HowItWorksPopup";
import AIGenerationPopup from "../components/AIGenerationPopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import {
  validateAndExtractHtml,
  validateAllFiles,
} from "../utils/htmlValidation";
import { validateBatchFilenames } from "../utils/filenameValidation";
import { generateAndDownloadZip } from "../utils/zipGenerator";
import { detectExistingSchema } from "../utils/schemaDetection";

export default function Home() {
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [files, setFiles] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [allFileErrors, setAllFileErrors] = useState(null);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [combinedHeadContent, setCombinedHeadContent] = useState("");
  const [currentlyConverting, setCurrentlyConverting] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");
  const [inputSource, setInputSource] = useState("");
  const [showHowItWorksPopup, setShowHowItWorksPopup] = useState(false);
  const [showAIGenerationPopup, setShowAIGenerationPopup] = useState(false);
  const [showSchemaWarningPopup, setShowSchemaWarningPopup] = useState(false);
  const [pendingFilesWithSchema, setPendingFilesWithSchema] = useState([]);
  const [schemaWarningMessage, setSchemaWarningMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleNumberOfFilesChange = (num) => {
    setNumberOfFiles(num);
    if (num === 0) {
      setFiles([]);
    } else {
      setFiles(
        Array.from({ length: num }, (_, index) =>
          index < files.length
            ? files[index]
            : { fileContent: "", fileName: "", isLoading: false }
        )
      );
    }
  };

  const handleFileUpload = (index, fileName, fileContent) => {
    const newFiles = [...files];
    newFiles[index] = { fileName, fileContent, isLoading: false };
    setFiles(newFiles);
    setInputSource("file");
  };

  const handleFileNameChange = (index, fileName) => {
    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], fileName };
    setFiles(newFiles);
  };

  const handleManualInput = (index, text) => {
    setConversionError("");
    setConvertedFiles([]);
    setCombinedHeadContent("");
    setCurrentlyConverting(null);

    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], fileContent: text };
    setFiles(newFiles);
    setInputSource(text.trim() ? "manual" : "");
  };
  const handleClearContent = (index) => {
    const newFiles = [...files];
    newFiles[index] = { fileContent: "", fileName: "", isLoading: false };
    setFiles(newFiles);
    const hasAnyContent = newFiles.some(
      (file) => file.fileContent || file.fileName
    );
    if (!hasAnyContent) {
      setConvertedFiles([]);
      setCombinedHeadContent("");
      setCurrentlyConverting(null);
      setConversionError("");
      setInputSource("");
    }
  };

  const handleValidationError = (error) => {
    setValidationErrors(error);
    setAllFileErrors(null);
    setShowErrorPopup(true);
  };
  const convertToLiquid = async () => {
    const filesWithContent = files.filter((file) => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError("No HTML content to convert");
      return;
    }

    const filesWithoutNames = filesWithContent.filter(
      (file) => !file.fileName || !file.fileName.trim()
    );
    if (filesWithoutNames.length > 0) {
      const fileIndices = filesWithoutNames
        .map((file, i) => {
          const originalIndex = files.findIndex((f) => f === file);
          return `File ${originalIndex + 1}`;
        })
        .join(", ");

      setConversionError(
        `🚫 CONVERSION BLOCKED: Section Names Required!\n\n❌ Missing filenames for: ${fileIndices}\n\n✅ Please enter section names for ALL files before conversion.\n💡 These names become your Shopify .liquid file names.\n\n⚠️ No fallback names allowed - you must provide each filename.`
      );
      setValidationErrors("Missing required filenames - conversion blocked");
      setShowErrorPopup(true);
      return;
    }

    const filesWithSchema = filesWithContent.filter((file) => {
      const schemaDetection = detectExistingSchema(file.fileContent);
      return schemaDetection.hasSchema;
    });

    if (filesWithSchema.length > 0) {
      const fileNames = filesWithSchema
        .map((file, i) => {
          const originalIndex = files.findIndex((f) => f === file);
          return `"${file.fileName || `File ${originalIndex + 1}`}"`;
        })
        .join(", ");

      const warningMessage = `⚠️ Existing Schema Blocks Detected!\n\nThe following files already contain {% schema %} blocks:\n${fileNames}\n\nThe converter will automatically replace these with new schemas. Do you want to continue?\n\n• Choose "Continue" to proceed (existing schemas will be replaced)\n• Choose "Cancel" to review your HTML files first`;

      setPendingFilesWithSchema(filesWithSchema);
      setSchemaWarningMessage(warningMessage);
      setShowSchemaWarningPopup(true);
      return;
    }

    continueValidationAndConversion(filesWithContent);
  };

  const continueValidationAndConversion = (filesWithContent) => {
    const validationResult = validateAllFiles(filesWithContent);

    if (!validationResult.isValid) {
      setAllFileErrors(validationResult.allErrors);
      setValidationErrors("Multiple validation errors found");
      setShowErrorPopup(true);
      setConversionError("Please fix HTML validation errors before converting");
      return;
    }

    const filenames = filesWithContent.map((file) => file.fileName);
    const filenameValidation = validateBatchFilenames(filenames);

    if (!filenameValidation.valid) {
      const errorMessages = filenameValidation.errors
        .map(
          (error) =>
            `File ${error.index + 1} (${error.filename}): ${error.error}. ${
              error.suggestion
            }`
        )
        .join("\n\n");

      setConversionError(`Invalid filenames for Shopify:\n\n${errorMessages}`);
      setValidationErrors("Filename validation errors");
      setShowErrorPopup(true);
      return;
    }

    setShowAIGenerationPopup(true);
  };

  const handleSchemaWarningConfirm = () => {
    setShowSchemaWarningPopup(false);
    const filesWithContent = files.filter((file) => file.fileContent);
    continueValidationAndConversion(filesWithContent);
  };

  const handleSchemaWarningCancel = () => {
    setShowSchemaWarningPopup(false);
    setPendingFilesWithSchema([]);
    setSchemaWarningMessage("");
  };
  const performConversion = async () => {
    setIsConverting(true);
    setConversionError("");
    setConvertedFiles([]);

    const filesWithContent = files.filter((file) => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError("No HTML content to convert");
      setIsConverting(false);
      return;
    }
    try {
      setConvertedFiles([]);
      setCombinedHeadContent("");
      setActiveTab(0);

      const allHeadContents = [];
      const fileNames = [];

      for (let i = 0; i < filesWithContent.length; i++) {
        const file = filesWithContent[i];

        setCurrentlyConverting({
          index: i,
          fileName: file.fileName || `File ${i + 1}`,
          total: filesWithContent.length,
          remaining: filesWithContent.length - i,
        });

        try {
          const headResponse = await fetch("/api/extract-head", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName:
                file.fileName ||
                (inputSource === "manual"
                  ? `manual-input-${i + 1}.html`
                  : `uploaded-file-${i + 1}.html`),
            }),
          });

          const headData = await headResponse.json();
          let headContent = "";
          let headExtractionError = "";

          if (headResponse.ok) {
            headContent = headData.headContent;

            if (headContent && headContent.trim()) {
              allHeadContents.push(headContent);
              fileNames.push(file.fileName || `File ${i + 1}`);
            }
          } else {
            headExtractionError = headData.error || "Head extraction failed";
          }

          const response = await fetch("/api/convert-html", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName:
                file.fileName ||
                (inputSource === "manual"
                  ? `manual-input-${i + 1}.html`
                  : `uploaded-file-${i + 1}.html`),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || `Conversion failed for file ${i + 1}`
            );
          }

          const newResult = {
            originalFile: file,
            liquidContent: data.liquidContent,
            jsonTemplate: data.jsonTemplate,
            fileNames: data.metadata,
            headExtractionError: headExtractionError,
            index: i,
            shopifyInfo: data.shopifyInfo || {},
            sectionName: data.shopifyInfo?.sectionName || `page-${i + 1}`,
            injectedBlocks: data.shopifyInfo?.injectedBlocks || [],
            usedBlockTypes: data.shopifyInfo?.usedBlockTypes || [],
            filenameCorrected: data.shopifyInfo?.filenameCorrected || false,
            processingErrors: data.shopifyInfo?.processingErrors || [],
            validation: data.validation || {},
          };
          setConvertedFiles((prev) => [...prev, newResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
        } catch (fileError) {
          const errorResult = {
            originalFile: file,
            liquidContent: "",
            jsonTemplate: "",
            fileNames: {},
            headExtractionError: fileError.message,
            index: i,
            hasError: true,
          };
          setConvertedFiles((prev) => [...prev, errorResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
        }
      }

      if (allHeadContents.length > 0) {
        console.log(
          "🔄 Combining head content from",
          allHeadContents.length,
          "files..."
        );

        const allResources = new Set();

        allHeadContents.forEach((content, index) => {
          console.log(
            "Processing head content:",
            index,
            "Length:",
            content.length
          );
          console.log("Raw content:", content.substring(0, 500) + "...");

          // Extract resources from between content_for_header and </head>
          const headerMatch = content.match(
            /\{\{\s*content_for_header\s*\}\}([\s\S]*?)<\/head>/i
          );
          if (headerMatch) {
            const headerSection = headerMatch[1].trim();
            console.log("Found header section:", headerSection);

            if (headerSection) {
              // Use regex to extract complete tags instead of line-by-line
              const linkMatches = headerSection.match(/<link[^>]*>/g) || [];
              const scriptMatches =
                headerSection.match(
                  /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/\s*>/g
                ) || [];

              [...linkMatches, ...scriptMatches].forEach((tag) => {
                const trimmedTag = tag.trim();
                if (trimmedTag.includes("http") || trimmedTag.includes("//")) {
                  console.log("Adding header resource:", trimmedTag);
                  allResources.add(trimmedTag);
                }
              });
            }
          }

          // Also extract from "External Resources" comment section
          const externalMatch = content.match(
            /<!--\s*External\s+Resources\s*-->([\s\S]*?)<\/head>/i
          );
          if (externalMatch) {
            const externalSection = externalMatch[1].trim();
            console.log("Found external resources section:", externalSection);

            if (externalSection) {
              // Use regex to extract complete tags instead of line-by-line
              const linkMatches = externalSection.match(/<link[^>]*>/g) || [];
              const scriptMatches =
                externalSection.match(
                  /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/\s*>/g
                ) || [];

              [...linkMatches, ...scriptMatches].forEach((tag) => {
                const trimmedTag = tag.trim();
                if (trimmedTag.includes("http") || trimmedTag.includes("//")) {
                  console.log("Adding external resource:", trimmedTag);
                  allResources.add(trimmedTag);
                }
              });
            }
          }
        });

        const combinedResources = Array.from(allResources).join("\n    ");

        const finalThemeContent = `{%- liquid
  assign use_original_layout = false
  assign request_path = request.path

  if request_path contains '/products/'
    assign use_original_layout = true
  elsif request_path == '/cart'
    assign use_original_layout = true
  elsif request_path contains '/checkout'
    assign use_original_layout = true
  elsif request_path contains '/checkouts/'
    assign use_original_layout = true
  endif
-%}

{% if use_original_layout %}
  <!doctype html>
  <html class="js" lang="{{ request.locale.iso_code }}">
    <head>
      <!-- Original theme.liquid head content -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="theme-color" content="">
      <link rel="canonical" href="{{ canonical_url }}">

      {%- if settings.favicon != blank -%}
        <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
      {%- endif -%}

      {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
        <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
      {%- endunless -%}

      <title>
        {{ page_title }}
        {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
        {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
        {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
      </title>

      {% if page_description %}
        <meta name="description" content="{{ page_description | escape }}">
      {% endif %}

      {% render 'meta-tags' %}

      <script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'pubsub.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-disclosure.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-modal.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'search-form.js' | asset_url }}" defer="defer"></script>

      {%- if settings.animations_reveal_on_scroll -%}
        <script src="{{ 'animations.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {{ content_for_header }}

      {%- liquid
        assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'
        assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'
        assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
      %}

      {% style %}
        {{ settings.type_body_font | font_face: font_display: 'swap' }}
        {{ body_font_bold | font_face: font_display: 'swap' }}
        {{ body_font_italic | font_face: font_display: 'swap' }}
        {{ body_font_bold_italic | font_face: font_display: 'swap' }}
        {{ settings.type_header_font | font_face: font_display: 'swap' }}

        {% for scheme in settings.color_schemes -%}
          {% assign scheme_classes = scheme_classes | append: ', .color-' | append: scheme.id %}
          {% if forloop.index == 1 -%}
            :root,
          {%- endif %}
          .color-{{ scheme.id }} {
            --color-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          {% if scheme.settings.background_gradient != empty %}
            --gradient-background: {{ scheme.settings.background_gradient }};
          {% else %}
            --gradient-background: {{ scheme.settings.background }};
          {% endif %}
          --color-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-background-contrast: {{ background_color_contrast.red }},{{ background_color_contrast.green }},{{ background_color_contrast.blue }};
          --color-shadow: {{ scheme.settings.shadow.red }},{{ scheme.settings.shadow.green }},{{ scheme.settings.shadow.blue }};
          --color-button: {{ scheme.settings.button.red }},{{ scheme.settings.button.green }},{{ scheme.settings.button.blue }};
          --color-button-text: {{ scheme.settings.button_label.red }},{{ scheme.settings.button_label.green }},{{ scheme.settings.button_label.blue }};
          --color-secondary-button: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-secondary-button-text: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-link: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-badge-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-badge-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-badge-border: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --payment-terms-background-color: rgb({{ scheme.settings.background.rgb }});
        }
        {% endfor %}

        {{ scheme_classes | prepend: 'body' }} {
          color: rgba(var(--color-foreground), 0.75);
          background-color: rgb(var(--color-background));
        }

        :root {
          --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
          --font-body-style: {{ settings.type_body_font.style }};
          --font-body-weight: {{ settings.type_body_font.weight }};
          --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};

          --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
          --font-heading-style: {{ settings.type_header_font.style }};
          --font-heading-weight: {{ settings.type_header_font.weight }};

          --font-body-scale: {{ settings.body_scale | divided_by: 100.0 }};
          --font-heading-scale: {{ settings.heading_scale | times: 1.0 | divided_by: settings.body_scale }};

          --media-padding: {{ settings.media_padding }}px;
          --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};
          --media-border-width: {{ settings.media_border_thickness }}px;
          --media-radius: {{ settings.media_radius }}px;
          --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};
          --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;
          --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;
          --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;
          --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};

          --page-width: {{ settings.page_width | divided_by: 10 }}rem;
          --page-width-margin: {% if settings.page_width == '1600' %}2{% else %}0{% endif %}rem;

          --product-card-image-padding: {{ settings.card_image_padding | divided_by: 10.0 }}rem;
          --product-card-corner-radius: {{ settings.card_corner_radius | divided_by: 10.0 }}rem;
          --product-card-text-alignment: {{ settings.card_text_alignment }};
          --product-card-border-width: {{ settings.card_border_thickness | divided_by: 10.0 }}rem;
          --product-card-border-opacity: {{ settings.card_border_opacity | divided_by: 100.0 }};
          --product-card-shadow-opacity: {{ settings.card_shadow_opacity | divided_by: 100.0 }};
          --product-card-shadow-visible: {% if settings.card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --product-card-shadow-horizontal-offset: {{ settings.card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-vertical-offset: {{ settings.card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-blur-radius: {{ settings.card_shadow_blur | divided_by: 10.0 }}rem;

          --collection-card-image-padding: {{ settings.collection_card_image_padding | divided_by: 10.0 }}rem;
          --collection-card-corner-radius: {{ settings.collection_card_corner_radius | divided_by: 10.0 }}rem;
          --collection-card-text-alignment: {{ settings.collection_card_text_alignment }};
          --collection-card-border-width: {{ settings.collection_card_border_thickness | divided_by: 10.0 }}rem;
          --collection-card-border-opacity: {{ settings.collection_card_border_opacity | divided_by: 100.0 }};
          --collection-card-shadow-opacity: {{ settings.collection_card_shadow_opacity | divided_by: 100.0 }};
          --collection-card-shadow-visible: {% if settings.collection_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --collection-card-shadow-horizontal-offset: {{ settings.collection_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-vertical-offset: {{ settings.collection_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-blur-radius: {{ settings.collection_card_shadow_blur | divided_by: 10.0 }}rem;

          --blog-card-image-padding: {{ settings.blog_card_image_padding | divided_by: 10.0 }}rem;
          --blog-card-corner-radius: {{ settings.blog_card_corner_radius | divided_by: 10.0 }}rem;
          --blog-card-text-alignment: {{ settings.blog_card_text_alignment }};
          --blog-card-border-width: {{ settings.blog_card_border_thickness | divided_by: 10.0 }}rem;
          --blog-card-border-opacity: {{ settings.blog_card_border_opacity | divided_by: 100.0 }};
          --blog-card-shadow-opacity: {{ settings.blog_card_shadow_opacity | divided_by: 100.0 }};
          --blog-card-shadow-visible: {% if settings.blog_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --blog-card-shadow-horizontal-offset: {{ settings.blog_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-vertical-offset: {{ settings.blog_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-blur-radius: {{ settings.blog_card_shadow_blur | divided_by: 10.0 }}rem;

          --badge-corner-radius: {{ settings.badge_corner_radius | divided_by: 10.0 }}rem;

          --popup-border-width: {{ settings.popup_border_thickness }}px;
          --popup-border-opacity: {{ settings.popup_border_opacity | divided_by: 100.0 }};
          --popup-corner-radius: {{ settings.popup_corner_radius }}px;
          --popup-shadow-opacity: {{ settings.popup_shadow_opacity | divided_by: 100.0 }};
          --popup-shadow-horizontal-offset: {{ settings.popup_shadow_horizontal_offset }}px;
          --popup-shadow-vertical-offset: {{ settings.popup_shadow_vertical_offset }}px;
          --popup-shadow-blur-radius: {{ settings.popup_shadow_blur }}px;

          --drawer-border-width: {{ settings.drawer_border_thickness }}px;
          --drawer-border-opacity: {{ settings.drawer_border_opacity | divided_by: 100.0 }};
          --drawer-shadow-opacity: {{ settings.drawer_shadow_opacity | divided_by: 100.0 }};
          --drawer-shadow-horizontal-offset: {{ settings.drawer_shadow_horizontal_offset }}px;
          --drawer-shadow-vertical-offset: {{ settings.drawer_shadow_vertical_offset }}px;
          --drawer-shadow-blur-radius: {{ settings.drawer_shadow_blur }}px;

          --spacing-sections-desktop: {{ settings.spacing_sections }}px;
          --spacing-sections-mobile: {% if settings.spacing_sections < 24 %}{{ settings.spacing_sections }}{% else %}{{ settings.spacing_sections | times: 0.7 | round | at_least: 20 }}{% endif %}px;

          --grid-desktop-vertical-spacing: {{ settings.spacing_grid_vertical }}px;
          --grid-desktop-horizontal-spacing: {{ settings.spacing_grid_horizontal }}px;
          --grid-mobile-vertical-spacing: {{ settings.spacing_grid_vertical | divided_by: 2 }}px;
          --grid-mobile-horizontal-spacing: {{ settings.spacing_grid_horizontal | divided_by: 2 }}px;

          --text-boxes-border-opacity: {{ settings.text_boxes_border_opacity | divided_by: 100.0 }};
          --text-boxes-border-width: {{ settings.text_boxes_border_thickness }}px;
          --text-boxes-radius: {{ settings.text_boxes_radius }}px;
          --text-boxes-shadow-opacity: {{ settings.text_boxes_shadow_opacity | divided_by: 100.0 }};
          --text-boxes-shadow-visible: {% if settings.text_boxes_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --text-boxes-shadow-horizontal-offset: {{ settings.text_boxes_shadow_horizontal_offset }}px;
          --text-boxes-shadow-vertical-offset: {{ settings.text_boxes_shadow_vertical_offset }}px;
          --text-boxes-shadow-blur-radius: {{ settings.text_boxes_shadow_blur }}px;

          --buttons-radius: {{ settings.buttons_radius }}px;
          --buttons-radius-outset: {% if settings.buttons_radius > 0 %}{{ settings.buttons_radius | plus: settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-width: {% if settings.buttons_border_opacity > 0 %}{{ settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-opacity: {{ settings.buttons_border_opacity | divided_by: 100.0 }};
          --buttons-shadow-opacity: {{ settings.buttons_shadow_opacity | divided_by: 100.0 }};
          --buttons-shadow-visible: {% if settings.buttons_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --buttons-shadow-horizontal-offset: {{ settings.buttons_shadow_horizontal_offset }}px;
          --buttons-shadow-vertical-offset: {{ settings.buttons_shadow_vertical_offset }}px;
          --buttons-shadow-blur-radius: {{ settings.buttons_shadow_blur }}px;
          --buttons-border-offset: {% if settings.buttons_radius > 0 or settings.buttons_shadow_opacity > 0 %}0.3{% else %}0{% endif %}px;

          --inputs-radius: {{ settings.inputs_radius }}px;
          --inputs-border-width: {{ settings.inputs_border_thickness }}px;
          --inputs-border-opacity: {{ settings.inputs_border_opacity | divided_by: 100.0 }};
          --inputs-shadow-opacity: {{ settings.inputs_shadow_opacity | divided_by: 100.0 }};
          --inputs-shadow-horizontal-offset: {{ settings.inputs_shadow_horizontal_offset }}px;
          --inputs-margin-offset: {% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_opacity > 0 %}{{ settings.inputs_shadow_vertical_offset | abs }}{% else %}0{% endif %}px;
          --inputs-shadow-vertical-offset: {{ settings.inputs_shadow_vertical_offset }}px;
          --inputs-shadow-blur-radius: {{ settings.inputs_shadow_blur }}px;
          --inputs-radius-outset: {% if settings.inputs_radius > 0 %}{{ settings.inputs_radius | plus: settings.inputs_border_thickness }}{% else %}0{% endif %}px;

          --variant-pills-radius: {{ settings.variant_pills_radius }}px;
          --variant-pills-border-width: {{ settings.variant_pills_border_thickness }}px;
          --variant-pills-border-opacity: {{ settings.variant_pills_border_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-opacity: {{ settings.variant_pills_shadow_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-horizontal-offset: {{ settings.variant_pills_shadow_horizontal_offset }}px;
          --variant-pills-shadow-vertical-offset: {{ settings.variant_pills_shadow_vertical_offset }}px;
          --variant-pills-shadow-blur-radius: {{ settings.variant_pills_shadow_blur }}px;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-size: calc(var(--font-body-scale) * 62.5%);
          height: 100%;
        }

        body {
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          grid-template-columns: 100%;
          min-height: 100%;
          margin: 0;
          font-size: 1.5rem;
          letter-spacing: 0.06rem;
          line-height: calc(1 + 0.8 / var(--font-body-scale));
          font-family: var(--font-body-family);
          font-style: var(--font-body-style);
          font-weight: var(--font-body-weight);
        }

        @media screen and (min-width: 750px) {
          body {
            font-size: 1.6rem;
          }
        }
      {% endstyle %}

      {{ 'base.css' | asset_url | stylesheet_tag }}
      <link
        rel="stylesheet"
        href="{{ 'component-cart-items.css' | asset_url }}"
        media="print"
        onload="this.media='all'"
      >

      {%- if settings.cart_type == 'drawer' -%}
        {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
        {{ 'component-cart.css' | asset_url | stylesheet_tag }}
        {{ 'component-totals.css' | asset_url | stylesheet_tag }}
        {{ 'component-price.css' | asset_url | stylesheet_tag }}
        {{ 'component-discounts.css' | asset_url | stylesheet_tag }}
      {%- endif -%}

      {%- unless settings.type_body_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_body_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}
      {%- unless settings.type_header_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}

      {%- if localization.available_countries.size > 1 or localization.available_languages.size > 1 -%}
        {{ 'component-localization-form.css' | asset_url | stylesheet_tag: preload: true }}
        <script src="{{ 'localization-form.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.predictive_search_enabled -%}
        <link
          rel="stylesheet"
          href="{{ 'component-predictive-search.css' | asset_url }}"
          media="print"
          onload="this.media='all'"
        >
      {%- endif -%}

      <script>
        if (Shopify.designMode) {
          document.documentElement.classList.add('shopify-design-mode');
        }
      </script>
    </head>

    <body class="gradient{% if settings.animations_hover_elements != 'none' %} animate--hover-{{ settings.animations_hover_elements }}{% endif %}">
      <a class="skip-to-content-link button visually-hidden" href="#MainContent">
        {{ 'accessibility.skip_to_text' | t }}
      </a>

      {%- if settings.cart_type == 'drawer' -%}
        {%- render 'cart-drawer' -%}
      {%- endif -%}

      {% sections 'header-group' %}

      <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
        {{ content_for_layout }}
      </main>

      {% sections 'footer-group' %}

      <ul hidden>
        <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
        <li id="a11y-new-window-message">{{ 'accessibility.link_messages.new_window' | t }}</li>
      </ul>

      <script>
      window.shopUrl = '{{ request.origin }}';
      window.routes = {
        cart_add_url: '{{ routes.cart_add_url }}',
        cart_change_url: '{{ routes.cart_change_url }}',
        cart_update_url: '{{ routes.cart_update_url }}',
        cart_url: '{{ routes.cart_url }}',
        predictive_search_url: '{{ routes.predictive_search_url }}',
      };

      window.cartStrings = {
        error: \`{{ 'sections.cart.cart_error' | t }}\`,
        quantityError: \`{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}\`,
      };

      window.variantStrings = {
        addToCart: \`{{ 'products.product.add_to_cart' | t }}\`,
        soldOut: \`{{ 'products.product.sold_out' | t }}\`,
        unavailable: \`{{ 'products.product.unavailable' | t }}\`,
        unavailable_with_option: \`{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}\`,
      };

      window.quickOrderListStrings = {
        itemsAdded: \`{{ 'sections.quick_order_list.items_added.other' | t: quantity: '[quantity]' }}\`,
        itemAdded: \`{{ 'sections.quick_order_list.items_added.one' | t: quantity: '[quantity]' }}\`,
        itemsRemoved: \`{{ 'sections.quick_order_list.items_removed.other' | t: quantity: '[quantity]' }}\`,
        itemRemoved: \`{{ 'sections.quick_order_list.items_removed.one' | t: quantity: '[quantity]' }}\`,
        viewCart: \`{{- 'sections.quick_order_list.view_cart' | t -}}\`,
        each: \`{{- 'sections.quick_order_list.each' | t: money: '[money]' }}\`,
      };

      window.accessibilityStrings = {
        imageAvailable: \`{{ 'products.product.media.image_available' | t: index: '[index]' }}\`,
        shareSuccess: \`{{ 'general.share.success_message' | t }}\`,
        pauseSlideshow: \`{{ 'sections.slideshow.pause_slideshow' | t }}\`,
        playSlideshow: \`{{ 'sections.slideshow.play_slideshow' | t }}\`,
        recipientFormExpanded: \`{{ 'recipient.form.expanded' | t }}\`,
        recipientFormCollapsed: \`{{ 'recipient.form.collapsed' | t }}\`,
        countrySelectorSearchCount: \`{{ 'localization.country_results_count' | t: count: '[count]' }}\`,
      };
      </script>

      {%- if settings.predictive_search_enabled -%}
        <script src="{{ 'predictive-search.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.cart_type == 'drawer' -%}
        <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}
    </body>
  </html>

{% else %}
  <!doctype html>
  <html lang="{{ request.locale.iso_code }}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="{{ settings.color_button }}">
      <link rel="canonical" href="{{ canonical_url }}">

      <title>
        {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
      </title>
      <meta name="description" content="{{ page_description | escape }}">

      <!-- CSS -->
      {{ 'base.css' | asset_url | stylesheet_tag }}
      {{ 'theme.css' | asset_url | stylesheet_tag }}

      <!-- Scripts -->
      <script>
        document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      </script>

      {{ content_for_header }}
      ${combinedResources ? "\n    " + combinedResources + "\n    " : ""}
    </head>

  <body class="template-{{ template | handle }}">
    <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {{ content_for_footer }}

    <!-- JavaScript -->
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>
{% endif %}`;

        setCombinedHeadContent(finalThemeContent);
        console.log(
          "✅ Successfully combined resources from all",
          allHeadContents.length,
          "files"
        );
        console.log("📊 Total unique resources found:", allResources.size);
      }
    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
      setCurrentlyConverting(null);
    }
  };
  const createDownload = (content, filename, contentType = "text/plain") => {
    try {
      console.log(`[DOWNLOAD] Starting download for ${filename}`);
      console.log(
        `[DOWNLOAD] Content length: ${content?.length || "undefined"}`
      );
      console.log(`[DOWNLOAD] Content type: ${contentType}`);
      console.log(`[DOWNLOAD] User agent: ${navigator.userAgent}`);

      if (!content) {
        throw new Error("No content provided for download");
      }

      const contentString =
        typeof content === "string"
          ? content
          : JSON.stringify(content, null, 2);
      console.log(`[DOWNLOAD] Final content length: ${contentString.length}`);

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        console.log("[DOWNLOAD] Using IE/Edge msSaveOrOpenBlob method");
        const blob = new Blob([contentString], { type: contentType });
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
      }

      let blobContent = contentString;
      if (
        contentType.includes("text/") ||
        contentType.includes("application/json")
      ) {
        blobContent = "\ufeff" + contentString;
      }

      const blob = new Blob([blobContent], {
        type: contentType + ";charset=utf-8",
      });
      console.log(`[DOWNLOAD] Created blob with size: ${blob.size} bytes`);

      const url = URL.createObjectURL(blob);
      console.log(`[DOWNLOAD] Created blob URL: ${url}`);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      link.setAttribute("download", filename);

      console.log(
        `[DOWNLOAD] Link created with href: ${link.href} and download: ${link.download}`
      );

      if (!link.download || link.download !== filename) {
        console.warn(
          "[DOWNLOAD] Download attribute not properly set, trying alternative approach"
        );
        link.setAttribute("download", filename);
      }

      document.body.appendChild(link);
      console.log("[DOWNLOAD] Link added to DOM");

      console.log("[DOWNLOAD] Attempting to trigger download...");

      try {
        link.click();
        console.log("[DOWNLOAD] Direct click() succeeded");
      } catch (clickError) {
        console.warn("[DOWNLOAD] Direct click() failed:", clickError);

        try {
          const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          link.dispatchEvent(clickEvent);
          console.log("[DOWNLOAD] MouseEvent dispatch succeeded");
        } catch (eventError) {
          console.warn("[DOWNLOAD] MouseEvent dispatch failed:", eventError);

          try {
            link.style.position = "absolute";
            link.style.top = "-1000px";
            link.style.display = "block";
            link.focus();
            link.click();
            console.log("[DOWNLOAD] Focus and click succeeded");
          } catch (focusError) {
            console.error("[DOWNLOAD] All click methods failed:", focusError);
            throw new Error("Could not trigger download");
          }
        }
      }

      setTimeout(() => {
        try {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
          URL.revokeObjectURL(url);
          console.log("[DOWNLOAD] Cleanup completed successfully");
        } catch (cleanupError) {
          console.warn("[DOWNLOAD] Cleanup error:", cleanupError);
        }
      }, 500);

      console.log("[DOWNLOAD] Download process initiated successfully");
      return true;
    } catch (error) {
      console.error("[DOWNLOAD] Primary download method failed:", error);

      if (content && content.length < 1000000) {
        try {
          console.log("[DOWNLOAD] Trying data URL fallback");
          const dataUrl = `data:${contentType};charset=utf-8,${encodeURIComponent(
            content
          )}`;
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("[DOWNLOAD] Data URL fallback succeeded");
          return true;
        } catch (dataUrlError) {
          console.error("[DOWNLOAD] Data URL fallback failed:", dataUrlError);
        }
      }

      try {
        console.log("[DOWNLOAD] Opening new window with content");
        const newWindow = window.open(
          "",
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
        if (newWindow) {
          const escapedContent = content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Download: ${filename}</title>
                <style>
                  body { 
                    font-family: 'Courier New', monospace; 
                    padding: 20px; 
                    line-height: 1.5;
                    background: #f5f5f5;
                  }
                  .header {
                    background: #333;
                    color: white;
                    padding: 15px;
                    margin: -20px -20px 20px -20px;
                  }
                  .content {
                    background: white;
                    padding: 15px;
                    border: 1px solid #ddd;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    max-height: 70vh;
                    overflow: auto;
                  }
                  .instructions {
                    background: #e7f3ff;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-left: 4px solid #2196F3;
                  }
                  button {
                    background: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                    margin: 10px 5px;
                  }
                  button:hover { background: #45a049; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h2>File Download: ${filename}</h2>
                </div>
                <div class="instructions">
                  <strong>Download Instructions:</strong><br>
                  1. Right-click in the content area below<br>
                  2. Select "Save As" or "Save Page As"<br>
                  3. Change the filename to: <strong>${filename}</strong><br>
                  4. Save the file
                </div>
                <button onclick="document.getElementById('content').select(); document.execCommand('copy'); alert('Content copied to clipboard!');">
                  📋 Copy All Content
                </button>
                <button onclick="window.close();">❌ Close Window</button>
                <div class="content" id="content">${escapedContent}</div>
                <script>
                  // Auto-select all content for easy copying
                  function selectAll() {
                    const content = document.getElementById('content');
                    const range = document.createRange();
                    range.selectNodeContents(content);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                  // Auto-focus content area
                  setTimeout(selectAll, 100);
                </script>
              </body>
            </html>
          `);
          newWindow.document.close();
          console.log("[DOWNLOAD] New window opened successfully");
          return true;
        }
      } catch (windowError) {
        console.error("[DOWNLOAD] New window fallback failed:", windowError);
      }

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(content)
            .then(() => {
              alert(
                `❌ Download failed, but content has been copied to clipboard!\n\n📝 Instructions:\n1. Open a text editor\n2. Paste the content (Ctrl+V)\n3. Save as "${filename}"\n\nContent length: ${content.length} characters`
              );
            })
            .catch(() => {
              throw new Error("Clipboard write failed");
            });
          console.log("[DOWNLOAD] Content copied to clipboard as fallback");
          return true;
        } else {
          throw new Error("Clipboard API not available");
        }
      } catch (clipboardError) {
        console.error("[DOWNLOAD] Clipboard fallback failed:", clipboardError);
      }

      alert(
        `❌ Download failed!\n\n📝 Manual Instructions:\n1. Copy the content from the code viewer\n2. Open a text editor\n3. Paste the content\n4. Save as "${filename}"\n\nError: ${error.message}\n\nPlease check browser console for more details.`
      );
      console.error("[DOWNLOAD] All fallback methods failed");
      return false;
    }
  };

  const downloadLiquidFile = (convertedFile) => {
    try {
      console.log("downloadLiquidFile called with:", convertedFile);
      setDownloadStatus("Preparing Liquid file download...");

      if (!convertedFile || !convertedFile.liquidContent) {
        console.error("No liquid content to download");
        setConversionError("No liquid content available for download");
        setDownloadStatus(null);
        return;
      }

      const fileName =
        convertedFile.fileNames?.liquidFileName ||
        (convertedFile.originalFile?.fileName
          ? convertedFile.originalFile.fileName.replace(".html", ".liquid")
          : "converted.liquid");

      const success = createDownload(
        convertedFile.liquidContent,
        fileName,
        "text/plain"
      );
      if (success) {
        setDownloadStatus(`✅ ${fileName} download started!`);
        setTimeout(() => setDownloadStatus(null), 3000);
      } else {
        setDownloadStatus("❌ Download failed - check browser console");
        setTimeout(() => setDownloadStatus(null), 5000);
      }
      console.log("Liquid file download initiated successfully");
    } catch (error) {
      console.error("Error downloading liquid file:", error);
      setConversionError(`Failed to download liquid file: ${error.message}`);
      setDownloadStatus("❌ Download error occurred");
      setTimeout(() => setDownloadStatus(null), 5000);
    }
  };
  const downloadJsonFile = (convertedFile) => {
    try {
      console.log("downloadJsonFile called with:", convertedFile);
      setDownloadStatus("Preparing JSON file download...");

      if (!convertedFile || !convertedFile.jsonTemplate) {
        console.error("No JSON content to download");
        setConversionError("No JSON template available for download");
        setDownloadStatus(null);
        return;
      }

      const fileName =
        convertedFile.fileNames?.jsonFileName ||
        (convertedFile.originalFile?.fileName
          ? `page.${convertedFile.originalFile.fileName
              .replace(".html", "")
              .replace(/[^a-zA-Z0-9-_]/g, "-")}.json`
          : "page.custom.json");

      const success = createDownload(
        convertedFile.jsonTemplate,
        fileName,
        "application/json"
      );
      if (success) {
        setDownloadStatus(`✅ ${fileName} download started!`);
        setTimeout(() => setDownloadStatus(null), 3000);
      } else {
        setDownloadStatus("❌ Download failed - check browser console");
        setTimeout(() => setDownloadStatus(null), 5000);
      }
      console.log("JSON file download initiated successfully");
    } catch (error) {
      console.error("Error downloading JSON file:", error);
      setConversionError(`Failed to download JSON file: ${error.message}`);
      setDownloadStatus("❌ Download error occurred");
      setTimeout(() => setDownloadStatus(null), 5000);
    }
  };
  const downloadHeadFile = (convertedFile) => {
    if (!convertedFile.headContent) return;

    const blob = new Blob([convertedFile.headContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile.originalFile?.fileName
      ? `${convertedFile.originalFile.fileName.replace(
          ".html",
          ""
        )}-head.liquid`
      : `head-section-${convertedFile.index + 1}.liquid`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCombinedHeadFile = () => {
    try {
      console.log("downloadCombinedHeadFile called");

      if (!combinedHeadContent || !combinedHeadContent.trim()) {
        console.error("No combined head content to download");
        setConversionError("No combined head content available for download");
        return;
      }

      createDownload(
        combinedHeadContent,
        "combined-theme-head.liquid",
        "text/plain"
      );
      console.log("Combined head file download initiated successfully");
    } catch (error) {
      console.error("Error downloading combined head file:", error);
      setConversionError(
        `Failed to download combined head file: ${error.message}`
      );
    }
  };

  const downloadAllAsZip = async () => {
    if (convertedFiles.length === 0) {
      setConversionError("No converted files to download");
      return;
    }

    try {
      const result = await generateAndDownloadZip(
        convertedFiles,
        combinedHeadContent,
        "shopify-files.zip"
      );

      if (!result.success) {
        setConversionError(`Failed to generate ZIP: ${result.error}`);
      }
    } catch (error) {
      setConversionError(`ZIP generation error: ${error.message}`);
    }
  };

  const handleHowItWorksClick = () => {
    setShowHowItWorksPopup(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <GlobalStyles />
      <Header onHowItWorksClick={handleHowItWorksClick} />

      {/* Download Status Indicator */}
      {downloadStatus && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            background: downloadStatus.includes("✅")
              ? "rgba(76, 175, 80, 0.9)"
              : "rgba(244, 67, 54, 0.9)",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 9999,
            fontSize: "14px",
            fontWeight: "600",
            maxWidth: "300px",
            wordWrap: "break-word",
          }}
        >
          {downloadStatus}
        </div>
      )}

      <div
        className="container"
        style={{
          paddingBottom: "40px",
        }}
      >
        <FileUploadSection
          numberOfFiles={numberOfFiles}
          onNumberOfFilesChange={handleNumberOfFilesChange}
        />
        {files.length > 0 && (
          <HtmlEditorTabs
            files={files}
            handleManualInput={handleManualInput}
            onFileUpload={handleFileUpload}
            onClearContent={handleClearContent}
            onValidationError={handleValidationError}
            onFileNameChange={handleFileNameChange}
          />
        )}
        <ConversionSection
          files={files}
          isConverting={isConverting}
          currentlyConverting={currentlyConverting}
          conversionError={conversionError}
          convertedFiles={convertedFiles}
          combinedHeadContent={combinedHeadContent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          convertToLiquid={convertToLiquid}
          downloadLiquidFile={downloadLiquidFile}
          downloadJsonFile={downloadJsonFile}
          downloadHeadFile={downloadHeadFile}
          downloadCombinedHeadFile={downloadCombinedHeadFile}
          downloadAllAsZip={downloadAllAsZip}
        />
      </div>
      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => {
          setShowErrorPopup(false);
          setAllFileErrors(null);
        }}
        fileName={files.find((f) => f.fileContent)?.fileName || ""}
        allFileErrors={allFileErrors}
      />
      <HowItWorksPopup
        isOpen={showHowItWorksPopup}
        onClose={() => setShowHowItWorksPopup(false)}
      />

      <AIGenerationPopup
        isVisible={showAIGenerationPopup}
        onClose={() => setShowAIGenerationPopup(false)}
        onConfirm={() => {
          setShowAIGenerationPopup(false);
          performConversion();
        }}
      />

      <ConfirmationPopup
        isOpen={showSchemaWarningPopup}
        onConfirm={handleSchemaWarningConfirm}
        onCancel={handleSchemaWarningCancel}
        title="Schema Blocks Detected"
        message={schemaWarningMessage}
        confirmText="Continue"
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
}



================================================
FILE: src/app/api/config/conversion.config.js
================================================
/**
 * HTML to Liquid Conversion Configuration
 *
 * Simple ON/OFF control for conversion behavior:
 *
 * CONVERSION_MODE:
 * - "OPENAI_FIRST": OpenAI API first, then custom conversion (current behavior)
 * - "CLAUDE_FIRST": Claude API first, then custom conversion
 * - "CUSTOM_ONLY": Skip AI, direct custom conversion only
 */

// ===============================================
// MAIN CONFIGURATION - Change this to control behavior
// ===============================================

export const CONVERSION_MODE = "OPENAI_FIRST";
// export const CONVERSION_MODE = "CLAUDE_FIRST";
// export const CONVERSION_MODE = "CUSTOM_ONLY";

// ===============================================
// Additional Settings (Optional)
// ===============================================

export const CONFIG = {
  // Size limit for OpenAI conversion (lines)
  SIZE_LIMIT: 1500,

  // Wait time when content exceeds size limit (milliseconds)
  WAIT_TIME: 120000, // 2 minutes

  // Enable/disable console logs
  ENABLE_LOGS: true,
};

// ===============================================
// Helper Functions
// ===============================================

export function shouldUseOpenAI() {
  return CONVERSION_MODE === "OPENAI_FIRST";
}

export function shouldUseClaude() {
  return CONVERSION_MODE === "CLAUDE_FIRST";
}

export function isCustomOnlyMode() {
  return CONVERSION_MODE === "CUSTOM_ONLY";
}

export function getConfig() {
  return {
    mode: CONVERSION_MODE,
    useOpenAI: shouldUseOpenAI(),
    useClaude: shouldUseClaude(),
    customOnly: isCustomOnlyMode(),
    ...CONFIG,
  };
}



================================================
FILE: src/app/api/convert-html/route.js
================================================
import { NextResponse } from "next/server";
import {
  validateShopifyFilename,
  generateShopifyPaths,
} from "../../../utils/filenameValidation";
import { generateZip, addFileComment } from "../../../utils/zipGenerator";
import { fixSchemaQuotesInLiquid } from "../../../utils/quoteEscaping";
import { fixFileSchemaConsistency } from "../../../utils/fileSchemaConsistency";
import { generateLiquidTemplate } from "../../../utils/customHtmlToLiquid";
import {
  generateLiquidWithOpenAI,
  checkOpenAIConnection,
} from "../../../utils/openaiHtmlToLiquid";
import {
  generateLiquidWithClaude,
  checkClaudeConnection,
} from "../../../utils/claudeHtmlToLiquid";
import { shouldUseOpenAI, shouldUseClaude, getConfig } from "../config/conversion.config.js";

export async function POST(request) {
  try {
    const { htmlContent, fileName } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    if (!fileName || !fileName.trim()) {
      return NextResponse.json(
        {
          error:
            "Filename is required for conversion. Please provide a section name before proceeding.",
        },
        { status: 400 }
      );
    }

    let finalFileName = fileName.trim();
    let filenameCorrected = false;
    const processingErrors = [];

    const filenameValidation = validateShopifyFilename(finalFileName);

    if (!filenameValidation.valid) {
      return NextResponse.json(
        {
          error: "Invalid filename for Shopify",
          details: filenameValidation.error,
          suggestion: filenameValidation.suggestions,
        },
        { status: 400 }
      );
    }

    if (
      filenameValidation.sanitized !== finalFileName.replace(/\.html?$/i, "")
    ) {
      finalFileName = filenameValidation.sanitized;
      filenameCorrected = true;
    } else {
      finalFileName = filenameValidation.sanitized;
    }

    const shopifyPaths = generateShopifyPaths(finalFileName);

    const config = getConfig();
    const useOpenAI = shouldUseOpenAI();
    const useClaude = shouldUseClaude();

    const htmlLines = htmlContent.split("\n").length;
    if (config.ENABLE_LOGS) {
      console.log(`📏 [SIZE CHECK] HTML content has ${htmlLines} lines`);
      console.log(`⚙️ [CONFIG] Conversion mode: ${config.mode}`);
    }

    let aiResult = null;
    let skippedAI = false;

    if (!useOpenAI && !useClaude) {
      if (config.ENABLE_LOGS) {
        console.log(
          "⚙️ [CONFIG] CUSTOM_ONLY mode enabled - skipping AI conversion"
        );
        console.log("🎯 [CUSTOM ONLY] Converting with custom algorithm only");
      }

      skippedAI = true;
      aiResult = {
        success: false,
        skipped: true,
        reason: "CUSTOM_ONLY mode enabled in configuration",
        metadata: {
          skippedAt: new Date().toISOString(),
          configMode: config.mode,
        },
      };
    } else if (htmlLines > config.SIZE_LIMIT) {
      if (config.ENABLE_LOGS) {
        console.log(
          `⚠️ [SIZE LIMIT] HTML content exceeds ${config.SIZE_LIMIT} lines - skipping AI conversion`
        );
        console.log(
          `⏰ [WAIT] Waiting ${
            config.WAIT_TIME / 1000
          } seconds before starting custom conversion...`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, config.WAIT_TIME));

      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [WAIT COMPLETE] ${
            config.WAIT_TIME / 1000
          } seconds elapsed - starting custom conversion`
        );
        console.log("🎯 [CUSTOM ONLY] Converting with custom algorithm only");
      }

      skippedAI = true;
      aiResult = {
        success: false,
        skipped: true,
        reason: `Content exceeds ${config.SIZE_LIMIT} lines`,
        metadata: { skippedAt: new Date().toISOString() },
      };
    } else {
      const aiProvider = useOpenAI ? "OpenAI" : "Claude";
      const aiModel = useOpenAI ? "GPT-4o" : "Claude-3.5-Sonnet";
      
      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [SIZE CHECK] HTML content within limits - proceeding with ${aiProvider} conversion`
        );
        console.log(
          `🔍 [PRECHECK] Checking ${aiProvider} API status before conversion...`
        );
      }

      let apiStatus;
      if (useOpenAI) {
        apiStatus = await checkOpenAIConnection();
      } else {
        apiStatus = await checkClaudeConnection();
      }

      if (!apiStatus.isWorking) {
        if (config.ENABLE_LOGS) {
          console.log(
            `❌ [PRECHECK] ${aiProvider} API not working:`,
            apiStatus.error
          );
          console.log(
            `🚫 [BLOCKED] Custom conversion blocked - ${aiProvider} API must be working`
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: ${aiProvider} API is required but not working`,
            details: apiStatus.error,
            status: apiStatus.status,
            apiStatus: "failed",
          },
          { status: 503 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log(
          `✅ [PRECHECK] ${aiProvider} API is working - proceeding with conversion`
        );
        console.log(
          `🤖 [STEP 1] Starting ${aiProvider} HTML-to-Liquid conversion first...`
        );
      }

      if (useOpenAI) {
        aiResult = await generateLiquidWithOpenAI(htmlContent, finalFileName);
      } else {
        aiResult = await generateLiquidWithClaude(htmlContent, finalFileName);
      }

      if (!aiResult.success) {
        if (config.ENABLE_LOGS) {
          console.log(
            `❌ [STEP 1] ${aiProvider} conversion failed:`,
            aiResult.error
          );
          console.log(
            `🚫 [BLOCKED] Custom conversion blocked - ${aiProvider} conversion must complete first`
          );
        }

        return NextResponse.json(
          {
            error: `Conversion blocked: ${aiProvider} conversion failed`,
            details: aiResult.error,
            step: `${aiProvider.toLowerCase()}_conversion`,
            apiStatus: "conversion_failed",
          },
          { status: 500 }
        );
      }

      if (config.ENABLE_LOGS) {
        console.log(`✅ [STEP 1] ${aiProvider} conversion completed successfully`);
        console.log(
          `📊 [STEP 1] ${aiProvider} Usage - Tokens:`,
          aiResult.metadata.totalTokens
        );
      }
    }

    if (config.ENABLE_LOGS) {
      console.log(
        "🎯 [STEP 2] Now starting custom HTML-to-Liquid conversion..."
      );
    }
    const conversionResult = generateLiquidTemplate(htmlContent, finalFileName);

    let liquidContent = conversionResult.liquidContent;
    let jsonTemplate = conversionResult.jsonTemplate;
    let injectedBlocks = conversionResult.schema.blocks || [];
    let usedBlockTypes = injectedBlocks.map((block) => block.type);

    const pageType = conversionResult.pageType;
    const templateStructure = conversionResult.templateStructure;

    const aiProvider = useOpenAI ? "OpenAI" : useClaude ? "Claude" : "None";
    
    if (skippedAI) {
      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [STEP 2] Custom conversion completed successfully for:",
          finalFileName
        );
        console.log(
          "🎯 [PAGE TYPE] Detected page type:",
          pageType?.type || "page"
        );
        console.log(
          "📁 [TEMPLATE] Template structure:",
          templateStructure?.templateType || "page"
        );
        console.log(
          "🎉 [COMPLETE] Custom conversion finished (AI skipped:",
          aiResult.reason + ")"
        );
      }
    } else {
      if (config.ENABLE_LOGS) {
        console.log(
          "✅ [STEP 2] Custom conversion completed successfully for:",
          finalFileName
        );
        console.log(
          "🎯 [PAGE TYPE] Detected page type:",
          pageType?.type || "page"
        );
        console.log(
          "📁 [TEMPLATE] Template structure:",
          templateStructure?.templateType || "page"
        );
        console.log(
          `🎉 [COMPLETE] Both ${aiProvider} and Custom conversions finished - returning Custom results`
        );
      }
    }

    try {
      const quoteFixResult = fixSchemaQuotesInLiquid(liquidContent);
      if (quoteFixResult.success) {
        liquidContent = quoteFixResult.content;
        if (quoteFixResult.issues && quoteFixResult.issues.length > 0) {
          processingErrors.push(
            `Fixed ${quoteFixResult.issues.length} quote issue${
              quoteFixResult.issues.length !== 1 ? "s" : ""
            } in schema`
          );
        }
      } else if (quoteFixResult.error) {
        processingErrors.push(
          `Quote escaping warning: ${quoteFixResult.error}`
        );
      }
    } catch (quoteError) {
      console.error("Quote escaping error:", quoteError);
      processingErrors.push(`Quote escaping failed: ${quoteError.message}`);
    }

    try {
      const consistencyResult = fixFileSchemaConsistency(
        finalFileName,
        liquidContent,
        jsonTemplate
      );

      if (consistencyResult.success) {
        if (consistencyResult.changes && consistencyResult.changes.length > 0) {
          liquidContent = consistencyResult.liquidContent;
          jsonTemplate = consistencyResult.jsonContent;
          processingErrors.push(
            `Consistency fixes: ${consistencyResult.changes.join(", ")}`
          );
        }
      }
    } catch (consistencyError) {
      console.error("Consistency validation error:", consistencyError);
      processingErrors.push(
        `Consistency validation failed: ${consistencyError.message}`
      );
    }
    const liquidWithComments = addFileComment(liquidContent || "", {
      fileName: `${finalFileName}.liquid`,
      generatedAt: new Date().toISOString(),
      converter: "Custom HTML-to-Liquid Converter",
      note: "Deterministic conversion - consistent output every time",
      pageType: pageType?.type || "page",
      templateType: templateStructure?.templateType || "page",
      hasLoop: pageType?.hasLoop || false,
    });

    const jsonTemplateFileName = templateStructure
      ? templateStructure.json.split("/").pop()
      : `page.${finalFileName}.json`;

    const jsonWithComments = addFileComment(jsonTemplate || "{}", {
      fileName: jsonTemplateFileName,
      generatedAt: new Date().toISOString(),
      converter: "Custom HTML-to-Liquid Converter",
      pageType: pageType?.type || "page",
      templateType: templateStructure?.templateType || "page",
    });

    const validationInfo = {
      hasSchema: liquidContent && liquidContent.includes("{% schema %}"),
      hasStylesheet:
        liquidContent && liquidContent.includes("{% stylesheet %}"),
      hasJavascript: liquidContent && liquidContent.includes("<script>"),
      liquidLineCount: liquidContent ? liquidContent.split("\n").length : 0,
      jsonLineCount: jsonTemplate.split("\n").length,
      conversionMethod: "custom-deterministic",
      conversionMode: config.mode,
      aiGenerationCompleted: aiResult?.success || false,
      aiSkipped: skippedAI,
      aiSkipReason: skippedAI ? aiResult.reason : null,
      aiMetadata: aiResult?.metadata || null,
      aiProvider: aiProvider,
      apiValidated: !skippedAI,
      sequentialProcessing: !skippedAI,
      inputLines: htmlLines,
      sizeLimitApplied: htmlLines > config.SIZE_LIMIT,
      configUsed: config,
      featuredProducts: conversionResult.featuredProducts || {
        hasProducts: false,
      },
    };

    return NextResponse.json({
      success: true,
      liquidContent: liquidWithComments,
      jsonTemplate: jsonWithComments,
      headContent: conversionResult.headContent,
      validation: validationInfo,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        filenameCorrected: filenameCorrected,
        injectedBlocks: injectedBlocks,
        usedBlockTypes: usedBlockTypes,
        processingErrors: processingErrors,
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: jsonTemplateFileName,
        sectionType: finalFileName,
        pageType: pageType?.type || "page",
        templateType: templateStructure?.templateType || "page",
        hasLoop: pageType?.hasLoop || false,
        loopType: pageType?.loopType || null,
        detectionReason: pageType?.reason || "Default page template",
        htmlSize: htmlContent.length,
        htmlLines: htmlLines,
        conversionMethod: "Custom Deterministic Converter",
        conversionMode: config.mode,
        aiGenerationEnabled: !skippedAI,
        aiSkipped: skippedAI,
        aiSkipReason: skippedAI ? aiResult.reason : null,
        aiTokensUsed: aiResult?.metadata?.totalTokens || 0,
        aiProvider: aiProvider,
        processingSequence: skippedAI
          ? config.mode === "CUSTOM_ONLY"
            ? "Custom-Only-By-Config"
            : "Custom-Only-After-Wait"
          : `${aiProvider}-First-Then-Custom`,
        waitTimeApplied:
          skippedAI && (config.mode === "OPENAI_FIRST" || config.mode === "CLAUDE_FIRST")
            ? `${config.WAIT_TIME / 1000} seconds`
            : null,
        configurationUsed: config,
        featuredProducts: conversionResult.featuredProducts || {
          hasProducts: false,
        },
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);

    return NextResponse.json(
      { error: `Conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}



================================================
FILE: src/app/api/convert-html-claude/route.js
================================================
import { NextResponse } from 'next/server';
import { generateLiquidWithClaude } from '../../../utils/claudeHtmlToLiquid';
import { validateShopifyFilename, generateShopifyPaths } from '../../../utils/filenameValidation';

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
        { error: 'Filename is required for conversion' },
        { status: 400 }
      );
    }

    if (!process.env.CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key is not configured' },
        { status: 500 }
      );
    }

    let finalFileName = fileName.trim();
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

    finalFileName = filenameValidation.sanitized;

    const shopifyPaths = generateShopifyPaths(finalFileName);

    console.log('🤖 Starting Claude HTML-to-Liquid conversion with Claude-3.5-Sonnet for:', finalFileName);

    const claudeResult = await generateLiquidWithClaude(htmlContent, finalFileName);

    if (!claudeResult.success) {
      return NextResponse.json(
        { error: `Claude conversion failed: ${claudeResult.error}` },
        { status: 500 }
      );
    }

    console.log('✅ Claude conversion completed successfully');

    const validationInfo = {
      hasSchema: claudeResult.liquidContent && claudeResult.liquidContent.includes('{% schema %}'),
      hasStylesheet: claudeResult.liquidContent && claudeResult.liquidContent.includes('{% stylesheet %}'),
      hasJavascript: claudeResult.liquidContent && claudeResult.liquidContent.includes('<script>'),
      liquidLineCount: claudeResult.liquidContent ? claudeResult.liquidContent.split('\n').length : 0,
      jsonLineCount: claudeResult.jsonTemplate.split('\n').length,
      conversionMethod: 'claude-3.5-sonnet'
    };

    return NextResponse.json({
      success: true,
      liquidContent: claudeResult.liquidContent,
      jsonTemplate: claudeResult.jsonTemplate,
      validation: validationInfo,
      claudeMetadata: claudeResult.metadata,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        conversionMethod: 'Claude 3.5 Sonnet'
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length,
        conversionMethod: 'Claude 3.5 Sonnet Converter',
        tokensUsed: claudeResult.metadata.totalTokens
      }
    });

  } catch (error) {
    console.error('Claude conversion error:', error);

    return NextResponse.json(
      { error: `Claude conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}



================================================
FILE: src/app/api/convert-html-openai/route.js
================================================
import { NextResponse } from 'next/server';
import { generateLiquidWithOpenAI } from '../../../utils/openaiHtmlToLiquid';
import { validateShopifyFilename, generateShopifyPaths } from '../../../utils/filenameValidation';

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
        { error: 'Filename is required for conversion' },
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

    finalFileName = filenameValidation.sanitized;
    const shopifyPaths = generateShopifyPaths(finalFileName);

    console.log('🤖 Starting OpenAI HTML-to-Liquid conversion with GPT-5 for:', finalFileName);

    const openaiResult = await generateLiquidWithOpenAI(htmlContent, finalFileName);

    if (!openaiResult.success) {
      return NextResponse.json(
        { error: `OpenAI conversion failed: ${openaiResult.error}` },
        { status: 500 }
      );
    }

    console.log('✅ OpenAI conversion completed successfully');

    const validationInfo = {
      hasSchema: openaiResult.liquidContent && openaiResult.liquidContent.includes('{% schema %}'),
      hasStylesheet: openaiResult.liquidContent && openaiResult.liquidContent.includes('{% stylesheet %}'),
      hasJavascript: openaiResult.liquidContent && openaiResult.liquidContent.includes('<script>'),
      liquidLineCount: openaiResult.liquidContent ? openaiResult.liquidContent.split('\n').length : 0,
      jsonLineCount: openaiResult.jsonTemplate.split('\n').length,
      conversionMethod: 'openai-gpt5'
    };

    return NextResponse.json({
      success: true,
      liquidContent: openaiResult.liquidContent,
      jsonTemplate: openaiResult.jsonTemplate,
      validation: validationInfo,
      openaiMetadata: openaiResult.metadata,
      shopifyInfo: {
        sectionName: finalFileName,
        liquidPath: shopifyPaths.liquid,
        jsonPath: shopifyPaths.json,
        snippetPath: shopifyPaths.snippet,
        conversionMethod: 'OpenAI GPT-5'
      },
      metadata: {
        liquidFileName: `${finalFileName}.liquid`,
        jsonFileName: `${finalFileName}.json`,
        sectionType: finalFileName,
        htmlSize: htmlContent.length,
        htmlLines: htmlContent.split('\n').length,
        conversionMethod: 'OpenAI GPT-5 Converter',
        tokensUsed: openaiResult.metadata.totalTokens
      }
    });

  } catch (error) {
    console.error('OpenAI conversion error:', error);

    return NextResponse.json(
      { error: `OpenAI conversion failed: ${error.message}` },
      { status: 500 }
    );
  }
}



================================================
FILE: src/app/api/extract-head/route.js
================================================
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { htmlContent, fileName } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }
    const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

    if (!headMatch) {
      return NextResponse.json({
        headContent: "",
        metadata: {
          fileName: fileName || "theme-head-section",
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: 0,
          message: "No head section found",
        },
      });
    }

    const headOnly = headMatch[1].trim();

    if (!headOnly) {
      return NextResponse.json({
        headContent: "",
        metadata: {
          fileName: fileName || "theme-head-section",
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: 0,
          message: "Head section is empty",
        },
      });
    }
    console.log("Using ONLY direct regex extraction - bypassing AI completely");

    let headContent = "";

    // Enhanced regex patterns to ensure complete tags are captured
    const linkPattern = /<link[^>]*>/gis;
    const scriptPattern =
      /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/\s*>/gis;

    const allLinkMatches = headOnly.match(linkPattern) || [];
    const allScriptMatches = headOnly.match(scriptPattern) || [];

    console.log("=== FIXED MULTI-LINE REGEX EXTRACTION ===");
    console.log("Input head content length:", headOnly.length);
    console.log("All link matches:", allLinkMatches);
    console.log("All script matches:", allScriptMatches);

    const externalLinks = allLinkMatches.filter((tag) => {
      return tag.includes("http") || tag.includes("//");
    });

    const externalScripts = allScriptMatches.filter((tag) => {
      return tag.includes("http") || tag.includes("//");
    });

    console.log("External links found:", externalLinks);
    console.log("External scripts found:", externalScripts);

    const allExternalTags = [...externalLinks, ...externalScripts];

    const uniqueTags = [...new Set(allExternalTags)].filter((tag) => {
      const trimmed = tag.trim();
      // Ensure complete tags only
      const isCompleteLink =
        trimmed.startsWith("<link") && trimmed.endsWith(">");
      const isCompleteScript =
        trimmed.startsWith("<script") &&
        (trimmed.endsWith("</script>") || trimmed.endsWith("/>"));
      return (isCompleteLink || isCompleteScript) && trimmed.length > 15;
    });

    const processedTags = uniqueTags.map((tag) => {
      let cleanTag = tag.trim();

      if (cleanTag.includes("tailwindcss") && cleanTag.startsWith("<link")) {
        return '<script defer src="https://cdn.tailwindcss.com"></script>';
      }

      if (cleanTag.includes("@fortawesome") && cleanTag.includes("<link")) {
        const hrefMatch = cleanTag.match(/href\s*=\s*["']([^"']*)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          let href = hrefMatch[1].replace(/\s+/g, "");
          if (href.includes("@fortawesome")) {
            href = href.replace(
              /@fortawesome\/[^\/]*@[\d\.]+/g,
              "@fortawesome/fontawesome-free@6.5.1"
            );
            if (!href.includes("fontawesome-free@")) {
              href = href.replace(
                "@fortawesome/",
                "@fortawesome/fontawesome-free@6.5.1/"
              );
            }
          }
          cleanTag = cleanTag.replace(
            /href\s*=\s*["'][^"']*["']/i,
            `href="${href}"`
          );
        }
      }

      if (
        cleanTag.includes("fonts.googleapis.com") &&
        cleanTag.includes("<link")
      ) {
        const hrefMatch = cleanTag.match(/href\s*=\s*["']([^"']*)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          let href = hrefMatch[1].replace(/\s+/g, "");
          href = href
            .replace("css2?", "css2?")
            .replace("dis play=swap", "display=swap");
          cleanTag = cleanTag.replace(
            /href\s*=\s*["'][^"']*["']/i,
            `href="${href}"`
          );
        }
      }

      cleanTag = cleanTag
        .replace(/\s+/g, " ")
        .replace(/\s*=\s*/g, "=")
        .replace(/>\s+/g, ">")
        .replace(/\s+</g, "<")
        .replace(/\s+>/g, ">");

      return cleanTag;
    });

    // Final validation: Remove any incomplete tags
    const validTags = processedTags.filter((tag) => {
      const trimmed = tag.trim();
      const isValidLink =
        trimmed.startsWith("<link") &&
        trimmed.endsWith(">") &&
        !trimmed.includes("<link\n");
      const isValidScript =
        trimmed.startsWith("<script") &&
        (trimmed.endsWith("</script>") || trimmed.endsWith("/>")) &&
        !trimmed.includes("<script\n");
      return isValidLink || isValidScript;
    });

    console.log("Final processed tags:", validTags);
    console.log("Total external resources found:", validTags.length);

    if (validTags.length > 0) {
      headContent = "\n    " + validTags.join("\n    ") + "\n    ";
    } else {
      headContent = "";
    }

    if (
      !headContent ||
      headContent.toLowerCase().includes("no relevant") ||
      headContent.toLowerCase().includes("nothing to extract") ||
      headContent.toLowerCase().includes("no head content")
    ) {
      const productionHeadContent = `{%- liquid
  assign use_original_layout = false
  assign request_path = request.path

  if request_path contains '/products/'
    assign use_original_layout = true
  elsif request_path == '/cart'
    assign use_original_layout = true
  elsif request_path contains '/checkout'
    assign use_original_layout = true
  elsif request_path contains '/checkouts/'
    assign use_original_layout = true
  endif
-%}

{% if use_original_layout %}
  <!doctype html>
  <html class="js" lang="{{ request.locale.iso_code }}">
    <head>
      <!-- Original theme.liquid head content -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="theme-color" content="">
      <link rel="canonical" href="{{ canonical_url }}">

      {%- if settings.favicon != blank -%}
        <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
      {%- endif -%}

      {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
        <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
      {%- endunless -%}

      <title>
        {{ page_title }}
        {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
        {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
        {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
      </title>

      {% if page_description %}
        <meta name="description" content="{{ page_description | escape }}">
      {% endif %}

      {% render 'meta-tags' %}

      <script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'pubsub.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-disclosure.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-modal.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'search-form.js' | asset_url }}" defer="defer"></script>

      {%- if settings.animations_reveal_on_scroll -%}
        <script src="{{ 'animations.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {{ content_for_header }}

      {%- liquid
        assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'
        assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'
        assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
      %}

      {% style %}
        {{ settings.type_body_font | font_face: font_display: 'swap' }}
        {{ body_font_bold | font_face: font_display: 'swap' }}
        {{ body_font_italic | font_face: font_display: 'swap' }}
        {{ body_font_bold_italic | font_face: font_display: 'swap' }}
        {{ settings.type_header_font | font_face: font_display: 'swap' }}

        {% for scheme in settings.color_schemes -%}
          {% assign scheme_classes = scheme_classes | append: ', .color-' | append: scheme.id %}
          {% if forloop.index == 1 -%}
            :root,
          {%- endif %}
          .color-{{ scheme.id }} {
            --color-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          {% if scheme.settings.background_gradient != empty %}
            --gradient-background: {{ scheme.settings.background_gradient }};
          {% else %}
            --gradient-background: {{ scheme.settings.background }};
          {% endif %}
          --color-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-background-contrast: {{ background_color_contrast.red }},{{ background_color_contrast.green }},{{ background_color_contrast.blue }};
          --color-shadow: {{ scheme.settings.shadow.red }},{{ scheme.settings.shadow.green }},{{ scheme.settings.shadow.blue }};
          --color-button: {{ scheme.settings.button.red }},{{ scheme.settings.button.green }},{{ scheme.settings.button.blue }};
          --color-button-text: {{ scheme.settings.button_label.red }},{{ scheme.settings.button_label.green }},{{ scheme.settings.button_label.blue }};
          --color-secondary-button: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-secondary-button-text: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-link: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-badge-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-badge-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-badge-border: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --payment-terms-background-color: rgb({{ scheme.settings.background.rgb }});
        }
        {% endfor %}

        {{ scheme_classes | prepend: 'body' }} {
          color: rgba(var(--color-foreground), 0.75);
          background-color: rgb(var(--color-background));
        }

        :root {
          --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
          --font-body-style: {{ settings.type_body_font.style }};
          --font-body-weight: {{ settings.type_body_font.weight }};
          --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};

          --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
          --font-heading-style: {{ settings.type_header_font.style }};
          --font-heading-weight: {{ settings.type_header_font.weight }};

          --font-body-scale: {{ settings.body_scale | divided_by: 100.0 }};
          --font-heading-scale: {{ settings.heading_scale | times: 1.0 | divided_by: settings.body_scale }};

          --media-padding: {{ settings.media_padding }}px;
          --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};
          --media-border-width: {{ settings.media_border_thickness }}px;
          --media-radius: {{ settings.media_radius }}px;
          --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};
          --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;
          --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;
          --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;
          --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};

          --page-width: {{ settings.page_width | divided_by: 10 }}rem;
          --page-width-margin: {% if settings.page_width == '1600' %}2{% else %}0{% endif %}rem;

          --product-card-image-padding: {{ settings.card_image_padding | divided_by: 10.0 }}rem;
          --product-card-corner-radius: {{ settings.card_corner_radius | divided_by: 10.0 }}rem;
          --product-card-text-alignment: {{ settings.card_text_alignment }};
          --product-card-border-width: {{ settings.card_border_thickness | divided_by: 10.0 }}rem;
          --product-card-border-opacity: {{ settings.card_border_opacity | divided_by: 100.0 }};
          --product-card-shadow-opacity: {{ settings.card_shadow_opacity | divided_by: 100.0 }};
          --product-card-shadow-visible: {% if settings.card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --product-card-shadow-horizontal-offset: {{ settings.card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-vertical-offset: {{ settings.card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-blur-radius: {{ settings.card_shadow_blur | divided_by: 10.0 }}rem;

          --collection-card-image-padding: {{ settings.collection_card_image_padding | divided_by: 10.0 }}rem;
          --collection-card-corner-radius: {{ settings.collection_card_corner_radius | divided_by: 10.0 }}rem;
          --collection-card-text-alignment: {{ settings.collection_card_text_alignment }};
          --collection-card-border-width: {{ settings.collection_card_border_thickness | divided_by: 10.0 }}rem;
          --collection-card-border-opacity: {{ settings.collection_card_border_opacity | divided_by: 100.0 }};
          --collection-card-shadow-opacity: {{ settings.collection_card_shadow_opacity | divided_by: 100.0 }};
          --collection-card-shadow-visible: {% if settings.collection_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --collection-card-shadow-horizontal-offset: {{ settings.collection_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-vertical-offset: {{ settings.collection_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-blur-radius: {{ settings.collection_card_shadow_blur | divided_by: 10.0 }}rem;

          --blog-card-image-padding: {{ settings.blog_card_image_padding | divided_by: 10.0 }}rem;
          --blog-card-corner-radius: {{ settings.blog_card_corner_radius | divided_by: 10.0 }}rem;
          --blog-card-text-alignment: {{ settings.blog_card_text_alignment }};
          --blog-card-border-width: {{ settings.blog_card_border_thickness | divided_by: 10.0 }}rem;
          --blog-card-border-opacity: {{ settings.blog_card_border_opacity | divided_by: 100.0 }};
          --blog-card-shadow-opacity: {{ settings.blog_card_shadow_opacity | divided_by: 100.0 }};
          --blog-card-shadow-visible: {% if settings.blog_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --blog-card-shadow-horizontal-offset: {{ settings.blog_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-vertical-offset: {{ settings.blog_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-blur-radius: {{ settings.blog_card_shadow_blur | divided_by: 10.0 }}rem;

          --badge-corner-radius: {{ settings.badge_corner_radius | divided_by: 10.0 }}rem;

          --popup-border-width: {{ settings.popup_border_thickness }}px;
          --popup-border-opacity: {{ settings.popup_border_opacity | divided_by: 100.0 }};
          --popup-corner-radius: {{ settings.popup_corner_radius }}px;
          --popup-shadow-opacity: {{ settings.popup_shadow_opacity | divided_by: 100.0 }};
          --popup-shadow-horizontal-offset: {{ settings.popup_shadow_horizontal_offset }}px;
          --popup-shadow-vertical-offset: {{ settings.popup_shadow_vertical_offset }}px;
          --popup-shadow-blur-radius: {{ settings.popup_shadow_blur }}px;

          --drawer-border-width: {{ settings.drawer_border_thickness }}px;
          --drawer-border-opacity: {{ settings.drawer_border_opacity | divided_by: 100.0 }};
          --drawer-shadow-opacity: {{ settings.drawer_shadow_opacity | divided_by: 100.0 }};
          --drawer-shadow-horizontal-offset: {{ settings.drawer_shadow_horizontal_offset }}px;
          --drawer-shadow-vertical-offset: {{ settings.drawer_shadow_vertical_offset }}px;
          --drawer-shadow-blur-radius: {{ settings.drawer_shadow_blur }}px;

          --spacing-sections-desktop: {{ settings.spacing_sections }}px;
          --spacing-sections-mobile: {% if settings.spacing_sections < 24 %}{{ settings.spacing_sections }}{% else %}{{ settings.spacing_sections | times: 0.7 | round | at_least: 20 }}{% endif %}px;

          --grid-desktop-vertical-spacing: {{ settings.spacing_grid_vertical }}px;
          --grid-desktop-horizontal-spacing: {{ settings.spacing_grid_horizontal }}px;
          --grid-mobile-vertical-spacing: {{ settings.spacing_grid_vertical | divided_by: 2 }}px;
          --grid-mobile-horizontal-spacing: {{ settings.spacing_grid_horizontal | divided_by: 2 }}px;

          --text-boxes-border-opacity: {{ settings.text_boxes_border_opacity | divided_by: 100.0 }};
          --text-boxes-border-width: {{ settings.text_boxes_border_thickness }}px;
          --text-boxes-radius: {{ settings.text_boxes_radius }}px;
          --text-boxes-shadow-opacity: {{ settings.text_boxes_shadow_opacity | divided_by: 100.0 }};
          --text-boxes-shadow-visible: {% if settings.text_boxes_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --text-boxes-shadow-horizontal-offset: {{ settings.text_boxes_shadow_horizontal_offset }}px;
          --text-boxes-shadow-vertical-offset: {{ settings.text_boxes_shadow_vertical_offset }}px;
          --text-boxes-shadow-blur-radius: {{ settings.text_boxes_shadow_blur }}px;

          --buttons-radius: {{ settings.buttons_radius }}px;
          --buttons-radius-outset: {% if settings.buttons_radius > 0 %}{{ settings.buttons_radius | plus: settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-width: {% if settings.buttons_border_opacity > 0 %}{{ settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-opacity: {{ settings.buttons_border_opacity | divided_by: 100.0 }};
          --buttons-shadow-opacity: {{ settings.buttons_shadow_opacity | divided_by: 100.0 }};
          --buttons-shadow-visible: {% if settings.buttons_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --buttons-shadow-horizontal-offset: {{ settings.buttons_shadow_horizontal_offset }}px;
          --buttons-shadow-vertical-offset: {{ settings.buttons_shadow_vertical_offset }}px;
          --buttons-shadow-blur-radius: {{ settings.buttons_shadow_blur }}px;
          --buttons-border-offset: {% if settings.buttons_radius > 0 or settings.buttons_shadow_opacity > 0 %}0.3{% else %}0{% endif %}px;

          --inputs-radius: {{ settings.inputs_radius }}px;
          --inputs-border-width: {{ settings.inputs_border_thickness }}px;
          --inputs-border-opacity: {{ settings.inputs_border_opacity | divided_by: 100.0 }};
          --inputs-shadow-opacity: {{ settings.inputs_shadow_opacity | divided_by: 100.0 }};
          --inputs-shadow-horizontal-offset: {{ settings.inputs_shadow_horizontal_offset }}px;
          --inputs-margin-offset: {% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_opacity > 0 %}{{ settings.inputs_shadow_vertical_offset | abs }}{% else %}0{% endif %}px;
          --inputs-shadow-vertical-offset: {{ settings.inputs_shadow_vertical_offset }}px;
          --inputs-shadow-blur-radius: {{ settings.inputs_shadow_blur }}px;
          --inputs-radius-outset: {% if settings.inputs_radius > 0 %}{{ settings.inputs_radius | plus: settings.inputs_border_thickness }}{% else %}0{% endif %}px;

          --variant-pills-radius: {{ settings.variant_pills_radius }}px;
          --variant-pills-border-width: {{ settings.variant_pills_border_thickness }}px;
          --variant-pills-border-opacity: {{ settings.variant_pills_border_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-opacity: {{ settings.variant_pills_shadow_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-horizontal-offset: {{ settings.variant_pills_shadow_horizontal_offset }}px;
          --variant-pills-shadow-vertical-offset: {{ settings.variant_pills_shadow_vertical_offset }}px;
          --variant-pills-shadow-blur-radius: {{ settings.variant_pills_shadow_blur }}px;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-size: calc(var(--font-body-scale) * 62.5%);
          height: 100%;
        }

        body {
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          grid-template-columns: 100%;
          min-height: 100%;
          margin: 0;
          font-size: 1.5rem;
          letter-spacing: 0.06rem;
          line-height: calc(1 + 0.8 / var(--font-body-scale));
          font-family: var(--font-body-family);
          font-style: var(--font-body-style);
          font-weight: var(--font-body-weight);
        }

        @media screen and (min-width: 750px) {
          body {
            font-size: 1.6rem;
          }
        }
      {% endstyle %}

      {{ 'base.css' | asset_url | stylesheet_tag }}
      <link
        rel="stylesheet"
        href="{{ 'component-cart-items.css' | asset_url }}"
        media="print"
        onload="this.media='all'"
      >

      {%- if settings.cart_type == 'drawer' -%}
        {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
        {{ 'component-cart.css' | asset_url | stylesheet_tag }}
        {{ 'component-totals.css' | asset_url | stylesheet_tag }}
        {{ 'component-price.css' | asset_url | stylesheet_tag }}
        {{ 'component-discounts.css' | asset_url | stylesheet_tag }}
      {%- endif -%}

      {%- unless settings.type_body_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_body_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}
      {%- unless settings.type_header_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}

      {%- if localization.available_countries.size > 1 or localization.available_languages.size > 1 -%}
        {{ 'component-localization-form.css' | asset_url | stylesheet_tag: preload: true }}
        <script src="{{ 'localization-form.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.predictive_search_enabled -%}
        <link
          rel="stylesheet"
          href="{{ 'component-predictive-search.css' | asset_url }}"
          media="print"
          onload="this.media='all'"
        >
      {%- endif -%}

      <script>
        if (Shopify.designMode) {
          document.documentElement.classList.add('shopify-design-mode');
        }
      </script>
    </head>

    <body class="gradient{% if settings.animations_hover_elements != 'none' %} animate--hover-{{ settings.animations_hover_elements }}{% endif %}">
      <a class="skip-to-content-link button visually-hidden" href="#MainContent">
        {{ 'accessibility.skip_to_text' | t }}
      </a>

      {%- if settings.cart_type == 'drawer' -%}
        {%- render 'cart-drawer' -%}
      {%- endif -%}

      {% sections 'header-group' %}

      <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
        {{ content_for_layout }}
      </main>

      {% sections 'footer-group' %}

      <ul hidden>
        <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
        <li id="a11y-new-window-message">{{ 'accessibility.link_messages.new_window' | t }}</li>
      </ul>

      <script>
      window.shopUrl = '{{ request.origin }}';
      window.routes = {
        cart_add_url: '{{ routes.cart_add_url }}',
        cart_change_url: '{{ routes.cart_change_url }}',
        cart_update_url: '{{ routes.cart_update_url }}',
        cart_url: '{{ routes.cart_url }}',
        predictive_search_url: '{{ routes.predictive_search_url }}',
      };

      window.cartStrings = {
        error: \`{{ 'sections.cart.cart_error' | t }}\`,
        quantityError: \`{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}\`,
      };

      window.variantStrings = {
        addToCart: \`{{ 'products.product.add_to_cart' | t }}\`,
        soldOut: \`{{ 'products.product.sold_out' | t }}\`,
        unavailable: \`{{ 'products.product.unavailable' | t }}\`,
        unavailable_with_option: \`{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}\`,
      };

      window.quickOrderListStrings = {
        itemsAdded: \`{{ 'sections.quick_order_list.items_added.other' | t: quantity: '[quantity]' }}\`,
        itemAdded: \`{{ 'sections.quick_order_list.items_added.one' | t: quantity: '[quantity]' }}\`,
        itemsRemoved: \`{{ 'sections.quick_order_list.items_removed.other' | t: quantity: '[quantity]' }}\`,
        itemRemoved: \`{{ 'sections.quick_order_list.items_removed.one' | t: quantity: '[quantity]' }}\`,
        viewCart: \`{{- 'sections.quick_order_list.view_cart' | t -}}\`,
        each: \`{{- 'sections.quick_order_list.each' | t: money: '[money]' }}\`,
      };

      window.accessibilityStrings = {
        imageAvailable: \`{{ 'products.product.media.image_available' | t: index: '[index]' }}\`,
        shareSuccess: \`{{ 'general.share.success_message' | t }}\`,
        pauseSlideshow: \`{{ 'sections.slideshow.pause_slideshow' | t }}\`,
        playSlideshow: \`{{ 'sections.slideshow.play_slideshow' | t }}\`,
        recipientFormExpanded: \`{{ 'recipient.form.expanded' | t }}\`,
        recipientFormCollapsed: \`{{ 'recipient.form.collapsed' | t }}\`,
        countrySelectorSearchCount: \`{{ 'localization.country_results_count' | t: count: '[count]' }}\`,
      };
      </script>

      {%- if settings.predictive_search_enabled -%}
        <script src="{{ 'predictive-search.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.cart_type == 'drawer' -%}
        <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}
    </body>
  </html>

{% else %}
  <!doctype html>
  <html lang="{{ request.locale.iso_code }}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="{{ settings.color_button }}">
      <link rel="canonical" href="{{ canonical_url }}">

      <title>
        {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
      </title>
      <meta name="description" content="{{ page_description | escape }}">

      <!-- CSS -->
      {{ 'base.css' | asset_url | stylesheet_tag }}
      {{ 'theme.css' | asset_url | stylesheet_tag }}

      <!-- Scripts -->
      <script>
        document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      </script>

      {{ content_for_header }}

    </head>

    <body class="template-{{ template | handle }}">
      <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

      <main id="MainContent" role="main">
        {{ content_for_layout }}
      </main>

      {{ content_for_footer }}

      <!-- JavaScript -->
      {{ 'theme.js' | asset_url | script_tag }}
    </body>
  </html>
{% endif %}`;

      return NextResponse.json({
        headContent: productionHeadContent,
        metadata: {
          fileName: fileName || "theme-head-section",
          extractedAt: new Date().toISOString(),
          inputLength: htmlContent.length,
          outputLength: productionHeadContent.length,
          message:
            "No specific head content found - provided complete theme.liquid template",
        },
      });
    }

    return NextResponse.json({
      headContent: `{%- liquid
  assign use_original_layout = false
  assign request_path = request.path

  if request_path contains '/products/'
    assign use_original_layout = true
  elsif request_path == '/cart'
    assign use_original_layout = true
  elsif request_path contains '/checkout'
    assign use_original_layout = true
  elsif request_path contains '/checkouts/'
    assign use_original_layout = true
  endif
-%}

{% if use_original_layout %}
  <!doctype html>
  <html class="js" lang="{{ request.locale.iso_code }}">
    <head>
      <!-- Original theme.liquid head content -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="theme-color" content="">
      <link rel="canonical" href="{{ canonical_url }}">

      {%- if settings.favicon != blank -%}
        <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
      {%- endif -%}

      {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
        <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
      {%- endunless -%}

      <title>
        {{ page_title }}
        {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
        {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
        {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
      </title>

      {% if page_description %}
        <meta name="description" content="{{ page_description | escape }}">
      {% endif %}

      {% render 'meta-tags' %}

      <script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'pubsub.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-disclosure.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-modal.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'search-form.js' | asset_url }}" defer="defer"></script>

      {%- if settings.animations_reveal_on_scroll -%}
        <script src="{{ 'animations.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {{ content_for_header }}

      {%- liquid
        assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'
        assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'
        assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
      %}

      {% style %}
        {{ settings.type_body_font | font_face: font_display: 'swap' }}
        {{ body_font_bold | font_face: font_display: 'swap' }}
        {{ body_font_italic | font_face: font_display: 'swap' }}
        {{ body_font_bold_italic | font_face: font_display: 'swap' }}
        {{ settings.type_header_font | font_face: font_display: 'swap' }}

        {% for scheme in settings.color_schemes -%}
          {% assign scheme_classes = scheme_classes | append: ', .color-' | append: scheme.id %}
          {% if forloop.index == 1 -%}
            :root,
          {%- endif %}
          .color-{{ scheme.id }} {
            --color-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          {% if scheme.settings.background_gradient != empty %}
            --gradient-background: {{ scheme.settings.background_gradient }};
          {% else %}
            --gradient-background: {{ scheme.settings.background }};
          {% endif %}
          --color-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-background-contrast: {{ background_color_contrast.red }},{{ background_color_contrast.green }},{{ background_color_contrast.blue }};
          --color-shadow: {{ scheme.settings.shadow.red }},{{ scheme.settings.shadow.green }},{{ scheme.settings.shadow.blue }};
          --color-button: {{ scheme.settings.button.red }},{{ scheme.settings.button.green }},{{ scheme.settings.button.blue }};
          --color-button-text: {{ scheme.settings.button_label.red }},{{ scheme.settings.button_label.green }},{{ scheme.settings.button_label.blue }};
          --color-secondary-button: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-secondary-button-text: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-link: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-badge-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-badge-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-badge-border: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --payment-terms-background-color: rgb({{ scheme.settings.background.rgb }});
        }
        {% endfor %}

        {{ scheme_classes | prepend: 'body' }} {
          color: rgba(var(--color-foreground), 0.75);
          background-color: rgb(var(--color-background));
        }

        :root {
          --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
          --font-body-style: {{ settings.type_body_font.style }};
          --font-body-weight: {{ settings.type_body_font.weight }};
          --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};

          --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
          --font-heading-style: {{ settings.type_header_font.style }};
          --font-heading-weight: {{ settings.type_header_font.weight }};

          --font-body-scale: {{ settings.body_scale | divided_by: 100.0 }};
          --font-heading-scale: {{ settings.heading_scale | times: 1.0 | divided_by: settings.body_scale }};

          --media-padding: {{ settings.media_padding }}px;
          --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};
          --media-border-width: {{ settings.media_border_thickness }}px;
          --media-radius: {{ settings.media_radius }}px;
          --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};
          --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;
          --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;
          --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;
          --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};

          --page-width: {{ settings.page_width | divided_by: 10 }}rem;
          --page-width-margin: {% if settings.page_width == '1600' %}2{% else %}0{% endif %}rem;

          --product-card-image-padding: {{ settings.card_image_padding | divided_by: 10.0 }}rem;
          --product-card-corner-radius: {{ settings.card_corner_radius | divided_by: 10.0 }}rem;
          --product-card-text-alignment: {{ settings.card_text_alignment }};
          --product-card-border-width: {{ settings.card_border_thickness | divided_by: 10.0 }}rem;
          --product-card-border-opacity: {{ settings.card_border_opacity | divided_by: 100.0 }};
          --product-card-shadow-opacity: {{ settings.card_shadow_opacity | divided_by: 100.0 }};
          --product-card-shadow-visible: {% if settings.card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --product-card-shadow-horizontal-offset: {{ settings.card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-vertical-offset: {{ settings.card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-blur-radius: {{ settings.card_shadow_blur | divided_by: 10.0 }}rem;

          --collection-card-image-padding: {{ settings.collection_card_image_padding | divided_by: 10.0 }}rem;
          --collection-card-corner-radius: {{ settings.collection_card_corner_radius | divided_by: 10.0 }}rem;
          --collection-card-text-alignment: {{ settings.collection_card_text_alignment }};
          --collection-card-border-width: {{ settings.collection_card_border_thickness | divided_by: 10.0 }}rem;
          --collection-card-border-opacity: {{ settings.collection_card_border_opacity | divided_by: 100.0 }};
          --collection-card-shadow-opacity: {{ settings.collection_card_shadow_opacity | divided_by: 100.0 }};
          --collection-card-shadow-visible: {% if settings.collection_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --collection-card-shadow-horizontal-offset: {{ settings.collection_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-vertical-offset: {{ settings.collection_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-blur-radius: {{ settings.collection_card_shadow_blur | divided_by: 10.0 }}rem;

          --blog-card-image-padding: {{ settings.blog_card_image_padding | divided_by: 10.0 }}rem;
          --blog-card-corner-radius: {{ settings.blog_card_corner_radius | divided_by: 10.0 }}rem;
          --blog-card-text-alignment: {{ settings.blog_card_text_alignment }};
          --blog-card-border-width: {{ settings.blog_card_border_thickness | divided_by: 10.0 }}rem;
          --blog-card-border-opacity: {{ settings.blog_card_border_opacity | divided_by: 100.0 }};
          --blog-card-shadow-opacity: {{ settings.blog_card_shadow_opacity | divided_by: 100.0 }};
          --blog-card-shadow-visible: {% if settings.blog_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --blog-card-shadow-horizontal-offset: {{ settings.blog_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-vertical-offset: {{ settings.blog_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-blur-radius: {{ settings.blog_card_shadow_blur | divided_by: 10.0 }}rem;

          --badge-corner-radius: {{ settings.badge_corner_radius | divided_by: 10.0 }}rem;

          --popup-border-width: {{ settings.popup_border_thickness }}px;
          --popup-border-opacity: {{ settings.popup_border_opacity | divided_by: 100.0 }};
          --popup-corner-radius: {{ settings.popup_corner_radius }}px;
          --popup-shadow-opacity: {{ settings.popup_shadow_opacity | divided_by: 100.0 }};
          --popup-shadow-horizontal-offset: {{ settings.popup_shadow_horizontal_offset }}px;
          --popup-shadow-vertical-offset: {{ settings.popup_shadow_vertical_offset }}px;
          --popup-shadow-blur-radius: {{ settings.popup_shadow_blur }}px;

          --drawer-border-width: {{ settings.drawer_border_thickness }}px;
          --drawer-border-opacity: {{ settings.drawer_border_opacity | divided_by: 100.0 }};
          --drawer-shadow-opacity: {{ settings.drawer_shadow_opacity | divided_by: 100.0 }};
          --drawer-shadow-horizontal-offset: {{ settings.drawer_shadow_horizontal_offset }}px;
          --drawer-shadow-vertical-offset: {{ settings.drawer_shadow_vertical_offset }}px;
          --drawer-shadow-blur-radius: {{ settings.drawer_shadow_blur }}px;

          --spacing-sections-desktop: {{ settings.spacing_sections }}px;
          --spacing-sections-mobile: {% if settings.spacing_sections < 24 %}{{ settings.spacing_sections }}{% else %}{{ settings.spacing_sections | times: 0.7 | round | at_least: 20 }}{% endif %}px;

          --grid-desktop-vertical-spacing: {{ settings.spacing_grid_vertical }}px;
          --grid-desktop-horizontal-spacing: {{ settings.spacing_grid_horizontal }}px;
          --grid-mobile-vertical-spacing: {{ settings.spacing_grid_vertical | divided_by: 2 }}px;
          --grid-mobile-horizontal-spacing: {{ settings.spacing_grid_horizontal | divided_by: 2 }}px;

          --text-boxes-border-opacity: {{ settings.text_boxes_border_opacity | divided_by: 100.0 }};
          --text-boxes-border-width: {{ settings.text_boxes_border_thickness }}px;
          --text-boxes-radius: {{ settings.text_boxes_radius }}px;
          --text-boxes-shadow-opacity: {{ settings.text_boxes_shadow_opacity | divided_by: 100.0 }};
          --text-boxes-shadow-visible: {% if settings.text_boxes_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --text-boxes-shadow-horizontal-offset: {{ settings.text_boxes_shadow_horizontal_offset }}px;
          --text-boxes-shadow-vertical-offset: {{ settings.text_boxes_shadow_vertical_offset }}px;
          --text-boxes-shadow-blur-radius: {{ settings.text_boxes_shadow_blur }}px;

          --buttons-radius: {{ settings.buttons_radius }}px;
          --buttons-radius-outset: {% if settings.buttons_radius > 0 %}{{ settings.buttons_radius | plus: settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-width: {% if settings.buttons_border_opacity > 0 %}{{ settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-opacity: {{ settings.buttons_border_opacity | divided_by: 100.0 }};
          --buttons-shadow-opacity: {{ settings.buttons_shadow_opacity | divided_by: 100.0 }};
          --buttons-shadow-visible: {% if settings.buttons_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --buttons-shadow-horizontal-offset: {{ settings.buttons_shadow_horizontal_offset }}px;
          --buttons-shadow-vertical-offset: {{ settings.buttons_shadow_vertical_offset }}px;
          --buttons-shadow-blur-radius: {{ settings.buttons_shadow_blur }}px;
          --buttons-border-offset: {% if settings.buttons_radius > 0 or settings.buttons_shadow_opacity > 0 %}0.3{% else %}0{% endif %}px;

          --inputs-radius: {{ settings.inputs_radius }}px;
          --inputs-border-width: {{ settings.inputs_border_thickness }}px;
          --inputs-border-opacity: {{ settings.inputs_border_opacity | divided_by: 100.0 }};
          --inputs-shadow-opacity: {{ settings.inputs_shadow_opacity | divided_by: 100.0 }};
          --inputs-shadow-horizontal-offset: {{ settings.inputs_shadow_horizontal_offset }}px;
          --inputs-margin-offset: {% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_opacity > 0 %}{{ settings.inputs_shadow_vertical_offset | abs }}{% else %}0{% endif %}px;
          --inputs-shadow-vertical-offset: {{ settings.inputs_shadow_vertical_offset }}px;
          --inputs-shadow-blur-radius: {{ settings.inputs_shadow_blur }}px;
          --inputs-radius-outset: {% if settings.inputs_radius > 0 %}{{ settings.inputs_radius | plus: settings.inputs_border_thickness }}{% else %}0{% endif %}px;

          --variant-pills-radius: {{ settings.variant_pills_radius }}px;
          --variant-pills-border-width: {{ settings.variant_pills_border_thickness }}px;
          --variant-pills-border-opacity: {{ settings.variant_pills_border_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-opacity: {{ settings.variant_pills_shadow_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-horizontal-offset: {{ settings.variant_pills_shadow_horizontal_offset }}px;
          --variant-pills-shadow-vertical-offset: {{ settings.variant_pills_shadow_vertical_offset }}px;
          --variant-pills-shadow-blur-radius: {{ settings.variant_pills_shadow_blur }}px;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-size: calc(var(--font-body-scale) * 62.5%);
          height: 100%;
        }

        body {
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          grid-template-columns: 100%;
          min-height: 100%;
          margin: 0;
          font-size: 1.5rem;
          letter-spacing: 0.06rem;
          line-height: calc(1 + 0.8 / var(--font-body-scale));
          font-family: var(--font-body-family);
          font-style: var(--font-body-style);
          font-weight: var(--font-body-weight);
        }

        @media screen and (min-width: 750px) {
          body {
            font-size: 1.6rem;
          }
        }
      {% endstyle %}

      {{ 'base.css' | asset_url | stylesheet_tag }}
      <link
        rel="stylesheet"
        href="{{ 'component-cart-items.css' | asset_url }}"
        media="print"
        onload="this.media='all'"
      >

      {%- if settings.cart_type == 'drawer' -%}
        {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
        {{ 'component-cart.css' | asset_url | stylesheet_tag }}
        {{ 'component-totals.css' | asset_url | stylesheet_tag }}
        {{ 'component-price.css' | asset_url | stylesheet_tag }}
        {{ 'component-discounts.css' | asset_url | stylesheet_tag }}
      {%- endif -%}

      {%- unless settings.type_body_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_body_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}
      {%- unless settings.type_header_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}

      {%- if localization.available_countries.size > 1 or localization.available_languages.size > 1 -%}
        {{ 'component-localization-form.css' | asset_url | stylesheet_tag: preload: true }}
        <script src="{{ 'localization-form.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.predictive_search_enabled -%}
        <link
          rel="stylesheet"
          href="{{ 'component-predictive-search.css' | asset_url }}"
          media="print"
          onload="this.media='all'"
        >
      {%- endif -%}

      <script>
        if (Shopify.designMode) {
          document.documentElement.classList.add('shopify-design-mode');
        }
      </script>
    </head>

    <body class="gradient{% if settings.animations_hover_elements != 'none' %} animate--hover-{{ settings.animations_hover_elements }}{% endif %}">
      <a class="skip-to-content-link button visually-hidden" href="#MainContent">
        {{ 'accessibility.skip_to_text' | t }}
      </a>

      {%- if settings.cart_type == 'drawer' -%}
        {%- render 'cart-drawer' -%}
      {%- endif -%}

      {% sections 'header-group' %}

      <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
        {{ content_for_layout }}
      </main>

      {% sections 'footer-group' %}

      <ul hidden>
        <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
        <li id="a11y-new-window-message">{{ 'accessibility.link_messages.new_window' | t }}</li>
      </ul>

      <script>
      window.shopUrl = '{{ request.origin }}';
      window.routes = {
        cart_add_url: '{{ routes.cart_add_url }}',
        cart_change_url: '{{ routes.cart_change_url }}',
        cart_update_url: '{{ routes.cart_update_url }}',
        cart_url: '{{ routes.cart_url }}',
        predictive_search_url: '{{ routes.predictive_search_url }}',
      };

      window.cartStrings = {
        error: \`{{ 'sections.cart.cart_error' | t }}\`,
        quantityError: \`{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}\`,
      };

      window.variantStrings = {
        addToCart: \`{{ 'products.product.add_to_cart' | t }}\`,
        soldOut: \`{{ 'products.product.sold_out' | t }}\`,
        unavailable: \`{{ 'products.product.unavailable' | t }}\`,
        unavailable_with_option: \`{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}\`,
      };

      window.quickOrderListStrings = {
        itemsAdded: \`{{ 'sections.quick_order_list.items_added.other' | t: quantity: '[quantity]' }}\`,
        itemAdded: \`{{ 'sections.quick_order_list.items_added.one' | t: quantity: '[quantity]' }}\`,
        itemsRemoved: \`{{ 'sections.quick_order_list.items_removed.other' | t: quantity: '[quantity]' }}\`,
        itemRemoved: \`{{ 'sections.quick_order_list.items_removed.one' | t: quantity: '[quantity]' }}\`,
        viewCart: \`{{- 'sections.quick_order_list.view_cart' | t -}}\`,
        each: \`{{- 'sections.quick_order_list.each' | t: money: '[money]' }}\`,
      };

      window.accessibilityStrings = {
        imageAvailable: \`{{ 'products.product.media.image_available' | t: index: '[index]' }}\`,
        shareSuccess: \`{{ 'general.share.success_message' | t }}\`,
        pauseSlideshow: \`{{ 'sections.slideshow.pause_slideshow' | t }}\`,
        playSlideshow: \`{{ 'sections.slideshow.play_slideshow' | t }}\`,
        recipientFormExpanded: \`{{ 'recipient.form.expanded' | t }}\`,
        recipientFormCollapsed: \`{{ 'recipient.form.collapsed' | t }}\`,
        countrySelectorSearchCount: \`{{ 'localization.country_results_count' | t: count: '[count]' }}\`,
      };
      </script>

      {%- if settings.predictive_search_enabled -%}
        <script src="{{ 'predictive-search.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.cart_type == 'drawer' -%}
        <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}
    </body>
  </html>

{% else %}
  <!doctype html>
  <html lang="{{ request.locale.iso_code }}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="{{ settings.color_button }}">
      <link rel="canonical" href="{{ canonical_url }}">

      <title>
        {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
      </title>
      <meta name="description" content="{{ page_description | escape }}">

      <!-- CSS -->
      {{ 'base.css' | asset_url | stylesheet_tag }}
      {{ 'theme.css' | asset_url | stylesheet_tag }}

      <!-- Scripts -->
      <script>
        document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      </script>

      {{ content_for_header }}
      
      <!-- External Resources -->
      ${headContent}
    </head>

  <body class="template-{{ template | handle }}">
    <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {{ content_for_footer }}

    <!-- JavaScript -->
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>
{% endif %}`,
      metadata: {
        fileName: fileName || "theme-head-section",
        extractedAt: new Date().toISOString(),
        inputLength: htmlContent.length,
        outputLength: headContent ? headContent.length : 0,
        extractionMethod: "REGEX-ONLY-NO-AI",
        version: "FIXED-VERSION-6.0-URL-INTEGRITY-FIX",
      },
    });
  } catch (error) {
    console.error("Head extraction error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to extract head section" },
      { status: 500 }
    );
  }
}



================================================
FILE: src/components/AIGenerationPopup.js
================================================
"use client";
import { useState, useEffect } from "react";

const AIGenerationPopup = ({ isVisible, onClose, onConfirm }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleConfirm = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onConfirm();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(10px, 3vw, 20px)',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                overflowY: 'auto'
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 50%, #1a1a2e 100%)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    maxWidth: 'clamp(320px, 90vw, 500px)',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                    transition: 'transform 0.3s ease-out',
                    position: 'relative',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    padding: 'clamp(20px, 5vw, 25px) clamp(20px, 5vw, 30px)',
                    borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
                    background: 'linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 12px)',
                            flex: '1',
                            minWidth: '200px'
                        }}>
                            <div style={{
                                width: 'clamp(40px, 10vw, 50px)',
                                height: 'clamp(40px, 10vw, 50px)',
                                borderRadius: 'clamp(12px, 3vw, 15px)',
                                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(20px, 5vw, 24px)',
                                boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)',
                                flexShrink: 0
                            }}>
                                🤖
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    color: '#00ff88',
                                    fontSize: 'clamp(16px, 4vw, 20px)',
                                    fontWeight: '700',
                                    lineHeight: '1.2'
                                }}>
                                    AI-Powered Code Generation
                                </h3>
                                <p style={{
                                    margin: '4px 0 0 0',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    lineHeight: '1.3'
                                }}>
                                    Smart Liquid + JSON Conversion
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 'clamp(32px, 8vw, 35px)',
                                height: 'clamp(32px, 8vw, 35px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: 'clamp(16px, 4vw, 18px)',
                                transition: 'all 0.2s ease',
                                minHeight: '44px',
                                minWidth: '44px',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div style={{
                    padding: 'clamp(20px, 5vw, 30px)',
                    position: 'relative',
                    zIndex: 1,
                    flex: '1',
                    overflowY: 'auto'
                }}>
                    <div style={{
                        marginBottom: 'clamp(20px, 5vw, 25px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 10px)',
                            marginBottom: 'clamp(12px, 3vw, 15px)'
                        }}>
                            <span style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>⚡</span>
                            <h4 style={{
                                margin: 0,
                                color: '#ffffff',
                                fontSize: 'clamp(14px, 3.5vw, 16px)',
                                fontWeight: '600'
                            }}>
                                AI-Generated Code Notice
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            lineHeight: '1.6',
                            margin: '0 0 15px 0'
                        }}>
                            This AI-powered tool converts any structured HTML layout into Shopify Liquid templates with JSON schema files.
                            <strong style={{ color: '#00ff88' }}> Works with any HTML structure, preserves JavaScript functionality, and maintains styling.</strong>
                            <strong style={{ color: '#ffc107' }}> AI provides 95%-98% accuracy, not 100%.</strong> Having
                            <strong style={{ color: '#00ff88' }}> Liquid knowledge is essential</strong> for fine-tuning results.
                            If the first result doesn't meet your expectations, simply click generate again for improved results.
                        </p>
                        <div style={{
                            background: 'rgba(0, 255, 136, 0.1)',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            borderRadius: 'clamp(8px, 2vw, 12px)',
                            padding: 'clamp(15px, 4vw, 20px)',
                            marginTop: '15px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'clamp(8px, 2vw, 10px)',
                                marginBottom: 'clamp(12px, 3vw, 15px)'
                            }}>
                                <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>🎯</span>
                                <h4 style={{
                                    margin: 0,
                                    color: '#00ff88',
                                    fontSize: 'clamp(13px, 3.2vw, 15px)',
                                    fontWeight: '700'
                                }}>
                                    Best Results Instructions
                                </h4>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <h5 style={{
                                    margin: '0 0 8px 0',
                                    color: '#ffffff',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span>✅</span> HTML Structure Requirements:
                                </h5>
                                <ul style={{
                                    margin: '0 0 15px 0',
                                    paddingLeft: '20px',
                                    color: '#e6e6e6',
                                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                                    lineHeight: '1.5'
                                }}>
                                    <li><strong style={{ color: '#00ff88' }}>Clean HTML:</strong> Well-structured, semantic markup with proper indentation</li>
                                    <li><strong style={{ color: '#00ff88' }}>CSS Classes:</strong> Use descriptive classes like <code style={{
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        padding: '2px 5px',
                                        borderRadius: '3px',
                                        color: '#ffc107',
                                        fontSize: '11px'
                                    }}>.feature, .card, .testimonial, .product</code></li>
                                    <li><strong style={{ color: '#00ff88' }}>Content Structure:</strong> Clear headings (h1-h6), paragraphs, images with alt text</li>
                                    <li><strong style={{ color: '#00ff88' }}>No Inline Styles:</strong> External CSS files work better than inline styles</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <h5 style={{
                                    margin: '0 0 8px 0',
                                    color: '#ffffff',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span>🚀</span> Layout Types (All Supported):
                                </h5>
                                <ul style={{
                                    margin: '0 0 15px 0',
                                    paddingLeft: '20px',
                                    color: '#e6e6e6',
                                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                                    lineHeight: '1.5'
                                }}>
                                    <li><strong style={{ color: '#00d4ff' }}>E-commerce:</strong> Product pages, pricing tables, shopping layouts</li>
                                    <li><strong style={{ color: '#00d4ff' }}>Business:</strong> Corporate sites, portfolios, service pages</li>
                                    <li><strong style={{ color: '#00d4ff' }}>Landing Pages:</strong> Marketing pages, lead generation forms</li>
                                    <li><strong style={{ color: '#00d4ff' }}>Content:</strong> Blogs, news sites, documentation</li>
                                    <li><strong style={{ color: '#00d4ff' }}>Complex:</strong> Dashboards, admin panels, web apps</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '10px' }}>
                                <h5 style={{
                                    margin: '0 0 8px 0',
                                    color: '#ffffff',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span>⚡</span> Pro Tips:
                                </h5>
                                <ul style={{
                                    margin: 0,
                                    paddingLeft: '20px',
                                    color: '#e6e6e6',
                                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                                    lineHeight: '1.5'
                                }}>
                                    <li>Remove unnecessary comments and debug code</li>
                                    <li>Ensure all images have proper alt attributes</li>
                                    <li>Use meaningful IDs and classes for sections</li>
                                    <li>If results aren't perfect, click generate again</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(138, 43, 226, 0.1)',
                        border: '1px solid rgba(138, 43, 226, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(6px, 1.5vw, 8px)',
                            marginBottom: 'clamp(6px, 1.5vw, 8px)'
                        }}>
                            <span style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>⏱️</span>
                            <span style={{
                                color: '#ba68c8',
                                fontSize: 'clamp(11px, 2.8vw, 13px)',
                                fontWeight: '600'
                            }}>
                                Processing Time
                            </span>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(10px, 2.5vw, 12px)',
                            lineHeight: '1.4',
                            margin: 0
                        }}>
                            Simple HTML = faster conversion ⚡ | Complex layouts with JS = 3-5 minutes ⏳ | Large files with animations = may take longer
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(255, 193, 7, 0.1)',
                        border: '1px solid rgba(255, 193, 7, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(6px, 1.5vw, 8px)',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>💡</span>
                            <span style={{
                                color: '#ffc107',
                                fontSize: 'clamp(11px, 2.8vw, 13px)',
                                fontWeight: '600',
                                lineHeight: '1.3'
                            }}>
                                Pro Tip: For best results, use clean, well-structured HTML with semantic elements and consistent CSS classes!
                            </span>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(0, 123, 255, 0.1)',
                        border: '1px solid rgba(0, 123, 255, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(15px, 4vw, 20px)',
                        marginBottom: 'clamp(20px, 5vw, 25px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 10px)',
                            marginBottom: 'clamp(12px, 3vw, 15px)'
                        }}>
                            <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>📚</span>
                            <h4 style={{
                                margin: 0,
                                color: '#007bff',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '600'
                            }}>
                                Liquid Knowledge Required
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(11px, 2.5vw, 13px)',
                            lineHeight: '1.5',
                            margin: '0 0 12px 0'
                        }}>
                            <strong style={{ color: '#ffc107' }}>Important:</strong> Basic understanding of Shopify Liquid
                            templating language is essential for customizing and optimizing the AI-generated code.
                        </p>
                        <a
                            href="https://shopify.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#00ff88',
                                textDecoration: 'none',
                                fontSize: 'clamp(11px, 2.5vw, 13px)',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '6px 12px',
                                background: 'rgba(0, 255, 136, 0.1)',
                                borderRadius: '6px',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(0, 255, 136, 0.2)';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(0, 255, 136, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            📖 Learn Liquid - Shopify Docs
                            <span style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>↗</span>
                        </a>
                    </div>
                </div>
                <div style={{
                    padding: 'clamp(15px, 4vw, 20px) clamp(20px, 5vw, 30px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'clamp(10px, 3vw, 15px)',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    marginTop: 'auto',
                    flexShrink: 0
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 'clamp(8px, 2vw, 10px)',
                            padding: 'clamp(8px, 2vw, 10px) clamp(15px, 4vw, 20px)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            minHeight: '44px',
                            flex: '1',
                            minWidth: '100px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                            border: 'none',
                            borderRadius: 'clamp(8px, 2vw, 10px)',
                            padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 25px)',
                            color: '#000',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
                            minHeight: '44px',
                            flex: '1',
                            minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
                        }}
                    >
                        🚀 OK I understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIGenerationPopup;



================================================
FILE: src/components/CodeViewer.js
================================================
export default function CodeViewer({
    content,
    fileName,
    fileType,
    title,
    onDownload,
    readOnly = true
}) {
    let lineNumbersRef = null;

    const handleScroll = (e) => {
        const codeElement = e.target;
        if (lineNumbersRef) {
            lineNumbersRef.scrollTop = codeElement.scrollTop;
        }
    };
    return (
        <div style={{
            position: 'relative',
            borderRadius: 'clamp(15px, 4vw, 20px)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1,
            marginBottom: 'clamp(15px, 4vw, 25px)'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                padding: 'clamp(15px, 4vw, 20px) clamp(15px, 4vw, 25px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                    flex: '1'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginRight: '20px',
                        flexShrink: 0
                    }}>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)' }}></div>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)' }}></div>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27ca3f', boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)' }}></div>
                    </div>
                    <span style={{
                        color: '#ffffff',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '600',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {title}
                    </span>
                </div>
                <div style={{
                    display: 'flex',
                    gap: 'clamp(5px, 2vw, 10px)',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        color: '#ffffff',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        flexShrink: 0
                    }}>
                        {fileType}
                    </span>
                    <button
                        onClick={(e) => {
                            navigator.clipboard.writeText(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
                            e.target.textContent = '✅ Copied!';
                            e.target.style.background = 'rgba(0, 255, 136, 0.3)';
                            e.target.style.color = '#00ff88';
                            setTimeout(() => {
                                e.target.textContent = '📋 Copy';
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.color = '#ffffff';
                            }, 2000);
                        }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: 'clamp(10px, 2vw, 12px)',
                            fontWeight: '700',
                            transition: 'all 0.2s ease',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                            flexShrink: 0
                        }}
                        onMouseOver={(e) => {
                            if (e.target.textContent === '📋 Copy') {
                                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (e.target.textContent === '📋 Copy') {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            }
                        }}
                    >
                        📋 Copy
                    </button>
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: '#ffffff',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                fontSize: 'clamp(10px, 2vw, 12px)',
                                fontWeight: '700',
                                transition: 'all 0.2s ease',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                                flexShrink: 0
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            }}
                        >
                            💾 Download
                        </button>
                    )}
                </div>
            </div>
            <div style={{
                display: 'flex',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                position: 'relative',
                maxHeight: fileType === 'JSON' ? 'clamp(250px, 40vh, 300px)' : 'clamp(300px, 50vh, 400px)',
                overflow: 'hidden'
            }}>
                <div
                    ref={(el) => lineNumbersRef = el}
                    className="line-numbers"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRight: '2px solid rgba(255, 255, 255, 0.15)',
                        padding: 'clamp(15px, 4vw, 25px) clamp(10px, 3vw, 15px)',
                        color: '#888',
                        fontSize: fileType === 'JSON' ? 'clamp(11px, 2vw, 13px)' : 'clamp(13px, 2.5vw, 15px)',
                        fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                        lineHeight: fileType === 'JSON' ? '1.6' : '1.7',
                        userSelect: 'none',
                        minWidth: 'clamp(40px, 8vw, 60px)',
                        textAlign: 'right',
                        overflow: 'hidden',
                        maxHeight: fileType === 'JSON' ? 'clamp(250px, 40vh, 300px)' : 'clamp(300px, 50vh, 400px)',
                        pointerEvents: 'none',
                        display: 'block'
                    }}>
                    {content && (typeof content === 'string' ? content : JSON.stringify(content, null, 2))
                        .split('\n')
                        .map((_, index) => (
                            <div key={index} style={{
                                height: fileType === 'JSON' ? 'clamp(18px, 3vw, 20.8px)' : 'clamp(20px, 4vw, 25.5px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                {index + 1}
                            </div>
                        ))
                    }
                </div>
                <div
                    onScroll={fileType === 'JSON' ? handleScroll : undefined}
                    style={{
                        flex: 1,
                        overflow: 'auto',
                        maxHeight: fileType === 'JSON' ? 'clamp(250px, 40vh, 300px)' : 'clamp(300px, 50vh, 400px)'
                    }}>
                    {fileType === 'JSON' ? (
                        <pre
                            style={{
                                color: '#f0f0f0',
                                padding: 'clamp(15px, 4vw, 25px)',
                                fontSize: 'clamp(11px, 2vw, 13px)',
                                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                                lineHeight: '1.6',
                                margin: 0,
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
                                minHeight: '100%',
                                overflow: 'visible',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap'
                            }}>
                            {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                        </pre>
                    ) : (
                        <textarea
                            value={content}
                            readOnly={readOnly}
                            onScroll={handleScroll}
                            style={{
                                width: '100%',
                                height: 'clamp(300px, 50vh, 400px)',
                                padding: 'clamp(15px, 4vw, 25px)',
                                border: 'none',
                                outline: 'none',
                                fontSize: 'clamp(13px, 2.5vw, 15px)',
                                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                                lineHeight: '1.7',
                                background: 'transparent',
                                color: '#f0f0f0',
                                resize: 'none',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}



================================================
FILE: src/components/ConfirmationPopup.js
================================================
export default function ConfirmationPopup({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Yes, Continue",
    cancelText = "Cancel",
    type = "warning"
}) {
    if (!isOpen) return null;

    const getColors = () => {
        switch (type) {
            case 'danger':
                return {
                    primary: '#ff4444',
                    primaryHover: '#ff6666',
                    secondary: '#cc3333',
                    bg: 'rgba(255, 68, 68, 0.1)',
                    border: 'rgba(255, 68, 68, 0.3)'
                };
            case 'info':
                return {
                    primary: '#0099ff',
                    primaryHover: '#33aaff',
                    secondary: '#0077cc',
                    bg: 'rgba(0, 153, 255, 0.1)',
                    border: 'rgba(0, 153, 255, 0.3)'
                };
            default:
                return {
                    primary: '#ff6b35',
                    primaryHover: '#ff8555',
                    secondary: '#cc5528',
                    bg: 'rgba(255, 107, 53, 0.1)',
                    border: 'rgba(255, 107, 53, 0.3)'
                };
        }
    };

    const colors = getColors();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(5px)',
            padding: '20px'
        }}>
            <div style={{
                background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.border}`,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: colors.bg,
                    pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            boxShadow: `0 8px 16px ${colors.bg}`
                        }}>
                            <span style={{
                                fontSize: '24px',
                                filter: 'brightness(1.2)'
                            }}>
                                {type === 'danger' ? '⚠️' : type === 'info' ? 'ℹ️' : '🔄'}
                            </span>
                        </div>
                        <h3 style={{
                            color: '#ffffff',
                            margin: 0,
                            fontSize: 'clamp(18px, 4vw, 22px)',
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            {title}
                        </h3>
                    </div>

                    <div style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        lineHeight: '1.6',
                        marginBottom: '25px',
                        whiteSpace: 'pre-line'
                    }}>
                        {message}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: cancelText ? 'flex-end' : 'center',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>
                        {cancelText && (
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'linear-gradient(135deg, #666 0%, #888 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)',
                                    cursor: 'pointer',
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    minWidth: '100px'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            onClick={onConfirm}
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)',
                                cursor: 'pointer',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 8px 16px ${colors.bg}`,
                                minWidth: '120px'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.background = `linear-gradient(135deg, ${colors.primaryHover} 0%, ${colors.primary} 100%)`;
                                e.target.style.boxShadow = `0 12px 24px ${colors.bg}`;
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
                                e.target.style.boxShadow = `0 8px 16px ${colors.bg}`;
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



================================================
FILE: src/components/ConversionSection.js
================================================
import { useState } from 'react';
import CodeViewer from './CodeViewer';
import SchemaFieldIndicators from './SchemaFieldIndicators';
export default function ConversionSection({
    files,
    isConverting,
    currentlyConverting,
    conversionError,
    convertedFiles,
    combinedHeadContent,
    activeTab,
    setActiveTab,
    convertToLiquid,
    downloadLiquidFile,
    downloadJsonFile,
    downloadHeadFile,
    downloadCombinedHeadFile,
    downloadAllAsZip
}) {
    const [showFieldIndicators, setShowFieldIndicators] = useState({});

    const filesWithContent = files.filter(file => file.fileContent);
    const filesWithoutNames = filesWithContent.filter(file => !file.fileName || !file.fileName.trim());
    const hasAllRequiredFilenames = filesWithContent.length > 0 && filesWithoutNames.length === 0;

    const extractSchemaFromLiquid = (liquidContent) => {
        if (!liquidContent) return null;

        const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);
        if (!schemaMatch) return null;

        try {
            return JSON.parse(schemaMatch[1]);
        } catch (error) {
            console.error('Error parsing schema:', error);
            return null;
        }
    };

    const toggleFieldIndicators = (fileIndex) => {
        setShowFieldIndicators(prev => ({
            ...prev,
            [fileIndex]: prev[fileIndex] === undefined ? false : !prev[fileIndex]
        }));
    };

    if (filesWithContent.length === 0) return null;

    return (
        <>
            <div style={{
                background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
                borderRadius: 'clamp(15px, 4vw, 25px)',
                padding: 'clamp(20px, 5vw, 35px)',
                marginTop: 'clamp(20px, 5vw, 35px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'clamp(15px, 4vw, 25px)',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    gap: '15px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0,
                        flex: '1'
                    }}>
                        <div style={{
                            width: 'clamp(40px, 8vw, 50px)',
                            height: 'clamp(40px, 8vw, 50px)',
                            borderRadius: '15px',
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '20px',
                            boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)',
                            flexShrink: 0
                        }}>
                            <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>🚀</span>
                        </div>
                        <h2 style={{
                            margin: 0,
                            fontSize: 'clamp(18px, 4vw, 24px)',
                            fontWeight: '700',
                            color: '#ffffff',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            wordBreak: 'break-word'
                        }}>
                            HTML to Liquid + JSON Converter
                        </h2>
                    </div>
                    <button
                        onClick={convertToLiquid}
                        disabled={isConverting || filesWithContent.length === 0 || !hasAllRequiredFilenames}
                        style={{
                            background: (isConverting || !hasAllRequiredFilenames)
                                ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                                : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                            color: (isConverting || !hasAllRequiredFilenames) ? '#ccc' : '#000000',
                            border: 'none',
                            borderRadius: '15px',
                            padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                            cursor: (isConverting || !hasAllRequiredFilenames) ? 'not-allowed' : 'pointer',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            fontWeight: '700',
                            transition: 'all 0.3s ease',
                            boxShadow: (isConverting || !hasAllRequiredFilenames)
                                ? '0 4px 8px rgba(0,0,0,0.2)'
                                : '0 8px 16px rgba(0, 255, 136, 0.3)',
                            transform: (isConverting || !hasAllRequiredFilenames) ? 'scale(0.98)' : 'scale(1)',
                            opacity: (isConverting || !hasAllRequiredFilenames) ? 0.7 : 1,
                            flexShrink: 0,
                            whiteSpace: 'nowrap'
                        }}
                        onMouseOver={(e) => {
                            if (!isConverting && hasAllRequiredFilenames) {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 24px rgba(0, 255, 136, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isConverting && hasAllRequiredFilenames) {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 16px rgba(0, 255, 136, 0.3)';
                            }
                        }}
                    >
                        {isConverting ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid #ffffff',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    display: 'inline-block'
                                }} className="spinning-loader"></div>
                                Converting {filesWithContent.length} file{filesWithContent.length > 1 ? 's' : ''}...
                            </>
                        ) : !hasAllRequiredFilenames ? (
                            `⚠️ Enter Section Names First (${filesWithoutNames.length} missing)`
                        ) : (
                            `🚀 Convert ${filesWithContent.length} File${filesWithContent.length > 1 ? 's' : ''} to Liquid + JSON`
                        )}
                    </button>

                    {convertedFiles.length > 0 && (
                        <>
                            <button
                                onClick={downloadAllAsZip}
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '15px',
                                    padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                                    cursor: 'pointer',
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    fontWeight: '700',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap',
                                    marginLeft: '15px'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 8px 16px rgba(99, 102, 241, 0.3)';
                                }}
                            >
                                📦 Download ZIP ({convertedFiles.length} files)
                            </button>
                        </>
                    )}
                </div>
                {conversionError && (
                    <div style={{
                        background: 'linear-gradient(135deg, #ff4444 0%, #cc3333 100%)',
                        color: 'white',
                        padding: '15px 20px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        boxShadow: '0 4px 8px rgba(255, 68, 68, 0.3)',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        ❌ {conversionError}
                    </div>
                )}

                {(combinedHeadContent || convertedFiles.length > 0) && (
                    <div style={{
                        marginTop: 'clamp(20px, 5vw, 30px)',
                        padding: 'clamp(15px, 4vw, 20px)',
                        background: 'rgba(0, 255, 136, 0.15)',
                        borderRadius: 'clamp(10px, 3vw, 15px)',
                        border: '2px solid rgba(0, 255, 136, 0.4)',
                        boxShadow: '0 8px 25px rgba(0, 255, 136, 0.2)'
                    }}>
                        <div style={{
                            marginBottom: 'clamp(15px, 4vw, 20px)',
                            padding: 'clamp(10px, 3vw, 15px)',
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                color: '#ffffff',
                                margin: 0,
                                fontSize: 'clamp(16px, 4vw, 20px)',
                                fontWeight: '700',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                🎨 Production-Ready Theme.liquid File
                            </h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                margin: '8px 0 0 0',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '500'
                            }}>
                                {combinedHeadContent
                                    ? `Clean Shopify theme.liquid file with all your resources properly integrated (${combinedHeadContent.split('\n').filter(line => line.trim()).length} lines)`
                                    : 'Upload and convert HTML files to generate your theme.liquid file'
                                }
                            </p>
                        </div>

                        <CodeViewer
                            content={combinedHeadContent || '<!-- No combined head content available yet. Upload and convert HTML files to see the theme.liquid output here. -->'}
                            fileName="theme.liquid"
                            fileType="Liquid"
                            title="🎨 Production-Ready Theme.liquid File"
                            onDownload={combinedHeadContent ? downloadCombinedHeadFile : null}
                        />
                    </div>
                )}

                {(convertedFiles.length > 0 || isConverting) && (
                    <div style={{
                        marginTop: 'clamp(20px, 5vw, 30px)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 'clamp(10px, 3vw, 15px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <style jsx>{`
                        .tab-container::-webkit-scrollbar {
                            height: 6px;
                        }
                        .tab-container::-webkit-scrollbar-track {
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 3px;
                        }
                        .tab-container::-webkit-scrollbar-thumb {
                            background: rgba(0, 212, 255, 0.5);
                            border-radius: 3px;
                        }
                        .tab-container::-webkit-scrollbar-thumb:hover {
                            background: rgba(0, 212, 255, 0.7);
                        }
                    `}</style>
                        <div className="tab-container" style={{
                            display: 'flex',
                            overflowX: 'auto',
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
                        }}>
                            {filesWithContent.map((file, index) => {
                                const convertedFile = convertedFiles.find(cf => cf.index === index);
                                const isCurrentlyConverting = currentlyConverting && currentlyConverting.index === index;
                                const hasError = convertedFile?.hasError;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        style={{
                                            padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                                            background: activeTab === index
                                                ? 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)'
                                                : 'transparent',
                                            color: activeTab === index ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: 'clamp(12px, 3vw, 14px)',
                                            fontWeight: activeTab === index ? '700' : '500',
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap',
                                            minWidth: 'fit-content',
                                            textShadow: activeTab === index ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
                                            borderRadius: activeTab === index ? '8px 8px 0 0' : '0',
                                            position: 'relative'
                                        }}
                                        onMouseOver={(e) => {
                                            if (activeTab !== index) {
                                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                e.target.style.color = '#ffffff';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (activeTab !== index) {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                            }
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            width: '100%'
                                        }}>
                                            <span>📄 {file.fileName || `File ${index + 1}`}</span>
                                            {hasError && <span>⚠️</span>}
                                            {isCurrentlyConverting && !convertedFile && (
                                                <div style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                                    borderTop: '1px solid #00ff88',
                                                    borderRadius: '50%'
                                                }} className="spinning-loader"></div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{
                            padding: 'clamp(15px, 4vw, 20px)'
                        }}>
                            {convertedFiles[activeTab] && !(currentlyConverting && currentlyConverting.index === activeTab) && (
                                <div>
                                    <div style={{
                                        marginBottom: 'clamp(15px, 4vw, 20px)',
                                        padding: 'clamp(10px, 3vw, 15px)',
                                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                                        borderRadius: '10px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                            gap: '10px'
                                        }}>
                                            <h3 style={{
                                                color: '#ffffff',
                                                margin: 0,
                                                fontSize: 'clamp(16px, 4vw, 20px)',
                                                fontWeight: '700',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                                flex: 1
                                            }}>
                                                📄 File {activeTab + 1}: {convertedFiles[activeTab].originalFile.fileName || `File-${activeTab + 1}.html`}
                                            </h3>
                                        </div>
                                    </div>

                                    {convertedFiles[activeTab].headExtractionError && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #ff8800 0%, #cc6600 100%)',
                                            color: 'white',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            marginBottom: '15px',
                                            fontSize: 'clamp(13px, 3vw, 15px)',
                                            fontWeight: '500',
                                            border: '1px solid rgba(255, 136, 0, 0.3)',
                                            boxShadow: '0 4px 8px rgba(255, 136, 0, 0.2)'
                                        }}>
                                            ⚠️ Head extraction warning: {convertedFiles[activeTab].headExtractionError}
                                        </div>
                                    )}

                                    {convertedFiles[activeTab].hasError && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #ff4444 0%, #cc3333 100%)',
                                            color: 'white',
                                            padding: '15px 20px',
                                            borderRadius: '12px',
                                            marginBottom: '20px',
                                            fontSize: 'clamp(14px, 3vw, 16px)',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 8px rgba(255, 68, 68, 0.3)',
                                            textAlign: 'center'
                                        }}>
                                            ❌ Conversion Error: {convertedFiles[activeTab].headExtractionError}
                                        </div>
                                    )}

                                    {convertedFiles[activeTab].shopifyInfo && !convertedFiles[activeTab].hasError && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            color: 'white',
                                            padding: '15px 20px',
                                            borderRadius: '12px',
                                            marginBottom: '20px',
                                            fontSize: 'clamp(12px, 3vw, 14px)',
                                            boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3)'
                                        }}>
                                            <div style={{ fontWeight: '700', marginBottom: '10px' }}>
                                                ✅ Shopify Processing Complete
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                                <div>
                                                    <strong>Section Name:</strong> {convertedFiles[activeTab].sectionName}
                                                </div>
                                                <div>
                                                    <strong>Files:</strong> sections/{convertedFiles[activeTab].sectionName}.liquid, templates/{convertedFiles[activeTab].sectionName}.json
                                                </div>
                                                {convertedFiles[activeTab].filenameCorrected && (
                                                    <div style={{ color: '#fef08a' }}>
                                                        <strong>Filename Corrected:</strong> Made Shopify-compatible
                                                    </div>
                                                )}
                                                {convertedFiles[activeTab].injectedBlocks && convertedFiles[activeTab].injectedBlocks.length > 0 && (
                                                    <div>
                                                        <strong>Auto-injected Blocks:</strong> {convertedFiles[activeTab].injectedBlocks.join(', ')}
                                                    </div>
                                                )}
                                                {convertedFiles[activeTab].usedBlockTypes && convertedFiles[activeTab].usedBlockTypes.length > 0 && (
                                                    <div>
                                                        <strong>Block Types Used:</strong> {convertedFiles[activeTab].usedBlockTypes.length} types
                                                    </div>
                                                )}
                                            </div>
                                            {convertedFiles[activeTab].processingErrors && convertedFiles[activeTab].processingErrors.length > 0 && (
                                                <div style={{
                                                    marginTop: '10px',
                                                    padding: '8px 12px',
                                                    background: 'rgba(0,0,0,0.2)',
                                                    borderRadius: '8px',
                                                    fontSize: 'clamp(11px, 2.5vw, 13px)'
                                                }}>
                                                    <strong>⚠️ Warnings:</strong><br />
                                                    {convertedFiles[activeTab].processingErrors.join('; ')}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {convertedFiles[activeTab].liquidContent && (
                                        <CodeViewer
                                            content={convertedFiles[activeTab].liquidContent}
                                            fileName={convertedFiles[activeTab].fileNames?.liquidFileName || (convertedFiles[activeTab].originalFile?.fileName ? convertedFiles[activeTab].originalFile.fileName.replace('.html', '.liquid') : `converted-${activeTab + 1}.liquid`)}
                                            fileType="Liquid"
                                            title={`Converted Liquid Template - File ${activeTab + 1}`}
                                            onDownload={() => downloadLiquidFile(convertedFiles[activeTab])}
                                        />
                                    )}

                                    {convertedFiles[activeTab].jsonTemplate && (
                                        <CodeViewer
                                            content={convertedFiles[activeTab].jsonTemplate}
                                            fileName={convertedFiles[activeTab].fileNames?.jsonFileName || (convertedFiles[activeTab].originalFile?.fileName ? `page.${convertedFiles[activeTab].originalFile.fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : `page.custom-${activeTab + 1}.json`)}
                                            fileType="JSON"
                                            title={`Shopify Page Template - File ${activeTab + 1}`}
                                            onDownload={() => downloadJsonFile(convertedFiles[activeTab])}
                                        />
                                    )}

                                    {convertedFiles[activeTab].liquidContent && (
                                        <>
                                            <div style={{
                                                display: 'flex',
                                                gap: '15px',
                                                marginTop: '20px',
                                                marginBottom: '20px',
                                                flexWrap: 'wrap'
                                            }}>
                                                <button
                                                    onClick={() => toggleFieldIndicators(activeTab)}
                                                    style={{
                                                        background: (showFieldIndicators[activeTab] ?? true)
                                                            ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                                                            : 'rgba(255, 107, 107, 0.2)',
                                                        color: 'white',
                                                        border: (showFieldIndicators[activeTab] ?? true)
                                                            ? '1px solid rgba(255, 107, 107, 0.5)'
                                                            : '1px solid rgba(255, 107, 107, 0.3)',
                                                        borderRadius: '12px',
                                                        padding: '10px 16px',
                                                        fontSize: 'clamp(12px, 3vw, 14px)',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        if (!(showFieldIndicators[activeTab] ?? true)) {
                                                            e.target.style.background = 'rgba(255, 107, 107, 0.3)';
                                                        }
                                                        e.target.style.transform = 'translateY(-2px)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (!(showFieldIndicators[activeTab] ?? true)) {
                                                            e.target.style.background = 'rgba(255, 107, 107, 0.2)';
                                                        }
                                                        e.target.style.transform = 'translateY(0)';
                                                    }}
                                                >
                                                    📋 {(showFieldIndicators[activeTab] ?? true) ? 'Hide' : 'Show'} Field Requirements
                                                </button>
                                            </div>

                                            <SchemaFieldIndicators
                                                schema={extractSchemaFromLiquid(convertedFiles[activeTab].liquidContent)}
                                                isVisible={showFieldIndicators[activeTab] ?? true}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            {(!convertedFiles[activeTab] || (currentlyConverting && currentlyConverting.index === activeTab)) && currentlyConverting && currentlyConverting.index === activeTab && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: 'clamp(40px, 8vw, 60px)',
                                    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                                    borderRadius: '15px',
                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                                        borderRadius: '15px'
                                    }} className="pulsing-bg"></div>

                                    <div style={{
                                        fontSize: 'clamp(32px, 6vw, 40px)',
                                        marginBottom: '15px',
                                        zIndex: 1,
                                        position: 'relative'
                                    }} className="bouncing-emoji">
                                        ⚡
                                    </div>

                                    <h3 style={{
                                        color: '#00ff88',
                                        fontSize: 'clamp(16px, 4vw, 20px)',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        Converting File {activeTab + 1}
                                    </h3>

                                    <p style={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: 'clamp(14px, 3vw, 16px)',
                                        marginBottom: '20px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        {currentlyConverting.fileName}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: '#00ff88'
                                        }} className="loading-dot"></div>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: '#00ff88'
                                        }} className="loading-dot"></div>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: '#00ff88'
                                        }} className="loading-dot"></div>
                                    </div>
                                </div>
                            )}



                            {!convertedFiles[activeTab] && (!currentlyConverting || currentlyConverting.index !== activeTab) && activeTab < filesWithContent.length && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: 'clamp(40px, 8vw, 60px)',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '15px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div style={{
                                        fontSize: 'clamp(32px, 6vw, 40px)',
                                        marginBottom: '15px',
                                        opacity: 0.5
                                    }}>
                                        ⏳
                                    </div>

                                    <h3 style={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: 'clamp(16px, 4vw, 20px)',
                                        fontWeight: '600',
                                        marginBottom: '10px'
                                    }}>
                                        Waiting for File {activeTab + 1}
                                    </h3>

                                    <p style={{
                                        color: 'rgba(255, 255, 255, 0.4)',
                                        fontSize: 'clamp(14px, 3vw, 16px)'
                                    }}>
                                        {filesWithContent[activeTab]?.fileName || `File-${activeTab + 1}.html`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {false && (
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                        marginTop: 'clamp(20px, 5vw, 30px)',
                        background: 'linear-gradient(145deg, #1a1a2e 0%, #2a2a3e 100%)'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                            padding: '15px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '8px', marginRight: '15px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#ff5f56',
                                        boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)'
                                    }} className="floating-icon"></div>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#ffbd2e',
                                        boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)'
                                    }} className="floating-icon"></div>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#27ca3f',
                                        boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)'
                                    }} className="floating-icon"></div>
                                </div>
                                <span style={{
                                    color: '#ffffff',
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    fontWeight: '600',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                                }}>
                                    🤖 Converting: {currentlyConverting.fileName}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <span style={{
                                    color: '#00ff88',
                                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                                    fontWeight: '600'
                                }}>
                                    {currentlyConverting.remaining} remaining
                                </span>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid rgba(0, 255, 136, 0.3)',
                                    borderTop: '2px solid #00ff88',
                                    borderRadius: '50%'
                                }} className="spinning-loader"></div>
                            </div>
                        </div>

                        <div style={{
                            padding: 'clamp(20px, 4vw, 30px)',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                            minHeight: 'clamp(120px, 20vh, 150px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)'
                            }} className="pulsing-bg"></div>

                            <div style={{
                                fontSize: 'clamp(32px, 6vw, 40px)',
                                marginBottom: '15px',
                                zIndex: 1
                            }} className="bouncing-emoji">
                                ⚡
                            </div>
                            <div style={{
                                color: '#00ff88',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                fontWeight: '600',
                                marginBottom: '8px',
                                zIndex: 1
                            }}>
                                Processing File {currentlyConverting.index + 1} of {currentlyConverting.total}
                            </div>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 'clamp(12px, 2.5vw, 14px)',
                                marginBottom: '20px',
                                zIndex: 1
                            }}>
                                Converting current file to Liquid + JSON...
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '6px',
                                zIndex: 1
                            }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#00ff88'
                                }} className="loading-dot"></div>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#00ff88'
                                }} className="loading-dot"></div>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#00ff88'
                                }} className="loading-dot"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}



================================================
FILE: src/components/ErrorPopup.js
================================================
"use client";
import { useState, useEffect } from "react";

const ErrorPopup = ({ errors, isVisible, onClose, fileName, allFileErrors = null }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!isVisible) return null;
    const formatErrors = (errorString) => {
        if (allFileErrors && Array.isArray(allFileErrors)) {
            const formattedErrors = [];

            allFileErrors.forEach(fileError => {
                formattedErrors.push(`📁 ${fileError.fileName} (${fileError.errorCount} error${fileError.errorCount !== 1 ? 's' : ''})`);

                if (fileError.detailedErrors && fileError.detailedErrors.length > 0) {
                    fileError.detailedErrors.forEach((error, index) => {
                        formattedErrors.push(`   ${index + 1}. ${error}`);
                    });
                } else {
                    const errorLines = fileError.error.split('\n').filter(line => {
                        const trimmed = line.trim();
                        return /^\d+\.\s+Line\s+\d+,\s+Col\s+\d+:/.test(trimmed);
                    });

                    if (errorLines.length > 0) {
                        errorLines.forEach((line, index) => {
                            const cleanError = line.trim().replace(/^\d+\.\s+/, '');
                            formattedErrors.push(`   ${index + 1}. ${cleanError}`);
                        });
                    } else {
                        formattedErrors.push(`   1. ${fileError.error.split('\n')[0]}`);
                    }
                }

                if (fileError !== allFileErrors[allFileErrors.length - 1]) {
                    formattedErrors.push('');
                }
            });

            return formattedErrors;
        }

        if (typeof errorString === 'string') {
            const lines = errorString.split('\n').filter(line => line.trim());

            const errorStartIndex = lines.findIndex(line => line.includes('HTML validation errors found:'));
            if (errorStartIndex !== -1) {
                const errorLines = lines.filter(line => {
                    const trimmed = line.trim();
                    return /^\d+\.\s+Line\s+\d+,\s+Col\s+\d+:/.test(trimmed);
                });

                if (errorLines.length > 0) {
                    return errorLines.map(line => line.trim().replace(/^\d+\.\s+/, ''));
                }

                const relevantLines = lines.slice(errorStartIndex + 1).filter(line => {
                    const trimmed = line.trim();
                    return trimmed && !trimmed.startsWith('Please fix these issues');
                });
                return relevantLines;
            }

            return [errorString];
        }
        return Array.isArray(errors) ? errors : [errors];
    };

    const errorList = formatErrors(errors);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #2d1b2e 0%, #1a1a2e 50%, #0f0f23 100%)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    maxWidth: 'clamp(320px, 90vw, 600px)',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 87, 87, 0.3)',
                    transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                    transition: 'transform 0.3s ease-out',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    padding: 'clamp(15px, 4vw, 25px) clamp(20px, 5vw, 30px)',
                    borderBottom: '1px solid rgba(255, 87, 87, 0.2)',
                    background: 'linear-gradient(90deg, rgba(255, 87, 87, 0.1) 0%, rgba(255, 87, 87, 0.05) 100%)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            minWidth: 0,
                            flex: '1'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ff5757 0%, #ff4757 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px'
                            }}>
                                ⚠️
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    color: '#ff5757',
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>
                                    HTML Validation Errors
                                </h3>
                                {allFileErrors && allFileErrors.length > 1 ? (
                                    <p style={{
                                        margin: '4px 0 0 0',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '14px'
                                    }}>
                                        {allFileErrors.length} files with errors ({allFileErrors.reduce((sum, f) => sum + f.errorCount, 0)} total errors)
                                    </p>
                                ) : fileName ? (
                                    <p style={{
                                        margin: '4px 0 0 0',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '14px'
                                    }}>
                                        File: {fileName}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '18px',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: '#fff'
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div style={{
                    padding: '0',
                    maxHeight: '60vh',
                    overflowY: 'auto'
                }}>
                    {errorList.map((error, index) => {
                        const isFileHeader = error.startsWith('📁');
                        const isIndentedError = error.startsWith('   ');
                        const isEmpty = error.trim() === '';

                        if (isEmpty) {
                            return (
                                <div key={index} style={{ height: '10px' }} />
                            );
                        }

                        return (
                            <div
                                key={index}
                                style={{
                                    padding: isFileHeader ? '15px 30px 10px 30px' :
                                        isIndentedError ? '5px 30px 5px 60px' : '20px 30px',
                                    borderBottom: !isIndentedError && index < errorList.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                                    background: isFileHeader ? 'rgba(102, 126, 234, 0.1)' :
                                        isIndentedError ? 'transparent' :
                                            index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: isIndentedError ? '10px' : '15px'
                                }}>
                                    {!isFileHeader && !isIndentedError && (
                                        <div style={{
                                            minWidth: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            marginTop: '2px'
                                        }}>
                                            {index + 1}
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <p style={{
                                            margin: 0,
                                            color: isFileHeader ? '#667eea' : '#ffffff',
                                            fontSize: isFileHeader ? '16px' :
                                                isIndentedError ? '14px' : '15px',
                                            lineHeight: '1.6',
                                            fontFamily: isFileHeader ? 'inherit' : 'Monaco, Consolas, "Courier New", monospace',
                                            fontWeight: isFileHeader ? '600' : 'normal'
                                        }}>
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    padding: '20px 30px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '14px'
                    }}>
                        <span>📋</span>
                        {allFileErrors && allFileErrors.length > 1 ? (
                            `${allFileErrors.reduce((sum, f) => sum + f.errorCount, 0)} errors in ${allFileErrors.length} files`
                        ) : (
                            `${errorList.filter(e => e.trim() && !e.startsWith('📁')).length} error${errorList.filter(e => e.trim() && !e.startsWith('📁')).length !== 1 ? 's' : ''} found`
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopup;



================================================
FILE: src/components/FileUploadSection.js
================================================
export default function FileUploadSection({
    numberOfFiles,
    onNumberOfFilesChange
}) {
    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginBottom: 'clamp(20px, 5vw, 35px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{
                    width: 'clamp(40px, 8vw, 50px)',
                    height: 'clamp(40px, 8vw, 50px)',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(0, 212, 255, 0.3)',
                    flexShrink: 0
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📁</span>
                </div>
                <h2 style={{
                    margin: 0,
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '700',
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    flex: '1',
                    minWidth: '200px'
                }}>
                    Number of HTML Files
                </h2>
            </div>
            <div style={{
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 'clamp(10px, 3vw, 15px)',
                padding: 'clamp(10px, 2vw, 15px)',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.2)',
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(10px)'
            }}>
                <select
                    value={numberOfFiles}
                    onChange={(e) => onNumberOfFilesChange(parseInt(e.target.value))}
                    style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        color: '#ffffff',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 2.5vw, 16px)',
                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 6px 12px rgba(0, 212, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        maxWidth: 'full',
                        minWidth: '200px',
                        height: 'auto',
                        lineHeight: '1.4'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 8px 16px rgba(0, 212, 255, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 6px 12px rgba(0, 212, 255, 0.3)';
                    }}
                >
                    <option value={0} style={{
                        background: '#1e1e2e',
                        color: '#ffffff',
                        padding: '6px 10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        minHeight: '32px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        📋 Select number of HTML files
                    </option>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num} style={{
                            background: num % 2 === 0 ? '#2a2a3e' : '#1e1e2e',
                            color: '#ffffff',
                            padding: '6px 10px',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '1.3',
                            minHeight: '30px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            📄 {num} {num === 1 ? 'file' : 'files'}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}



================================================
FILE: src/components/GlobalStyles.js
================================================
export default function GlobalStyles() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(3deg); }
      }
      
      @keyframes pulse {
        0%, 100% { 
          box-shadow: 0 8px 16px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.1);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 12px 24px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3);
          transform: scale(1.05);
        }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes lightningGlow {
        0%, 100% { 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 10px rgba(255, 255, 0, 0.3));
        }
        50% { 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(0, 212, 255, 0.4));
        }
      }
      
      @keyframes textShimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      .animated-logo-container {
        animation: slideInUp 0.8s ease-out;
      }
      
      .floating-icon {
        animation: float 4s ease-in-out infinite, pulse 3s ease-in-out infinite;
      }
      
      .lightning-icon {
        animation: lightningGlow 2s ease-in-out infinite;
      }
      
      .gradient-text {
        background: linear-gradient(
          135deg, 
          #00d4ff 0%, 
          #ff00ff 25%, 
          #ffff00 50%, 
          #00d4ff 75%, 
          #ff00ff 100%
        );
        background-size: 300% 300%;
        animation: gradientShift 4s ease infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
        .shimmer-text {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0.8) 100%
        );
        background-size: 200% 100%;
        animation: textShimmer 3s ease-in-out infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes bounce {
        0%, 80%, 100% { 
          transform: translateY(0); 
        }
        40% { 
          transform: translateY(-10px); 
        }
      }
      
      @keyframes loadingDots {
        0%, 80%, 100% { 
          transform: scale(0);
          opacity: 0.5;
        }
        40% { 
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes backgroundPulse {
        0%, 100% { 
          opacity: 0.3; 
          transform: scale(1);
        }
        50% { 
          opacity: 0.6; 
          transform: scale(1.1);
        }
      }
      
      .spinning-loader {
        animation: spin 1s linear infinite;
      }
      
      .bouncing-emoji {
        animation: bounce 2s ease-in-out infinite;
      }
      
      .loading-dot {
        animation: loadingDots 1.4s ease-in-out infinite both;
      }
      
      .loading-dot:nth-child(1) { animation-delay: 0s; }
      .loading-dot:nth-child(2) { animation-delay: 0.16s; }
      .loading-dot:nth-child(3) { animation-delay: 0.32s; }
      
      .pulsing-bg {
        animation: backgroundPulse 3s ease-in-out infinite;
      }
    `}</style>
  );
}



================================================
FILE: src/components/Header.js
================================================
export default function Header({ onHowItWorksClick }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px 20px 20px',
            position: 'relative',
            minHeight: '140px'
        }}>
            <div className="animated-logo-container" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '20px 30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                maxWidth: '100%',
                textAlign: 'center'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}>
                <div className="floating-icon" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    <span className="lightning-icon" style={{
                        fontSize: '28px',
                        zIndex: 2,
                        position: 'relative'
                    }}>⚡</span>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
                        animation: 'gradientShift 3s ease infinite',
                        zIndex: 1
                    }}></div>
                </div>
                <div style={{ minWidth: 0, flex: '1' }}>
                    <h1 className="gradient-text" style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 28px)',
                        fontWeight: '800',
                        letterSpacing: '0.5px',
                        wordBreak: 'break-word'
                    }}>
                        Shopify Liquid Template Generator
                    </h1>
                    <p className="shimmer-text" style={{
                        margin: '5px 0 0 0',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        fontWeight: '500'
                    }}>
                        Complete Sections with Schema & Custom Templates
                    </p>
                </div>
            </div>

            <button
                onClick={onHowItWorksClick}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
                    color: 'white',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                    zIndex: 10
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
                }}
            >
                <span>❓</span>
                How It Works
            </button>
        </div>
    );
}



================================================
FILE: src/components/HowItWorksPopup.js
================================================
import React from 'react';

export default function HowItWorksPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const steps = [
        {
            step: "1",
            title: "Select Number of Files",
            description: "Choose how many HTML files you want to convert (1-20). The system creates input tabs for each file.",
            icon: "📊",
            details: "Dynamic tab creation, file count selection, workspace setup"
        },
        {
            step: "2",
            title: "Add HTML Content",
            description: "For each tab: upload HTML files or paste code directly. Each tab has its own editor with syntax highlighting.",
            icon: "📁",
            details: "File upload or paste code, Monaco editor, independent tabs"
        },
        {
            step: "3",
            title: "Enter Section Names",
            description: "Provide section names for all files - this is mandatory. These names become your Shopify .liquid file names.",
            icon: "🏷️",
            details: "Required filename entry, no fallbacks allowed, section naming"
        },
        {
            step: "4",
            title: "Preview & Validate",
            description: "Use HTML preview toggle to check content visually. HTML validation ensures quality before conversion.",
            icon: "👁️",
            details: "Live preview toggle, HTMLHint validation, error detection"
        },
        {
            step: "5",
            title: "Convert to Liquid",
            description: "AI converts all files sequentially. Watch real-time progress as each file is processed into Shopify sections.",
            icon: "🚀",
            details: "AI-powered conversion, progress tracking, sequential processing"
        },
        {
            step: "6",
            title: "Download Results",
            description: "Get individual .liquid and .json files for each input, plus a combined head snippet for theme.liquid.",
            icon: "⬇️",
            details: "Individual downloads, combined head snippet, organized output"
        }
    ];
    const features = [
        "🔢 Convert Multiple Files - Process 1-20 HTML files at once",
        "📤 Upload or Paste - Add HTML content by uploading files or pasting code",
        "🏷️ Required Section Names - Enter names for all files before conversion",
        "👁️ HTML Preview - Toggle preview to see how HTML looks before converting",
        "⚠️ Schema Conflict Warning - Alerts if HTML already has Shopify schema blocks",
        "🔄 AI-Powered Conversion - Uses OpenAI to convert HTML to Shopify Liquid",
        "📄 Individual Outputs - Each file creates its own .liquid and .json files",
        "🎨 Combined Head Snippet - Single file with all styles and scripts for theme.liquid",
        "🛡️ HTML Validation - Checks HTML quality before conversion starts",
        "📋 Field Requirements - Clear marking of required vs optional schema fields",
        "🎯 Schema Field Indicators - Visual red/gray dots show required vs optional fields after conversion",
        "🔍 Schema Block Detection - Automatic detection and warning for existing schema blocks",
        "⬇️ Easy Downloads - Download individual files or batch download all",
        "📱 Responsive Design - All original styling and responsiveness preserved"
    ];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: 'clamp(10px, 3vw, 20px)',
                overflowY: 'auto'
            }}
            onClick={handleClickOutside}
        >
            <div
                style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    padding: 'clamp(20px, 5vw, 30px)',
                    maxWidth: 'clamp(320px, 90vw, 800px)',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    margin: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'clamp(10px, 3vw, 20px)',
                        right: 'clamp(10px, 3vw, 20px)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 'clamp(32px, 8vw, 40px)',
                        height: 'clamp(32px, 8vw, 40px)',
                        color: 'white',
                        fontSize: 'clamp(16px, 4vw, 20px)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        minHeight: '44px',
                        minWidth: '44px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    ×
                </button>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vw, 30px)' }}>
                    <h2 style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '800',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2'
                    }}>
                        HTML to Shopify Liquid Converter 🚀
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        margin: '0 0 15px 0',
                        lineHeight: '1.4'
                    }}>
                        Transform your static HTML into dynamic Shopify section templates with AI-powered conversion
                    </p>
                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        margin: '0 0 20px 0'
                    }}>
                        <p style={{
                            color: '#00d4ff',
                            fontSize: 'clamp(13px, 3.2vw, 15px)',
                            margin: 0,
                            fontWeight: '500'
                        }}>
                            💡 <strong>How It Works:</strong> This tool converts your HTML files into complete Shopify sections. Upload or paste HTML, enter section names, preview content, then convert with AI to get ready-to-use Shopify files.
                        </p>
                    </div>
                </div>
                <div style={{ marginBottom: 'clamp(20px, 5vw, 30px)' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: 'clamp(18px, 4.5vw, 20px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)',
                        textAlign: 'center'
                    }}>
                        How to Use This Tool 📋
                    </h3>

                    <div style={{
                        display: 'grid',
                        gap: 'clamp(12px, 3vw, 15px)'
                    }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'clamp(10px, 3vw, 15px)',
                                padding: 'clamp(12px, 3vw, 15px)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 'clamp(8px, 2vw, 12px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                flexWrap: 'wrap'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateX(5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}>
                                <div style={{
                                    width: 'clamp(40px, 10vw, 50px)',
                                    height: 'clamp(40px, 10vw, 50px)',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 'clamp(14px, 3.5vw, 18px)',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {step.step}
                                </div>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <h4 style={{
                                        color: 'white',
                                        margin: '0 0 5px 0',
                                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                                        fontWeight: '600',
                                        lineHeight: '1.3'
                                    }}>
                                        {step.icon} {step.title}
                                    </h4>
                                    <p style={{
                                        color: '#bbb',
                                        margin: '0 0 8px 0',
                                        fontSize: 'clamp(12px, 3vw, 14px)',
                                        lineHeight: '1.4'
                                    }}>
                                        {step.description}
                                    </p>
                                    <p style={{
                                        color: '#888',
                                        margin: 0,
                                        fontSize: 'clamp(11px, 2.8vw, 13px)',
                                        fontStyle: 'italic',
                                        lineHeight: '1.3'
                                    }}>
                                        <strong>Technical:</strong> {step.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: 'clamp(15px, 4vw, 20px)' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: 'clamp(18px, 4.5vw, 20px)',
                        marginBottom: 'clamp(12px, 3vw, 15px)',
                        textAlign: 'center'
                    }}>
                        What You Get ✨
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 45vw, 250px), 1fr))',
                        gap: 'clamp(8px, 2vw, 10px)'
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} style={{
                                padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 15px)',
                                background: 'rgba(0, 212, 255, 0.1)',
                                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                                border: '1px solid rgba(0, 212, 255, 0.2)',
                                color: '#00d4ff',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '500',
                                lineHeight: '1.3'
                            }}>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    marginTop: 'clamp(15px, 4vw, 20px)'
                }}>
                    <h4 style={{
                        color: '#ffc107',
                        margin: '0 0 10px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)'
                    }}>
                        💡 Usage Tips:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '8px' }}><strong>Start Small:</strong> Begin with 1-2 files to understand the process</li>
                        <li style={{ marginBottom: '8px' }}><strong>Use Preview:</strong> Toggle HTML preview to check content before converting</li>
                        <li style={{ marginBottom: '8px' }}><strong>Name Your Sections:</strong> Enter descriptive names - they become your .liquid filenames</li>
                        <li style={{ marginBottom: '8px' }}><strong>Check for Warnings:</strong> Tool will alert you if HTML already has schema blocks</li>
                        <li style={{ marginBottom: '8px' }}><strong>After Conversion:</strong> Look for red/gray dots showing required vs optional fields</li>
                        <li><strong>Download Strategy:</strong> Get individual files or download all at once</li>
                    </ul>
                </div>

                <div style={{
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    marginTop: 'clamp(15px, 4vw, 20px)'
                }}>
                    <h4 style={{
                        color: '#00ff7f',
                        margin: '0 0 10px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)'
                    }}>
                        🎯 Final Output:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '5px' }}>✅ Ready-to-use .liquid section files for Shopify</li>
                        <li style={{ marginBottom: '5px' }}>✅ JSON template files for page assignment</li>
                        <li style={{ marginBottom: '5px' }}>✅ Combined head snippet for theme.liquid</li>
                        <li style={{ marginBottom: '5px' }}>✅ Schema fields marked as required (*) or optional</li>
                        <li>✅ All content becomes editable in Shopify Theme Editor</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}



================================================
FILE: src/components/HtmlEditor.js
================================================
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { validateAndExtractHtml } from '../utils/htmlValidation';

export default function HtmlEditor({
    fileContent,
    fileName,
    handleManualInput,
    index,
    isLoading,
    onFileUpload,
    onClearContent,
    validationErrors,
    onValidationError,
    onFileNameChange
}) {
    const [localFileName, setLocalFileName] = useState(fileName || '');
    const [fileNameError, setFileNameError] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const allowedExtensions = ['.html'];
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

        if (!allowedExtensions.includes(fileExtension)) {
            onValidationError('Please select only .html files. Only HTML files are supported for validation.');
            event.target.value = '';
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const rawText = e.target.result;
                const result = validateAndExtractHtml(rawText, file.name);

                if (!result.isValid) {
                    onValidationError(result.error);
                    event.target.value = '';
                    return;
                }

                const baseFileName = file.name.replace(/\.html?$/i, '');
                setLocalFileName(baseFileName);
                setFileNameError('');
                onFileNameChange && onFileNameChange(index, baseFileName);
                onFileUpload(index, baseFileName, result.content);
            };

            reader.onerror = () => {
                onValidationError('Error reading file. Please try again.');
                event.target.value = '';
            };

            reader.readAsText(file);
        } catch (error) {
            onValidationError('Error reading file: ' + error.message);
            event.target.value = '';
        }
    };

    const handleFileNameChange = (newFileName) => {
        setLocalFileName(newFileName);

        const { validateShopifyFilename } = require('../utils/filenameValidation');
        const validation = validateShopifyFilename(newFileName);

        if (!validation.valid) {
            setFileNameError(validation.error);
        } else {
            setFileNameError('');
        }

        onFileNameChange && onFileNameChange(index, newFileName);
    };

    const clearContent = () => {
        const fileInput = document.getElementById(`fileInput-${index}`);
        if (fileInput) {
            fileInput.value = '';
        }

        setLocalFileName('');
        setFileNameError('');

        onClearContent(index);
    };

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 'clamp(20px, 5vw, 35px)'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 0, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{
                    width: 'clamp(40px, 8vw, 50px)',
                    height: 'clamp(40px, 8vw, 50px)',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #ff00ff 0%, #cc0099 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(255, 0, 255, 0.3)',
                    flexShrink: 0
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📝</span>
                </div>
                <h2 style={{
                    margin: 0,
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '700',
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    flex: '1',
                    minWidth: '200px'
                }}>
                    HTML Editor & Validator {index > 0 && `#${index + 1}`}
                </h2>

                {fileContent && fileContent.trim() && (
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        style={{
                            background: showPreview
                                ? 'linear-gradient(135deg, #7877c6 0%, #5a59a8 100%)'
                                : 'rgba(120, 119, 198, 0.2)',
                            color: 'white',
                            border: showPreview
                                ? '1px solid rgba(120, 119, 198, 0.5)'
                                : '1px solid rgba(120, 119, 198, 0.3)',
                            borderRadius: '25px',
                            padding: '8px 16px',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            position: 'relative',
                            overflow: 'hidden',
                            transform: showPreview ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: showPreview
                                ? '0 6px 20px rgba(120, 119, 198, 0.4)'
                                : '0 4px 12px rgba(120, 119, 198, 0.2)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.08)';
                            e.target.style.boxShadow = '0 8px 25px rgba(120, 119, 198, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = showPreview ? 'scale(1.05)' : 'scale(1)';
                            e.target.style.boxShadow = showPreview
                                ? '0 6px 20px rgba(120, 119, 198, 0.4)'
                                : '0 4px 12px rgba(120, 119, 198, 0.2)';
                        }}
                    >
                        <div style={{
                            width: '32px',
                            height: '18px',
                            borderRadius: '9px',
                            background: showPreview
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(255, 255, 255, 0.1)',
                            position: 'relative',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                background: 'white',
                                position: 'absolute',
                                top: '2px',
                                left: showPreview ? '16px' : '2px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                            }}></div>
                        </div>

                        <span>
                            👁️ Preview {showPreview ? 'ON' : 'OFF'}
                        </span>
                    </button>
                )}

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="file"
                            accept=".html"
                            onChange={handleFileUpload}
                            disabled={isLoading}
                            style={{ display: 'none' }}
                            id={`fileInput-${index}`}
                        />
                        <button
                            onClick={() => document.getElementById(`fileInput-${index}`).click()}
                            disabled={isLoading}
                            style={{
                                background: 'linear-gradient(135deg, #ff00ff 0%, #cc0099 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '8px 16px',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '600',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 4px 12px rgba(255, 0, 255, 0.3)',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                flexShrink: 0,
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseOver={(e) => {
                                if (!isLoading) {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(255, 0, 255, 0.4)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isLoading) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(255, 0, 255, 0.3)';
                                }
                            }}
                        >
                            {isLoading ? '⏳' : '📁'} Upload
                        </button>
                    </div>

                </div>
            </div>

            {fileName && (
                <div style={{
                    marginBottom: 'clamp(15px, 4vw, 25px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 20px rgba(0, 255, 136, 0.2)',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0,
                        flex: '1'
                    }}>
                        <span style={{
                            fontSize: 'clamp(18px, 4vw, 24px)',
                            marginRight: '15px',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                            flexShrink: 0
                        }}>✅</span>
                        <span style={{
                            color: '#000000',
                            fontWeight: '700',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            textShadow: '0 1px 2px rgba(255,255,255,0.1)',
                            wordBreak: 'break-all',
                            overflow: 'hidden'
                        }}>
                            {fileName}
                        </span>
                    </div>
                    <button
                        onClick={clearContent}
                        style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            color: '#000000',
                            border: 'none',
                            borderRadius: '12px',
                            padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
                            cursor: 'pointer',
                            fontSize: 'clamp(12px, 2.5vw, 14px)',
                            fontWeight: '700',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            flexShrink: 0
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.3)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.2)'}
                    >
                        🗑️ Clear
                    </button>
                </div>
            )}

            {/* Filename Input Section */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <h3 style={{
                    margin: '0 0 15px 0',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    📝 Section Name (Required)
                    <span style={{
                        background: 'linear-gradient(135deg, #ff4757 0%, #c44569 100%)',
                        color: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700'
                    }}>*</span>
                </h3>
                <input
                    type="text"
                    value={localFileName}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 25) {
                            handleFileNameChange(value);
                        }
                    }}
                    placeholder="Enter section name (e.g., homepage, about, contact)"
                    maxLength={25}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: fileNameError ? '2px solid #ff4757' : '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                        if (!fileNameError) {
                            e.target.style.borderColor = 'rgba(120, 119, 198, 0.5)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(120, 119, 198, 0.1)';
                        }
                    }}
                    onBlur={(e) => {
                        if (!fileNameError) {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }
                    }}
                />
                {fileNameError && (
                    <div style={{
                        color: '#ff4757',
                        fontSize: '12px',
                        marginTop: '8px',
                        padding: '8px 12px',
                        background: 'rgba(255, 71, 87, 0.1)',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 71, 87, 0.3)'
                    }}>
                        ⚠️ {fileNameError}
                    </div>
                )}
                <div style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '8px',
                    lineHeight: '1.4'
                }}>
                    💡 Use only lowercase letters, numbers, hyphens, and underscores. Max 25 characters for Shopify compatibility.
                    <br />
                    <span style={{ color: localFileName.length > 20 ? '#ff4757' : '#00ff88' }}>
                        {localFileName.length}/25 characters
                    </span>
                </div>
            </div>

            <div style={{
                position: 'relative',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                zIndex: 1
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                    padding: 'clamp(15px, 4vw, 20px) clamp(15px, 4vw, 25px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    flexWrap: 'wrap',
                    gap: '15px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: '1' }}>
                        <div style={{ display: 'flex', gap: '10px', marginRight: '20px', flexShrink: 0 }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)' }}></div>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)' }}></div>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27ca3f', boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)' }}></div>
                        </div>
                        <span style={{
                            color: '#ffffff',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            fontWeight: '600',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {fileName || 'No file selected'}
                        </span>
                    </div>
                    <span style={{
                        color: '#ffffff',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        flexShrink: 0
                    }}>
                        HTML
                    </span>
                </div>

                {!showPreview ? (
                    <div style={{
                        display: 'flex',
                        background: '#1E1E1E',
                        position: 'relative',
                        borderRadius: '0 0 15px 15px',
                        paddingLeft: '10px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}>
                        <div style={{
                            width: '100%',
                            height: 'clamp(300px, 60vh, 450px)'
                        }}>
                            <Editor
                                height="100%"
                                language="html"
                                value={fileContent || ''}
                                onChange={(value) => {
                                    handleManualInput(value || '');
                                    if (!value || value.trim() === '') {
                                        const fileInput = document.getElementById(`fileInput-${index}`);
                                        if (fileInput) {
                                            fileInput.value = '';
                                        }
                                    }
                                }}
                                theme="vs-dark"
                                options={{
                                    readOnly: false,
                                    minimap: { enabled: true },
                                    lineNumbers: 'on',
                                    lineNumbersMinChars: 4,
                                    glyphMargin: false,
                                    folding: true,
                                    lineDecorationsWidth: 10,
                                    renderLineHighlight: 'line',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    fontSize: 14,
                                    fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", "Consolas", monospace',
                                    fontLigatures: true,
                                    cursorBlinking: 'blink',
                                    cursorStyle: 'line',
                                    renderWhitespace: 'boundary',
                                    wordWrap: 'on',
                                    bracketPairColorization: { enabled: true },
                                    guides: {
                                        bracketPairs: true,
                                        indentation: true
                                    },
                                    suggest: { enabled: true },
                                    quickSuggestions: true,
                                    parameterHints: { enabled: true },
                                    hover: { enabled: true },
                                    contextmenu: true,
                                    mouseWheelZoom: true,
                                    smoothScrolling: true,
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '0 0 15px 15px',
                        height: 'clamp(300px, 60vh, 450px)',
                        overflow: 'auto',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: '#ffffff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            zIndex: 10
                        }}>
                            👁️ Live Preview
                        </div>
                        <iframe
                            srcDoc={fileContent}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: '0 0 15px 15px'
                            }}
                            title="HTML Preview"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups"
                        />
                    </div>
                )}
            </div>

            {fileContent && (
                <div style={{
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={clearContent}
                        style={{
                            background: 'rgba(231, 76, 60, 0.2)',
                            color: '#ff6b6b',
                            border: '1px solid rgba(231, 76, 60, 0.3)',
                            borderRadius: '10px',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'rgba(231, 76, 60, 0.3)';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'rgba(231, 76, 60, 0.2)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        🗑️ Clear Content
                    </button>
                </div>
            )}
        </div>
    );
}



================================================
FILE: src/components/HtmlEditorTabs.js
================================================
import { useState } from 'react';
import HtmlEditor from './HtmlEditor';

export default function HtmlEditorTabs({
    files,
    handleManualInput,
    onFileUpload,
    onClearContent,
    onValidationError,
    onFileNameChange
}) {
    const [activeTab, setActiveTab] = useState(0);
    const filesWithContent = files.filter(file => file.fileContent || file.fileName);

    if (files.length === 0) return null;

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginTop: 'clamp(20px, 5vw, 35px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                    flex: '1'
                }}>
                    <div style={{
                        width: 'clamp(40px, 8vw, 50px)',
                        height: 'clamp(40px, 8vw, 50px)',
                        borderRadius: '15px',
                        background: 'linear-gradient(135deg, #7877c6 0%, #5d5ca0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        boxShadow: '0 8px 16px rgba(120, 119, 198, 0.3)',
                        flexShrink: 0
                    }}>
                        <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📝</span>
                    </div>
                    <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontWeight: '700',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        wordBreak: 'break-word'
                    }}>
                        HTML Editor & Validator
                    </h2>
                </div>
            </div>

            {files.length > 1 && (
                <div style={{
                    marginBottom: 'clamp(15px, 4vw, 20px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'clamp(10px, 3vw, 15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden'
                }}>
                    <style jsx>{`
                        .html-tab-container::-webkit-scrollbar {
                            height: 6px;
                        }
                        .html-tab-container::-webkit-scrollbar-track {
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 3px;
                        }
                        .html-tab-container::-webkit-scrollbar-thumb {
                            background: rgba(120, 119, 198, 0.5);
                            border-radius: 3px;
                        }
                        .html-tab-container::-webkit-scrollbar-thumb:hover {
                            background: rgba(120, 119, 198, 0.7);
                        }
                    `}</style>

                    <div className="html-tab-container" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
                    }}>
                        {files.map((file, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                style={{
                                    padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                                    background: activeTab === index
                                        ? 'linear-gradient(135deg, #7877c6 0%, #5d5ca0 100%)'
                                        : 'transparent',
                                    color: activeTab === index ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    fontWeight: activeTab === index ? '700' : '500',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    minWidth: 'fit-content',
                                    textShadow: activeTab === index ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
                                    borderRadius: activeTab === index ? '8px 8px 0 0' : '0',
                                    position: 'relative'
                                }}
                                onMouseOver={(e) => {
                                    if (activeTab !== index) {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.color = '#ffffff';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (activeTab !== index) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                    }
                                }}
                            >
                                📄 {file.fileName || `File ${index + 1}`}
                                {file.fileContent && ' ✓'}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{
                position: 'relative',
                zIndex: 1
            }}>
                <HtmlEditor
                    key={activeTab}
                    index={activeTab}
                    fileContent={files[activeTab]?.fileContent || ''}
                    fileName={files[activeTab]?.fileName || ''}
                    isLoading={files[activeTab]?.isLoading || false}
                    handleManualInput={(text) => handleManualInput(activeTab, text)}
                    onFileUpload={onFileUpload}
                    onClearContent={onClearContent}
                    onValidationError={onValidationError}
                    onFileNameChange={onFileNameChange}
                />
            </div>
        </div>
    );
}



================================================
FILE: src/components/SchemaFieldIndicators.js
================================================
import { getFieldRequirement, getSchemaFieldStats, getAdvancedSchemaStats, FIELD_REQUIREMENT_TYPES } from '../utils/schemaFieldTypes';

export default function SchemaFieldIndicators({ schema, isVisible = true }) {
    if (!isVisible || !schema) return null;

    const stats = getSchemaFieldStats(schema);
    const advancedStats = getAdvancedSchemaStats(schema);

    const renderFieldIndicator = (field, index) => {
        const requirement = getFieldRequirement(field);
        const isRequired = requirement === FIELD_REQUIREMENT_TYPES.REQUIRED;

        return (
            <div
                key={`field-${index}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    background: isRequired
                        ? 'rgba(255, 107, 107, 0.1)'
                        : 'rgba(108, 117, 125, 0.1)',
                    borderRadius: '8px',
                    border: `1px solid ${isRequired
                        ? 'rgba(255, 107, 107, 0.3)'
                        : 'rgba(108, 117, 125, 0.3)'}`,
                    marginBottom: '6px'
                }}
            >
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isRequired ? '#ff6b6b' : '#6c757d',
                    flexShrink: 0
                }}></div>
                <span style={{
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: isRequired ? '600' : '400'
                }}>
                    {field.label || field.id || 'Unnamed Field'}
                </span>
                <span style={{
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    color: isRequired ? '#ff6b6b' : '#6c757d',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {isRequired ? 'Required' : 'Optional'}
                </span>
                {field.type && (
                    <span style={{
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginLeft: 'auto'
                    }}>
                        {field.type}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginBottom: 'clamp(20px, 5vw, 35px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(108, 117, 125, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    width: 'clamp(40px, 8vw, 50px)',
                    height: 'clamp(40px, 8vw, 50px)',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)',
                    flexShrink: 0
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📋</span>
                </div>
                <div>
                    <h3 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Schema Field Requirements
                    </h3>
                    <p style={{
                        margin: '5px 0 0 0',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        {stats.totalFields} total fields • {stats.requiredFields} required • {stats.optionalFields} optional
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '25px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    padding: '16px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#ff6b6b',
                        marginBottom: '5px'
                    }}>
                        {stats.requiredFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Required Fields
                    </div>
                </div>

                <div style={{
                    padding: '16px',
                    background: 'rgba(108, 117, 125, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(108, 117, 125, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#6c757d',
                        marginBottom: '5px'
                    }}>
                        {stats.optionalFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Optional Fields
                    </div>
                </div>

                <div style={{
                    padding: '16px',
                    background: 'rgba(120, 119, 198, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(120, 119, 198, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#7877c6',
                        marginBottom: '5px'
                    }}>
                        {stats.totalFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Total Fields
                    </div>
                </div>
            </div>

            <div style={{
                position: 'relative',
                zIndex: 1
            }}>
                {schema.settings && schema.settings.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{
                            margin: '0 0 12px 0',
                            fontSize: 'clamp(16px, 4vw, 18px)',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}>
                            Section Settings
                        </h4>
                        {schema.settings.map((field, index) => renderFieldIndicator(field, `main-${index}`))}
                    </div>
                )}

                {schema.blocks && schema.blocks.map((block, blockIndex) => (
                    block.settings && block.settings.length > 0 && (
                        <div key={`block-${blockIndex}`} style={{ marginBottom: '20px' }}>
                            <h4 style={{
                                margin: '0 0 12px 0',
                                fontSize: 'clamp(16px, 4vw, 18px)',
                                fontWeight: '600',
                                color: 'rgba(255, 255, 255, 0.9)'
                            }}>
                                Block: {block.name || block.type || `Block ${blockIndex + 1}`}
                            </h4>
                            {block.settings.map((field, fieldIndex) =>
                                renderFieldIndicator(field, `block-${blockIndex}-${fieldIndex}`)
                            )}
                        </div>
                    )
                ))}
            </div>

            <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <h5 style={{
                    margin: '0 0 12px 0',
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)'
                }}>
                    Legend
                </h5>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#ff6b6b'
                        }}></div>
                        <span style={{
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            Required - Critical for functionality
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#6c757d'
                        }}></div>
                        <span style={{
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            Optional - Has defaults or decorative
                        </span>
                    </div>
                </div>
            </div>

            {advancedStats.recommendations.length > 0 && (
                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'rgba(255, 193, 7, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <h5 style={{
                        margin: '0 0 12px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: '600',
                        color: '#ffc107',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        💡 Recommendations
                    </h5>
                    <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 'clamp(12px, 3vw, 14px)'
                    }}>
                        {advancedStats.recommendations.map((recommendation, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>
                                {recommendation}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {advancedStats.criticalMissing.length > 0 && (
                <div style={{
                    marginTop: '15px',
                    padding: '16px',
                    background: 'rgba(220, 53, 69, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <h5 style={{
                        margin: '0 0 12px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: '600',
                        color: '#dc3545',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        ⚠️ Missing Critical Fields
                    </h5>
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 'clamp(12px, 3vw, 14px)'
                    }}>
                        {advancedStats.criticalMissing.map((missing, index) => (
                            <div key={index} style={{
                                marginBottom: '6px',
                                padding: '6px 10px',
                                background: 'rgba(220, 53, 69, 0.1)',
                                borderRadius: '6px',
                                border: '1px solid rgba(220, 53, 69, 0.2)'
                            }}>
                                <strong>{missing.blockType}:</strong> {missing.missing.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}



================================================
FILE: src/utils/blockTemplates.js
================================================
export const STANDARD_BLOCK_TYPES = {
    heading: {
        type: "heading",
        name: "Heading",
        settings: [
            {
                type: "text",
                id: "heading_text",
                label: "Heading Text",
                default: "Sample Heading"
            },
            {
                type: "select",
                id: "heading_size",
                label: "Heading Size",
                options: [
                    { value: "h1", label: "H1" },
                    { value: "h2", label: "H2" },
                    { value: "h3", label: "H3" },
                    { value: "h4", label: "H4" },
                    { value: "h5", label: "H5" },
                    { value: "h6", label: "H6" }
                ],
                default: "h2"
            }
        ]
    },

    buttons: {
        type: "buttons",
        name: "Button",
        settings: [
            {
                type: "text",
                id: "button_text",
                label: "Button Text",
                default: "Click here"
            },
            {
                type: "url",
                id: "button_url",
                label: "Button URL",
                default: "/"
            },
            {
                type: "select",
                id: "button_style",
                label: "Button Style",
                options: [
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" },
                    { value: "outline", label: "Outline" }
                ],
                default: "primary"
            }
        ]
    },

    testimonial: {
        type: "testimonial",
        name: "Testimonial",
        settings: [
            {
                type: "textarea",
                id: "testimonial_text",
                label: "Testimonial Text",
                default: "This is a great product!"
            },
            {
                type: "text",
                id: "customer_name",
                label: "Customer Name",
                default: "John Doe"
            },
            {
                type: "text",
                id: "customer_title",
                label: "Customer Title",
                default: "CEO, Company"
            },
            {
                type: "image_picker",
                id: "customer_image",
                label: "Customer Image"
            }
        ]
    },

    feature: {
        type: "feature",
        name: "Feature",
        settings: [
            {
                type: "text",
                id: "feature_title",
                label: "Feature Title",
                default: "Feature Title"
            },
            {
                type: "textarea",
                id: "feature_description",
                label: "Feature Description",
                default: "Feature description here"
            },
            {
                type: "image_picker",
                id: "feature_icon",
                label: "Feature Icon"
            }
        ]
    },

    product: {
        type: "product",
        name: "Product",
        settings: [
            {
                type: "text",
                id: "product_title",
                label: "Product Title",
                default: "Product Name"
            },
            {
                type: "text",
                id: "product_price",
                label: "Product Price",
                default: "$99.99"
            },
            {
                type: "textarea",
                id: "product_description",
                label: "Product Description",
                default: "Product description"
            },
            {
                type: "image_picker",
                id: "product_image",
                label: "Product Image"
            },
            {
                type: "url",
                id: "product_url",
                label: "Product URL",
                default: "/products/"
            }
        ]
    },

    team_member: {
        type: "team_member",
        name: "Team Member",
        settings: [
            {
                type: "text",
                id: "member_name",
                label: "Member Name",
                default: "Team Member"
            },
            {
                type: "text",
                id: "member_position",
                label: "Position",
                default: "Position"
            },
            {
                type: "textarea",
                id: "member_bio",
                label: "Bio",
                default: "Member bio"
            },
            {
                type: "image_picker",
                id: "member_image",
                label: "Member Image"
            }
        ]
    },

    gallery: {
        type: "gallery",
        name: "Gallery Item",
        settings: [
            {
                type: "image_picker",
                id: "gallery_image",
                label: "Gallery Image"
            },
            {
                type: "text",
                id: "gallery_caption",
                label: "Caption",
                default: "Image caption"
            }
        ]
    },

    faq: {
        type: "faq",
        name: "FAQ Item",
        settings: [
            {
                type: "text",
                id: "question",
                label: "Question",
                default: "Frequently asked question?"
            },
            {
                type: "textarea",
                id: "answer",
                label: "Answer",
                default: "Answer to the question"
            }
        ]
    },

    header_link: {
        type: "header_link",
        name: "Header Link",
        settings: [
            {
                type: "text",
                id: "link_text",
                label: "Link Text",
                default: "Link"
            },
            {
                type: "url",
                id: "link_url",
                label: "Link URL",
                default: "/"
            }
        ]
    },

    footer_column: {
        type: "footer_column",
        name: "Footer Column",
        settings: [
            {
                type: "text",
                id: "column_title",
                label: "Column Title",
                default: "Links"
            },
            {
                type: "text",
                id: "link_1_text",
                label: "Link 1 Text",
                default: "Link 1"
            },
            {
                type: "url",
                id: "link_1_url",
                label: "Link 1 URL",
                default: "/"
            },
            {
                type: "text",
                id: "link_2_text",
                label: "Link 2 Text",
                default: "Link 2"
            },
            {
                type: "url",
                id: "link_2_url",
                label: "Link 2 URL",
                default: "/"
            },
            {
                type: "text",
                id: "link_3_text",
                label: "Link 3 Text",
                default: "Link 3"
            },
            {
                type: "url",
                id: "link_3_url",
                label: "Link 3 URL",
                default: "/"
            }
        ]
    },

    service: {
        type: "service",
        name: "Service",
        settings: [
            {
                type: "text",
                id: "service_title",
                label: "Service Title",
                default: "Service Name"
            },
            {
                type: "textarea",
                id: "service_description",
                label: "Service Description",
                default: "Service description"
            },
            {
                type: "image_picker",
                id: "service_icon",
                label: "Service Icon"
            },
            {
                type: "url",
                id: "service_url",
                label: "Service URL",
                default: "/"
            }
        ]
    },

    cta_button: {
        type: "cta_button",
        name: "CTA Button",
        settings: [
            {
                type: "text",
                id: "cta_text",
                label: "CTA Text",
                default: "Get Started"
            },
            {
                type: "url",
                id: "cta_url",
                label: "CTA URL",
                default: "/"
            },
            {
                type: "select",
                id: "cta_style",
                label: "CTA Style",
                options: [
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" }
                ],
                default: "primary"
            }
        ]
    },

    social_link: {
        type: "social_link",
        name: "Social Link",
        settings: [
            {
                type: "text",
                id: "social_platform",
                label: "Platform",
                default: "Facebook"
            },
            {
                type: "url",
                id: "social_url",
                label: "Social URL",
                default: "https://facebook.com"
            },
            {
                type: "text",
                id: "social_icon",
                label: "Icon Class",
                default: "fab fa-facebook"
            }
        ]
    },

    contact_info: {
        type: "contact_info",
        name: "Contact Info",
        settings: [
            {
                type: "text",
                id: "contact_type",
                label: "Contact Type",
                default: "Phone"
            },
            {
                type: "text",
                id: "contact_value",
                label: "Contact Value",
                default: "+1 (555) 123-4567"
            },
            {
                type: "text",
                id: "contact_icon",
                label: "Icon Class",
                default: "fas fa-phone"
            }
        ]
    },

    newsletter: {
        type: "newsletter",
        name: "Newsletter",
        settings: [
            {
                type: "text",
                id: "newsletter_title",
                label: "Newsletter Title",
                default: "Subscribe to our newsletter"
            },
            {
                type: "textarea",
                id: "newsletter_description",
                label: "Description",
                default: "Get updates and special offers"
            },
            {
                type: "text",
                id: "button_text",
                label: "Button Text",
                default: "Subscribe"
            }
        ]
    },

    video: {
        type: "video",
        name: "Video",
        settings: [
            {
                type: "text",
                id: "video_url",
                label: "Video URL",
                default: "https://www.youtube.com/watch?v="
            },
            {
                type: "text",
                id: "video_title",
                label: "Video Title",
                default: "Video Title"
            },
            {
                type: "image_picker",
                id: "video_thumbnail",
                label: "Video Thumbnail"
            }
        ]
    },

    pricing: {
        type: "pricing",
        name: "Pricing Plan",
        settings: [
            {
                type: "text",
                id: "plan_name",
                label: "Plan Name",
                default: "Basic Plan"
            },
            {
                type: "text",
                id: "plan_price",
                label: "Plan Price",
                default: "$9.99"
            },
            {
                type: "text",
                id: "plan_period",
                label: "Billing Period",
                default: "per month"
            },
            {
                type: "textarea",
                id: "plan_features",
                label: "Plan Features",
                default: "Feature 1\nFeature 2\nFeature 3"
            },
            {
                type: "text",
                id: "plan_button_text",
                label: "Button Text",
                default: "Choose Plan"
            },
            {
                type: "url",
                id: "plan_button_url",
                label: "Button URL",
                default: "/"
            }
        ]
    },

    stat: {
        type: "stat",
        name: "Statistic",
        settings: [
            {
                type: "text",
                id: "stat_number",
                label: "Statistic Number",
                default: "100+"
            },
            {
                type: "text",
                id: "stat_label",
                label: "Statistic Label",
                default: "Happy Customers"
            },
            {
                type: "text",
                id: "stat_icon",
                label: "Icon Class",
                default: "fas fa-users"
            }
        ]
    },

    step: {
        type: "step",
        name: "Process Step",
        settings: [
            {
                type: "text",
                id: "step_number",
                label: "Step Number",
                default: "1"
            },
            {
                type: "text",
                id: "step_title",
                label: "Step Title",
                default: "Step Title"
            },
            {
                type: "textarea",
                id: "step_description",
                label: "Step Description",
                default: "Step description"
            },
            {
                type: "image_picker",
                id: "step_icon",
                label: "Step Icon"
            }
        ]
    },

    benefit: {
        type: "benefit",
        name: "Benefit",
        settings: [
            {
                type: "text",
                id: "benefit_title",
                label: "Benefit Title",
                default: "Benefit Title"
            },
            {
                type: "textarea",
                id: "benefit_description",
                label: "Benefit Description",
                default: "Benefit description"
            },
            {
                type: "image_picker",
                id: "benefit_icon",
                label: "Benefit Icon"
            }
        ]
    },

    review: {
        type: "review",
        name: "Review",
        settings: [
            {
                type: "textarea",
                id: "review_text",
                label: "Review Text",
                default: "Great product!"
            },
            {
                type: "text",
                id: "reviewer_name",
                label: "Reviewer Name",
                default: "Customer Name"
            },
            {
                type: "range",
                id: "review_rating",
                label: "Rating",
                min: 1,
                max: 5,
                step: 1,
                default: 5
            },
            {
                type: "image_picker",
                id: "reviewer_image",
                label: "Reviewer Image"
            }
        ]
    },

    award: {
        type: "award",
        name: "Award",
        settings: [
            {
                type: "text",
                id: "award_title",
                label: "Award Title",
                default: "Award Title"
            },
            {
                type: "text",
                id: "award_year",
                label: "Award Year",
                default: "2024"
            },
            {
                type: "image_picker",
                id: "award_image",
                label: "Award Image"
            }
        ]
    },

    partner: {
        type: "partner",
        name: "Partner",
        settings: [
            {
                type: "text",
                id: "partner_name",
                label: "Partner Name",
                default: "Partner Name"
            },
            {
                type: "image_picker",
                id: "partner_logo",
                label: "Partner Logo"
            },
            {
                type: "url",
                id: "partner_url",
                label: "Partner URL",
                default: "/"
            }
        ]
    },

    hero: {
        type: "hero",
        name: "Hero Section",
        settings: [
            {
                type: "text",
                id: "hero_title",
                label: "Hero Title",
                default: "Welcome to Our Site"
            },
            {
                type: "textarea",
                id: "hero_subtitle",
                label: "Hero Subtitle",
                default: "Discover amazing products and services"
            },
            {
                type: "text",
                id: "hero_button_text",
                label: "Button Text",
                default: "Get Started"
            },
            {
                type: "url",
                id: "hero_button_url",
                label: "Button URL",
                default: "/"
            },
            {
                type: "image_picker",
                id: "hero_background_image",
                label: "Background Image"
            }
        ]
    },

    about: {
        type: "about",
        name: "About Section",
        settings: [
            {
                type: "text",
                id: "about_title",
                label: "About Title",
                default: "About Us"
            },
            {
                type: "textarea",
                id: "about_description",
                label: "About Description",
                default: "Learn more about our company and mission"
            },
            {
                type: "image_picker",
                id: "about_image",
                label: "About Image"
            }
        ]
    },

    image_text: {
        type: "image_text",
        name: "Image with Text",
        settings: [
            {
                type: "text",
                id: "section_title",
                label: "Section Title",
                default: "Section Title"
            },
            {
                type: "textarea",
                id: "section_text",
                label: "Section Text",
                default: "Section text content"
            },
            {
                type: "image_picker",
                id: "section_image",
                label: "Section Image"
            },
            {
                type: "select",
                id: "layout",
                label: "Layout",
                options: [
                    { value: "left", label: "Image Left" },
                    { value: "right", label: "Image Right" }
                ],
                default: "left"
            }
        ]
    },

    transformation: {
        type: "transformation",
        name: "Transformation",
        settings: [
            {
                type: "text",
                id: "heading",
                label: "Transformation Heading",
                default: "Before & After"
            },
            {
                type: "richtext",
                id: "description",
                label: "Transformation Description",
                default: "<p>See the amazing transformation results</p>"
            },
            {
                type: "image_picker",
                id: "before_image",
                label: "Before Image"
            },
            {
                type: "text",
                id: "before_image_alt",
                label: "Before Image Alt Text",
                default: "Before transformation"
            },
            {
                type: "image_picker",
                id: "after_image",
                label: "After Image"
            },
            {
                type: "text",
                id: "after_image_alt",
                label: "After Image Alt Text",
                default: "After transformation"
            }
        ]
    }
};

export function getBlockTemplate(blockType) {
    return STANDARD_BLOCK_TYPES[blockType] || null;
}

export function getAllBlockTypes() {
    return Object.keys(STANDARD_BLOCK_TYPES);
}



================================================
FILE: src/utils/claudeHtmlToLiquid.js
================================================
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function checkClaudeConnection() {
  try {
    if (!process.env.CLAUDE_API_KEY) {
      return {
        isWorking: false,
        error: "Claude API key is not configured",
        status: "no_api_key",
      };
    }

    console.log("🔍 Checking Claude API connection...");

    const testMessage = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 5,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: "Hello",
        },
      ],
    });

    if (testMessage && testMessage.content && testMessage.content[0]) {
      console.log("✅ Claude API is working properly");
      return {
        isWorking: true,
        status: "connected",
        model: "claude-3-5-sonnet-20241022",
        timestamp: new Date().toISOString(),
      };
    } else {
      console.log("❌ Claude API returned invalid response");
      return {
        isWorking: false,
        error: "Invalid response from Claude API",
        status: "invalid_response",
      };
    }
  } catch (error) {
    console.log("❌ Claude API connection failed:", error.message);
    return {
      isWorking: false,
      error: error.message,
      status: "connection_failed",
      errorCode: error.code || "unknown",
    };
  }
}

export async function generateLiquidWithClaude(
  htmlContent,
  fileName,
  repeatPrompt = 7
) {
  try {
    if (!process.env.CLAUDE_API_KEY) {
      throw new Error("Claude API key is not configured");
    }

    let promptBase = `You are an expert Shopify Liquid developer with deep knowledge of Shopify's theming system, Liquid syntax, and schema structure. Convert the following HTML into a comprehensive Shopify section with advanced schema configuration:

HTML Content:
${htmlContent}

DETAILED REQUIREMENTS:
1. Convert ALL HTML elements to proper Shopify Liquid syntax
2. Create comprehensive schema with BOTH settings and blocks
3. Make ALL text content editable through schema settings
4. Section name should be: ${fileName}

OUTPUT FORMAT:
Return ONLY the complete Shopify Liquid template code with schema. No explanations, no markdown formatting, just clean Liquid code ready for production use.`;

    // Repeat the prompt as many times as specified
    let prompt = "";
    for (let i = 0; i < repeatPrompt; i++) {
      prompt += promptBase + "\n";
    }

    const completion = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8192,
      temperature: 0.1,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const liquidContent = completion.content[0]?.text?.trim();

    if (!liquidContent) {
      throw new Error("No content generated by Claude");
    }

    const schemaMatch = liquidContent.match(
      /\{\%\s*schema\s*\%\}([\s\S]*?)\{\%\s*endschema\s*\%\}/
    );
    let jsonSchema = {};

    if (schemaMatch) {
      try {
        jsonSchema = JSON.parse(schemaMatch[1].trim());
      } catch (e) {
        console.warn("Could not parse schema from Claude response:", e.message);
      }
    }

    console.log(
      `🧮 Claude Token Usage: Input = ${
        completion.usage?.input_tokens || 0
      }, Output = ${completion.usage?.output_tokens || 0}, Total = ${
        (completion.usage?.input_tokens || 0) + (completion.usage?.output_tokens || 0)
      }`
    );

    return {
      success: true,
      liquidContent: liquidContent,
      jsonTemplate: JSON.stringify(jsonSchema, null, 2),
      metadata: {
        generatedAt: new Date().toISOString(),
        model: "claude-3-5-sonnet-20241022",
        inputTokens: completion.usage?.input_tokens || 0,
        outputTokens: completion.usage?.output_tokens || 0,
        totalTokens: (completion.usage?.input_tokens || 0) + (completion.usage?.output_tokens || 0),
      },
    };
  } catch (error) {
    console.error("Claude conversion error:", error);
    return {
      success: false,
      error: error.message,
      liquidContent: "",
      jsonTemplate: "{}",
      metadata: {
        generatedAt: new Date().toISOString(),
        error: error.message,
      },
    };
  }
}

export async function generateLiquidWithClaudeBackground(
  htmlContent,
  fileName
) {
  try {
    if (!process.env.CLAUDE_API_KEY) {
      console.log(
        `⚠️ [BACKGROUND] Claude API key not configured - skipping AI generation for: ${fileName}`
      );
      return {
        success: false,
        error: "Claude API key not configured",
        fileName: fileName,
        skipped: true,
      };
    }

    console.log(`🤖 [BACKGROUND] Starting Claude conversion for: ${fileName}`);
    const startTime = Date.now();

    generateLiquidWithClaude(htmlContent, fileName)
      .then((result) => {
        const duration = Date.now() - startTime;
        if (result.success) {
          console.log(
            `✅ [BACKGROUND] Claude conversion completed for: ${fileName} (${duration}ms)`
          );
          console.log(
            `📊 [BACKGROUND] Claude Usage - Tokens: ${result.metadata.totalTokens}, Model: ${result.metadata.model}`
          );
          console.log(
            `📏 [BACKGROUND] Generated ${
              result.liquidContent.split("\n").length
            } lines of Liquid code`
          );
          console.log(
            `[TOKENS] Input: ${result.metadata.inputTokens}, Output: ${result.metadata.outputTokens}, Total: ${result.metadata.totalTokens}`
          );
        } else {
          console.log(
            `❌ [BACKGROUND] Claude conversion failed for: ${fileName} (${duration}ms):`,
            result.error
          );
        }
      })
      .catch((error) => {
        const duration = Date.now() - startTime;
        console.log(
          `❌ [BACKGROUND] Claude conversion error for: ${fileName} (${duration}ms):`,
          error.message
        );
      });

    return {
      success: true,
      message: "Claude conversion started in background",
      timestamp: new Date().toISOString(),
      fileName: fileName,
    };
  } catch (error) {
    console.error("Background Claude conversion setup error:", error);
    return {
      success: false,
      error: error.message,
      fileName: fileName,
    };
  }
}



================================================
FILE: src/utils/customHtmlToLiquid.js
================================================
/**
 * Custom HTML to Liquid Converter
 * Professional Shopify-ready conversion following exact client requirements
 */

import * as cheerio from "cheerio";
import { detectPageType, generateTemplateStructure } from "./pageTypeDetection";
import {
  replaceWithFeaturedProducts,
  addFeaturedProductSettings,
  generateFeaturedProductCSS,
} from "./featuredProductReplacer.js";

/**
 * Validates and sanitizes setting defaults to ensure Shopify compatibility
 */
function validateSettingDefault(value, type, fallback = "") {
  if (value === null || value === undefined || value === "") {
    return type === "url" ? "/" : typeof fallback === "string" ? fallback : "";
  }

  switch (type) {
    case "text":
    case "textarea":
    case "richtext":
      return typeof value === "string"
        ? value
        : typeof fallback === "string"
        ? fallback
        : "";
    case "url":
      if (typeof value === "string") {
        const trimmedValue = value.trim();
        if (trimmedValue !== "" && trimmedValue !== "#") {
          const cleanValue = trimmedValue
            .replace(/\{\{.*?\}\}/g, "")
            .replace(/\{%.*?%\}/g, "")
            .trim();
          return cleanValue && cleanValue !== "" ? cleanValue : "/";
        }
      }
      return "/";
    case "number":
    case "range":
      return typeof value === "number"
        ? value
        : typeof fallback === "number"
        ? fallback
        : 0;
    case "checkbox":
      return typeof value === "boolean" ? value : false;
    case "color":
      return typeof value === "string" && value.startsWith("#")
        ? value
        : "#000000";
    default:
      return typeof value === "string" ? value : fallback || "";
  }
}

/**
 * Validates JSON setting values to prevent Liquid template syntax
 */
function validateJsonSettingValue(value, settingDefault, type = "text") {
  if (
    typeof value === "string" &&
    (value.includes("{{") || value.includes("{%"))
  ) {
    return getCleanDefault(settingDefault, type);
  }

  if (value === null || value === undefined || value === "") {
    return getCleanDefault(settingDefault, type);
  }

  return value;
}

/**
 * Gets a clean default value without Liquid syntax
 */
function getCleanDefault(settingDefault, type = "text") {
  if (
    typeof settingDefault === "string" &&
    (settingDefault.includes("{{") || settingDefault.includes("{%"))
  ) {
    switch (type) {
      case "text":
        return "Product Title";
      case "richtext":
        return "<p>Product description</p>";
      case "url":
        return "/";
      case "number":
      case "range":
        return 0;
      case "checkbox":
        return false;
      default:
        return "";
    }
  }

  return settingDefault;
}

/**
 * Truncates labels to meet Shopify's 70 character limit
 */
function truncateLabel(label, maxLength = 70) {
  if (typeof label !== "string") return "Setting";
  if (label.length <= maxLength) return label;

  const truncated = label.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Extracts head content from HTML
 */
export function extractHeadContent(html) {
  if (!html || typeof html !== "string") return [];

  const $ = cheerio.load(html);
  const headContent = new Set();

  $('head link[rel="stylesheet"]').each((i, el) => {
    const htmlContent = $.html(el);
    if (htmlContent && htmlContent.trim()) {
      headContent.add(htmlContent);
    }
  });

  $("head script[src]").each((i, el) => {
    const htmlContent = $.html(el);
    if (htmlContent && htmlContent.trim()) {
      headContent.add(htmlContent);
    }
  });

  $('head link[href*="fonts.googleapis.com"]').each((i, el) => {
    const htmlContent = $.html(el);
    if (htmlContent && htmlContent.trim()) {
      headContent.add(htmlContent);
    }
  });

  $('head meta[name="viewport"], head meta[charset]').each((i, el) => {
    const htmlContent = $.html(el);
    if (htmlContent && htmlContent.trim()) {
      headContent.add(htmlContent);
    }
  });

  return Array.from(headContent).filter(
    (item) => item && item.trim().length > 0
  );
}

/**
 * Extracts and processes CSS from HTML
 */
export function extractCSS(html) {
  if (!html || typeof html !== "string") return "";

  const $ = cheerio.load(html);
  let css = "";

  $("style").each((i, el) => {
    const styleContent = $(el).html();
    if (styleContent && styleContent.trim()) {
      css += styleContent + "\n";
    }
  });

  return css.trim();
}

/**
 * Extracts and processes JavaScript from HTML
 */
export function extractJavaScript(html) {
  if (!html || typeof html !== "string") return "";

  const $ = cheerio.load(html);
  let js = "";
  let externalScripts = [];

  $("script:not([src])").each((i, el) => {
    const scriptContent = $(el).html();
    if (scriptContent && scriptContent.trim()) {
      js += "// Inline Script " + (i + 1) + "\n";
      js += scriptContent + "\n\n";
    }
  });

  $("script[src]").each((i, el) => {
    const src = $(el).attr("src") || "";
    if (src && !src.includes("shopify") && !src.includes("theme.js")) {
      externalScripts.push(src);
    }
  });

  if (externalScripts.length > 0) {
    js += "// External Scripts Referenced in Original HTML:\n";
    externalScripts.forEach((src) => {
      js += `// ${src}\n`;
    });
    js +=
      "// Note: External scripts should be added to theme.liquid or loaded via CDN\n\n";
  }

  return js.trim();
}

/**
 * Converts HTML content to professional Shopify Liquid following client requirements
 */
export function convertHtmlToLiquid(html, fileName, pageType = null) {
  if (!html || typeof html !== "string") {
    return {
      settings: [],
      blocks: [],
      liquidBody: "",
      jsonBlocks: {},
      jsonBlockOrder: [],
      sectionGroups: {
        content: { settings: [] },
        layout: { settings: [] },
        styling: { settings: [] },
      },
      extractedJS: "",
    };
  }

  const $ = cheerio.load(html);
  const settings = [];
  const blocks = [];
  const jsonBlocks = {};
  const jsonBlockOrder = [];

  const extractedJS = extractJavaScript(html);

  $("head, style, script").remove();

  console.log("\n🔄 Starting Featured Product Replacement...");
  const featuredProductResult = replaceWithFeaturedProducts($.html());

  let featuredProductInfo = {
    hasProducts: false,
    replacements: 0,
    schemaSettings: [],
    extractedData: [],
    summary: null,
  };

  if (featuredProductResult.hasProducts) {
    const $updated = cheerio.load(featuredProductResult.html);
    $("body").html($updated("body").html());

    featuredProductInfo = {
      hasProducts: true,
      replacements: featuredProductResult.replacements,
      schemaSettings: featuredProductResult.schemaSettings,
      extractedData: featuredProductResult.extractedData,
      summary: featuredProductResult.summary,
    };

    console.log(`✅ Featured Product Replacement Complete:`);
    console.log(`   📦 ${featuredProductInfo.replacements} products replaced`);
    console.log(
      `   🎯 Products: ${featuredProductInfo.summary.products
        .map((p) => p.title)
        .join(", ")}`
    );
  } else {
    console.log("ℹ️ No products detected for replacement");
  }

  const blockPatterns = [
    {
      selector: ".feature, .feature-item, .feature-card",
      name: "Feature",
      type: "feature",
      max: 12,
    },
    { selector: ".card, .info-card", name: "Card", type: "card", max: 8 },
    {
      selector:
        ".faq-item, .faq, .faq-question, .accordion-item, .question, .qa-item",
      name: "FAQ",
      type: "faq",
      max: 20,
    },
    {
      selector: ".team-member, .team, .team-card",
      name: "Team Member",
      type: "team_member",
      max: 8,
    },
    {
      selector: ".service, .service-item",
      name: "Service",
      type: "service",
      max: 10,
    },
    {
      selector: ".benefit, .benefit-item",
      name: "Benefit",
      type: "benefit",
      max: 8,
    },
    { selector: ".step, .process-step", name: "Step", type: "step", max: 6 },
    {
      selector: ".gallery-item, .image-item",
      name: "Gallery Item",
      type: "gallery_item",
      max: 20,
    },
  ];

  const contentBlocks = [];

  const sustainabilitySlides = $("div").filter((i, el) => {
    const $el = $(el);
    const hasSlideClass =
      $el.hasClass("sustainability-slide") ||
      $el.closest(".sustainability-slideshow").length > 0;
    const hasHeading = $el.find("h3, h4").length > 0;
    const hasContent = $el.find("p, .sustainability-content").length > 0;
    const isSlideContainer = $el.hasClass("sustainability-slideshow");

    return hasSlideClass && hasHeading && hasContent && !isSlideContainer;
  });

  if (sustainabilitySlides.length >= 2) {
    contentBlocks.push({
      elements: sustainabilitySlides,
      selector: "sustainability-slide-detected",
      name: "Sustainability Slide",
      type: "sustainability_slide",
      max: 8,
    });
  }

  const transformationSlides = $("div").filter((i, el) => {
    const $el = $(el);
    const hasSlideClass =
      $el.hasClass("transformation-slide") ||
      $el.closest(".transformations-images").length > 0;
    const hasBeforeAfter =
      $el.find(".before-image, .after-image").length >= 2 ||
      $el.find("img").length >= 2;
    const isSlideContainer =
      $el.hasClass("transformations-container") ||
      $el.hasClass("transformations-images");

    return hasSlideClass && hasBeforeAfter && !isSlideContainer;
  });

  if (transformationSlides.length >= 2) {
    contentBlocks.push({
      elements: transformationSlides,
      selector: "transformation-slide-detected",
      name: "Transformation",
      type: "transformation",
      max: 6,
    });
  }

  const productCards = $("div").filter((i, el) => {
    const $el = $(el);

    if (
      $el.hasClass("featured-product-processed") ||
      $el.closest(".featured-products-container").length > 0 ||
      $el.closest("[class*='featured-product']").length > 0
    ) {
      return false;
    }

    const text = $el.text() || "";
    const hasImage = $el.find("img").length > 0;
    const hasPrice =
      text.includes("$") || $el.find('[class*="price"]').length > 0;
    const hasRating = $el.find('i[class*="star"]').length >= 3;
    const buttonText = ($el.find("a, button, .btn").text() || "").toLowerCase();
    const hasButton =
      buttonText.includes("view") ||
      buttonText.includes("details") ||
      buttonText.includes("buy") ||
      buttonText.includes("add");
    const hasHeading = $el.find("h1, h2, h3, h4, h5, h6").length > 0;
    const hasDescription = $el.find("p").length > 0;

    const isContainer =
      $el.find("div").filter((j, nested) => {
        const $nested = $(nested);
        return (
          $nested.find("img").length > 0 &&
          $nested.find("h1, h2, h3, h4, h5, h6").length > 0 &&
          $nested.find('i[class*="star"]').length >= 3
        );
      }).length > 1;

    return (
      hasImage &&
      (hasPrice || hasRating) &&
      hasButton &&
      hasHeading &&
      hasDescription &&
      !isContainer
    );
  });

  if (productCards.length >= 2 && !featuredProductInfo.hasProducts) {
    contentBlocks.push({
      elements: productCards,
      selector: "product-card-detected",
      name: "Product",
      type: "product",
      max: 12,
    });
  }

  const blogCards = $("article, .blog-card, .blog-post, .post-card").filter(
    (i, el) => {
      const $el = $(el);
      const hasImage = $el.find("img").length > 0;
      const hasHeading = $el.find("h1, h2, h3, h4, h5, h6").length > 0;
      const hasDescription = $el.find("p").length > 0;
      const buttonText = (
        $el.find("a, button, .btn").text() || ""
      ).toLowerCase();
      const hasReadMore =
        buttonText.includes("read") ||
        buttonText.includes("more") ||
        buttonText.includes("→") ||
        buttonText.includes("continue") ||
        buttonText.includes("view");
      const hasMeta =
        $el.find(".blog-meta, .post-meta, .date").length > 0 ||
        $el.text().match(/\d{4}/) ||
        $el
          .text()
          .match(
            /(january|february|march|april|may|june|july|august|september|october|november|december)/i
          );

      const isContainer =
        $el.find("article, .blog-card, .blog-post").length > 1;

      return (
        hasImage &&
        hasHeading &&
        hasDescription &&
        (hasReadMore || hasMeta) &&
        !isContainer
      );
    }
  );

  if (blogCards.length >= 2) {
    contentBlocks.push({
      elements: blogCards,
      selector: "blog-card-detected",
      name: "Blog Post",
      type: "blog_post",
      max: 20,
    });
  }

  const testimonialCards = $("div").filter((i, el) => {
    const $el = $(el);
    const text = $el.text() || "";
    const pText = $el.find("p").text() || "";
    const hasQuote = text.includes('"') || pText.length > 30;
    const hasStars = $el.find('i[class*="star"]').length >= 3;
    const hasName =
      $el.find("h4, h5, h6, .name, strong").length > 0 ||
      text.match(/[A-Z][a-z]+\s+[A-Z]\./) ||
      text.toLowerCase().includes("customer");

    const isContainer =
      $el.find("div").filter((j, nested) => {
        const $nested = $(nested);
        return $nested.find('i[class*="star"]').length >= 3;
      }).length > 1;

    return hasQuote && hasStars && hasName && !isContainer;
  });

  if (testimonialCards.length >= 2) {
    contentBlocks.push({
      elements: testimonialCards,
      selector: "testimonial-card-detected",
      name: "Testimonial Card",
      type: "testimonial_card",
      max: 8,
    });
  }

  const guideCards = $("div").filter((i, el) => {
    const $el = $(el);
    const hasImage = $el.find("img").length > 0;
    const hasHeading = $el.find("h3, h4, h5").length > 0;
    const hasDescription = $el.find("p").length > 0;
    const linkText = ($el.find("a").text() || "").toLowerCase();
    const hasReadMore =
      linkText.includes("read") ||
      linkText.includes("→") ||
      linkText.includes("guide") ||
      linkText.includes("learn") ||
      linkText.includes("more");

    const hasMultipleCards =
      $el.find("div").filter((j, nested) => {
        const $nested = $(nested);
        return (
          $nested.find("img").length > 0 &&
          $nested.find("h3, h4, h5").length > 0 &&
          $nested.find("p").length > 0
        );
      }).length > 1;

    return (
      hasImage &&
      hasHeading &&
      hasDescription &&
      hasReadMore &&
      !hasMultipleCards
    );
  });

  if (guideCards.length >= 2) {
    contentBlocks.push({
      elements: guideCards,
      selector: "guide-card-detected",
      name: "Guide Card",
      type: "guide_card",
      max: 10,
    });
  }

  const footerColumns = $("footer div").filter((i, el) => {
    const $el = $(el);

    const directHeading = $el.children("h3, h4, h5, h6").length > 0;
    const hasHeading = $el.find("h3, h4, h5, h6").length > 0;

    const hasList = $el.find("ul, ol").length > 0;
    const hasLinks = $el.find("a").length >= 1;
    const hasText = $el.find("p").length > 0;
    const hasContent = hasText || hasList || hasLinks;

    const isLayoutGrid =
      $el.hasClass("grid") ||
      $el.hasClass("footer-grid") ||
      ($el.children("div").length > 3 && $el.css("display") === "grid");
    const isMainContainer =
      $el.hasClass("max-w") ||
      $el.hasClass("mx-auto") ||
      $el.hasClass("footer-content");
    const isWrapperContainer =
      $el.hasClass("px-4") ||
      $el.hasClass("container") ||
      $el.hasClass("footer-container");
    const isBottomSection =
      $el.hasClass("footer-bottom") || $el.find(".footer-bottom").length > 0;

    const containsMultipleSections =
      $el.find("div").filter((j, child) => {
        const $child = $(child);
        return (
          $child.find("h3, h4, h5, h6").length > 0 &&
          ($child.find("ul, ol").length > 0 || $child.find("a").length >= 1)
        );
      }).length > 2;

    const isNotLayoutContainer =
      !isLayoutGrid &&
      !isMainContainer &&
      !isWrapperContainer &&
      !isBottomSection &&
      !containsMultipleSections;

    const isGoodColumn =
      (directHeading || hasHeading) && hasContent && isNotLayoutContainer;

    const hasReasonableStructure = $el.children("div").length <= 2;

    return isGoodColumn && hasReasonableStructure;
  });

  if (footerColumns.length >= 1) {
    contentBlocks.push({
      elements: footerColumns,
      selector: "footer-column-detected",
      name: "Footer Column",
      type: "footer_column",
      max: 8,
    });
  }

  const socialLinks = $("footer a").filter((i, el) => {
    const $el = $(el);
    const hasIcon = $el.find('i[class*="fa-"], .icon').length > 0;
    const linkClass = $el.attr("class") || "";
    const hasHoverClass =
      linkClass.includes("hover") || linkClass.includes("transition");
    const isInColumn = $el.closest("div").find("h3, h4, h5").length > 0;

    return (
      hasIcon &&
      (hasHoverClass || $el.parent().find("a").length >= 3) &&
      !isInColumn
    );
  });

  if (socialLinks.length >= 2) {
    contentBlocks.push({
      elements: socialLinks,
      selector: "social-link-detected",
      name: "Social Link",
      type: "social_link",
      max: 10,
    });
  }

  const headerElements = $("header, nav, .navbar").filter((i, el) => {
    const $el = $(el);
    const hasLogo = $el.find("img").length > 0;
    const hasNavLinks =
      $el.find("a").filter((j, link) => {
        const $link = $(link);
        return $link.text().trim() && !$link.find("img").length;
      }).length >= 1;

    return hasLogo || hasNavLinks;
  });

  if (headerElements.length >= 1) {
    contentBlocks.push({
      elements: headerElements,
      selector: "header-detected",
      name: "Header",
      type: "header",
      max: 1,
    });
  }

  const allBlockPatterns = [...blockPatterns, ...contentBlocks];

  const seenTypes = new Set();
  const seenNames = new Set();
  const uniqueBlockPatterns = allBlockPatterns.filter((pattern) => {
    if (seenTypes.has(pattern.type)) {
      console.warn(
        `Duplicate block type detected: ${pattern.type}, skipping...`
      );
      return false;
    }

    if (seenNames.has(pattern.name)) {
      console.warn(
        `Duplicate block name detected: ${pattern.name}, skipping...`
      );
      return false;
    }

    seenTypes.add(pattern.type);
    seenNames.add(pattern.name);
    return true;
  });

  uniqueBlockPatterns.forEach((pattern) => {
    let elements;
    if (pattern.elements) {
      elements = pattern.elements;
    } else {
      elements = $(pattern.selector);
    }

    const allowSingleElement = ["header", "footer_column"].includes(
      pattern.type
    );
    const minimumElements = allowSingleElement ? 1 : 2;

    if (elements.length >= minimumElements) {
      const blockType = pattern.type;
      const blockSettings = [];

      const originalData = [];
      elements.each((index, element) => {
        const $el = $(element);

        const headingEl = $el.find("h1, h2, h3, h4, h5, h6").first();
        const descriptionEl = $el.find("p").first();
        const buttonEl = $el.find("a, .btn, .button").first();
        const imageEl = $el.find("img").first();
        const iconEl = $el.find('i[class*="fa"], .icon').first();

        let data = {
          heading: headingEl.length ? headingEl.text().trim() : "",
          subheading: $el.find("h1, h2, h3, h4, h5, h6").eq(1).text().trim(),
          description: descriptionEl.length ? descriptionEl.text().trim() : "",
          richtext: descriptionEl.length ? descriptionEl.html() : "",
          buttonText: buttonEl.length ? buttonEl.text().trim() : "",
          buttonUrl: buttonEl.length ? buttonEl.attr("href") : "",
          imageAlt: imageEl.length ? imageEl.attr("alt") : "",
          imageSrc: imageEl.length ? imageEl.attr("src") : "",
          icon: iconEl.length ? iconEl.attr("class") : "",
          price: $el
            .find('.price, [class*="price"], span:contains("$")')
            .first()
            .text()
            .trim(),
          rating: $el.find('.rating, [class*="rating"]').first().text().trim(),
          rating_count:
            $el
              .find('.rating span, .rating .text-sm, [class*="rating"] span')
              .last()
              .text()
              .trim() || "(128)",
        };

        if (pattern.type === "footer_column") {
          const listItems = $el.find("ul li a, ol li a");
          data.links = [];
          listItems.each((i, link) => {
            const $link = $(link);
            data.links.push({
              text: $link.text().trim(),
              url: $link.attr("href") || "#",
            });
          });

          const socialLinksInColumn = $el.find("a").filter((i, link) => {
            const $link = $(link);
            return $link.find('i[class*="fa-"]').length > 0;
          });

          data.socialLinks = [];
          socialLinksInColumn.each((i, link) => {
            const $link = $(link);
            data.socialLinks.push({
              url: $link.attr("href") || "#",
              icon: $link.find("i").attr("class") || "",
              text: $link.attr("title") || $link.attr("aria-label") || "",
            });
          });
        } else if (pattern.type === "social_link") {
          data.url = $el.attr("href") || "#";
          data.text =
            $el.text().trim() ||
            $el.attr("title") ||
            $el.attr("aria-label") ||
            "";
          data.icon = $el.find("i").attr("class") || "";
        } else if (pattern.type === "team_member") {
          data.name = headingEl.length ? headingEl.text().trim() : "";

          const positionEl = $el.find("p").first();
          data.position = positionEl.length ? positionEl.text().trim() : "";

          const descPara = $el.find("p").eq(1);
          if (descPara.length && descPara.text().trim().length > 50) {
            data.description = descPara.html();
          } else if (
            descriptionEl.length &&
            descriptionEl.text().trim().length > 50
          ) {
            data.description = descriptionEl.html();
          }

          data.socialLinks = [];
          $el.find("a").each((i, link) => {
            const $link = $(link);
            const href = $link.attr("href") || "";
            const icon = $link.find("i").attr("class") || "";

            if (href !== "#" && href.trim() !== "") {
              data.socialLinks.push({
                url: href,
                icon: icon,
                text: $link.attr("title") || $link.attr("aria-label") || "",
              });
            }
          });
        } else if (pattern.type === "blog_post") {
          data.heading = headingEl.length ? headingEl.text().trim() : "";
          data.description = descriptionEl.length
            ? descriptionEl.text().trim()
            : "";
          data.richtext = descriptionEl.length ? descriptionEl.html() : "";

          const metaEl = $el.find(".blog-meta, .post-meta, .date").first();
          data.meta = metaEl.length
            ? metaEl.text().trim()
            : "January 1, 2024 • Category";

          const readMoreEl = $el
            .find("a, .read-more, .btn")
            .filter((i, link) => {
              const text = $(link).text().toLowerCase();
              return (
                text.includes("read") ||
                text.includes("more") ||
                text.includes("→")
              );
            })
            .first();

          data.buttonText = readMoreEl.length
            ? readMoreEl.text().trim()
            : "Read More →";
          data.buttonUrl = readMoreEl.length ? readMoreEl.attr("href") : "/";
        } else if (pattern.type === "faq") {
          let questionText = "";
          let answerText = "";

          const faqQuestionDiv = $el.find(".faq-question").first();
          const faqAnswerDiv = $el.find(".faq-answer").first();

          if (faqQuestionDiv.length && faqAnswerDiv.length) {
            const questionSpan = faqQuestionDiv.find("span").first();
            questionText = questionSpan.length
              ? questionSpan.text().trim()
              : faqQuestionDiv.text().trim();

            answerText = faqAnswerDiv.html().trim();
          } else {
            const questionEl = $el
              .find("h3, h4, h5, .question, .accordion-header, span")
              .first();
            const answerEl = $el.find("p, .answer, .accordion-content").first();

            questionText = questionEl.length ? questionEl.text().trim() : "";
            answerText = answerEl.length ? answerEl.html().trim() : "";
          }

          if (!questionText && headingEl.length) {
            questionText = headingEl.text().trim();
          }
          if (!answerText && descriptionEl.length) {
            answerText = descriptionEl.html();
          }

          questionText = questionText.replace(/^\s*[+\-]\s*/, "").trim();

          data.question = questionText || "What is your question?";
          data.answer =
            answerText ||
            "<p>This is the answer to the frequently asked question.</p>";
          data.originalQuestion = questionText;
          data.originalAnswer = answerText;
        }

        if (!data.heading) {
          const directHeading = $el.children("h1, h2, h3, h4, h5, h6").first();
          if (directHeading.length) data.heading = directHeading.text().trim();
        }

        if (!data.description) {
          const directPara = $el.children("p").first();
          if (directPara.length) {
            data.description = directPara.text().trim();
            data.richtext = directPara.html();
          }
        }

        originalData.push(data);
      });

      const firstData = originalData[0];

      if (pattern.type === "faq") {
        blockSettings.push({
          type: "text",
          id: "question",
          label: "FAQ Question",
          default: "What is your question?",
          info: "The question text that users will click to expand",
        });

        blockSettings.push({
          type: "richtext",
          id: "answer",
          label: "FAQ Answer",
          default:
            "<p>This is the answer to the frequently asked question.</p>",
          info: "The answer that will be revealed when question is clicked",
        });
      } else if (
        pattern.type !== "footer_column" &&
        pattern.type !== "blog_post"
      ) {
        if (firstData.heading) {
          blockSettings.push({
            type: "text",
            id: "heading",
            label: truncateLabel(`${pattern.name} Heading`),
            default: validateSettingDefault(
              firstData.heading,
              "text",
              `${pattern.name} Title`
            ),
            info: "Main heading for this item",
          });
        }

        if (firstData.subheading) {
          blockSettings.push({
            type: "text",
            id: "subheading",
            label: truncateLabel(`${pattern.name} Subheading`),
            default: validateSettingDefault(
              firstData.subheading,
              "text",
              `${pattern.name} Subtitle`
            ),
          });
        }

        if (firstData.description && firstData.description.length > 3) {
          blockSettings.push({
            type: "richtext",
            id: "description",
            label: truncateLabel(`${pattern.name} Description`),
            default: validateSettingDefault(
              formatAsRichtext(firstData.richtext || firstData.description),
              "richtext",
              `<p>${pattern.name} description</p>`
            ),
            info: "Rich text editor for formatting",
          });
        }

        if (pattern.type === "sustainability_slide") {
          blockSettings.push({
            type: "image_picker",
            id: "background_image",
            label: "Slide Background Image",
            info: "Upload background image for this slide",
          });
        } else if (pattern.type === "transformation") {
          blockSettings.push({
            type: "image_picker",
            id: "before_image",
            label: "Before Image",
            info: "Upload the before transformation image",
          });

          blockSettings.push({
            type: "text",
            id: "before_image_alt",
            label: "Before Image Alt Text",
            default: "Before transformation",
            info: "Alt text for before image",
          });

          blockSettings.push({
            type: "image_picker",
            id: "after_image",
            label: "After Image",
            info: "Upload the after transformation image",
          });

          blockSettings.push({
            type: "text",
            id: "after_image_alt",
            label: "After Image Alt Text",
            default: "After transformation",
            info: "Alt text for after image",
          });
        } else if (firstData.imageSrc) {
          blockSettings.push({
            type: "image_picker",
            id: "image",
            label: truncateLabel(`${pattern.name} Image`),
            info: "Upload image for this item",
          });

          if (firstData.imageAlt) {
            blockSettings.push({
              type: "text",
              id: "image_alt",
              label: truncateLabel(`${pattern.name} Image Alt Text`),
              default: validateSettingDefault(
                firstData.imageAlt,
                "text",
                "Image"
              ),
              info: "Alternative text for accessibility",
            });
          }
        }

        if (firstData.icon) {
          blockSettings.push({
            type: "text",
            id: "icon",
            label: truncateLabel(`${pattern.name} Icon`),
            default: validateSettingDefault(
              firstData.icon,
              "text",
              "fas fa-star"
            ),
            info: "Icon class (e.g., fa-home, fa-star)",
          });
        }

        if (firstData.buttonText) {
          blockSettings.push({
            type: "text",
            id: "button_text",
            label: truncateLabel(`${pattern.name} Button Text`),
            default: validateSettingDefault(
              firstData.buttonText,
              "text",
              "View Details"
            ),
          });

          blockSettings.push({
            type: "url",
            id: "button_url",
            label: truncateLabel(`${pattern.name} Button URL`),
            default: "/",
            info: "Link destination",
          });
        }

        if (firstData.price) {
          blockSettings.push({
            type: "text",
            id: "price",
            label: truncateLabel(`${pattern.name} Price`),
            default: validateSettingDefault(firstData.price, "text", "$0.00"),
          });
        }

        if (firstData.rating) {
          blockSettings.push({
            type: "range",
            id: "rating",
            label: truncateLabel(`${pattern.name} Rating`),
            min: 1,
            max: 5,
            step: 0.1,
            default: 5,
            unit: "★",
          });
        }

        if (pattern.type === "product" || pattern.type === "testimonial_card") {
          blockSettings.push({
            type: "text",
            id: "rating_count",
            label: "Rating Count",
            default: "(128)",
            info: "Number of reviews (e.g., (128))",
          });
        }
      }

      if (pattern.type === "footer_column") {
        const anyColumnHasLinks = originalData.some(
          (data) => data.links && data.links.length > 0
        );
        const anyColumnHasSocialLinks = originalData.some(
          (data) => data.socialLinks && data.socialLinks.length > 0
        );

        blockSettings.push({
          type: "text",
          id: "column_title",
          label: "Column Title",
          default: validateSettingDefault(
            firstData.heading,
            "text",
            "Column Title"
          ),
          info: "Footer column heading",
        });

        if (firstData.description && firstData.description !== "<p></p>") {
          blockSettings.push({
            type: "richtext",
            id: "column_description",
            label: "Column Description",
            default: formatAsRichtext(firstData.description),
            info: "Footer column description text",
          });
        }

        if (anyColumnHasLinks) {
          for (let i = 1; i <= 6; i++) {
            blockSettings.push({
              type: "text",
              id: `link_${i}_text`,
              label: `Link ${i} Text`,
              default: `Link ${i}`,
              info: `Text for footer link ${i}`,
            });

            blockSettings.push({
              type: "url",
              id: `link_${i}_url`,
              label: `Link ${i} URL`,
              default: validateSettingDefault("/", "url", "/"),
              info: `URL for footer link ${i}`,
            });
          }
        }

        if (anyColumnHasSocialLinks) {
          const socialPlatforms = [
            "facebook",
            "instagram",
            "twitter",
            "youtube",
            "pinterest",
          ];

          socialPlatforms.forEach((platform, index) => {
            blockSettings.push({
              type: "url",
              id: `social_${platform}_url`,
              label: truncateLabel(
                `${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`
              ),
              default: validateSettingDefault("/", "url", "/"),
              info: `${platform} profile URL`,
            });
          });
        }
      } else if (pattern.type === "header") {
        const headerData = originalData[0];
        const headerElement = $(elements[0]);

        const logoImg = headerElement.find("img").first();
        if (logoImg.length) {
          blockSettings.push({
            type: "image_picker",
            id: "logo_image",
            label: "Header Logo",
            info: "Upload header logo image",
          });

          if (logoImg.attr("alt")) {
            blockSettings.push({
              type: "text",
              id: "logo_alt",
              label: "Logo Alt Text",
              default: validateSettingDefault(
                logoImg.attr("alt"),
                "text",
                "Logo"
              ),
              info: "Alt text for logo",
            });
          }
        }

        const navLinks = [];

        const allNavLinks = new Set();

        headerElement.find("a").each((i, link) => {
          const $link = $(link);
          const text = $link.text().trim();
          const href = $link.attr("href") || "";
          const isLogo = $link.find("img").length > 0;
          const isIcon = $link.find("i").length > 0 && !text;

          if (text && !isLogo && !isIcon) {
            const linkKey = `${text}:${href}`;
            if (!allNavLinks.has(linkKey) && navLinks.length < 8) {
              allNavLinks.add(linkKey);
              navLinks.push({
                text: text,
                href: href,
              });
            }
          }
        });

        const minNavLinks = Math.max(navLinks.length, 3);

        for (let i = 0; i < minNavLinks; i++) {
          const link = navLinks[i];
          blockSettings.push({
            type: "text",
            id: `nav_link_${i + 1}_text`,
            label: link
              ? truncateLabel(`Navigation Link: ${link.text}`)
              : `Navigation Link ${i + 1}`,
            default: validateSettingDefault(
              link ? link.text : `Link ${i + 1}`,
              "text",
              `Link ${i + 1}`
            ),
            info: `Navigation link ${i + 1} text`,
          });

          blockSettings.push({
            type: "url",
            id: `nav_link_${i + 1}_url`,
            label: link
              ? truncateLabel(`Navigation URL: ${link.text}`)
              : `Navigation URL ${i + 1}`,
            default: validateSettingDefault(link ? link.href : "/", "url", "/"),
            info: `Navigation link ${i + 1} URL`,
          });
        }
      } else if (pattern.type === "social_link") {
        if (firstData.url) {
          blockSettings.push({
            type: "url",
            id: "url",
            label: truncateLabel(`${pattern.name} URL`),
            default: validateSettingDefault(firstData.url, "url", "/"),
            info: "Social media profile URL",
          });
        }
        if (firstData.text) {
          blockSettings.push({
            type: "text",
            id: "text",
            label: truncateLabel(`${pattern.name} Text`),
            default: validateSettingDefault(
              firstData.text,
              "text",
              "Social Link"
            ),
            info: "Social link text or title",
          });
        }
      } else if (pattern.type === "blog_post") {
        blockSettings.push({
          type: "image_picker",
          id: "blog_image",
          label: "Blog Post Image",
          info: "Blog post featured image",
        });

        blockSettings.push({
          type: "text",
          id: "blog_image_alt",
          label: "Blog Image Alt Text",
          default: validateSettingDefault(
            firstData.imageAlt,
            "text",
            "Blog post image"
          ),
          info: "Alt text for blog post image",
        });

        blockSettings.push({
          type: "text",
          id: "blog_title",
          label: "Blog Post Title",
          default: validateSettingDefault(
            firstData.heading,
            "text",
            "Blog Post Title"
          ),
          info: "Blog post headline",
        });

        blockSettings.push({
          type: "richtext",
          id: "blog_excerpt",
          label: "Blog Post Excerpt",
          default: formatAsRichtext(firstData.description),
          info: "Blog post preview text",
        });

        blockSettings.push({
          type: "text",
          id: "blog_meta",
          label: "Blog Meta Info",
          default: validateSettingDefault(
            firstData.meta,
            "text",
            "January 1, 2024 • Category"
          ),
          info: "Date and category information",
        });

        blockSettings.push({
          type: "text",
          id: "blog_button_text",
          label: "Read More Button Text",
          default: validateSettingDefault(
            firstData.buttonText,
            "text",
            "Read More →"
          ),
          info: "Button text for reading full post",
        });

        blockSettings.push({
          type: "url",
          id: "blog_button_url",
          label: "Blog Post URL",
          default: "/",
          info: "Link to full blog post",
        });
      } else if (pattern.type === "team_member") {
        blockSettings.push({
          type: "image_picker",
          id: "member_image",
          label: "Team Member Photo",
          info: "Upload team member photo",
        });

        if (firstData.name) {
          blockSettings.push({
            type: "text",
            id: "member_name",
            label: "Team Member Name",
            default: validateSettingDefault(
              firstData.name,
              "text",
              "Team Member"
            ),
            info: "Full name of team member",
          });
        }

        if (firstData.position) {
          blockSettings.push({
            type: "text",
            id: "member_position",
            label: "Position/Title",
            default: validateSettingDefault(
              firstData.position,
              "text",
              "Team Member"
            ),
            info: "Job title or position",
          });
        }

        if (firstData.description) {
          blockSettings.push({
            type: "richtext",
            id: "member_description",
            label: "Team Member Bio",
            default: formatAsRichtext(firstData.description),
            info: "Brief description or bio",
          });
        }

        const socialPlatforms = [
          "linkedin",
          "twitter",
          "instagram",
          "facebook",
        ];
        socialPlatforms.forEach((platform) => {
          blockSettings.push({
            type: "url",
            id: `${platform}_url`,
            label: truncateLabel(
              `${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`
            ),
            default: "/",
            info: `Team member's ${platform} profile URL`,
          });
        });

        blockSettings.push({
          type: "text",
          id: "member_image_alt",
          label: "Image Alt Text",
          default: firstData.name
            ? `Photo of ${firstData.name}`
            : "Team Member",
          info: "Alt text for team member photo",
        });
      }

      if (blockSettings.length > 0 || pattern.type === "faq") {
        blocks.push({
          type: blockType,
          name: pattern.name,
          limit: pattern.max,
          settings: blockSettings,
        });

        const dataToProcess =
          pattern.type === "footer_column"
            ? originalData.slice(0, 4)
            : originalData;

        let processedData = dataToProcess;
        if (pattern.type === "faq") {
          const uniqueQuestions = new Set();
          processedData = dataToProcess.filter((data) => {
            const questionKey = data.question || data.heading || "";
            if (uniqueQuestions.has(questionKey)) {
              return false;
            }
            uniqueQuestions.add(questionKey);
            return true;
          });
        }

        processedData.forEach((data, index) => {
          const blockId = `${blockType}_${Date.now()}_${index}`;
          const blockData = {
            type: blockType,
            settings: {},
          };

          blockSettings.forEach((setting) => {
            let settingValue;
            switch (setting.id) {
              case "heading":
                settingValue = data.heading || setting.default;
                break;
              case "column_title":
                settingValue = data.heading || setting.default;
                break;
              case "column_description":
                settingValue =
                  formatAsRichtext(data.richtext || data.description) ||
                  setting.default;
                break;
              case "subheading":
                settingValue = data.subheading || setting.default;
                break;
              case "description":
                settingValue =
                  formatAsRichtext(data.richtext || data.description) ||
                  setting.default;
                break;
              case "button_text":
                settingValue = data.buttonText || setting.default;
                break;
              case "button_url":
                settingValue =
                  data.buttonUrl && data.buttonUrl !== "#"
                    ? data.buttonUrl
                    : setting.default;
                break;
              case "image_alt":
                settingValue = data.imageAlt || setting.default;
                break;
              case "icon":
                settingValue = data.icon || setting.default;
                break;
              case "price":
                settingValue = data.price || setting.default;
                break;
              case "rating":
                settingValue = parseFloat(data.rating) || setting.default;
                break;
              case "rating_count":
                settingValue = data.rating_count || setting.default;
                break;
              case "url":
                settingValue = data.url || setting.default;
                break;
              case "text":
                settingValue = data.text || setting.default;
                break;
              case "member_name":
                settingValue = data.name || setting.default;
                break;
              case "member_position":
                settingValue = data.position || setting.default;
                break;
              case "member_description":
                settingValue =
                  formatAsRichtext(data.description) || setting.default;
                break;
              case "member_image_alt":
                settingValue =
                  data.imageAlt ||
                  (data.name ? `Photo of ${data.name}` : setting.default);
                break;
              case "blog_title":
                settingValue = data.heading || setting.default;
                break;
              case "blog_excerpt":
                settingValue =
                  formatAsRichtext(data.richtext || data.description) ||
                  setting.default;
                break;
              case "blog_meta":
                settingValue = data.meta || setting.default;
                break;
              case "blog_image_alt":
                settingValue = data.imageAlt || setting.default;
                break;
              case "blog_button_text":
                settingValue = data.buttonText || setting.default;
                break;
              case "blog_button_url":
                settingValue =
                  data.buttonUrl && data.buttonUrl !== "#"
                    ? data.buttonUrl
                    : setting.default;
                break;
              case "question":
                settingValue = data.question || setting.default;
                break;
              case "answer":
                settingValue = data.answer || setting.default;
                break;
              default:
                if (
                  setting.id.startsWith("nav_link_") &&
                  setting.id.endsWith("_text")
                ) {
                  const linkIndex = parseInt(setting.id.split("_")[2]) - 1;
                  if (pattern.type === "header") {
                    const headerEl = $(elements[0]);
                    const navLinks = [];
                    headerEl.find("a").each((i, link) => {
                      const $link = $(link);
                      const text = $link.text().trim();
                      const isLogo = $link.find("img").length > 0;
                      if (text && !isLogo) {
                        navLinks.push({
                          text: text,
                          href: $link.attr("href") || "/",
                        });
                      }
                    });
                    settingValue = navLinks[linkIndex]
                      ? navLinks[linkIndex].text
                      : setting.default;
                  } else if (data.links && data.links[linkIndex]) {
                    settingValue =
                      data.links[linkIndex].text || setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else if (
                  setting.id.startsWith("nav_link_") &&
                  setting.id.endsWith("_url")
                ) {
                  const linkIndex = parseInt(setting.id.split("_")[2]) - 1;
                  if (pattern.type === "header") {
                    const headerEl = $(elements[0]);
                    const navLinks = [];
                    headerEl.find("a").each((i, link) => {
                      const $link = $(link);
                      const text = $link.text().trim();
                      const isLogo = $link.find("img").length > 0;
                      if (text && !isLogo) {
                        navLinks.push({
                          text: text,
                          href: $link.attr("href") || "/",
                        });
                      }
                    });
                    settingValue = navLinks[linkIndex]
                      ? navLinks[linkIndex].href !== "#"
                        ? navLinks[linkIndex].href
                        : "/"
                      : setting.default;
                  } else if (data.links && data.links[linkIndex]) {
                    settingValue = data.links[linkIndex].url || setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else if (
                  setting.id.startsWith("link_") &&
                  setting.id.endsWith("_text")
                ) {
                  const linkIndex = parseInt(setting.id.split("_")[1]) - 1;
                  if (data.links && data.links[linkIndex]) {
                    settingValue =
                      data.links[linkIndex].text || setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else if (
                  setting.id.startsWith("link_") &&
                  setting.id.endsWith("_url")
                ) {
                  const linkIndex = parseInt(setting.id.split("_")[1]) - 1;
                  if (data.links && data.links[linkIndex]) {
                    settingValue = data.links[linkIndex].url || setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else if (
                  setting.id.startsWith("social_") &&
                  setting.id.endsWith("_url")
                ) {
                  const platform = setting.id
                    .replace("social_", "")
                    .replace("_url", "");
                  if (data.socialLinks) {
                    const socialLink = data.socialLinks.find(
                      (link) =>
                        link.icon &&
                        (link.icon.includes(platform) ||
                          (link.text &&
                            link.text.toLowerCase().includes(platform)))
                    );
                    settingValue = socialLink
                      ? socialLink.url
                      : setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else if (
                  setting.id.endsWith("_url") &&
                  [
                    "linkedin_url",
                    "twitter_url",
                    "instagram_url",
                    "facebook_url",
                  ].includes(setting.id)
                ) {
                  const platform = setting.id.replace("_url", "");
                  if (data.socialLinks) {
                    const socialLink = data.socialLinks.find(
                      (link) =>
                        link.icon &&
                        (link.icon.includes(platform) ||
                          (link.text &&
                            link.text.toLowerCase().includes(platform)))
                    );
                    settingValue = socialLink
                      ? socialLink.url
                      : setting.default;
                  } else {
                    settingValue = setting.default;
                  }
                } else {
                  settingValue = setting.default;
                }
            }

            blockData.settings[setting.id] = validateJsonSettingValue(
              settingValue,
              setting.default,
              setting.type
            );
          });

          jsonBlocks[blockId] = blockData;
          jsonBlockOrder.push(blockId);
        });

        elements.each((index, element) => {
          const $el = $(element);
          const currentData = processedData[index] || processedData[0];

          if (pattern.type === "footer_column") {
            $el.find("h1, h2, h3, h4, h5, h6").each((i, heading) => {
              if ($(heading).text().trim() && i === 0) {
                $(heading).text("{{ block.settings.column_title }}");
              }
            });

            $el.find("p").each((i, p) => {
              if ($(p).text().trim() && i === 0) {
                $(p).html("{{ block.settings.column_description }}");
              }
            });

            $el.find("ul, ol").each((i, list) => {
              if (i === 0) {
                $(list).html(`
                                    {% for i in (1..6) %}
                                      {% assign link_text_id = 'link_' | append: i | append: '_text' %}
                                      {% assign link_url_id = 'link_' | append: i | append: '_url' %}
                                      {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
                                        <li><a href="{{ block.settings[link_url_id] }}">{{ block.settings[link_text_id] }}</a></li>
                                      {% endif %}
                                    {% endfor %}
                                `);
              }
            });

            $el
              .find("div")
              .filter((i, socialDiv) => {
                return $(socialDiv).find('a i[class*="fa-"]').length > 0;
              })
              .each((i, socialDiv) => {
                if (i === 0) {
                  $(socialDiv).html(`
                                    {% assign has_social = false %}
                                    {% assign social_platforms = 'facebook,instagram,twitter,youtube,pinterest' | split: ',' %}
                                    {% for platform in social_platforms %}
                                      {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
                                      {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                                        {% assign has_social = true %}
                                        {% break %}
                                      {% endif %}
                                    {% endfor %}
                                    
                                    {% comment %} Show individual social icons if any platform has URL {% endcomment %}
                                    {% if has_social %}
                                      <div class="flex space-x-3">
                                        {% for platform in social_platforms %}
                                          {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
                                          {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                                            <a href="{{ block.settings[social_url_id] }}" class="hover:text-white text-xl transition" title="{{ platform | capitalize }}">
                                              <i class="fab fa-{{ platform }}"></i>
                                            </a>
                                          {% endif %}
                                        {% endfor %}
                                      </div>
                                    {% endif %}
                                `);
                }
              });
          } else if (pattern.type === "social_link") {
            $el.attr("href", "{{ block.settings.url }}");
            $el.find("i").attr("class", "{{ block.settings.icon }}");
            if ($el.text().trim()) {
              $el.text("{{ block.settings.text }}");
            }
          } else if (pattern.type === "header") {
            $el.find("img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                $(img).attr(
                  "src",
                  "{{ block.settings.logo_image | img_url: 'master' }}"
                );
                if ($(img).attr("alt")) {
                  $(img).attr("alt", "{{ block.settings.logo_alt }}");
                }
              }
            });

            $el.find("a, button").each((i, link) => {
              const $link = $(link);
              const text = $link.text().trim().toLowerCase();
              const icon = $link.find("i").attr("class") || "";
              const href = $link.attr("href") || "";

              if (
                text.includes("search") ||
                icon.includes("search") ||
                icon.includes("fa-search") ||
                icon.includes("magnifying")
              ) {
                $link.remove();
                return;
              }

              if (
                text.includes("cart") ||
                icon.includes("cart") ||
                icon.includes("shopping") ||
                href.includes("cart")
              ) {
                $link.attr("href", "/cart");
                if ($link.find("i").length > 0) {
                  $link.html($link.html());
                }
              }
            });

            let navLinkIndex = 1;
            $el.find("a").each((i, link) => {
              const $link = $(link);
              const text = $link.text().trim();
              const isLogo = $link.find("img").length > 0;
              const isMobileMenu =
                $link.closest(".mobile-menu, #mobile-menu").length > 0;
              const isIcon = $link.find("i").length > 0 && !text;
              const href = $link.attr("href") || "";

              const isCart =
                text.toLowerCase().includes("cart") ||
                ($link.find("i").attr("class") || "").includes("cart") ||
                href.includes("cart");

              if (text && !isLogo && !isIcon && !isCart && navLinkIndex <= 8) {
                $link.text(
                  `{{ block.settings.nav_link_${navLinkIndex}_text }}`
                );
                $link.attr(
                  "href",
                  `{{ block.settings.nav_link_${navLinkIndex}_url }}`
                );

                if (!isMobileMenu) {
                  navLinkIndex++;
                }
              }
            });

            $el.find(".mobile-menu, #mobile-menu").each((i, mobileMenu) => {
              const $mobileMenu = $(mobileMenu);
              let mobileMenuHtml = "";

              for (let i = 1; i <= 8; i++) {
                mobileMenuHtml += `
                                    {% if block.settings.nav_link_${i}_text != blank and block.settings.nav_link_${i}_url != blank %}
                                        <a href="{{ block.settings.nav_link_${i}_url }}">{{ block.settings.nav_link_${i}_text }}</a>
                                    {% endif %}`;
              }

              $mobileMenu.html(mobileMenuHtml.trim());
            });
          } else if (pattern.type === "team_member") {
            $el.find("img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                $(img).attr(
                  "src",
                  "{{ block.settings.member_image | img_url: 'master' }}"
                );
                if ($(img).attr("alt")) {
                  $(img).attr("alt", "{{ block.settings.member_image_alt }}");
                }
              }
            });

            $el
              .find("h3, h4, h5, .name, .member-name, strong")
              .each((i, nameEl) => {
                if ($(nameEl).text().trim() && i === 0) {
                  $(nameEl).text("{{ block.settings.member_name }}");
                }
              });

            $el.find("p").each((i, p) => {
              const $p = $(p);
              const text = $p.text().trim();
              if (text && i === 0 && text.length < 100) {
                $p.html("{{ block.settings.member_position }}");
              } else if (text && i === 1 && text.length > 50) {
                $p.html("{{ block.settings.member_description }}");
              }
            });

            $el.find("a").each((i, link) => {
              const $link = $(link);
              const href = $link.attr("href") || "";
              const icon = $link.find("i").attr("class") || "";

              if (href.includes("linkedin") || icon.includes("linkedin")) {
                $link.attr("href", "{{ block.settings.linkedin_url }}");
                $link.html(
                  '{% if block.settings.linkedin_url != blank and block.settings.linkedin_url != "/" %}<i class="fab fa-linkedin-in"></i>{% endif %}'
                );
              } else if (href.includes("twitter") || icon.includes("twitter")) {
                $link.attr("href", "{{ block.settings.twitter_url }}");
                $link.html(
                  '{% if block.settings.twitter_url != blank and block.settings.twitter_url != "/" %}<i class="fab fa-twitter"></i>{% endif %}'
                );
              } else if (
                href.includes("instagram") ||
                icon.includes("instagram")
              ) {
                $link.attr("href", "{{ block.settings.instagram_url }}");
                $link.html(
                  '{% if block.settings.instagram_url != blank and block.settings.instagram_url != "/" %}<i class="fab fa-instagram"></i>{% endif %}'
                );
              } else if (
                href.includes("facebook") ||
                icon.includes("facebook")
              ) {
                $link.attr("href", "{{ block.settings.facebook_url }}");
                $link.html(
                  '{% if block.settings.facebook_url != blank and block.settings.facebook_url != "/" %}<i class="fab fa-facebook"></i>{% endif %}'
                );
              }
            });
          } else if (pattern.type === "blog_post") {
            $el.find("img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                $(img).attr(
                  "src",
                  "{{ block.settings.blog_image | img_url: 'master' }}"
                );
                $(img).attr("alt", "{{ block.settings.blog_image_alt }}");
              }
            });

            $el.find("h1, h2, h3, h4, h5, h6").each((i, heading) => {
              if ($(heading).text().trim() && i === 0) {
                $(heading).text("{{ block.settings.blog_title }}");
              }
            });

            $el.find(".blog-meta, .post-meta, .date").each((i, meta) => {
              if ($(meta).text().trim() && i === 0) {
                $(meta).text("{{ block.settings.blog_meta }}");
              }
            });

            $el.find("p").each((i, p) => {
              if (
                $(p).text().trim() &&
                i === 0 &&
                !$(p).hasClass("blog-meta")
              ) {
                $(p).html("{{ block.settings.blog_excerpt }}");
              }
            });

            $el.find("a, .read-more, .btn").each((i, link) => {
              const $link = $(link);
              const text = $link.text().toLowerCase();
              if (
                (text.includes("read") ||
                  text.includes("more") ||
                  text.includes("→")) &&
                i === 0
              ) {
                $link.text("{{ block.settings.blog_button_text }}");
                $link.attr("href", "{{ block.settings.blog_button_url }}");
              }
            });
          } else if (pattern.type === "faq") {
            const faqQuestionDiv = $el.find(".faq-question").first();
            const faqAnswerDiv = $el.find(".faq-answer").first();

            if (faqQuestionDiv.length && faqAnswerDiv.length) {
              const questionSpan = faqQuestionDiv.find("span").first();
              if (questionSpan.length) {
                questionSpan.text("{{ block.settings.question }}");
              } else {
                const icon = faqQuestionDiv.find("i").first();
                if (icon.length) {
                  faqQuestionDiv.html(
                    '<span>{{ block.settings.question }}</span><i class="fas fa-plus"></i>'
                  );
                } else {
                  faqQuestionDiv.html(
                    "<span>{{ block.settings.question }}</span>"
                  );
                }
              }

              faqQuestionDiv.attr("onclick", "toggleFAQ(this)");
              faqQuestionDiv.addClass("faq-question-clickable");

              faqAnswerDiv.html("{{ block.settings.answer }}");
              faqAnswerDiv.addClass("faq-answer-content");
            } else {
              $el
                .find("h3, h4, h5, .question, .accordion-header")
                .each((i, question) => {
                  if ($(question).text().trim() && i === 0) {
                    $(question).text("{{ block.settings.question }}");
                    $(question).attr("onclick", "toggleFAQ(this)");
                    $(question).addClass("faq-question-clickable");
                  }
                });

              $el.find("p, .answer, .accordion-content").each((i, answer) => {
                if ($(answer).text().trim() && i === 0) {
                  $(answer).html("{{ block.settings.answer }}");
                  $(answer).addClass("faq-answer-content");
                }
              });

              if (
                $el.find(".question, .faq-question, .accordion-header")
                  .length === 0
              ) {
                $el.find("h1, h2, h3, h4, h5, h6").each((i, heading) => {
                  if ($(heading).text().trim() && i === 0) {
                    $(heading).text("{{ block.settings.question }}");
                    $(heading).attr("onclick", "toggleFAQ(this)");
                    $(heading).addClass("faq-question-clickable");
                  }
                });
              }

              if (
                $el.find(".answer, .faq-answer, .accordion-content").length ===
                0
              ) {
                $el.find("p").each((i, p) => {
                  if ($(p).text().trim() && i === 0) {
                    $(p).html("{{ block.settings.answer }}");
                    $(p).addClass("faq-answer-content");
                  }
                });
              }
            }
          } else {
            $el.find("h1, h2, h3, h4, h5, h6").each((i, heading) => {
              if ($(heading).text().trim()) {
                if (i === 0) {
                  $(heading).text("{{ block.settings.heading }}");
                } else if (i === 1 && firstData.subheading) {
                  $(heading).text("{{ block.settings.subheading }}");
                }
              }
            });

            $el.find("p").each((i, p) => {
              if ($(p).text().trim() && i === 0) {
                $(p).html("{{ block.settings.description }}");
              }
            });

            $el.find(".content, .description, .text").each((i, content) => {
              if ($(content).html() && i === 0) {
                $(content).html("{{ block.settings.description }}");
              }
            });

            $el.find("a, .btn, .button").each((i, btn) => {
              const $btn = $(btn);
              if ($btn.text().trim() && i === 0) {
                const originalClasses = $btn.attr("class") || "";
                const originalStyle = $btn.attr("style") || "";

                $btn.text("{{ block.settings.button_text }}");
                if ($btn.attr("href")) {
                  $btn.attr("href", "{{ block.settings.button_url }}");
                }

                if (
                  !originalClasses.includes("mt-") &&
                  !originalClasses.includes("margin") &&
                  !originalStyle.includes("margin")
                ) {
                  const currentClasses = $btn.attr("class") || "";
                  if (!currentClasses.includes("mt-")) {
                    $btn.addClass("mt-6");
                  }
                }
              }
            });
          }

          if (pattern.type === "transformation") {
            $el.find("p, .text, .description").each((i, textEl) => {
              const $textEl = $(textEl);
              const text = $textEl.text().trim();

              if (
                text &&
                !$textEl.closest(".experience-content, .transformation-content")
                  .length
              ) {
                if (
                  !$textEl.closest(
                    ".before-image, .after-image, .before, .after"
                  ).length
                ) {
                  $textEl.remove();
                }
              }
            });

            $el
              .find(".dot, .dots, .pagination-dot, [class*='dot'], .slider-dot")
              .each((i, dot) => {
                $(dot).remove();
              });

            $el
              .find(".slide-indicator, .carousel-indicator, .slider-nav")
              .each((i, indicator) => {
                $(indicator).remove();
              });

            $el.find(".before-image, .before img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                $(img).attr(
                  "src",
                  "{{ block.settings.before_image | img_url: 'master' }}"
                );
                if ($(img).attr("alt")) {
                  $(img).attr("alt", "{{ block.settings.before_image_alt }}");
                }
              }
            });

            $el.find(".after-image, .after img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                $(img).attr(
                  "src",
                  "{{ block.settings.after_image | img_url: 'master' }}"
                );
                if ($(img).attr("alt")) {
                  $(img).attr("alt", "{{ block.settings.after_image_alt }}");
                }
              }
            });

            const allImages = $el.find("img");
            if (
              allImages.length >= 2 &&
              $el.find(".before-image, .after-image, .before, .after")
                .length === 0
            ) {
              $(allImages[0]).attr(
                "src",
                "{{ block.settings.before_image | img_url: 'master' }}"
              );
              $(allImages[0]).attr(
                "alt",
                "{{ block.settings.before_image_alt }}"
              );
              $(allImages[1]).attr(
                "src",
                "{{ block.settings.after_image | img_url: 'master' }}"
              );
              $(allImages[1]).attr(
                "alt",
                "{{ block.settings.after_image_alt }}"
              );
            }
          } else {
            $el.find("img").each((i, img) => {
              if ($(img).attr("src") && i === 0) {
                if (
                  pattern.type === "feature" ||
                  pattern.type === "card" ||
                  pattern.type === "service"
                ) {
                  $(img).attr(
                    "src",
                    "{{ block.settings.image | img_url: 'master' }}"
                  );
                  if ($(img).attr("alt")) {
                    $(img).attr("alt", "{{ block.settings.image_alt }}");
                  }
                } else if (pattern.type === "gallery_item") {
                  $(img).attr(
                    "src",
                    "{{ block.settings.gallery_image | img_url: 'master' }}"
                  );
                  if ($(img).attr("alt")) {
                    $(img).attr(
                      "alt",
                      "{{ block.settings.gallery_image_alt }}"
                    );
                  }
                } else {
                  $(img).attr(
                    "src",
                    "{{ block.settings.image | img_url: 'master' }}"
                  );
                  if ($(img).attr("alt")) {
                    $(img).attr("alt", "{{ block.settings.image_alt }}");
                  }
                }
              }
            });
          }

          $el.find('i[class*="fa"], .icon').each((i, icon) => {
            if ($(icon).attr("class") && i === 0) {
              $(icon).attr("class", "{{ block.settings.icon }}");
            }
          });

          $el.find('.price, [class*="price"]').each((i, price) => {
            if ($(price).text().trim() && i === 0) {
              $(price).text("{{ block.settings.price }}");
            }
          });

          if (
            pattern.type === "product" ||
            pattern.type === "testimonial_card"
          ) {
            $el.find("span").each((i, span) => {
              const text = $(span).text().trim();
              if (text.includes("(") && text.includes(")") && /\d/.test(text)) {
                $(span).text("{{ block.settings.rating_count }}");
              }
            });
          }
        });

        if (pattern.type === "footer_column") {
          const footerContainer = $(elements[0]).closest("footer, .footer");

          if (footerContainer.length > 0) {
            const gridContainer = $(elements[0]).parent();

            const isGridContainer =
              gridContainer.hasClass("grid") ||
              gridContainer.css("display") === "grid" ||
              gridContainer.children().length > 1;

            if (isGridContainer) {
              const footerWrapper = `
{%- comment -%} Footer Container with Grid Layout {%- endcomment -%}
<div class="footer-grid">
  {% for block in section.blocks %}
    {% case block.type %}
      {% when 'footer_column' %}
        <div class="footer-section">
          {% if block.settings.column_title != blank %}
            {% if block.settings.column_title == "Mäertin" %}
              <h3 class="text-2xl font-semibold mb-4">{{ block.settings.column_title }}</h3>
            {% else %}
              <h4 class="font-semibold mb-4 border-b border-[#a13f4f] pb-1">{{ block.settings.column_title }}</h4>
            {% endif %}
          {% endif %}
          {% if block.settings.column_description != blank %}
            <p class="mb-4 text-[#ecd7de]">{{ block.settings.column_description }}</p>
          {% endif %}
          
          {%- comment -%} Individual Link Settings {%- endcomment -%}
          {% assign has_links = false %}
          {% for i in (1..6) %}
            {% assign link_text_id = 'link_' | append: i | append: '_text' %}
            {% assign link_url_id = 'link_' | append: i | append: '_url' %}
            {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
              {% assign has_links = true %}
              {% break %}
            {% endif %}
          {% endfor %}
          
          {% if has_links %}
            <ul class="space-y-1">
              {% for i in (1..6) %}
                {% assign link_text_id = 'link_' | append: i | append: '_text' %}
                {% assign link_url_id = 'link_' | append: i | append: '_url' %}
                {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
                  <li><a href="{{ block.settings[link_url_id] }}">{{ block.settings[link_text_id] }}</a></li>
                {% endif %}
              {% endfor %}
            </ul>
          {% endif %}
          
          {%- comment -%} Social Links - More flexible display {%- endcomment -%}
          {% assign social_platforms = 'facebook,instagram,twitter,youtube,pinterest' | split: ',' %}
          {% assign social_links_exist = false %}
          {% for platform in social_platforms %}
            {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
            {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
              {% assign social_links_exist = true %}
              {% break %}
            {% endif %}
          {% endfor %}
          
          {% if social_links_exist %}
            <div class="flex space-x-5 mt-2">
              {% for platform in social_platforms %}
                {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
                {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                  <a href="{{ block.settings[social_url_id] }}" class="hover:text-white text-2xl transition" title="{{ platform | capitalize }}">
                    <i class="fab fa-{{ platform }}"></i>
                  </a>
                {% endif %}
              {% endfor %}
            </div>
          {% endif %}
        </div>
      {% endcase %}
  {% endfor %}
</div>`;

              gridContainer.replaceWith(footerWrapper);
            } else {
              const footerWrapper = `
{%- comment -%} Footer Column Blocks with Proper Structure {%- endcomment -%}
<div class="footer-grid">
  {% for block in section.blocks %}
    {% case block.type %}
      {% when 'footer_column' %}
        <div class="footer-section">
          {% if block.settings.column_title != blank %}
            {% if block.settings.column_title == "Mäertin" %}
              <h3 class="text-2xl font-semibold mb-4">{{ block.settings.column_title }}</h3>
            {% else %}
              <h4 class="font-semibold mb-4 border-b border-[#a13f4f] pb-1">{{ block.settings.column_title }}</h4>
            {% endif %}
          {% endif %}
          {% if block.settings.column_description != blank %}
            <p class="mb-4 text-[#ecd7de]">{{ block.settings.column_description }}</p>
          {% endif %}
          
          {%- comment -%} Individual Link Settings {%- endcomment -%}
          {% assign has_links = false %}
          {% for i in (1..6) %}
            {% assign link_text_id = 'link_' | append: i | append: '_text' %}
            {% assign link_url_id = 'link_' | append: i | append: '_url' %}
            {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
              {% assign has_links = true %}
              {% break %}
            {% endif %}
          {% endfor %}
          
          {% if has_links %}
            <ul class="space-y-1">
              {% for i in (1..6) %}
                {% assign link_text_id = 'link_' | append: i | append: '_text' %}
                {% assign link_url_id = 'link_' | append: i | append: '_url' %}
                {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
                  <li><a href="{{ block.settings[link_url_id] }}">{{ block.settings[link_text_id] }}</a></li>
                {% endif %}
              {% endfor %}
            </ul>
          {% endif %}
          
          {%- comment -%} Social Links - More flexible display {%- endcomment -%}
          {% assign social_platforms = 'facebook,instagram,twitter,youtube,pinterest' | split: ',' %}
          {% assign social_links_exist = false %}
          {% for platform in social_platforms %}
            {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
            {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
              {% assign social_links_exist = true %}
              {% break %}
            {% endif %}
          {% endfor %}
          
          {% if social_links_exist %}
            <div class="flex space-x-5 mt-2">
              {% for platform in social_platforms %}
                {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
                {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                  <a href="{{ block.settings[social_url_id] }}" class="hover:text-white text-2xl transition" title="{{ platform | capitalize }}">
                    <i class="fab fa-{{ platform }}"></i>
                  </a>
                {% endif %}
              {% endfor %}
            </div>
          {% endif %}
        </div>
      {% endcase %}
    {% endfor %}
</div>

{%- comment -%} Footer Bottom Section for Copyright and Policies {%- endcomment -%}
<div class="footer-bottom">
  <div class="footer-bottom-content">
    {% if section.settings.footer_copyright != blank %}
      <div class="footer-copyright">
        {{ section.settings.footer_copyright }}
      </div>
    {% endif %}
    
    <div class="footer-policies">
      {% if section.settings.privacy_policy_text != blank and section.settings.privacy_policy_url != blank and section.settings.privacy_policy_url != "/" %}
        <a href="{{ section.settings.privacy_policy_url }}">{{ section.settings.privacy_policy_text }}</a>
      {% endif %}
      {% if section.settings.terms_service_text != blank and section.settings.terms_service_url != blank and section.settings.terms_service_url != "/" %}
        <a href="{{ section.settings.terms_service_url }}">{{ section.settings.terms_service_text }}</a>
      {% endif %}
      {% if section.settings.cookie_policy_text != blank and section.settings.cookie_policy_url != blank and section.settings.cookie_policy_url != "/" %}
        <a href="{{ section.settings.cookie_policy_url }}">{{ section.settings.cookie_policy_text }}</a>
      {% endif %}
    </div>
  </div>
</div>`;

              gridContainer.html(footerWrapper);
            }
          } else {
            const firstElementHtml = $.html($(elements[0]));
            const blockHtml = formatBlockHtml(firstElementHtml);

            const wrapper = `
{%- comment -%} ${pattern.name} Blocks {%- endcomment -%}
{% for block in section.blocks %}
  {% case block.type %}
    {% when '${blockType}' %}
${blockHtml}
    {% endcase %}
{% endfor %}`;

            $(elements[0]).replaceWith(wrapper);
            elements.slice(1).each((index, el) => {
              $(el).remove();
            });
          }
        } else {
          const firstElementHtml = $.html($(elements[0]));
          const blockHtml = formatBlockHtml(firstElementHtml);

          const wrapper = `
{%- comment -%} ${pattern.name} Blocks {%- endcomment -%}
{% for block in section.blocks %}
  {% case block.type %}
    {% when '${blockType}' %}
${blockHtml}
    {% endcase %}
{% endfor %}`;

          $(elements[0]).replaceWith(wrapper);
          elements.slice(1).each((index, el) => {
            $(el).remove();
          });
        }
      }
    }
  });

  let settingCounter = 1;

  const sectionGroups = {
    content: { label: "Content Settings", settings: [] },
    layout: { label: "Layout & Spacing", settings: [] },
    styling: { label: "Colors & Styling", settings: [] },
    advanced: { label: "Advanced Settings", settings: [] },
  };

  const processedHeaderElements = new Set();

  uniqueBlockPatterns.forEach((pattern) => {
    if (pattern.type === "header" && pattern.elements) {
      pattern.elements.each((index, element) => {
        processedHeaderElements.add(element);
      });
    }
  });
  $(
    "header h1, header h2, header h3, nav h1, nav h2, nav h3, .navbar h1, .navbar h2, .navbar h3, .logo-text, .brand-text, .site-title"
  ).each((i, el) => {
    const text = $(el).text().trim() || "";

    const isInsideProcessedHeaderBlock = $(el)
      .closest("header, nav, .navbar")
      .get()
      .some((headerEl) => processedHeaderElements.has(headerEl));

    if (text && !text.includes("{{") && !isInsideProcessedHeaderBlock) {
      const settingId = `header_title_${settingCounter++}`;

      sectionGroups.content.settings.push({
        type: "text",
        id: settingId,
        label: `Header Title: ${text.substring(0, 30)}${
          text.length > 30 ? "..." : ""
        }`,
        default: text,
        info: "Header/brand title text",
      });

      $(el).text(`{{ section.settings.${settingId} }}`);
    }
  });

  $("header a, nav a, .navbar a, .nav-link").each((i, el) => {
    const text = $(el).text().trim() || "";
    const href = $(el).attr("href") || "";
    const isLogo =
      $(el).find("img").length > 0 || $(el).closest(".logo, .brand").length > 0;

    const isInsideProcessedHeaderBlock = $(el)
      .closest("header, nav, .navbar")
      .get()
      .some((headerEl) => processedHeaderElements.has(headerEl));

    if (
      text &&
      !text.includes("{{") &&
      !isLogo &&
      href &&
      href !== "#" &&
      href.trim() !== "" &&
      !isInsideProcessedHeaderBlock
    ) {
      const textSettingId = `nav_link_text_${settingCounter}`;
      const urlSettingId = `nav_link_url_${settingCounter++}`;

      sectionGroups.content.settings.push({
        type: "text",
        id: textSettingId,
        label: truncateLabel(`Navigation: ${text}`),
        default: validateSettingDefault(text, "text", "Navigation"),
        info: "Navigation link text",
      });

      sectionGroups.content.settings.push({
        type: "url",
        id: urlSettingId,
        label: truncateLabel(`Navigation URL: ${text}`),
        default: "/",
        info: "Navigation link destination",
      });

      $(el).text(`{{ section.settings.${textSettingId} }}`);
      $(el).attr("href", `{{ section.settings.${urlSettingId} }}`);
    }
  });

  $("h1, h2, h3, h4, h5, h6").each((i, el) => {
    const text = $(el).text().trim() || "";
    const isInsideBlock =
      $(el).closest(
        ".feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer"
      ).length > 0;
    const isInHeader =
      $(el).closest("header, nav, .navbar, .logo, .brand").length > 0 ||
      $(el).hasClass("logo-text") ||
      $(el).hasClass("brand-text") ||
      $(el).hasClass("site-title");

    if (text && !text.includes("{{") && !isInsideBlock && !isInHeader) {
      const tagName = el.tagName.toLowerCase();
      const settingId = `section_${tagName}_${settingCounter++}`;

      sectionGroups.content.settings.push({
        type: "text",
        id: settingId,
        label: `Section ${tagName.toUpperCase()}: ${text.substring(0, 40)}${
          text.length > 40 ? "..." : ""
        }`,
        default: text,
        info: "Main section heading",
      });

      $(el).text(`{{ section.settings.${settingId} }}`);
    }
  });

  $("p").each((i, el) => {
    const text = $(el).text().trim() || "";
    const isInsideBlock =
      $(el).closest(
        ".feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer"
      ).length > 0;
    
    const hasTextCenter = $(el).hasClass('text-center') || 
                         $(el).attr('class')?.includes('text-center');

    if (text && text.length > 10 && !text.includes("{{") && !isInsideBlock) {
      const settingId = `section_text_${settingCounter++}`;

      sectionGroups.content.settings.push({
        type: "richtext", 
        id: settingId,
        label: `Section Text: ${text.substring(0, 40)}${
          text.length > 40 ? "..." : ""
        }`,
        // Always use formatAsRichtext to ensure proper Shopify richtext format
        default: formatAsRichtext(text),
        info: "Section description with rich formatting",
      });

      // For centered paragraphs, replace the entire paragraph with the liquid variable
      // This prevents nested <p> tags since formatAsRichtext already provides <p> tags
      if (hasTextCenter) {
        // Get the existing classes for the wrapper div
        const existingClasses = $(el).attr('class') || '';
        $(el).replaceWith(`<div class="${existingClasses}">{{ section.settings.${settingId} }}</div>`);
      } else {
        $(el).html(`{{ section.settings.${settingId} }}`);
      }
    }
  });

  $("a, button, .btn, .button").each((i, el) => {
    const text = $(el).text().trim() || "";
    const href = $(el).attr("href") || "";
    const isInsideBlock =
      $(el).closest(
        ".feature, .card, .product, .product-card, .testimonial, .team-member, .team, .team-card, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer"
      ).length > 0;
    const isInHeader =
      $(el).closest("header, nav, .navbar").length > 0 ||
      $(el).hasClass("nav-link");
    const isLogoLink =
      $(el).find("img").length > 0 || $(el).closest(".logo, .brand").length > 0;

    if (
      text &&
      !text.includes("{{") &&
      !href.includes("{{") &&
      !isInsideBlock &&
      !isInHeader &&
      !isLogoLink
    ) {
      const textSettingId = `section_button_text_${settingCounter++}`;

      sectionGroups.content.settings.push({
        type: "text",
        id: textSettingId,
        label: truncateLabel(`Button: ${text}`),
        default: validateSettingDefault(text, "text", "Button"),
      });

      if (href && href !== "#" && href.trim() !== "") {
        const urlSettingId = `section_button_url_${settingCounter++}`;

        const safeDefault = "/";

        sectionGroups.content.settings.push({
          type: "url",
          id: urlSettingId,
          label: truncateLabel(`Button URL: ${text}`),
          default: safeDefault,
          info: "Button destination URL",
        });
        $(el).attr("href", `{{ section.settings.${urlSettingId} }}`);
      }

      $(el).text(`{{ section.settings.${textSettingId} }}`);
    }
  });

  $('[style*="background-image"]').each((i, el) => {
    const $el = $(el);
    const style = $el.attr("style") || "";

    if (style.includes("background-image")) {
      if ($el.hasClass("relative") && $el.find("h1").length > 0) {
        const newStyle = style.replace(/background-image:[^;]+;?/g, "");
        $el.attr("style", newStyle);
        $el.attr(
          "style",
          ($el.attr("style") || "") +
            " background-image: url({{ section.settings.hero_background_image | img_url: 'master' }});"
        );
      } else if (
        $el.find("h2").text().toLowerCase().includes("elevate") ||
        $el.find("h2").text().toLowerCase().includes("shop")
      ) {
        const newStyle = style.replace(/background-image:[^;]+;?/g, "");
        $el.attr("style", newStyle);
        $el.attr(
          "style",
          ($el.attr("style") || "") +
            " background-image: url({{ section.settings.shop_background_image | img_url: 'master' }});"
        );
      } else if ($el.hasClass("sustainability-slide")) {
        const newStyle = style.replace(/background-image:[^;]+;?/g, "");
        $el.attr("style", newStyle);
        $el.attr(
          "style",
          ($el.attr("style") || "") +
            " background-image: url({{ block.settings.background_image | img_url: 'master' }});"
        );
      }
    }
  });

  $("nav a, .navbar a").each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const href = $el.attr("href");
    const isLogo = $el.find("img").length > 0;
    const isInsideHeaderBlock =
      $el.closest("header, nav, .navbar").parent().find("header, nav, .navbar")
        .length > 0;

    if (!isLogo && text && href && i < 5 && !isInsideHeaderBlock) {
      $el.text(`{{ section.settings.nav_link_${i + 1}_text }}`);
      $el.attr("href", `{{ section.settings.nav_link_${i + 1}_url }}`);
    }
  });

  $("footer p").each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (
      text.includes("©") ||
      text.includes("copyright") ||
      text.includes("rights reserved")
    ) {
      $el.text("{{ section.settings.footer_copyright }}");
    }
  });

  $("footer a, .footer a").each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim().toLowerCase();
    const href = $el.attr("href") || "";

    if (text.includes("privacy") && !href.includes("{{")) {
      $el.text("{{ section.settings.privacy_policy_text }}");
      $el.attr("href", "{{ section.settings.privacy_policy_url }}");
    } else if (text.includes("terms") && !href.includes("{{")) {
      $el.text("{{ section.settings.terms_service_text }}");
      $el.attr("href", "{{ section.settings.terms_service_url }}");
    } else if (text.includes("cookie") && !href.includes("{{")) {
      $el.text("{{ section.settings.cookie_policy_text }}");
      $el.attr("href", "{{ section.settings.cookie_policy_url }}");
    }
  });

  let imageCounter = 1;

  $(
    'header img, nav img, .navbar img, .logo img, .brand img, img[alt*="logo"], img[src*="logo"], .header img'
  ).each((i, el) => {
    const src = $(el).attr("src") || "";
    const alt = $(el).attr("alt") || "";

    const isInsideProcessedHeaderBlock = $(el)
      .closest("header, nav, .navbar")
      .get()
      .some((headerEl) => processedHeaderElements.has(headerEl));

    if (src && !src.includes("{{") && !isInsideProcessedHeaderBlock) {
      const imgSettingId = `header_logo_${imageCounter}`;

      sectionGroups.content.settings.push({
        type: "image_picker",
        id: imgSettingId,
        label: `Header Logo ${imageCounter}`,
        info: "Upload header/logo image",
      });

      if (alt) {
        const altSettingId = `header_logo_alt_${imageCounter}`;
        sectionGroups.content.settings.push({
          type: "text",
          id: altSettingId,
          label: `Header Logo Alt Text ${imageCounter}`,
          default: alt,
          info: "Alt text for header/logo image",
        });
        $(el).attr("alt", `{{ section.settings.${altSettingId} }}`);
      }

      $(el).attr(
        "src",
        `{{ section.settings.${imgSettingId} | img_url: 'master' }}`
      );
      imageCounter++;
    }
  });

  $("img").each((i, el) => {
    const src = $(el).attr("src") || "";
    const alt = $(el).attr("alt") || "";
    const isInsideBlock =
      $(el).closest(
        ".feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer"
      ).length > 0;
    const isHeaderImage =
      $(el).closest("header, nav, .navbar, .logo, .brand, .header").length >
        0 ||
      ($(el).attr("alt") && $(el).attr("alt").toLowerCase().includes("logo")) ||
      ($(el).attr("src") && $(el).attr("src").toLowerCase().includes("logo"));

    if (src && !src.includes("{{") && !isInsideBlock && !isHeaderImage) {
      const imgSettingId = `section_image_${imageCounter}`;

      sectionGroups.content.settings.push({
        type: "image_picker",
        id: imgSettingId,
        label: `Section Image ${imageCounter}`,
        info: "Upload section image",
      });

      if (alt) {
        const altSettingId = `section_image_alt_${imageCounter}`;
        sectionGroups.content.settings.push({
          type: "text",
          id: altSettingId,
          label: `Image Alt Text ${imageCounter}`,
          default: alt,
          info: "Alternative text for accessibility",
        });
        $(el).attr("alt", `{{ section.settings.${altSettingId} }}`);
      }

      $(el).attr(
        "src",
        `{{ section.settings.${imgSettingId} | img_url: 'master' }}`
      );
      imageCounter++;
    }
  });

  sectionGroups.content.settings.push({
    type: "image_picker",
    id: "hero_background_image",
    label: "Hero Background Image",
    info: "Upload hero section background image",
  });

  sectionGroups.content.settings.push({
    type: "image_picker",
    id: "shop_background_image",
    label: "Shop Section Background Image",
    info: "Upload shop section background image",
  });

  const actualNavLinks = [];
  $("header a, nav a, .navbar a, .nav-link").each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const href = $el.attr("href") || "";
    const isLogo =
      $el.find("img").length > 0 || $el.closest(".logo, .brand").length > 0;

    const isInsideProcessedHeaderBlock = $el
      .closest("header, nav, .navbar")
      .get()
      .some((headerEl) => processedHeaderElements.has(headerEl));

    if (
      text &&
      !text.includes("{{") &&
      !isLogo &&
      href &&
      i < 5 &&
      !isInsideProcessedHeaderBlock
    ) {
      actualNavLinks.push({
        text: text,
        href: href,
      });
    }
  });

  actualNavLinks.forEach((link, index) => {
    sectionGroups.content.settings.push({
      type: "text",
      id: `nav_link_${index + 1}_text`,
      label: `Navigation Link: ${link.text}`,
      default: link.text,
      info: `Navigation link ${index + 1} text`,
    });

    sectionGroups.content.settings.push({
      type: "url",
      id: `nav_link_${index + 1}_url`,
      label: `Navigation URL: ${link.text}`,
      default: link.href !== "#" ? link.href : "/",
      info: `Navigation link ${index + 1} URL`,
    });
  });

  sectionGroups.content.settings.push({
    type: "text",
    id: "footer_copyright",
    label: "Footer Copyright Text",
    default: "© 2025 Mäertin. All rights reserved.",
    info: "Footer copyright text",
  });

  sectionGroups.content.settings.push({
    type: "text",
    id: "privacy_policy_text",
    label: "Privacy Policy Link Text",
    default: "Privacy Policy",
    info: "Text for privacy policy link",
  });

  sectionGroups.content.settings.push({
    type: "url",
    id: "privacy_policy_url",
    label: "Privacy Policy URL",
    default: "/",
    info: "URL for privacy policy page",
  });

  sectionGroups.content.settings.push({
    type: "text",
    id: "terms_service_text",
    label: "Terms of Service Link Text",
    default: "Terms of Service",
    info: "Text for terms of service link",
  });

  sectionGroups.content.settings.push({
    type: "url",
    id: "terms_service_url",
    label: "Terms of Service URL",
    default: "/",
    info: "URL for terms of service page",
  });

  sectionGroups.content.settings.push({
    type: "text",
    id: "cookie_policy_text",
    label: "Cookie Policy Link Text",
    default: "Cookie Policy",
    info: "Text for cookie policy link",
  });

  sectionGroups.content.settings.push({
    type: "url",
    id: "cookie_policy_url",
    label: "Cookie Policy URL",
    default: "/",
    info: "URL for cookie policy page",
  });

  sectionGroups.styling.settings.push(
    {
      type: "checkbox",
      id: "use_custom_background",
      label: "Override Background Color",
      default: false,
      info: "Enable to override original background color",
    },
    {
      type: "color",
      id: "background_color",
      label: "Background Color",
      default: "#ffffff",
      info: "Section background color (only applied if override is enabled)",
    },
    {
      type: "checkbox",
      id: "use_custom_text_color",
      label: "Override Text Color",
      default: false,
      info: "Enable to override original text color",
    },
    {
      type: "color",
      id: "text_color",
      label: "Text Color",
      default: "#000000",
      info: "Main text color (only applied if override is enabled)",
    }
  );

  const allSettings = [
    ...sectionGroups.content.settings,
    ...sectionGroups.layout.settings,
    ...sectionGroups.styling.settings,
  ];

  if (featuredProductInfo.hasProducts) {
    allSettings.push(...featuredProductInfo.schemaSettings);
    console.log(
      `📝 Added ${featuredProductInfo.schemaSettings.length} featured product settings to schema`
    );
  }

  let liquidBody = $("body").html() || $(":root").html() || "";

  return {
    settings: allSettings,
    blocks,
    liquidBody: formatProfessionalLiquid(liquidBody),
    jsonBlocks,
    jsonBlockOrder,
    sectionGroups,
    extractedJS: extractedJS || "",
    pageType: pageType,
    templateStructure: pageType
      ? generateTemplateStructure(pageType, fileName)
      : null,
    featuredProducts: featuredProductInfo.hasProducts
      ? {
          hasProducts: true,
          count: featuredProductInfo.replacements,
          products: featuredProductInfo.extractedData,
          summary: featuredProductInfo.summary,
        }
      : { hasProducts: false },
  };
}

/**
 * Formats block HTML with proper indentation and Liquid variable replacement
 */
function formatBlockHtml(html) {
  if (!html) return "";

  return html
    .replace(
      /LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER/g,
      "{{ block.settings.image | img_url: 'master' }}"
    )
    .replace(
      /LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER/g,
      "{{ block.settings.image_alt }}"
    )
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => "      " + line)
    .join("\n");
}

/**
 * Professional Liquid HTML formatting with exact preservation and proper replacements
 */
function formatProfessionalLiquid(html) {
  if (!html) return "";

  return html
    .replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, liquid) => {
      const decoded = liquid
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .trim();
      return `{{ ${decoded} }}`;
    })
    .replace(/\{\%-?\s*([^%]+?)\s*-?\%\}/g, (match, liquid) => {
      const decoded = liquid
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .trim();
      return match.includes("-") ? `{%- ${decoded} -%}` : `{% ${decoded} %}`;
    })
    .replace(
      /LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER/g,
      "{{ block.settings.image | img_url: 'master' }}"
    )
    .replace(
      /LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER/g,
      "{{ block.settings.image_alt }}"
    )
    .replace(/>\s*</g, ">\n<")
    .replace(/\{\%-?\s*comment\s*-?\%\}/g, "\n{%- comment -%}")
    .replace(/\{\%-?\s*endcomment\s*-?\%\}/g, "{%- endcomment -%}\n")
    .replace(/\{\%\s*for\s/g, "\n{% for ")
    .replace(/\{\%\s*case\s/g, "\n  {% case ")
    .replace(/\{\%\s*when\s/g, "\n    {% when ")
    .replace(/\{\%\s*endcase\s*\%\}/g, "\n  {% endcase %}")
    .replace(/\{\%\s*endfor\s*\%\}/g, "\n{% endfor %}")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

/**
 * Generates professional Shopify Liquid template following client requirements
 */
export function generateLiquidTemplate(html, fileName) {
  if (!html || typeof html !== "string") {
    throw new Error("Invalid HTML input: HTML must be a non-empty string");
  }

  if (!fileName || typeof fileName !== "string") {
    throw new Error(
      "Invalid fileName input: fileName must be a non-empty string"
    );
  }

  const pageType = detectPageType(html, fileName);
  const templateStructure = generateTemplateStructure(pageType, fileName);

  const normalizedFileName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");

  const headContent = extractHeadContent(html);
  const css = extractCSS(html);
  const {
    settings,
    blocks,
    liquidBody,
    jsonBlocks,
    jsonBlockOrder,
    extractedJS,
    featuredProducts,
  } = convertHtmlToLiquid(html, fileName, pageType);
  const js = extractedJS;

  function sanitizeSchemaSettings(settings) {
    return settings.map((setting) => {
      if (setting.type === "url" && setting.default !== undefined) {
        const sanitizedDefault = validateSettingDefault(
          setting.default,
          "url",
          "/"
        );
        return {
          ...setting,
          default:
            typeof sanitizedDefault === "string" ? sanitizedDefault : "/",
        };
      }
      return setting;
    });
  }

  function sanitizeBlocks(blocks) {
    return blocks.map((block) => ({
      ...block,
      settings: block.settings ? sanitizeSchemaSettings(block.settings) : [],
    }));
  }

  let finalSettings = sanitizeSchemaSettings(settings);

  if (
    featuredProducts &&
    featuredProducts.hasProducts &&
    featuredProducts.count > 0
  ) {
    const hasFeaturedProductSettings = finalSettings.some(
      (setting) => setting.id && setting.id.startsWith("featured_product_")
    );

    if (!hasFeaturedProductSettings) {
      console.log(
        `🎯 Adding ${featuredProducts.count} featured product settings to schema`
      );
      finalSettings = addFeaturedProductSettings(
        finalSettings,
        featuredProducts.count
      );
    } else {
      console.log(
        `✅ Featured product settings already exist in schema, skipping duplicate addition`
      );
    }
  }

  const sanitizedBlocks = sanitizeBlocks(blocks);

  const schema = {
    name: fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    tag: "section",
    class: normalizedFileName,
    blocks: sanitizedBlocks,
    settings: finalSettings,
    presets: [
      {
        name: "Default",
        settings: finalSettings.reduce((acc, setting) => {
          if (setting.default !== undefined) {
            acc[setting.id] = setting.default;
          }
          return acc;
        }, {}),
        blocks: Object.keys(jsonBlocks).map((blockId) => ({
          type: jsonBlocks[blockId].type,
          settings: jsonBlocks[blockId].settings,
        })),
      },
    ],
    enabled_on: {
      templates: ["*"],
    },
  };

  const liquidTemplate = `{%- comment -%}
  Section: ${fileName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}
  
  Shopify Section Settings:
  • ${settings.length} section settings
  • ${blocks.length} block types
  • Fully responsive design
  • Theme editor compatible
  • Professional conversion by HTML-to-Liquid Converter
  
  Updates Applied:
  • Fixed {% javascript %} tags to use standard <script> tags
  • Improved footer CSS scoping for better Shopify compatibility
  • Made policy links (Privacy, Terms, Cookies) editable
  • Limited footer column blocks to 2 samples to reduce bloat
  • Ensured consistent Font Awesome version (6.5.1)
{%- endcomment -%}

{%- comment -%} Section Variables {%- endcomment -%}
{%- liquid
  assign section_id = section.id
  assign use_custom_bg = section.settings.use_custom_background | default: false
  assign custom_bg_color = section.settings.background_color | default: '#ffffff'
  assign use_custom_text = section.settings.use_custom_text_color | default: false
  assign custom_text_color = section.settings.text_color | default: '#000000'
-%}

{%- comment -%} Section Content - Preserving Original HTML Structure {%- endcomment -%}
<div 
  id="{{ section_id }}" 
  class="${normalizedFileName}-section"
  {% if use_custom_bg %}style="background-color: {{ custom_bg_color }};"{% endif %}
>
  <div class="${normalizedFileName}-content"{% if use_custom_text %} style="color: {{ custom_text_color }};"{% endif %}>
${liquidBody}
  </div>
</div>

{%- comment -%} Section Schema {%- endcomment -%}
{% schema %}
${JSON.stringify(schema, null, 2)}
{% endschema %}

{%- comment -%} Section Styles {%- endcomment -%}
{% stylesheet %}
/* ORIGINAL HTML STYLES - PRESERVED EXACTLY */
${css}

/* Minimal section wrapper - no interference with original layout */
.${normalizedFileName}-section {
  /* Transparent wrapper - preserves all original styling */
}

.${normalizedFileName}-content {
  /* No additional styling - maintain original HTML layout exactly */
}

/* Enhanced Button Spacing - Fix for "Elevate your hair journey" section */
.${normalizedFileName}-content .btn,
.${normalizedFileName}-content .button,
.${normalizedFileName}-content a[class*="btn"] {
  margin-top: 1.5rem !important;
  margin-bottom: 1rem !important;
  display: inline-block;
}

/* Centered Text Sections - Fix for nested paragraph issues */
.${normalizedFileName}-content .text-center.mb-10.max-w-2xl.mx-auto,
.${normalizedFileName}-content div.text-center.mb-10.max-w-2xl.mx-auto {
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.${normalizedFileName}-content .text-center.mb-10.max-w-2xl.mx-auto > p:first-child,
.${normalizedFileName}-content div.text-center.mb-10.max-w-2xl.mx-auto > p:first-child {
  margin-top: 0;
}

.${normalizedFileName}-content .text-center.mb-10.max-w-2xl.mx-auto > p:last-child,
.${normalizedFileName}-content div.text-center.mb-10.max-w-2xl.mx-auto > p:last-child {
  margin-bottom: 0;
}

/* Additional centered text wrapper support */
.${normalizedFileName}-content div[class*="text-center"] > p {
  text-align: inherit;
  margin-bottom: inherit;
}

/* FAQ Enhancements - Match FAQ-Example.html structure */
.faq-item {
  border-bottom: 1px solid rgba(161, 63, 79, 0.3);
  overflow: hidden;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 500;
  transition: all 0.3s ease;
  user-select: none;
}

.faq-question:hover {
  background-color: rgba(106, 26, 35, 0.1);
}

.faq-question i {
  transition: transform 0.3s ease, color 0.3s ease;
  font-size: 1rem;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;
  padding: 0 1rem;
}

.faq-answer p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.faq-item.active .faq-question i {
  transform: rotate(45deg);
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding: 0 1rem 1.5rem 1rem;
}

/* Additional FAQ styling for better compatibility */
.faq-question-clickable {
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.faq-answer-content {
  transition: all 0.3s ease;
  overflow: hidden;
}

/* Footer Layout Fixes */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  padding: 1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  margin-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-size: 0.875rem;
  opacity: 0.8;
}

.footer-policies {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-policies a {
  font-size: 0.875rem;
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-policies a:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-policies {
    justify-content: center;
  }
}
{% endstylesheet %}

{%- comment -%} Section Scripts {%- endcomment -%}
<script>
// Original JavaScript from HTML
${js}

// FAQ Toggle Functionality - Enhanced for FAQ-Example.html structure
function toggleFAQ(element) {
  const faqItem = element.closest('.faq-item');
  if (!faqItem) return;
  
  const isActive = faqItem.classList.contains('active');
  
  const allFaqItems = document.querySelectorAll('.faq-item');
  allFaqItems.forEach(item => {
    item.classList.remove('active');
  });
  
  if (!isActive) {
    faqItem.classList.add('active');
  }
  
  allFaqItems.forEach(item => {
    const icon = item.querySelector('.faq-question i');
    if (icon) {
      if (item.classList.contains('active')) {
        icon.className = 'fas fa-minus';
      } else {
        icon.className = 'fas fa-plus';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const section = document.getElementById('{{ section.id }}');
  if (section) {
    if (typeof window.initCustomScripts === 'function') {
      window.initCustomScripts(section);
    }
    
    const faqQuestions = section.querySelectorAll('.faq-question-clickable');
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        toggleFAQ(this);
      });
    });
  }
});

document.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId === '{{ section.id }}') {
    const section = document.getElementById('{{ section.id }}');
    if (section && typeof window.initCustomScripts === 'function') {
      window.initCustomScripts(section);
    }
    
    const faqQuestions = section.querySelectorAll('.faq-question-clickable');
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        toggleFAQ(this);
      });
    });
  }
});
</script>`;

  function sanitizeJsonBlocks(jsonBlocks) {
    const sanitized = {};
    Object.keys(jsonBlocks).forEach((blockId) => {
      const block = jsonBlocks[blockId];
      sanitized[blockId] = {
        ...block,
        settings: block.settings
          ? sanitizeJsonBlockSettings(block.settings)
          : {},
      };
    });
    return sanitized;
  }

  function sanitizeJsonBlockSettings(settings) {
    const sanitized = {};
    Object.keys(settings).forEach((key) => {
      const value = settings[key];
      if (key.includes("url") && typeof value !== "string") {
        sanitized[key] = "/";
      } else {
        sanitized[key] = value;
      }
    });
    return sanitized;
  }

  const sanitizedJsonBlocks = sanitizeJsonBlocks(jsonBlocks);

  const pageTemplate = {
    sections: {
      main: {
        type: normalizedFileName,
        blocks: sanitizedJsonBlocks,
        block_order: jsonBlockOrder,
        settings: finalSettings.reduce((acc, setting) => {
          if (setting.default !== undefined) {
            acc[setting.id] = setting.default;
          }
          return acc;
        }, {}),
      },
    },
    order: ["main"],
  };

  return {
    liquidContent: liquidTemplate,
    jsonTemplate: JSON.stringify(pageTemplate, null, 2),
    pageTemplate: `page.${normalizedFileName}.json`,
    headContent: headContent.join("\n"),
    schema: schema,
    css: css,
    javascript: js,
    sectionFileName: `${normalizedFileName}.liquid`,
    isStandalonePage: true,
    featuredProducts: featuredProducts || { hasProducts: false },
  };
}

/**
 * Processes multiple HTML files and combines head content
 */
export function processMultipleFiles(files) {
  const results = [];
  const allHeadContent = new Set();

  files.forEach((file, index) => {
    const result = generateLiquidTemplate(file.content, file.name);
    results.push({
      ...result,
      originalName: file.name,
      index: index,
    });

    if (result.headContent) {
      result.headContent.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) {
          allHeadContent.add(trimmed);
        }
      });
    }
  });

  const combinedHead = Array.from(allHeadContent).join("\n");

  return {
    files: results,
    combinedHeadContent: combinedHead,
  };
}

/**
 * Formats text as inline content for use within existing HTML elements  
 * Does not wrap in paragraph tags - for inline usage
 */
function formatAsInlineText(text) {
  if (!text || typeof text !== "string") return "";

  const cleanText = text.trim();
  if (cleanText.length === 0) return "";

  // If text contains newlines, join with <br> tags
  if (cleanText.includes("\n")) {
    const lines = cleanText
      .split("\n")
      .filter((line) => line.trim().length > 0);
    return lines.join("<br>");
  }

  return cleanText;
}

/**
 * Formats text as valid Shopify richtext HTML - EXACT preservation
 * Maintains original formatting without unnecessary paragraph wrapping
 */
function formatAsRichtext(text) {
  if (!text || typeof text !== "string") return "<p></p>";

  if (
    text.trim().startsWith("<") &&
    (text.includes("<p>") ||
      text.includes("<h1>") ||
      text.includes("<h2>") ||
      text.includes("<h3>") ||
      text.includes("<h4>") ||
      text.includes("<h5>") ||
      text.includes("<h6>") ||
      text.includes("<ul>") ||
      text.includes("<ol>") ||
      text.includes("<div>") ||
      text.includes("<span>"))
  ) {
    return text.trim();
  }

  const cleanText = text.trim();
  if (cleanText.length === 0) return "<p></p>";

  if (cleanText.includes("\n")) {
    const paragraphs = cleanText
      .split(/\n\s*\n/)
      .filter((para) => para.trim().length > 0);
    if (paragraphs.length > 1) {
      return paragraphs
        .map((para) => {
          const lines = para
            .trim()
            .split("\n")
            .filter((line) => line.trim().length > 0);
          if (lines.length === 1) {
            return `<p>${lines[0].trim()}</p>`;
          } else {
            return `<p>${lines.join("<br>")}</p>`;
          }
        })
        .join("");
    } else {
      const lines = cleanText
        .split("\n")
        .filter((line) => line.trim().length > 0);
      if (lines.length > 1) {
        return `<p>${lines.join("<br>")}</p>`;
      }
    }
  }

  return `<p>${cleanText}</p>`;
}



================================================
FILE: src/utils/downloadHelper.js
================================================
/**
 * Simple and reliable download utility
 * Fixes download issues with cross-browser compatibility
 */

/**
 * Creates a simple, reliable download
 * @param {string} content - File content to download  
 * @param {string} filename - Name of the file
 * @param {string} contentType - MIME type of the content
 * @returns {boolean} - Success status
 */
export function createSimpleDownload(content, filename, contentType = 'text/plain') {
    try {
        if (!content) {
            throw new Error('No content provided for download');
        }

        const contentString = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

        const blob = new Blob([contentString], {
            type: contentType + ';charset=utf-8'
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
            URL.revokeObjectURL(url);
        }, 100);

        return true;

    } catch (error) {
        console.error('Download failed:', error);

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(content).then(() => {
                    alert(`❌ Download failed, but content copied to clipboard!\n\n📝 Instructions:\n1. Open a text editor\n2. Paste the content (Ctrl+V)\n3. Save as "${filename}"\n\nError: ${error.message}`);
                });
                return true;
            }
        } catch (clipboardError) {
            console.error('Clipboard fallback also failed:', clipboardError);
        }

        alert(`❌ Download failed!\n\n📝 Manual Instructions:\n1. Copy the content from the code viewer\n2. Open a text editor\n3. Paste the content\n4. Save as "${filename}"\n\nError: ${error.message}`);

        return false;
    }
}

/**
 * Download multiple files as a zip using JSZip
 * @param {Array} files - Array of file objects with {name, content, type}
 * @param {string} zipName - Name of the zip file
 * @returns {boolean} - Success status
 */
export async function downloadAsZip(files, zipName = 'shopify-files.zip') {
    try {
        if (typeof JSZip === 'undefined') {
            throw new Error('JSZip library not available');
        }

        const zip = new JSZip();

        files.forEach(file => {
            if (file.content && file.name) {
                zip.file(file.name, file.content);
            }
        });

        const zipBlob = await zip.generateAsync({ type: 'blob' });

        return createSimpleDownload(zipBlob, zipName, 'application/zip');

    } catch (error) {
        console.error('Zip download failed:', error);
        return false;
    }
}

/**
 * Download single file with better error handling
 * @param {Object} fileData - File data object
 * @param {string} type - Type of file (liquid, json, theme)
 * @returns {boolean} - Success status
 */
export function downloadSingleFile(fileData, type = 'liquid') {
    try {
        let content, filename, contentType;

        switch (type) {
            case 'liquid':
                content = fileData.liquidContent;
                filename = fileData.fileNames?.liquidFileName ||
                    fileData.metadata?.liquidFileName ||
                    'section.liquid';
                contentType = 'text/plain';
                break;

            case 'json':
                content = fileData.jsonTemplate;
                filename = fileData.fileNames?.jsonFileName ||
                    fileData.metadata?.jsonFileName ||
                    'template.json';
                contentType = 'application/json';
                break;

            case 'theme':
                content = fileData.themeContent || fileData.headContent;
                filename = 'theme.liquid';
                contentType = 'text/plain';
                break;

            default:
                throw new Error(`Unknown file type: ${type}`);
        }

        if (!content) {
            throw new Error(`No ${type} content available for download`);
        }

        return createSimpleDownload(content, filename, contentType);

    } catch (error) {
        console.error(`Error downloading ${type} file:`, error);
        return false;
    }
}



================================================
FILE: src/utils/featuredProductReplacer.js
================================================
/**
 * Featured Product Replacement System
 * Replaces static HTML products with dynamic Shopify featured products
 */

import * as cheerio from "cheerio";

/**
 * Detects and identifies product elements in HTML
 */
function detectProductElements($) {
  const productElements = [];

  const productSelectors = [
    ".product:not(header .product):not(nav .product)",
    ".product-card:not(header .product-card):not(nav .product-card)",
    ".product-item:not(header .product-item):not(nav .product-item)",
    "section .product",
    "main .product",
    'div[class*="product"]:not(header div[class*="product"]):not(nav div[class*="product"])',
  ];

  productSelectors.forEach((selector) => {
    try {
      $(selector).each((i, el) => {
        const $el = $(el);

        if ($el.hasClass("featured-product-processed")) return;

        if ($el.closest("header, nav, .navbar, .navigation").length > 0) return;

        if (
          $el.hasClass("navbar") ||
          $el.hasClass("navigation") ||
          $el.hasClass("header")
        )
          return;

        const hasImage = $el.find("img").length > 0;
        const hasTitle =
          $el.find(
            'h1, h2, h3, h4, h5, h6, .title, .name, [class*="title"], [class*="name"]'
          ).length > 0;
        const hasPrice =
          $el.find(
            '[class*="price"], .cost, .amount, [class*="cost"], [class*="amount"]'
          ).length > 0 || $el.text().match(/\$\d+|\d+\.\d+|\d+,\d+/);
        const hasButton =
          $el.find(
            'button, .btn, .button, a[class*="btn"], a[class*="buy"], a[class*="shop"]'
          ).length > 0;

        const hasRating =
          $el.find('[class*="star"], .rating, [class*="rating"]').length > 0;
        const hasDescription =
          $el.find('p, .description, [class*="desc"]').length > 0;

        let confidence = 0;
        if (hasImage) confidence += 30;
        if (hasTitle) confidence += 25;
        if (hasPrice) confidence += 25;
        if (hasButton) confidence += 20;
        if (hasRating) confidence += 15;
        if (hasDescription) confidence += 10;

        const text = $el.text().toLowerCase();
        if (
          text.includes("view details") ||
          text.includes("add to cart") ||
          text.includes("buy now")
        )
          confidence += 15;
        if (
          text.includes("sale") ||
          text.includes("discount") ||
          text.includes("off")
        )
          confidence += 10;
        if (
          text.includes("product") ||
          text.includes("treatment") ||
          text.includes("serum")
        )
          confidence += 10;

        if (
          $el
            .closest("section")
            .find("h2, h3")
            .text()
            .toLowerCase()
            .includes("product")
        )
          confidence += 20;
        if (
          $el
            .closest("section")
            .find("h2, h3")
            .text()
            .toLowerCase()
            .includes("treatment")
        )
          confidence += 20;

        if (
          confidence >= 40 &&
          hasImage &&
          hasTitle &&
          (hasPrice || hasButton)
        ) {
          productElements.push({
            element: $el,
            confidence: confidence,
            hasImage,
            hasTitle,
            hasPrice,
            hasButton,
            hasRating,
            hasDescription,
            selector: selector,
          });

          $el.addClass("featured-product-processed");
        }
      });
    } catch (e) {}
  });

  $("div.grid, .grid-cols-1, .grid-cols-2, .grid-cols-3, .product-grid").each(
    (i, gridEl) => {
      const $grid = $(gridEl);

      if ($grid.closest("header, nav, .navbar").length > 0) return;

      const productItems = $grid.children("div").filter((j, itemEl) => {
        const $item = $(itemEl);
        if ($item.hasClass("featured-product-processed")) return false;

        const hasImage = $item.find("img").length > 0;
        const hasTitle = $item.find("h1, h2, h3, h4, h5, h6").length > 0;
        const hasPrice =
          $item.text().match(/\$\d+/) ||
          $item.find('[class*="price"]').length > 0;
        const hasButton =
          $item.find('button, .btn, a[class*="btn"]').length > 0;

        return hasImage && hasTitle && (hasPrice || hasButton);
      });

      if (productItems.length >= 2) {
        productItems.each((j, itemEl) => {
          const $item = $(itemEl);
          if (!$item.hasClass("featured-product-processed")) {
            const hasImage = $item.find("img").length > 0;
            const hasTitle = $item.find("h1, h2, h3, h4, h5, h6").length > 0;
            const hasPrice =
              $item.text().match(/\$\d+/) ||
              $item.find('[class*="price"]').length > 0;
            const hasButton =
              $item.find('button, .btn, a[class*="btn"]').length > 0;
            const hasRating = $item.find('[class*="star"]').length > 0;

            let confidence = 70;
            if (hasImage) confidence += 10;
            if (hasTitle) confidence += 10;
            if (hasPrice) confidence += 10;
            if (hasButton) confidence += 10;
            if (hasRating) confidence += 10;

            productElements.push({
              element: $item,
              confidence: confidence,
              hasImage,
              hasTitle,
              hasPrice,
              hasButton,
              hasRating: hasRating,
              hasDescription: $item.find("p").length > 0,
              selector: "grid-product-item",
            });

            $item.addClass("featured-product-processed");
          }
        });
      }
    }
  );

  return productElements.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Extracts product data from HTML element
 */
function extractProductData($element) {
  const data = {};

  const titleEl = $element
    .find(
      'h1, h2, h3, h4, h5, h6, .title, .name, [class*="title"], [class*="name"]'
    )
    .first();
  data.title = titleEl.text().trim() || "Featured Product";

  const descEl = $element
    .find('p, .description, .desc, [class*="description"], [class*="desc"]')
    .first();
  data.description = descEl.html() || "<p>Product description</p>";

  const imgEl = $element.find("img").first();
  data.image_alt =
    imgEl.attr("alt") || titleEl.text().trim() || "Product image";

  const priceEl = $element
    .find(
      '[class*="price"], .cost, .amount, [class*="cost"], [class*="amount"]'
    )
    .first();
  let priceText = priceEl.text().trim();
  if (!priceText) {
    const priceMatch = $element.text().match(/\$\d+(?:\.\d{2})?/);
    priceText = priceMatch ? priceMatch[0] : "$0.00";
  }
  data.price = priceText;

  const buttonEl = $element
    .find(
      'button, .btn, .button, a[class*="btn"], a[class*="buy"], a[class*="shop"]'
    )
    .first();
  data.button_text = buttonEl.text().trim() || "View Product";
  data.button_url = buttonEl.attr("href") || "/";

  const ratingEl = $element.find(
    '.rating, [class*="rating"], .stars, [class*="star"]'
  );
  data.rating_count = ratingEl.length > 0 ? "(Reviews)" : "(New)";

  return data;
}

/**
 * Generates featured product Liquid template using real Shopify product structure
 * Creates a single, clean product grid without block loops to prevent duplication
 */
function generateFeaturedProductLiquid(originalData, index = 0) {
  return `
{%- comment -%} Featured Products Grid - Dynamic Shopify Products {%- endcomment -%}

{%- comment -%} Show "No Products" message if store is empty {%- endcomment -%}
{% if collections.all.products.size == 0 %}
  <div class="no-products-message text-center py-16">
    <div class="text-6xl mb-4">📦</div>
    <h3 class="text-3xl font-semibold mb-3 text-[#ffe0dc]">No Products Available</h3>
    <p class="text-[#d9bfc6] mb-6 max-w-md mx-auto">
      Add products to your Shopify store to display them here. Once you add products, they will automatically appear in this section.
    </p>
    <a href="/admin/products" class="inline-block px-6 py-3 rounded-md font-semibold transition-all duration-300"
       style="background: linear-gradient(90deg,#6a1a23 80%,#a13f4f 100%); color: #ffe0dc; border: 2px solid #6a1a23;">
      Add Products to Store
    </a>
  </div>
{% else %}
  <div class="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
    {%- comment -%} Loop through 6 featured product slots {%- endcomment -%}
    {% for i in (1..6) %}
      {%- liquid
        assign featured_product_setting = 'featured_product_' | append: i
        assign product = section.settings[featured_product_setting]
        assign should_show_product = false
        
        if product != blank
          assign should_show_product = true
        else
          assign available_products = collections.all.products | where: 'available'
          assign total_products = collections.all.products.size
          assign product_index = i | minus: 1
          
          if available_products.size > product_index
            assign product = available_products[product_index]
            assign should_show_product = true
          elsif total_products > product_index
            assign product = collections.all.products[product_index]
            assign should_show_product = true
          endif
        endif
      -%}

      {% if should_show_product and product and product != blank %}
        <div class="product-card bg-gradient-to-br from-[#2d1014] to-[#3d1017] border-2.5 border-[#512228] rounded-2xl overflow-hidden maroon-shadow"
             data-product-id="{{ product.id }}"
             data-product-url="{{ product.url }}">
          
          <div class="image-container relative">
            {% if product.featured_image %}
              <img src="{{ product.featured_image | img_url: 'master' }}" 
                   alt="{{ product.featured_image.alt | default: product.title }}" 
                   class="w-full h-64 object-cover shadow-2xl"
                   loading="lazy">
            {% elsif product.images.size > 0 %}
              <img src="{{ product.images.first | img_url: 'master' }}" 
                   alt="{{ product.images.first.alt | default: product.title }}" 
                   class="w-full h-64 object-cover shadow-2xl"
                   loading="lazy">
            {% else %}
              <div class="w-full h-64 bg-gradient-to-br from-[#3d1017] to-[#23080a] flex items-center justify-center">
                <span class="text-[#ffe0dc] font-semibold">{{ product.title | escape }}</span>
              </div>
            {% endif %}
            

          </div>
          
          <div class="product-info p-7">
            <div class="product-content">
              <h3 class="text-2xl font-semibold mb-2 text-[#ffe0dc]">
                {{ product.title | escape }}
              </h3>
              
              {% if product.description != blank and section.settings.show_product_description %}
                <p class="text-[#d9bfc6] mb-4">
                  {{ product.description | strip_html | truncatewords: section.settings.description_length | default: 15 }}
                </p>
              {% endif %}
            </div>
            
            <div class="product-footer">
              <div class="price mb-4">
                {% if product.compare_at_price > product.price %}
                  <span class="text-[#b08d98] line-through text-sm mr-2">{{ product.compare_at_price | money }}</span>
                  <span class="font-semibold text-[#ffe0dc]">{{ product.price | money }}</span>
                {% else %}
                  <span class="font-semibold text-[#ffe0dc]">{{ product.price | money }}</span>
                {% endif %}
              </div>
              
              {% if product.available %}
                <a href="{{ product.url }}" 
                   class="view-product-btn mt-4 block w-full rounded-lg text-center py-3 px-4 font-semibold transition-all duration-300 hover:opacity-90 hover:transform hover:scale-105"
                   style="background: linear-gradient(135deg, #6a1a23 0%, #a13f4f 100%); color: #ffe0dc; border: 2px solid #6a1a23; box-shadow: 0 4px 12px rgba(106, 26, 35, 0.3);">
                  {{ section.settings.button_text | default: 'View Product' }}
                </a>
              {% else %}
                <button class="sold-out-btn mt-4 block w-full rounded-lg text-center py-3 px-4 font-semibold" 
                        style="background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%); color: #ffe0dc; border: 2px solid #6c757d; box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);" 
                        disabled>
                  Sold Out
                </button>
              {% endif %}
            </div>
          </div>
        </div>
      {% endif %}
    {% endfor %}
  </div>
{% endif %}`;
}

/**
 * Generates schema settings for featured products (Shopify-standard)
 */
function generateFeaturedProductSchema(productCount) {
  const settings = [];

  settings.push({
    type: "header",
    content: "Featured Products",
  });

  settings.push({
    type: "paragraph",
    content:
      "Select products from your store to display. These will show real product data including prices, images, and availability.",
  });

  for (let i = 1; i <= productCount; i++) {
    settings.push({
      type: "product",
      id: `featured_product_${i}`,
      label: `Featured Product ${i}`,
      info: `Choose a product from your store`,
    });
  }

  settings.push({
    type: "header",
    content: "Display Options",
  });

  settings.push({
    type: "text",
    id: "button_text",
    label: "Button text",
    default: "View Product",
    info: "Text to display on product buttons",
  });

  settings.push({
    type: "checkbox",
    id: "show_product_description",
    label: "Show product descriptions",
    default: true,
  });

  settings.push({
    type: "range",
    id: "description_length",
    min: 10,
    max: 50,
    step: 5,
    unit: "wds",
    label: "Description length",
    default: 20,
    info: "Number of words to show in product descriptions",
  });

  return settings;
}

/**
 * Main function to replace static products with featured products
 */
export function replaceWithFeaturedProducts(html) {
  const $ = cheerio.load(html);
  const productElements = detectProductElements($);

  if (productElements.length === 0) {
    return {
      html: $.html(),
      hasProducts: false,
      replacements: 0,
      schemaSettings: [],
    };
  }

  console.log(
    `Found ${productElements.length} product elements to replace with featured products`
  );

  let replacementCount = 0;
  const extractedData = [];

  productElements.forEach((productInfo, index) => {
    const originalData = extractProductData(productInfo.element);
    extractedData.push(originalData);
  });

  if (productElements.length > 0) {
    const featuredProductLiquid = generateFeaturedProductLiquid(
      extractedData[0],
      0
    );
    const comment = `{%- comment -%} Featured Products Grid - Replaced ${productElements.length} static products {%- endcomment -%}`;
    const replacement = comment + featuredProductLiquid;

    console.log("Before replacement, HTML length:", $.html().length);

    const firstElement = productElements[0].element;
    const parentContainer = firstElement.parent();

    if (parentContainer && parentContainer.length > 0) {
      const productsInParent = productElements.filter((p) => {
        const elementParent = p.element.parent();
        return elementParent.length > 0 && elementParent.is(parentContainer);
      }).length;

      if (productsInParent >= 2) {
        console.log(
          `   Replacing parent container (${
            parentContainer.attr("class") || "no class"
          }) with ${productElements.length} products`
        );
        parentContainer.replaceWith(
          `<div class="featured-products-container featured-product-processed">${replacement}</div>`
        );
        replacementCount = productElements.length;
      } else {
        firstElement.replaceWith(
          `<div class="featured-products-container featured-product-processed">${replacement}</div>`
        );
        replacementCount = 1;

        for (let i = 1; i < productElements.length; i++) {
          try {
            productElements[i].element.remove();
            console.log(
              `   Removed duplicate product ${i + 1}: "${
                extractedData[i].title
              }"`
            );
            replacementCount++;
          } catch (error) {
            console.warn(
              `   Failed to remove product ${i + 1}:`,
              error.message
            );
          }
        }
      }
    } else {
      firstElement.replaceWith(
        `<div class="featured-products-container featured-product-processed">${replacement}</div>`
      );
      replacementCount = 1;

      for (let i = 1; i < productElements.length; i++) {
        try {
          productElements[i].element.remove();
          console.log(
            `   Removed duplicate product ${i + 1}: "${extractedData[i].title}"`
          );
          replacementCount++;
        } catch (error) {
          console.warn(`   Failed to remove product ${i + 1}:`, error.message);
        }
      }
    }

    console.log(
      `   Replaced ${productElements.length} products with featured products grid`
    );
  }

  const schemaSettings = generateFeaturedProductSchema(
    Math.min(productElements.length, 6)
  );

  console.log(
    `Successfully processed ${replacementCount} static products into 1 featured products grid`
  );

  return {
    html: $.html(),
    hasProducts: true,
    replacements: replacementCount,
    schemaSettings: schemaSettings,
    extractedData: extractedData,
    summary: {
      totalFound: productElements.length,
      totalReplaced: replacementCount,
      products: extractedData.map((data, i) => ({
        index: i + 1,
        title: data.title,
        price: data.price,
        confidence: productElements[i]?.confidence,
      })),
      note: "Converted to single product grid with smart fallback system!",
    },
  };
}

/**
 * Helper function to add featured product settings to existing schema
 */
export function addFeaturedProductSettings(existingSettings, productCount) {
  const featuredProductSettings = generateFeaturedProductSchema(productCount);

  const insertIndex = existingSettings.findIndex(
    (setting) =>
      setting.type === "header" &&
      (setting.content?.toLowerCase().includes("section") ||
        setting.content?.toLowerCase().includes("padding"))
  );

  if (insertIndex > 0) {
    existingSettings.splice(insertIndex, 0, ...featuredProductSettings);
  } else {
    existingSettings.push(...featuredProductSettings);
  }

  return existingSettings;
}

/**
 * Generate CSS for featured products to maintain styling
 */
export function generateFeaturedProductCSS() {
  return `
/* Featured Product Styles */
.featured-product-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.featured-product-wrapper:hover {
  transform: translateY(-2px);
}

.product-image {
  position: relative;
  width: 100%;
  padding-bottom: 60%; /* 5:3 aspect ratio */
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  font-weight: 500;
}

.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.product-price {
  margin-bottom: 1rem;
}

.price-compare {
  text-decoration: line-through;
  color: #999;
  margin-right: 0.5rem;
}

.price-sale {
  color: #e74c3c;
  font-weight: 600;
}

.price {
  font-weight: 600;
  font-size: 1.1rem;
}

.product-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.product-button:hover {
  background: #0056b3;
}

.product-button--soldout {
  background: #6c757d;
  cursor: not-allowed;
}

.product-rating {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.rating-stars {
  color: #ffc107;
}

.rating-count {
  color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-info {
    padding: 0.75rem;
  }
  
  .product-title {
    font-size: 1.1rem;
  }
}
`;
}



================================================
FILE: src/utils/filenameValidation.js
================================================
/**
 * Validates a filename for Shopify compatibility
 * @param {string} filename - The filename to validate
 * @returns {object} - { valid: boolean, error: string, sanitized: string }
 */
export function validateShopifyFilename(filename) {
    if (!filename || typeof filename !== 'string') {
        return {
            valid: false,
            error: "Filename is required",
            sanitized: ""
        };
    }

    const baseName = filename.replace(/\.html?$/i, '');

    if (!baseName.trim()) {
        return {
            valid: false,
            error: "Filename cannot be empty",
            sanitized: ""
        };
    }

    const invalidChars = /[^a-z0-9\-_]/;
    const hasInvalidChars = invalidChars.test(baseName);

    const hasUppercase = /[A-Z]/.test(baseName);

    const specialChars = /[@#$%^&*()+=\[\]{}|\\:";'<>?,./~`!]/;
    const hasSpecialChars = specialChars.test(baseName);

    const hasSpaces = /\s/.test(baseName);

    const hasAccents = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/i.test(baseName);

    const startsOrEndsWithHyphen = /^-|-$/.test(baseName);

    const hasConsecutiveHyphens = /--/.test(baseName);

    const tooShort = baseName.length < 2;

    const tooLong = baseName.length > 25;

    const errors = [];

    if (hasSpecialChars) {
        errors.push("Special characters (@, #, $, %, ^, &, *, etc.) are not allowed");
    }

    if (hasUppercase) {
        errors.push("Uppercase letters are not allowed");
    }

    if (hasSpaces) {
        errors.push("Spaces are not allowed");
    }

    if (hasAccents) {
        errors.push("Accented characters (ä, ö, ü, etc.) are not allowed");
    }

    if (startsOrEndsWithHyphen) {
        errors.push("Filename cannot start or end with a hyphen");
    }

    if (hasConsecutiveHyphens) {
        errors.push("Consecutive hyphens (--) are not allowed");
    }

    if (tooShort) {
        errors.push("Filename must be at least 2 characters long");
    }

    if (tooLong) {
        errors.push("Filename must be 25 characters or less");
    }

    let sanitized = baseName
        .toLowerCase()
        .replace(/[^a-z0-9\-_]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (sanitized.length < 2) {
        sanitized = `page-${Date.now().toString(36).slice(-4)}`;
    }

    if (sanitized.length > 25) {
        sanitized = sanitized.substring(0, 25).replace(/-+$/, '');
    }

    const isValid = errors.length === 0;

    return {
        valid: isValid,
        error: isValid ? null : errors.join('; '),
        sanitized: sanitized,
        suggestions: isValid ? null : `Try: "${sanitized}"`
    };
}

/**
 * Validates multiple filenames for batch processing
 * @param {array} filenames - Array of filenames to validate
 * @returns {object} - { valid: boolean, errors: array, sanitized: array }
 */
export function validateBatchFilenames(filenames) {
    const results = filenames.map(name => validateShopifyFilename(name));
    const errors = [];
    const sanitized = [];

    results.forEach((result, index) => {
        if (!result.valid) {
            errors.push({
                index,
                filename: filenames[index],
                error: result.error,
                suggestion: result.suggestions
            });
        }
        sanitized.push(result.sanitized);
    });

    const duplicates = sanitized.filter((name, index) =>
        sanitized.indexOf(name) !== index
    );

    if (duplicates.length > 0) {
        duplicates.forEach(dupName => {
            const indices = sanitized
                .map((name, idx) => name === dupName ? idx : -1)
                .filter(idx => idx !== -1);

            indices.forEach((idx, position) => {
                if (position > 0) {
                    sanitized[idx] = `${dupName}-${position + 1}`;
                }
            });
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized
    };
}

/**
 * Generates Shopify-compatible file paths
 * @param {string} baseName - The base filename (without extension)
 * @returns {object} - File paths for different Shopify file types
 */
export function generateShopifyPaths(baseName) {
    const sanitized = validateShopifyFilename(baseName).sanitized;

    return {
        liquid: `sections/${sanitized}.liquid`,
        json: `templates/${sanitized}.json`,
        layout: `layout/theme.liquid`,
        sectionName: sanitized
    };
}

/**
 * Reserved Shopify filenames that should be avoided
 */
export const RESERVED_SHOPIFY_NAMES = [
    'index',
    'product',
    'collection',
    'cart',
    'search',
    'page',
    'blog',
    'article',
    'customer',
    'gift_card',
    'robots',
    'sitemap',
    '404',
    'password'
];

/**
 * Check if filename conflicts with reserved Shopify names
 * @param {string} filename - The filename to check
 * @returns {boolean} - True if filename is reserved
 */
export function isReservedShopifyName(filename) {
    const baseName = filename.replace(/\.html?$/i, '').toLowerCase();
    return RESERVED_SHOPIFY_NAMES.includes(baseName);
}



================================================
FILE: src/utils/fileSchemaConsistency.js
================================================
/**
 * File name and schema validation utilities
 * Ensures consistency between .liquid file names, schema names, and JSON types
 */

/**
 * Extracts schema information from liquid content
 * @param {string} liquidContent - The liquid template content
 * @returns {object} - Schema information including name and type
 */
export function extractSchemaInfo(liquidContent) {
    if (!liquidContent || typeof liquidContent !== 'string') {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: 'Invalid liquidContent: must be a non-empty string'
        };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: 'No schema section found'
        };
    }

    try {
        const schema = JSON.parse(schemaMatch[1]);
        return {
            hasSchema: true,
            schemaName: schema.name || null,
            schemaType: schema.type || null,
            schema: schema
        };
    } catch (error) {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: `Invalid schema JSON: ${error.message}`
        };
    }
}

/**
 * Extracts section type from JSON template
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - JSON section type information
 */
export function extractJsonSectionType(jsonContent) {
    try {
        const json = JSON.parse(jsonContent);

        if (json.sections && json.sections.main && json.sections.main.type) {
            return {
                hasValidStructure: true,
                sectionType: json.sections.main.type,
                json: json
            };
        }

        return {
            hasValidStructure: false,
            sectionType: null,
            error: 'Invalid JSON structure: missing sections.main.type'
        };
    } catch (error) {
        return {
            hasValidStructure: false,
            sectionType: null,
            error: `Invalid JSON: ${error.message}`
        };
    }
}

/**
 * Normalizes a filename to match Shopify naming conventions
 * @param {string} fileName - The original filename
 * @returns {string} - Normalized filename
 */
export function normalizeFileName(fileName) {
    return fileName
        .replace(/\.liquid$|\.html$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Generates display name from filename
 * @param {string} fileName - The normalized filename
 * @returns {string} - Human-readable display name
 */
export function generateDisplayName(fileName) {
    return fileName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Validates consistency between filename, schema, and JSON
 * @param {string} liquidFileName - The .liquid filename (without extension)
 * @param {string} liquidContent - The liquid template content
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - Validation result with mismatches and corrections
 */
export function validateFileSchemaConsistency(liquidFileName, liquidContent, jsonContent) {
    const normalizedFileName = normalizeFileName(liquidFileName);
    const expectedDisplayName = generateDisplayName(normalizedFileName);

    const schemaInfo = extractSchemaInfo(liquidContent);
    const jsonInfo = extractJsonSectionType(jsonContent);

    const mismatches = [];
    const warnings = [];
    const corrections = {
        fileName: normalizedFileName,
        schemaName: expectedDisplayName,
        schemaType: normalizedFileName,
        jsonType: normalizedFileName
    };

    if (!schemaInfo.hasSchema) {
        warnings.push('No schema section found in liquid template');
    } else {
        if (schemaInfo.schemaType && schemaInfo.schemaType !== normalizedFileName) {
            mismatches.push({
                type: 'schema_type_mismatch',
                expected: normalizedFileName,
                actual: schemaInfo.schemaType,
                location: 'liquid schema type',
                message: `Schema type "${schemaInfo.schemaType}" doesn't match filename "${normalizedFileName}"`
            });
        }

        if (schemaInfo.schemaName) {
            const normalizedSchemaName = schemaInfo.schemaName.toLowerCase().replace(/\s+/g, '-');
            if (normalizedSchemaName !== normalizedFileName) {
                warnings.push(`Schema name "${schemaInfo.schemaName}" doesn't match filename pattern`);
            }
        }
    }

    if (!jsonInfo.hasValidStructure) {
        warnings.push(jsonInfo.error || 'Invalid JSON template structure');
    } else {
        if (jsonInfo.sectionType !== normalizedFileName) {
            mismatches.push({
                type: 'json_type_mismatch',
                expected: normalizedFileName,
                actual: jsonInfo.sectionType,
                location: 'JSON sections.main.type',
                message: `JSON section type "${jsonInfo.sectionType}" doesn't match filename "${normalizedFileName}"`
            });
        }
    }

    const isValid = mismatches.length === 0;

    return {
        valid: isValid,
        mismatches,
        warnings,
        corrections,
        normalizedFileName,
        expectedDisplayName,
        schemaInfo,
        jsonInfo,
        summary: {
            fileName: normalizedFileName,
            schemaType: schemaInfo.schemaType,
            schemaName: schemaInfo.schemaName,
            jsonType: jsonInfo.sectionType,
            issuesFound: mismatches.length
        }
    };
}

/**
 * Automatically fixes mismatches between filename, schema, and JSON
 * @param {string} liquidFileName - The .liquid filename
 * @param {string} liquidContent - The liquid template content
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - Fixed content and validation results
 */
export function fixFileSchemaConsistency(liquidFileName, liquidContent, jsonContent) {
    const validation = validateFileSchemaConsistency(liquidFileName, liquidContent, jsonContent);

    if (validation.valid) {
        return {
            success: true,
            liquidContent,
            jsonContent,
            message: 'No consistency issues found',
            changes: []
        };
    }

    const changes = [];
    let fixedLiquidContent = liquidContent;
    let fixedJsonContent = jsonContent;

    const schemaMismatch = validation.mismatches.find(m => m.type === 'schema_type_mismatch');
    if (schemaMismatch && validation.schemaInfo.hasSchema) {
        try {
            const updatedSchema = { ...validation.schemaInfo.schema };
            updatedSchema.type = validation.corrections.schemaType;

            if (!updatedSchema.name || !updatedSchema.name.trim()) {
                updatedSchema.name = validation.corrections.schemaName;
                changes.push(`Set schema name to "${validation.corrections.schemaName}"`);
            }

            const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}`;
            const schemaMatch = fixedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

            if (schemaMatch) {
                fixedLiquidContent = fixedLiquidContent.replace(schemaMatch[0], newSchemaBlock);
                changes.push(`Updated schema type from "${schemaMismatch.actual}" to "${validation.corrections.schemaType}"`);
            }
        } catch (error) {
            console.error('Error fixing schema:', error);
        }
    }

    const jsonMismatch = validation.mismatches.find(m => m.type === 'json_type_mismatch');
    if (jsonMismatch && validation.jsonInfo.hasValidStructure) {
        try {
            const updatedJson = { ...validation.jsonInfo.json };
            updatedJson.sections.main.type = validation.corrections.jsonType;

            fixedJsonContent = JSON.stringify(updatedJson, null, 2);
            changes.push(`Updated JSON section type from "${jsonMismatch.actual}" to "${validation.corrections.jsonType}"`);
        } catch (error) {
            console.error('Error fixing JSON:', error);
        }
    }

    return {
        success: true,
        liquidContent: fixedLiquidContent,
        jsonContent: fixedJsonContent,
        message: `Fixed ${changes.length} consistency issue${changes.length !== 1 ? 's' : ''}`,
        changes,
        validation
    };
}

/**
 * Validates multiple files for naming consistency
 * @param {Array} files - Array of file objects with liquidContent, jsonContent, and fileName
 * @returns {object} - Batch validation results
 */
export function validateBatchConsistency(files) {
    const results = [];
    const globalIssues = [];
    let totalIssues = 0;

    files.forEach((file, index) => {
        if (!file.liquidContent || !file.jsonContent || !file.fileName) {
            globalIssues.push(`File ${index + 1}: Missing required content (liquid, JSON, or filename)`);
            return;
        }

        const validation = validateFileSchemaConsistency(
            file.fileName,
            file.liquidContent,
            file.jsonContent
        );

        results.push({
            ...validation,
            fileIndex: index,
            originalFileName: file.fileName
        });

        totalIssues += validation.mismatches.length;
    });

    return {
        results,
        globalIssues,
        totalFiles: files.length,
        totalIssues,
        summary: {
            filesWithIssues: results.filter(r => !r.valid).length,
            totalMismatches: totalIssues,
            globalIssues: globalIssues.length
        }
    };
}



================================================
FILE: src/utils/headDeduplication.js
================================================
/**
 * Advanced head content deduplication utilities
 * Handles smart deduplication of fonts, libraries, and other resources
 */

/**
 * Extracts font information from a link or script tag
 * @param {string} line - The HTML line containing font reference
 * @returns {object|null} - Font info or null if not a font
 */
function extractFontInfo(line) {
    const normalizedLine = line.toLowerCase().trim();

    const googleFontsMatch = normalizedLine.match(/fonts\.googleapis\.com.*family=([^&"']+)/);
    if (googleFontsMatch) {
        const fontFamily = googleFontsMatch[1].split(':')[0].replace(/\+/g, ' ');
        return {
            type: 'google-font',
            family: fontFamily,
            originalLine: line.trim()
        };
    }

    const adobeFontsMatch = normalizedLine.match(/use\.typekit\.net\/([a-z0-9]+)\.css/);
    if (adobeFontsMatch) {
        return {
            type: 'adobe-font',
            kitId: adobeFontsMatch[1],
            originalLine: line.trim()
        };
    }

    const fontAwesomeMatch = normalizedLine.match(/font-?awesome/);
    if (fontAwesomeMatch) {
        return {
            type: 'font-awesome',
            originalLine: line.trim()
        };
    }

    const fontFileMatch = normalizedLine.match(/\.(woff2?|ttf|otf|eot)/);
    if (fontFileMatch) {
        return {
            type: 'font-file',
            format: fontFileMatch[1],
            originalLine: line.trim()
        };
    }

    return null;
}

/**
 * Extracts library information from a script or link tag
 * @param {string} line - The HTML line containing library reference
 * @returns {object|null} - Library info or null if not a library
 */
function extractLibraryInfo(line) {
    const normalizedLine = line.toLowerCase().trim();

    const libraries = [
        { name: 'jquery', pattern: /jquery[\.-](\d+[\.\d]*)?/ },
        { name: 'bootstrap', pattern: /bootstrap[\.-](\d+[\.\d]*)?/ },
        { name: 'tailwind', pattern: /tailwindcss/ },
        { name: 'vue', pattern: /vue[\.-](\d+[\.\d]*)?/ },
        { name: 'react', pattern: /react[\.-](\d+[\.\d]*)?/ },
        { name: 'angular', pattern: /angular[\.-](\d+[\.\d]*)?/ },
        { name: 'lodash', pattern: /lodash[\.-](\d+[\.\d]*)?/ },
        { name: 'gsap', pattern: /gsap[\.-](\d+[\.\d]*)?/ },
        { name: 'swiper', pattern: /swiper[\.-](\d+[\.\d]*)?/ },
        { name: 'aos', pattern: /aos[\.-](\d+[\.\d]*)?/ },
        { name: 'animate-css', pattern: /animate\.css/ },
        { name: 'font-awesome', pattern: /font-?awesome/ },
        { name: 'material-icons', pattern: /material-icons/ },
        { name: 'popper', pattern: /popper[\.-](\d+[\.\d]*)?/ }
    ];

    for (const library of libraries) {
        const match = normalizedLine.match(library.pattern);
        if (match) {
            const version = match[1] || 'latest';
            return {
                type: 'library',
                name: library.name,
                version: version,
                originalLine: line.trim()
            };
        }
    }

    return null;
}

/**
 * Performs intelligent deduplication of head content
 * @param {Set} headLines - Set of head lines to deduplicate
 * @returns {Array} - Deduplicated array of head lines with comments
 */
export function intelligentHeadDeduplication(headLines) {
    const fonts = new Map();
    const libraries = new Map();
    const otherLines = [];
    const duplicatesFound = [];

    for (const line of headLines) {
        const fontInfo = extractFontInfo(line);
        const libraryInfo = extractLibraryInfo(line);

        if (fontInfo) {
            const key = `${fontInfo.type}-${fontInfo.family || fontInfo.kitId || 'unknown'}`;
            if (fonts.has(key)) {
                duplicatesFound.push({
                    type: 'font',
                    original: fonts.get(key),
                    duplicate: line
                });
            } else {
                fonts.set(key, line);
            }
        } else if (libraryInfo) {
            const key = `${libraryInfo.name}`;
            if (libraries.has(key)) {
                const existing = libraries.get(key);
                const existingVersion = extractLibraryInfo(existing)?.version || '0';
                const newVersion = libraryInfo.version || '0';

                if (compareVersions(newVersion, existingVersion) > 0) {
                    duplicatesFound.push({
                        type: 'library',
                        original: existing,
                        duplicate: line,
                        action: 'upgraded'
                    });
                    libraries.set(key, line);
                } else {
                    duplicatesFound.push({
                        type: 'library',
                        original: existing,
                        duplicate: line,
                        action: 'kept_existing'
                    });
                }
            } else {
                libraries.set(key, line);
            }
        } else {
            if (!otherLines.includes(line)) {
                otherLines.push(line);
            } else {
                duplicatesFound.push({
                    type: 'exact',
                    original: line,
                    duplicate: line
                });
            }
        }
    }

    const result = [];

    if (fonts.size > 0) {
        result.push('');
        result.push('<!-- ==================== FONTS ==================== -->');
        for (const fontLine of fonts.values()) {
            result.push(fontLine);
        }
    }

    if (libraries.size > 0) {
        result.push('');
        result.push('<!-- ==================== LIBRARIES ==================== -->');
        for (const libraryLine of libraries.values()) {
            result.push(libraryLine);
        }
    }

    if (otherLines.length > 0) {
        result.push('');
        result.push('<!-- ==================== OTHER RESOURCES ==================== -->');
        otherLines.forEach(line => result.push(line));
    }

    return {
        deduplicatedLines: result.filter(line => line.length > 0),
        duplicatesRemoved: duplicatesFound.length,
        summary: {
            fonts: fonts.size,
            libraries: libraries.size,
            otherResources: otherLines.length,
            duplicatesRemoved: duplicatesFound.length
        }
    };
}

/**
 * Simple version comparison function
 * @param {string} version1 - First version string
 * @param {string} version2 - Second version string
 * @returns {number} - 1 if version1 > version2, -1 if version1 < version2, 0 if equal
 */
function compareVersions(version1, version2) {
    const v1 = version1.split('.').map(num => parseInt(num) || 0);
    const v2 = version2.split('.').map(num => parseInt(num) || 0);

    const maxLength = Math.max(v1.length, v2.length);

    for (let i = 0; i < maxLength; i++) {
        const num1 = v1[i] || 0;
        const num2 = v2[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0;
}

/**
 * Enhanced head content processor with smart deduplication
 * @param {Array} headContentArray - Array of head content strings from different files
 * @param {Array} fileNames - Array of corresponding file names
 * @returns {object} - Processed head content with deduplication info
 */
export function processHeadContentWithDeduplication(headContentArray, fileNames = []) {
    const allLines = new Set();
    const sourceMap = new Map();

    headContentArray.forEach((headContent, index) => {
        if (headContent && headContent.trim()) {
            const fileName = fileNames[index] || `File ${index + 1}`;
            const lines = headContent.split('\n').filter(line => line.trim());

            lines.forEach(line => {
                const normalizedLine = line.trim().replace(/\s+/g, ' ');
                if (normalizedLine) {
                    allLines.add(normalizedLine);
                    if (!sourceMap.has(normalizedLine)) {
                        sourceMap.set(normalizedLine, []);
                    }
                    sourceMap.get(normalizedLine).push(fileName);
                }
            });
        }
    });

    const deduplicationResult = intelligentHeadDeduplication(allLines);

    return {
        content: deduplicationResult.deduplicatedLines.join('\n'),
        duplicatesRemoved: deduplicationResult.duplicatesRemoved,
        summary: deduplicationResult.summary,
        sourceMap: Object.fromEntries(sourceMap)
    };
}



================================================
FILE: src/utils/htmlValidation.js
================================================
import { HTMLHint } from "htmlhint";

export const validateAndExtractHtml = (text, fileName = '') => {
  try {
    const htmlTagRegex = /<[^>]+>/g;
    const hasHtmlTags = htmlTagRegex.test(text);

    if (!hasHtmlTags) {
      return {
        isValid: false,
        content: '',
        error: 'No HTML content found in this file.',
        fileName: fileName
      };
    }

    const htmlhintConfig = {
      "tagname-lowercase": true,
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "doctype-first": false,
      "tag-pair": true,
      "spec-char-escape": false,
      "id-unique": true,
      "src-not-empty": true,
      "attr-no-duplication": true,
      "title-require": false,
      "tag-self-close": false,
      "empty-tag-not-self-closed": true,
      "attr-value-not-empty": false,
      "id-class-value": false,
      "style-disabled": false,
      "inline-style-disabled": false,
      "inline-script-disabled": false,
      "space-tab-mixed-disabled": "space",
      "id-class-ad-disabled": false,
      "href-abs-or-rel": false,
      "attr-unsafe-chars": true
    };

    const messages = HTMLHint.verify(text, htmlhintConfig);

    if (messages.length > 0) {
      const errors = messages.map(msg =>
        `Line ${msg.line}, Col ${msg.col}: ${msg.message} (${msg.rule.id})`
      );

      const filePrefix = fileName ? `File: ${fileName}\n\n` : '';

      return {
        isValid: false,
        content: '',
        error: `${filePrefix}HTML validation errors found:\n\n${errors.map((err, i) => `${i + 1}. ${err}`).join('\n')}\n\nPlease fix these issues in your HTML file first.`,
        fileName: fileName,
        errorCount: errors.length,
        detailedErrors: errors
      };
    }

    return {
      isValid: true,
      content: text,
      error: null,
      fileName: fileName
    };

  } catch (error) {
    return {
      isValid: false,
      content: '',
      error: `HTML validation error: ${error.message}\n\nPlease check your HTML syntax and try again.`,
      fileName: fileName
    };
  }
};

export const validateAllFiles = (files) => {
  const allErrors = [];
  const validFiles = [];

  files.forEach((file, index) => {
    if (!file.fileContent) return;

    const displayName = file.fileName || `File ${index + 1}`;
    const result = validateAndExtractHtml(file.fileContent, displayName);

    if (result.isValid) {
      validFiles.push(file);
    } else {
      allErrors.push({
        fileName: displayName,
        fileIndex: index,
        error: result.error,
        detailedErrors: result.detailedErrors || [],
        errorCount: result.errorCount || 1
      });
    }
  });

  return {
    isValid: allErrors.length === 0,
    validFiles,
    allErrors,
    totalErrorCount: allErrors.reduce((sum, fileError) => sum + fileError.errorCount, 0)
  };
};



================================================
FILE: src/utils/openaiHtmlToLiquid.js
================================================
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function checkOpenAIConnection() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        isWorking: false,
        error: "OpenAI API key is not configured",
        status: "no_api_key",
      };
    }

    console.log("🔍 Checking OpenAI API connection...");

    const testCompletion = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: "Hello",
        },
      ],
      max_completion_tokens: 5,
    });

    if (testCompletion && testCompletion.choices && testCompletion.choices[0]) {
      console.log("✅ OpenAI API is working properly");
      return {
        isWorking: true,
        status: "connected",
        model: "gpt-5",
        timestamp: new Date().toISOString(),
      };
    } else {
      console.log("❌ OpenAI API returned invalid response");
      return {
        isWorking: false,
        error: "Invalid response from OpenAI API",
        status: "invalid_response",
      };
    }
  } catch (error) {
    console.log("❌ OpenAI API connection failed:", error.message);
    return {
      isWorking: false,
      error: error.message,
      status: "connection_failed",
      errorCode: error.code || "unknown",
    };
  }
}

export async function generateLiquidWithOpenAI(
  htmlContent,
  fileName,
  repeatPrompt = 5
) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    let promptBase = `You are an expert Shopify Liquid developer with deep knowledge of Shopify's theming system, Liquid syntax, and schema structure. Convert the following HTML into a comprehensive Shopify section with advanced schema configuration:

HTML Content:
${htmlContent}

DETAILED REQUIREMENTS:
1. Convert ALL HTML elements to proper Shopify Liquid syntax
2. Create comprehensive schema with BOTH settings and blocks
3. Make ALL text content editable through schema settings
14. Section name should be: ${fileName}

OUTPUT FORMAT:
Return ONLY the complete Shopify Liquid template code with schema. No explanations, no markdown formatting, just clean Liquid code ready for production use.`;

    // Repeat the prompt as many times as specified
    let prompt = "";
    for (let i = 0; i < repeatPrompt; i++) {
      prompt += promptBase + "\n";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You are a world-class Shopify Liquid developer and theme expert. You have extensive experience building production-ready Shopify themes and understand all nuances of Liquid syntax, schema configuration, and Shopify's theming best practices. Generate only the highest quality, most comprehensive Liquid templates with advanced schema structures.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_completion_tokens: 128000,
    });

    const liquidContent = completion.choices[0]?.message?.content?.trim();

    if (!liquidContent) {
      throw new Error("No content generated by OpenAI");
    }

    const schemaMatch = liquidContent.match(
      /\{\%\s*schema\s*\%\}([\s\S]*?)\{\%\s*endschema\s*\%\}/
    );
    let jsonSchema = {};

    if (schemaMatch) {
      try {
        jsonSchema = JSON.parse(schemaMatch[1].trim());
      } catch (e) {
        console.warn("Could not parse schema from OpenAI response:", e.message);
      }
    }

    console.log(
      `🧮 OpenAI Token Usage: Prompt = ${
        completion.usage?.prompt_tokens || 0
      }, Completion = ${completion.usage?.completion_tokens || 0}, Total = ${
        completion.usage?.total_tokens || 0
      }`
    );

    return {
      success: true,
      liquidContent: liquidContent,
      jsonTemplate: JSON.stringify(jsonSchema, null, 2),
      metadata: {
        generatedAt: new Date().toISOString(),
        model: "gpt-5",
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error("OpenAI conversion error:", error);
    return {
      success: false,
      error: error.message,
      liquidContent: "",
      jsonTemplate: "{}",
      metadata: {
        generatedAt: new Date().toISOString(),
        error: error.message,
      },
    };
  }
}

export async function generateLiquidWithOpenAIBackground(
  htmlContent,
  fileName
) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log(
        `⚠️ [BACKGROUND] OpenAI API key not configured - skipping AI generation for: ${fileName}`
      );
      return {
        success: false,
        error: "OpenAI API key not configured",
        fileName: fileName,
        skipped: true,
      };
    }

    console.log(`🤖 [BACKGROUND] Starting OpenAI conversion for: ${fileName}`);
    const startTime = Date.now();

    generateLiquidWithOpenAI(htmlContent, fileName)
      .then((result) => {
        const duration = Date.now() - startTime;
        if (result.success) {
          console.log(
            `✅ [BACKGROUND] OpenAI conversion completed for: ${fileName} (${duration}ms)`
          );
          console.log(
            `📊 [BACKGROUND] OpenAI Usage - Tokens: ${result.metadata.totalTokens}, Model: ${result.metadata.model}`
          );
          console.log(
            `📏 [BACKGROUND] Generated ${
              result.liquidContent.split("\n").length
            } lines of Liquid code`
          );
          console.log(
            `[TOKENS] Prompt: ${result.metadata.promptTokens}, Completion: ${result.metadata.completionTokens}, Total: ${result.metadata.totalTokens}`
          );
        } else {
          console.log(
            `❌ [BACKGROUND] OpenAI conversion failed for: ${fileName} (${duration}ms):`,
            result.error
          );
        }
      })
      .catch((error) => {
        const duration = Date.now() - startTime;
        console.log(
          `❌ [BACKGROUND] OpenAI conversion error for: ${fileName} (${duration}ms):`,
          error.message
        );
      });

    return {
      success: true,
      message: "OpenAI conversion started in background",
      timestamp: new Date().toISOString(),
      fileName: fileName,
    };
  } catch (error) {
    console.error("Background OpenAI conversion setup error:", error);
    return {
      success: false,
      error: error.message,
      fileName: fileName,
    };
  }
}



================================================
FILE: src/utils/pageTypeDetection.js
================================================
/**
 * Page Type Detection for Shopify Templates
 * Detects whether HTML should generate collection, product, blog, or page templates
 */

import * as cheerio from 'cheerio';

/**
 * Detects the page type based on HTML content and filename
 * @param {string} html - HTML content
 * @param {string} fileName - File name
 * @returns {object} - Page type information
 */
export function detectPageType(html, fileName) {
    if (!html || typeof html !== 'string') {
        return { type: 'page', template: 'page', hasLoop: false };
    }

    const $ = cheerio.load(html);
    const normalizedFileName = fileName.toLowerCase();

    if (normalizedFileName.includes('shop') ||
        normalizedFileName.includes('collection') ||
        normalizedFileName.includes('products') ||
        normalizedFileName.includes('catalog')) {
        return analyzeCollectionPage($, fileName);
    }

    if (normalizedFileName.includes('product') ||
        normalizedFileName.includes('item')) {
        return analyzeProductPage($, fileName);
    }

    if (normalizedFileName.includes('blog') ||
        normalizedFileName.includes('news') ||
        normalizedFileName.includes('articles')) {
        return analyzeBlogPage($, fileName);
    }

    const productCards = detectProductCards($);
    const blogPosts = detectBlogPosts($);
    const singleProduct = detectSingleProduct($);

    if (productCards.count >= 3) {
        return {
            type: 'collection',
            template: 'collection',
            hasLoop: true,
            loopType: 'products',
            productCards: productCards,
            reason: `Detected ${productCards.count} product cards - generating collection template`
        };
    }

    if (singleProduct.isProduct) {
        return {
            type: 'product',
            template: 'product',
            hasLoop: false,
            productData: singleProduct,
            reason: 'Detected single product page - generating product template'
        };
    }

    if (blogPosts.count >= 2) {
        return {
            type: 'blog',
            template: 'blog',
            hasLoop: true,
            loopType: 'articles',
            blogPosts: blogPosts,
            reason: `Detected ${blogPosts.count} blog posts - generating blog template`
        };
    }

    return {
        type: 'page',
        template: 'page',
        hasLoop: false,
        reason: 'Default page template - no specific patterns detected'
    };
}

/**
 * Analyzes collection page patterns
 */
function analyzeCollectionPage($, fileName) {
    const productCards = detectProductCards($);

    return {
        type: 'collection',
        template: 'collection',
        hasLoop: true,
        loopType: 'products',
        productCards: productCards,
        reason: `Collection page detected from filename "${fileName}" with ${productCards.count} product cards`
    };
}

/**
 * Analyzes product page patterns
 */
function analyzeProductPage($, fileName) {
    const singleProduct = detectSingleProduct($);

    return {
        type: 'product',
        template: 'product',
        hasLoop: false,
        productData: singleProduct,
        reason: `Product page detected from filename "${fileName}"`
    };
}

/**
 * Analyzes blog page patterns
 */
function analyzeBlogPage($, fileName) {
    const blogPosts = detectBlogPosts($);

    return {
        type: 'blog',
        template: 'blog',
        hasLoop: true,
        loopType: 'articles',
        blogPosts: blogPosts,
        reason: `Blog page detected from filename "${fileName}" with ${blogPosts.count} blog posts`
    };
}

/**
 * Detects product cards in HTML
 */
function detectProductCards($) {
    const productCards = $('div, article, section').filter((i, el) => {
        const $el = $(el);
        const text = $el.text() || '';
        const hasImage = $el.find('img').length > 0;
        const hasPrice = text.includes('$') || $el.find('[class*="price"], .price, [data-price]').length > 0;
        const hasTitle = $el.find('h1, h2, h3, h4, h5, h6').length > 0;
        const hasButton = $el.find('a, button, .btn, [class*="button"]').length > 0;

        const hasProductClass = $el.attr('class') && (
            $el.attr('class').includes('product') ||
            $el.attr('class').includes('item') ||
            $el.attr('class').includes('card')
        );

        const score = [hasImage, hasPrice, hasTitle, hasButton, hasProductClass].filter(Boolean).length;

        return score >= 3;
    });

    return {
        count: productCards.length,
        elements: productCards,
        hasVariants: $('[data-variant], .variant, [class*="variant"]').length > 0,
        hasRatings: $('[class*="star"], [class*="rating"], .rating').length > 0
    };
}

/**
 * Detects single product page patterns
 */
function detectSingleProduct($) {
    const hasProductGallery = $('.product-gallery, .product-images, [class*="product-image"]').length > 0;
    const hasProductInfo = $('.product-info, .product-details, [class*="product-detail"]').length > 0;
    const hasAddToCart = $('[class*="add-to-cart"], .add-to-cart, button[type="submit"]').length > 0;
    const hasProductPrice = $('.product-price, [class*="product-price"], [data-price]').length > 0;
    const hasProductTitle = $('h1, .product-title, [class*="product-title"]').length > 0;

    const score = [hasProductGallery, hasProductInfo, hasAddToCart, hasProductPrice, hasProductTitle].filter(Boolean).length;

    return {
        isProduct: score >= 3,
        hasGallery: hasProductGallery,
        hasAddToCart: hasAddToCart,
        hasVariants: $('[data-variant], .variant-selector, [class*="variant"]').length > 0,
        hasReviews: $('[class*="review"], .reviews, [class*="testimonial"]').length > 0
    };
}

/**
 * Detects blog post patterns
 */
function detectBlogPosts($) {
    const blogPosts = $('article, .post, .blog-post, [class*="post"], [class*="article"]').filter((i, el) => {
        const $el = $(el);
        const hasTitle = $el.find('h1, h2, h3, h4, h5, h6').length > 0;
        const hasContent = $el.find('p').length > 0;
        const hasDate = $el.find('.date, [class*="date"], time').length > 0 ||
            $el.text().match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}/);
        const hasReadMore = $el.find('a, .read-more, [class*="read"]').length > 0;

        const score = [hasTitle, hasContent, hasDate, hasReadMore].filter(Boolean).length;
        return score >= 2;
    });

    return {
        count: blogPosts.length,
        elements: blogPosts,
        hasAuthors: $('.author, [class*="author"], .by-line').length > 0,
        hasCategories: $('.category, [class*="category"], .tag').length > 0
    };
}

/**
 * Generates template structure based on page type
 */
export function generateTemplateStructure(pageType, fileName) {
    const normalizedFileName = fileName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    switch (pageType.type) {
        case 'collection':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/collection.${normalizedFileName}.json`,
                templateType: 'collection',
                requiresLoop: true,
                loopVariable: 'collection.products'
            };

        case 'product':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/product.${normalizedFileName}.json`,
                templateType: 'product',
                requiresLoop: false,
                productData: true
            };

        case 'blog':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/blog.${normalizedFileName}.json`,
                templateType: 'blog',
                requiresLoop: true,
                loopVariable: 'blog.articles'
            };

        default:
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/page.${normalizedFileName}.json`,
                templateType: 'page',
                requiresLoop: false
            };
    }
}



================================================
FILE: src/utils/quoteEscaping.js
================================================
/**
 * Schema quote escaping and validation utilities
 * Handles proper escaping of quotes in schema default values
 */

/**
 * Escapes quotes in schema default values
 * @param {string} value - The value to escape
 * @returns {string} - Escaped value safe for JSON
 */
export function escapeSchemaQuotes(value) {
    if (typeof value !== 'string') {
        return value;
    }

    return value.replace(/"/g, '\\"');
}

/**
 * Wraps values with problematic quotes in single quotes
 * @param {string} value - The value to wrap
 * @returns {string} - Wrapped value
 */
export function wrapInSingleQuotes(value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.includes('"')) {
        const escapedValue = value.replace(/'/g, "\\'");
        return `'${escapedValue}'`;
    }

    return value;
}

/**
 * Safely processes schema default values to handle quotes
 * @param {any} value - The schema value to process
 * @returns {any} - Processed value
 */
export function safeSchemaValue(value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.includes('"')) {
        return escapeSchemaQuotes(value);
    }

    return value;
}

/**
 * Recursively processes a schema object to escape quotes in default values
 * @param {object} schema - The schema object to process
 * @returns {object} - Processed schema with escaped quotes
 */
export function escapeSchemaDefaultQuotes(schema) {
    if (!schema || typeof schema !== 'object') {
        return schema;
    }

    const processedSchema = JSON.parse(JSON.stringify(schema));

    if (processedSchema.settings && Array.isArray(processedSchema.settings)) {
        processedSchema.settings.forEach(setting => {
            if (setting.default && typeof setting.default === 'string') {
                setting.default = safeSchemaValue(setting.default);
            }
        });
    }

    if (processedSchema.blocks && Array.isArray(processedSchema.blocks)) {
        processedSchema.blocks.forEach(block => {
            if (block.settings && Array.isArray(block.settings)) {
                block.settings.forEach(setting => {
                    if (setting.default && typeof setting.default === 'string') {
                        setting.default = safeSchemaValue(setting.default);
                    }
                });
            }
        });
    }

    return processedSchema;
}

/**
 * Validates schema for quote-related issues
 * @param {string} schemaString - JSON schema string
 * @returns {object} - Validation result with errors and fixes
 */
export function validateSchemaQuotes(schemaString) {
    const errors = [];
    const warnings = [];
    let correctedSchema = schemaString;

    try {
        const schema = JSON.parse(schemaString);
        const issues = [];

        if (schema.settings && Array.isArray(schema.settings)) {
            schema.settings.forEach((setting, index) => {
                if (setting.default && typeof setting.default === 'string') {
                    if (setting.default.includes('"') && !setting.default.startsWith('\\"')) {
                        issues.push({
                            type: 'unescaped_quotes',
                            location: `settings[${index}].default`,
                            setting: setting.id || `setting_${index}`,
                            value: setting.default,
                            fixed: safeSchemaValue(setting.default)
                        });
                    }
                }
            });
        }

        if (schema.blocks && Array.isArray(schema.blocks)) {
            schema.blocks.forEach((block, blockIndex) => {
                if (block.settings && Array.isArray(block.settings)) {
                    block.settings.forEach((setting, settingIndex) => {
                        if (setting.default && typeof setting.default === 'string') {
                            if (setting.default.includes('"') && !setting.default.startsWith('\\"')) {
                                issues.push({
                                    type: 'unescaped_quotes',
                                    location: `blocks[${blockIndex}].settings[${settingIndex}].default`,
                                    setting: setting.id || `setting_${settingIndex}`,
                                    block: block.type || `block_${blockIndex}`,
                                    value: setting.default,
                                    fixed: safeSchemaValue(setting.default)
                                });
                            }
                        }
                    });
                }
            });
        }

        if (issues.length > 0) {
            const correctedSchemaObj = escapeSchemaDefaultQuotes(schema);
            correctedSchema = JSON.stringify(correctedSchemaObj, null, 2);

            issues.forEach(issue => {
                warnings.push(`Quote issue in ${issue.location}: "${issue.value}" → "${issue.fixed}"`);
            });
        }

        return {
            valid: issues.length === 0,
            errors,
            warnings,
            issues,
            correctedSchema,
            issuesFound: issues.length
        };

    } catch (parseError) {
        errors.push(`Invalid JSON schema: ${parseError.message}`);
        return {
            valid: false,
            errors,
            warnings,
            issues: [],
            correctedSchema: schemaString,
            issuesFound: 0
        };
    }
}

/**
 * Automatically fixes quote issues in a liquid template's schema section
 * @param {string} liquidContent - The liquid template content
 * @returns {object} - Result with fixed content and validation info
 */
export function fixSchemaQuotesInLiquid(liquidContent) {
    if (!liquidContent || typeof liquidContent !== 'string') {
        return {
            success: false,
            error: 'Invalid liquidContent: must be a non-empty string',
            content: liquidContent || '',
            issues: []
        };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            success: false,
            error: 'No schema section found',
            content: liquidContent,
            issues: []
        };
    }

    const schemaContent = schemaMatch[1].trim();
    const validation = validateSchemaQuotes(schemaContent);

    if (validation.valid) {
        return {
            success: true,
            content: liquidContent,
            issues: [],
            message: 'No quote issues found'
        };
    }

    if (validation.errors.length > 0) {
        return {
            success: false,
            error: validation.errors.join(', '),
            content: liquidContent,
            issues: validation.issues
        };
    }

    const newSchemaBlock = `{% schema %}\n${validation.correctedSchema}\n{% endschema %}`;
    const fixedContent = liquidContent.replace(schemaMatch[0], newSchemaBlock);

    return {
        success: true,
        content: fixedContent,
        issues: validation.issues,
        warnings: validation.warnings,
        message: `Fixed ${validation.issuesFound} quote issue${validation.issuesFound !== 1 ? 's' : ''}`
    };
}



================================================
FILE: src/utils/schemaDetection.js
================================================
/**
 * Detects existing schema blocks in HTML content
 * @param {string} htmlContent - The HTML content to check
 * @returns {object} - { hasSchema: boolean, schemaContent: string, position: number }
 */
export function detectExistingSchema(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
        return { hasSchema: false, schemaContent: '', position: -1 };
    }

    // Check for {% schema %} blocks
    const schemaPattern = /{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/gi;
    const match = schemaPattern.exec(htmlContent);

    if (match) {
        return {
            hasSchema: true,
            schemaContent: match[1].trim(),
            position: match.index,
            fullMatch: match[0]
        };
    }

    return { hasSchema: false, schemaContent: '', position: -1 };
}

/**
 * Removes existing schema block from HTML content
 * @param {string} htmlContent - The HTML content
 * @returns {string} - HTML content with schema removed
 */
export function removeExistingSchema(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
        return htmlContent;
    }

    const schemaPattern = /{%\s*schema\s*%}[\s\S]*?{%\s*endschema\s*%}/gi;
    return htmlContent.replace(schemaPattern, '').trim();
}

/**
 * Extracts and parses existing schema JSON
 * @param {string} schemaContent - The schema content between tags
 * @returns {object} - { isValid: boolean, schema: object, error: string }
 */
export function parseExistingSchema(schemaContent) {
    if (!schemaContent || !schemaContent.trim()) {
        return { isValid: false, schema: null, error: 'Empty schema content' };
    }

    try {
        const schema = JSON.parse(schemaContent);
        return { isValid: true, schema, error: null };
    } catch (error) {
        return { isValid: false, schema: null, error: error.message };
    }
}



================================================
FILE: src/utils/schemaFieldTypes.js
================================================
/**
 * Schema field type definitions with required/optional indicators
 */

export const FIELD_REQUIREMENT_TYPES = {
    REQUIRED: 'required',
    OPTIONAL: 'optional'
};

/**
 * Determines if a schema field is required or optional based on its properties
 * @param {object} field - Schema field object
 * @returns {string} - 'required' or 'optional'
 */
export function getFieldRequirement(field) {
    const requiredFieldTypes = [
        'header', 'text', 'textarea'
    ];

    const optionalFieldTypes = [
        'color', 'font_picker', 'select', 'checkbox', 'radio'
    ];

    if (field.label && field.label.includes('*')) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    const criticalIds = [
        'title', 'heading', 'section_title', 'button_text',
        'link_url', 'link_text', 'nav_link', 'menu_item',
        'name', 'content', 'description', 'subtitle'
    ];

    if (field.id && criticalIds.some(id => field.id.includes(id))) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    const requiredPatterns = [
        /^(heading|title|name|content|description)$/i,
        /_(heading|title|name|text|content)$/i,
        /^(button|link|nav|menu)_/i,
        /^section_(title|heading|name)$/i
    ];

    if (field.id && requiredPatterns.some(pattern => pattern.test(field.id))) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    if (field.type && requiredFieldTypes.includes(field.type)) {
        if (field.type === 'textarea' && field.id &&
            (field.id.includes('description') || field.id.includes('bio') || field.id.includes('details'))) {
            return FIELD_REQUIREMENT_TYPES.OPTIONAL;
        }
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    if (field.type && optionalFieldTypes.includes(field.type)) {
        return FIELD_REQUIREMENT_TYPES.OPTIONAL;
    }

    const specialOptionalTypes = [
        'image_picker', 'url', 'richtext', 'html', 'number', 'range',
        'collection', 'product', 'blog', 'page', 'link_list', 'video_url', 'article'
    ];

    if (field.type && specialOptionalTypes.includes(field.type)) {
        if (field.type === 'url' && field.id &&
            (field.id.includes('button') || field.id.includes('link') || field.id.includes('nav'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }
        return FIELD_REQUIREMENT_TYPES.OPTIONAL;
    }

    return FIELD_REQUIREMENT_TYPES.OPTIONAL;
}

/**
 * Adds visual indicators to schema fields for required/optional status
 * @param {object} schema - Complete schema object
 * @returns {object} - Schema with field indicators added
 */
export function addFieldIndicators(schema) {
    const processedSchema = JSON.parse(JSON.stringify(schema));

    if (processedSchema.settings) {
        processedSchema.settings = processedSchema.settings.map(field => {
            const requirement = getFieldRequirement(field);
            return {
                ...field,
                _requirement: requirement,
                _indicator: requirement === FIELD_REQUIREMENT_TYPES.REQUIRED ? '* ' : ''
            };
        });
    }

    if (processedSchema.blocks) {
        processedSchema.blocks = processedSchema.blocks.map(block => {
            if (block.settings) {
                block.settings = block.settings.map(field => {
                    const requirement = getFieldRequirement(field);
                    return {
                        ...field,
                        _requirement: requirement,
                        _indicator: requirement === FIELD_REQUIREMENT_TYPES.REQUIRED ? '* ' : ''
                    };
                });
            }
            return block;
        });
    }

    return processedSchema;
}

/**
 * Gets field statistics for a schema
 * @param {object} schema - Schema object
 * @returns {object} - { totalFields, requiredFields, optionalFields }
 */
export function getSchemaFieldStats(schema) {
    let totalFields = 0;
    let requiredFields = 0;
    let optionalFields = 0;

    if (schema.settings) {
        schema.settings.forEach(field => {
            totalFields++;
            const requirement = getFieldRequirement(field);
            if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                requiredFields++;
            } else {
                optionalFields++;
            }
        });
    }

    if (schema.blocks) {
        schema.blocks.forEach(block => {
            if (block.settings) {
                block.settings.forEach(field => {
                    totalFields++;
                    const requirement = getFieldRequirement(field);
                    if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                        requiredFields++;
                    } else {
                        optionalFields++;
                    }
                });
            }
        });
    }

    return {
        totalFields,
        requiredFields,
        optionalFields
    };
}

/**
 * Formats field labels with requirement indicators
 * @param {string} label - Original field label
 * @param {boolean} isRequired - Whether field is required
 * @returns {string} - Formatted label with indicator
 */
export function formatFieldLabel(label, isRequired) {
    if (!label) return label;

    const cleanLabel = label.replace(/^\*\s*/, '').replace(/\s*\*$/, '');

    return isRequired ? `${cleanLabel} *` : cleanLabel;
}

/**
 * Enhanced field requirement detection with context awareness
 */
export function getEnhancedFieldRequirement(field, blockContext = null) {
    const basicRequirement = getFieldRequirement(field);

    if (blockContext) {
        if (blockContext.type === 'header' && field.id &&
            (field.id.includes('nav') || field.id.includes('logo'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }

        if (blockContext.type === 'button' && field.id &&
            (field.id.includes('text') || field.id.includes('url'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }

        if (blockContext.type === 'product' && field.id &&
            (field.id.includes('title') || field.id.includes('price'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }
    }

    return basicRequirement;
}

/**
 * Valid Shopify schema field types with their required attributes
 */
export const VALID_SHOPIFY_FIELD_TYPES = {
    'text': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'textarea': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'number': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'range': {
        required: ['type', 'id', 'label', 'min', 'max', 'step'],
        optional: ['default', 'info']
    },
    'color': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'color_background': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'font_picker': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'collection': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'product': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'blog': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'page': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'link_list': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'url': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'video_url': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'richtext': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'html': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'article': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'image_picker': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'radio': {
        required: ['type', 'id', 'label', 'options'],
        optional: ['default', 'info']
    },
    'select': {
        required: ['type', 'id', 'label', 'options'],
        optional: ['default', 'info']
    },
    'checkbox': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'header': {
        required: ['type', 'content'],
        optional: ['info']
    },
    'paragraph': {
        required: ['type', 'content'],
        optional: []
    }
};

/**
 * Validates a single schema field
 * @param {object} field - Schema field object
 * @returns {object} - { valid: boolean, errors: array, corrected: object }
 */
export function validateSchemaField(field) {
    const errors = [];
    let correctedField = { ...field };

    if (!field || typeof field !== 'object') {
        return {
            valid: false,
            errors: ['Field must be an object'],
            corrected: null
        };
    }

    if (!field.type) {
        errors.push('Field missing required "type" attribute');
        return { valid: false, errors, corrected: null };
    }

    const fieldTypeConfig = VALID_SHOPIFY_FIELD_TYPES[field.type];
    if (!fieldTypeConfig) {
        const correctedType = correctFieldType(field.type, field);
        if (correctedType) {
            correctedField.type = correctedType;
            errors.push(`Invalid field type "${field.type}" corrected to "${correctedType}"`);
        } else {
            errors.push(`Invalid field type: "${field.type}"`);
            return { valid: false, errors, corrected: null };
        }
    }

    const config = VALID_SHOPIFY_FIELD_TYPES[correctedField.type];

    config.required.forEach(attr => {
        if (!correctedField[attr]) {
            if (attr === 'id' && correctedField.type !== 'header' && correctedField.type !== 'paragraph') {
                errors.push(`Field missing required "${attr}" attribute`);
            } else if (attr === 'label' && correctedField.type !== 'header' && correctedField.type !== 'paragraph') {
                errors.push(`Field missing required "${attr}" attribute`);
            } else if (attr === 'content' && (correctedField.type === 'header' || correctedField.type === 'paragraph')) {
                errors.push(`Field missing required "${attr}" attribute`);
            }
        }
    });

    if (correctedField.id && !/^[a-z][a-z0-9_]*$/.test(correctedField.id)) {
        const correctedId = correctedField.id.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/^[0-9]/, 'field_$&');
        errors.push(`Invalid ID format "${correctedField.id}" corrected to "${correctedId}"`);
        correctedField.id = correctedId;
    }

    Object.keys(correctedField).forEach(attr => {
        if (!config.required.includes(attr) && !config.optional.includes(attr)) {
            delete correctedField[attr];
            errors.push(`Removed invalid attribute "${attr}" from field`);
        }
    });

    if (correctedField.type === 'image_picker' && correctedField.default) {
        delete correctedField.default;
        errors.push('Removed invalid "default" attribute from image_picker field');
    }

    if ((correctedField.type === 'radio' || correctedField.type === 'select') && !correctedField.options) {
        correctedField.options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ];
        errors.push('Added default options for radio/select field');
    }

    return {
        valid: errors.length === 0,
        errors,
        corrected: correctedField
    };
}

/**
 * Attempts to correct invalid field types
 * @param {string} invalidType - The invalid field type
 * @param {object} field - The field object for context
 * @returns {string|null} - Corrected type or null if cannot be corrected
 */
function correctFieldType(invalidType, field) {
    const typeCorrections = {
        'email': 'text',
        'password': 'text',
        'tel': 'text',
        'phone': 'text',
        'email_placeholder': 'text',
        'newsletter_email_placeholder': 'text',
        'placeholder': 'text',
        'string': 'text',
        'longtext': 'textarea',
        'wysiwyg': 'richtext',
        'editor': 'richtext',
        'color_picker': 'color',
        'image': 'image_picker',
        'file': 'image_picker',
        'link': 'url',
        'boolean': 'checkbox',
        'toggle': 'checkbox'
    };

    if (typeCorrections[invalidType]) {
        return typeCorrections[invalidType];
    }

    if (invalidType.includes('email') || invalidType.includes('placeholder')) {
        return 'text';
    }

    if (invalidType.includes('color')) {
        return 'color';
    }

    if (invalidType.includes('image') || invalidType.includes('picture')) {
        return 'image_picker';
    }

    if (invalidType.includes('text') || invalidType.includes('string')) {
        return 'text';
    }

    if (invalidType.includes('area') || invalidType.includes('long')) {
        return 'textarea';
    }

    if (invalidType.includes('url') || invalidType.includes('link')) {
        return 'url';
    }

    if (invalidType.includes('rich') || invalidType.includes('html')) {
        return 'richtext';
    }

    if (invalidType.includes('number') || invalidType.includes('numeric')) {
        return 'number';
    }

    if (invalidType.includes('range') || invalidType.includes('slider')) {
        return 'range';
    }

    if (invalidType.includes('select') || invalidType.includes('dropdown')) {
        return 'select';
    }

    if (invalidType.includes('radio') || invalidType.includes('option')) {
        return 'radio';
    }

    if (invalidType.includes('check') || invalidType.includes('bool')) {
        return 'checkbox';
    }

    return null;
}

/**
 * Validates and corrects an entire schema object
 * @param {object} schema - Complete schema object
 * @returns {object} - { valid: boolean, errors: array, corrected: object }
 */
export function validateAndCorrectSchema(schema) {
    const errors = [];
    let correctedSchema = { ...schema };

    if (!schema || typeof schema !== 'object') {
        return {
            valid: false,
            errors: ['Schema must be an object'],
            corrected: null
        };
    }

    if (correctedSchema.settings && Array.isArray(correctedSchema.settings)) {
        correctedSchema.settings = correctedSchema.settings.map((field, index) => {
            const validation = validateSchemaField(field);
            if (!validation.valid) {
                errors.push(`Setting ${index}: ${validation.errors.join(', ')}`);
            }
            return validation.corrected || field;
        }).filter(field => field !== null);
    }

    if (correctedSchema.blocks && Array.isArray(correctedSchema.blocks)) {
        correctedSchema.blocks = correctedSchema.blocks.map((block, blockIndex) => {
            if (block.settings && Array.isArray(block.settings)) {
                block.settings = block.settings.map((field, fieldIndex) => {
                    const validation = validateSchemaField(field);
                    if (!validation.valid) {
                        errors.push(`Block ${blockIndex}, Setting ${fieldIndex}: ${validation.errors.join(', ')}`);
                    }
                    return validation.corrected || field;
                }).filter(field => field !== null);
            }
            return block;
        });
    }

    if (!correctedSchema.presets || !Array.isArray(correctedSchema.presets)) {
        correctedSchema.presets = [{
            name: "Default",
            blocks: []
        }];
        errors.push('Added missing presets section');
    }

    return {
        valid: errors.length === 0,
        errors,
        corrected: correctedSchema
    };
}

/**
 * Advanced schema field requirement analysis with context
 * @param {object} schema - Complete schema object
 * @returns {object} - Enhanced statistics with context analysis
 */
export function getAdvancedSchemaStats(schema) {
    const basicStats = getSchemaFieldStats(schema);
    const analysis = {
        ...basicStats,
        blockAnalysis: [],
        criticalMissing: [],
        recommendations: []
    };

    if (schema.blocks) {
        schema.blocks.forEach((block, index) => {
            const blockStats = {
                blockType: block.type || `Block ${index + 1}`,
                blockName: block.name || block.type,
                totalFields: 0,
                requiredFields: 0,
                optionalFields: 0,
                missingCritical: []
            };

            if (block.settings) {
                block.settings.forEach(field => {
                    blockStats.totalFields++;
                    const requirement = getEnhancedFieldRequirement(field, block);
                    if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                        blockStats.requiredFields++;
                    } else {
                        blockStats.optionalFields++;
                    }
                });
            }

            const criticalFieldsForType = getCriticalFieldsForBlockType(block.type);
            criticalFieldsForType.forEach(criticalField => {
                const hasField = block.settings?.some(field =>
                    field.id === criticalField.id ||
                    field.id.includes(criticalField.pattern)
                );
                if (!hasField) {
                    blockStats.missingCritical.push(criticalField);
                    analysis.criticalMissing.push({
                        blockType: block.type,
                        missing: criticalField
                    });
                }
            });

            analysis.blockAnalysis.push(blockStats);
        });
    }

    if (analysis.criticalMissing.length > 0) {
        analysis.recommendations.push(
            'Consider adding missing critical fields for better user experience'
        );
    }

    if (basicStats.requiredFields === 0) {
        analysis.recommendations.push(
            'Schema has no required fields - consider marking important fields as required'
        );
    }

    return analysis;
}

/**
 * Get critical fields that should exist for specific block types
 * @param {string} blockType - The type of block
 * @returns {array} - Array of critical field definitions
 */
function getCriticalFieldsForBlockType(blockType) {
    const criticalFields = {
        'header': [
            { id: 'logo_image', pattern: 'logo', description: 'Logo image for branding' },
            { id: 'nav_link_1_text', pattern: 'nav', description: 'Navigation links' }
        ],
        'button': [
            { id: 'button_text', pattern: 'text', description: 'Button text' },
            { id: 'button_url', pattern: 'url', description: 'Button URL' }
        ],
        'product': [
            { id: 'product_title', pattern: 'title', description: 'Product title' },
            { id: 'product_price', pattern: 'price', description: 'Product price' }
        ],
        'testimonial': [
            { id: 'customer_name', pattern: 'name', description: 'Customer name' },
            { id: 'testimonial_text', pattern: 'text', description: 'Testimonial content' }
        ],
        'feature': [
            { id: 'feature_title', pattern: 'title', description: 'Feature title' },
            { id: 'feature_description', pattern: 'description', description: 'Feature description' }
        ]
    };

    return criticalFields[blockType] || [];
}



================================================
FILE: src/utils/schemaProcessor.js
================================================
import { STANDARD_BLOCK_TYPES, getBlockTemplate } from './blockTemplates';

/**
 * Scans Liquid content for block type references
 * @param {string} liquidContent - The Liquid template content
 * @returns {array} - Array of block types found in the content
 */
export function scanLiquidForBlocks(liquidContent) {
    const blockTypes = new Set();

    const blockTypePattern = /block\.type\s*==\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = blockTypePattern.exec(liquidContent)) !== null) {
        blockTypes.add(match[1]);
    }

    const casePattern = /when\s+['"]([^'"]+)['"]/g;
    while ((match = casePattern.exec(liquidContent)) !== null) {
        blockTypes.add(match[1]);
    }

    const blockSettingsPattern = /block\.settings\.(\w+)/g;
    const settingsFound = new Set();

    while ((match = blockSettingsPattern.exec(liquidContent)) !== null) {
        settingsFound.add(match[1]);
    }

    Object.keys(STANDARD_BLOCK_TYPES).forEach(blockType => {
        const template = STANDARD_BLOCK_TYPES[blockType];
        if (template.settings) {
            const templateSettings = template.settings.map(s => s.id);
            const hasMatchingSettings = templateSettings.some(settingId =>
                settingsFound.has(settingId)
            );

            if (hasMatchingSettings) {
                blockTypes.add(blockType);
            }
        }
    });

    return Array.from(blockTypes);
}

/**
 * Checks if liquid content already has schema blocks
 * @param {string} liquidContent - The Liquid template content
 * @returns {object} - { hasSchema: boolean, hasSchemaTag: boolean, hasEndSchemaTag: boolean }
 */
export function checkExistingSchemaBlocks(liquidContent) {
    const hasSchemaTag = /{% schema %}/.test(liquidContent);
    const hasEndSchemaTag = /{% endschema %}/.test(liquidContent);
    const hasCompleteSchema = hasSchemaTag && hasEndSchemaTag;

    return {
        hasSchema: hasCompleteSchema,
        hasSchemaTag,
        hasEndSchemaTag,
        warning: hasSchemaTag !== hasEndSchemaTag ?
            'Incomplete schema block detected. Found opening or closing tag but not both.' : null
    };
}

/**
 * Extracts existing block definitions from schema
 * @param {string} liquidContent - The Liquid template content
 * @returns {object} - { blocks: array, settings: array, schema: object, hasExistingSchema: boolean }
 */
export function extractExistingSchema(liquidContent) {
    const schemaCheck = checkExistingSchemaBlocks(liquidContent);
    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            blocks: [],
            settings: [],
            schema: null,
            hasExistingSchema: false,
            schemaCheck
        };
    }

    try {
        const schema = JSON.parse(schemaMatch[1]);
        return {
            blocks: schema.blocks || [],
            settings: schema.settings || [],
            schema: schema,
            hasExistingSchema: true,
            schemaCheck
        };
    } catch (error) {
        console.error('Error parsing schema:', error);
        return {
            blocks: [],
            settings: [],
            schema: null,
            hasExistingSchema: false,
            schemaCheck,
            parseError: error.message
        };
    }
}

/**
 * Merges new block definitions into existing schema without overwriting
 * @param {object} existingSchema - The existing schema object
 * @param {array} usedBlockTypes - Array of block types found in the content
 * @param {string} sectionType - The section type for proper naming
 * @returns {object} - Updated schema with injected blocks
 */
export function injectMissingBlocks(existingSchema, usedBlockTypes, sectionType = null) {
    if (!existingSchema) {
        existingSchema = {
            name: sectionType ? formatSectionName(sectionType) : "Custom Section",
            settings: [],
            blocks: [],
            presets: [{
                name: "Default",
                blocks: []
            }]
        };
    }

    if (!existingSchema.presets || !Array.isArray(existingSchema.presets)) {
        existingSchema.presets = [{
            name: "Default",
            blocks: []
        }];
    }

    existingSchema.presets.forEach(preset => {
        if (!preset.blocks) {
            preset.blocks = [];
        }
    });

    if (!existingSchema.blocks) {
        existingSchema.blocks = [];
    }

    if (sectionType && existingSchema.name !== formatSectionName(sectionType)) {
        existingSchema.name = formatSectionName(sectionType);
    }

    const existingBlockTypes = new Set(
        existingSchema.blocks.map(block => block.type)
    );

    const injectedBlocks = [];

    usedBlockTypes.forEach(blockType => {
        if (!existingBlockTypes.has(blockType)) {
            const template = getBlockTemplate(blockType);

            if (template) {
                existingSchema.blocks.push(template);
                injectedBlocks.push(blockType);
            } else {
                console.warn(`Unknown block type: ${blockType}`);
            }
        }
    });

    return {
        schema: existingSchema,
        injectedBlocks
    };
}

/**
 * Formats section name to match Shopify naming conventions
 * @param {string} sectionType - The section type
 * @returns {string} - Formatted section name
 */
export function formatSectionName(sectionType) {
    return sectionType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Updates the complete Liquid content with the new schema
 * @param {string} liquidContent - Original Liquid content
 * @param {object} updatedSchema - Updated schema object
 * @param {boolean} skipIfExists - Skip injection if schema already exists
 * @returns {object} - { content: string, warnings: array }
 */
export function updateLiquidSchema(liquidContent, updatedSchema, skipIfExists = false) {
    const schemaCheck = checkExistingSchemaBlocks(liquidContent);
    const warnings = [];

    if (schemaCheck.warning) {
        warnings.push(schemaCheck.warning);
    }

    if (skipIfExists && schemaCheck.hasSchema) {
        warnings.push('Existing schema block detected. Skipping schema injection to prevent conflicts.');
        return { content: liquidContent, warnings };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}\n\n`;
        return {
            content: newSchemaBlock + liquidContent,
            warnings: warnings.concat(['New schema block added to the beginning of the file.'])
        };
    }

    const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}`;
    return {
        content: liquidContent.replace(schemaMatch[0], newSchemaBlock),
        warnings: warnings.concat(['Existing schema block updated.'])
    };
}

/**
 * Validates JSON structure for Shopify compatibility
 * @param {string} jsonString - JSON template string
 * @param {string} expectedSectionType - Expected section type
 * @returns {object} - { valid: boolean, error: string, corrected: string }
 */
export function validateAndFixJSON(jsonString, expectedSectionType) {
    try {
        const json = JSON.parse(jsonString);

        if (!json.sections) {
            return {
                valid: false,
                error: "JSON must have a 'sections' property",
                corrected: null
            };
        }

        if (!json.sections.main) {
            return {
                valid: false,
                error: "JSON must have a 'sections.main' property",
                corrected: null
            };
        }

        if (json.sections.main.type !== expectedSectionType) {
            json.sections.main.type = expectedSectionType;
        }

        if (!json.sections.main.settings) {
            json.sections.main.settings = {};
        }

        if (!json.sections.main.blocks) {
            json.sections.main.blocks = {};
        }

        return {
            valid: true,
            error: null,
            corrected: JSON.stringify(json, null, 2)
        };

    } catch (error) {
        return {
            valid: false,
            error: `Invalid JSON: ${error.message}`,
            corrected: null
        };
    }
}

/**
 * Validates that block types in JSON match schema definitions
 * @param {string} jsonString - JSON template string
 * @param {array} schemaBlocks - Array of block definitions from schema
 * @returns {object} - { valid: boolean, errors: array, fixed: string }
 */
export function validateBlockTypes(jsonString, schemaBlocks) {
    try {
        const json = JSON.parse(jsonString);
        const validBlockTypes = new Set(schemaBlocks.map(block => block.type));
        const errors = [];
        let hasChanges = false;

        if (json.sections && json.sections.main && json.sections.main.blocks) {
            Object.keys(json.sections.main.blocks).forEach(blockKey => {
                const block = json.sections.main.blocks[blockKey];

                if (!validBlockTypes.has(block.type)) {
                    const similarType = Array.from(validBlockTypes).find(validType =>
                        validType.includes(block.type) || block.type.includes(validType)
                    );

                    if (similarType) {
                        block.type = similarType;
                        hasChanges = true;
                    } else {
                        errors.push(`Block "${blockKey}" uses undefined type "${block.type}"`);
                    }
                }
            });
        }

        return {
            valid: errors.length === 0,
            errors,
            fixed: hasChanges ? JSON.stringify(json, null, 2) : jsonString
        };

    } catch (error) {
        return {
            valid: false,
            errors: [`Invalid JSON: ${error.message}`],
            fixed: jsonString
        };
    }
}

/**
 * Complete schema processing pipeline
 * @param {string} liquidContent - Original Liquid content
 * @param {string} jsonContent - Original JSON content
 * @param {string} sectionType - Expected section type
 * @returns {object} - Complete processing result
 */
export function processSchemaAndBlocks(liquidContent, jsonContent, sectionType) {
    const usedBlockTypes = scanLiquidForBlocks(liquidContent);

    const { schema: existingSchema, hasExistingSchema, schemaCheck } = extractExistingSchema(liquidContent);

    const { schema: updatedSchema, injectedBlocks } = injectMissingBlocks(
        existingSchema,
        usedBlockTypes,
        sectionType
    );

    const { content: updatedLiquid, warnings } = updateLiquidSchema(
        liquidContent,
        updatedSchema,
        false
    );

    const { valid: jsonValid, error: jsonError, corrected: correctedJSON } =
        validateAndFixJSON(jsonContent, sectionType);

    if (!jsonValid) {
        return {
            success: false,
            error: jsonError,
            liquidContent: updatedLiquid,
            jsonContent: jsonContent,
            warnings,
            schemaCheck
        };
    }

    const { valid: blocksValid, errors: blockErrors, fixed: fixedJSON } =
        validateBlockTypes(correctedJSON, updatedSchema.blocks);

    return {
        success: blocksValid,
        errors: blockErrors,
        liquidContent: updatedLiquid,
        jsonContent: fixedJSON,
        injectedBlocks,
        usedBlockTypes,
        processedSchema: updatedSchema,
        warnings,
        hasExistingSchema,
        schemaCheck
    };
}



================================================
FILE: src/utils/zipGenerator.js
================================================
/**
 * Generates ZIP file with proper Shopify folder structure
 */

/**
 * Generates README content for the ZIP file
 * @param {array} processedFiles - Array of processed file objects
 * @returns {string} - README content
 */
export function generateREADME(processedFiles) {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    let readme = `# Shopify Files Generated by HTML-to-Liquid Converter

Generated on: ${currentDate} at ${currentTime}

## Generated Files

`;

    processedFiles.forEach((file, index) => {
        readme += `### File ${index + 1}: ${file.originalFileName}\n`;
        readme += `- **Page Type**: ${file.pageType} (${file.templateType} template)\n`;
        readme += `- **Section File**: sections/${file.sectionName}.liquid\n`;

        let templateFile;
        switch (file.templateType) {
            case 'collection':
                templateFile = `templates/collection.${file.sectionName}.json`;
                break;
            case 'product':
                templateFile = `templates/product.${file.sectionName}.json`;
                break;
            case 'blog':
                templateFile = `templates/blog.${file.sectionName}.json`;
                break;
            default:
                templateFile = `templates/page.${file.sectionName}.json`;
        }
        readme += `- **Template File**: ${templateFile}\n`;

        if (file.hasLoop) {
            readme += `- **Dynamic Content**: Contains ${file.loopType} loop for ${file.pageType} page\n`;
        }

        if (file.detectionReason) {
            readme += `- **Detection**: ${file.detectionReason}\n`;
        }

        if (file.injectedBlocks && file.injectedBlocks.length > 0) {
            const blockTypes = file.injectedBlocks.map(block => {
                return typeof block === 'string' ? block : (block.type || String(block));
            });
            readme += `- **Auto-injected Blocks**: ${blockTypes.join(', ')}\n`;
        }

        if (file.filenameCorrected) {
            readme += `- **Filename Corrected**: Original "${file.originalFileName}" → Shopify-compatible "${file.sectionName}"\n`;
        }

        if (file.errors && file.errors.length > 0) {
            readme += `- **Warnings**: ${file.errors.join('; ')}\n`;
        }

        readme += '\n';
    });

    readme += `## Installation Instructions

1. **Upload Section Files**:
   - Copy all files from the \`sections/\` folder to your theme's \`sections/\` directory

2. **Upload Template Files**:
   - Copy all files from the \`templates/\` folder to your theme's \`templates/\` directory

3. **🎨 Install Theme Layout File (IMPORTANT)**:
   - **Location**: \`layout/theme.liquid\` (included in this ZIP)
   - **Action**: Replace your existing \`layout/theme.liquid\` file with the generated one
   - **⚠️ Critical**: Use EXACTLY this theme.liquid code - it contains all optimized styles, scripts, and Shopify liquid tags
   - **Backup**: Always backup your current theme.liquid before replacing
   - **Why**: This file integrates all your HTML resources into proper Shopify liquid format

4. **Assign Templates to Pages**:
   - In Shopify Admin, go to Online Store > Pages (for page templates)
   - For Collection templates: Go to Products > Collections, edit collection, assign template
   - For Product templates: Go to Products, edit product, assign template  
   - For Blog templates: Go to Online Store > Blog posts, edit blog, assign template

## 🎯 Page Type Detection & Template Usage

The converter automatically detects your page type and generates appropriate templates:

### 📄 **Page Templates** (page.name.json)
- **Used for**: Static pages (About, Contact, etc.)
- **Content**: Static content with editable sections
- **Assignment**: Online Store > Pages > Edit page > Template

### 🛒 **Collection Templates** (collection.name.json)  
- **Used for**: Shop pages, product listings, catalogs
- **Content**: \`{% for product in collection.products %}\` loops
- **Features**: Product cards, filtering, pagination support
- **Assignment**: Products > Collections > Edit collection > Template

### 🎁 **Product Templates** (product.name.json)
- **Used for**: Individual product pages
- **Content**: Product variables (\`{{ product.title }}\`, \`{{ product.price }}\`)
- **Features**: Variant selectors, add to cart forms
- **Assignment**: Products > Edit product > Template

### 📝 **Blog Templates** (blog.name.json)
- **Used for**: Blog listing pages, news sections
- **Content**: \`{% for article in blog.articles %}\` loops  
- **Features**: Article listings with excerpts and dates
- **Assignment**: Online Store > Blog posts > Edit blog > Template

### 🤖 **Smart Detection Features**:
- **Filename Analysis**: Detects "shop", "product", "blog" in filenames
- **HTML Pattern Recognition**: Identifies product cards, blog posts, product details
- **Content Structure**: Analyzes pricing, images, buttons, dates
- **Loop Generation**: Automatically wraps detected patterns in Shopify loops

## Schema Field Requirements Guide

### 🚨 Required Fields (marked with *)
These fields are **essential** for proper section functionality and must be filled:

**Critical Section Fields:**
- Section Name/Title fields - Essential for identifying the section in Theme Editor
- Primary heading fields - Main content headings (H1, H2, etc.)
- Block Type fields - Required for proper block functionality and content structure
- Navigation link fields - For sections with navigation menus
- Form action URLs - For sections containing contact forms or signup forms
- Primary CTA button text - Main call-to-action buttons

**When to Fill Required Fields:**
- ✅ **Always fill these first** - They prevent layout breaking
- ✅ **Use descriptive content** - Helps with SEO and user experience  
- ✅ **Cannot be left empty** - Section may not display correctly

### ✅ Optional Fields (enhance functionality)
These fields have sensible defaults and can be customized as needed:

**Enhancement Fields:**
- Description fields - Supplementary text content
- Image alt text - Accessibility improvement (defaults to filename)
- Color scheme settings - Will use theme defaults if not specified
- Advanced layout settings - Additional customization options
- Decorative elements - Icons, dividers, background effects
- Secondary buttons - Additional CTA options
- Social media links - External platform connections

**When to Use Optional Fields:**
- ✅ **Customize as needed** - Enhance the design after required fields are filled
- ✅ **Can be left empty** - Will gracefully use defaults
- ✅ **Perfect for fine-tuning** - Adjust colors, spacing, and styling

### 📋 Field Identification in Shopify Theme Editor:
- **Required fields**: Show with `* ` asterisk in their labels
- **Optional fields**: Show helpful placeholder text and descriptions
- **All fields**: Include detailed descriptions explaining their purpose
- **Default values**: Pre-filled with sensible content for faster setup

### 🎯 Best Practices for Theme Editor Usage:
1. **Start with Required Fields** - Fill these first before customizing optional ones
2. **Use Descriptive Content** - Required fields help with SEO when filled properly
3. **Test Thoroughly** - Required fields ensure your section displays correctly
4. **Customize Gradually** - Use optional fields to fine-tune the design after basics work

### 🔧 Technical Details:
- Required fields use validation to prevent empty states
- Optional fields degrade gracefully when empty
- All field types include appropriate input validation
- Block limit settings prevent content overflow

## Block Types Auto-Injected

The following block types were automatically added to section schemas:

`;

    const allInjectedBlocks = new Set();
    processedFiles.forEach(file => {
        if (file.injectedBlocks) {
            file.injectedBlocks.forEach(block => {
                const blockType = typeof block === 'string' ? block : (block.type || block);
                allInjectedBlocks.add(blockType);
            });
        }
    });

    if (allInjectedBlocks.size > 0) {
        Array.from(allInjectedBlocks).forEach(blockType => {
            const blockTypeStr = String(blockType);
            readme += `- **${blockTypeStr}**: Standard Shopify block for ${blockTypeStr.replace('_', ' ')} content\n`;
        });
    } else {
        readme += 'No blocks were auto-injected. All required blocks were already defined.\n';
    }

    readme += `
## 🎨 Theme.liquid File Instructions

### What is theme.liquid?
The \`layout/theme.liquid\` file is the main template that wraps around all your Shopify pages. It contains:
- All CSS styles from your HTML files
- All JavaScript functionality  
- Proper Shopify liquid tags
- SEO meta tags and structured data
- Complete HTML document structure

### How to Use the Generated theme.liquid:
1. **📁 File Location**: Find \`layout/theme.liquid\` in this ZIP package
2. **💾 Backup First**: Always backup your current theme.liquid file
3. **🔄 Replace**: Replace your existing theme.liquid with the generated one
4. **✅ Use Exact Code**: The generated theme.liquid contains optimized, production-ready code
5. **🚫 Don't Modify**: Use the exact code provided - it's already optimized for Shopify

### Why This theme.liquid Code is Important:
- ✅ **Optimized Performance**: All CSS/JS is minified and organized
- ✅ **Shopify Compatible**: Uses proper liquid syntax and variables
- ✅ **SEO Ready**: Includes all necessary meta tags and structured data
- ✅ **Responsive**: Mobile-first design with proper viewport settings
- ✅ **Production Ready**: Tested and validated for Shopify standards

## File Naming Corrections

`;

    const correctedFiles = processedFiles.filter(file => file.filenameCorrected);
    if (correctedFiles.length > 0) {
        correctedFiles.forEach(file => {
            readme += `- \`${file.originalFileName}\` → \`${file.sectionName}\` (Shopify naming compliance)\n`;
        });
    } else {
        readme += 'All filenames were already Shopify-compatible.\n';
    }

    readme += `
## Theme Editor Usage

After installation, you can customize these sections in the Shopify Theme Editor:

1. Go to Online Store > Themes > Customize
2. Navigate to the pages using these templates
3. All content is now editable through the visual editor
4. Use the blocks feature to add/remove repeating content dynamically

## Technical Details

- **Total Files Generated**: ${processedFiles.length * 2 + 1} files (${processedFiles.length} .liquid + ${processedFiles.length} .json + 1 theme.liquid)
- **Block Types Used**: ${allInjectedBlocks.size} unique block types
- **Theme Layout**: Complete theme.liquid file with all styles and scripts integrated
- **Shopify Compatibility**: All files follow Shopify naming conventions and structure requirements

## Support

If you encounter any issues:
1. Verify all files are uploaded to the correct directories
2. Check that template assignments are correct in page settings
3. **IMPORTANT**: Ensure you're using the exact theme.liquid file provided in layout/theme.liquid
4. Always backup your original theme.liquid before replacing
5. Test your theme in preview mode before publishing

Generated by HTML-to-Liquid Converter
`;

    return readme;
}

/**
 * Adds file header comment to content
 * @param {string} content - File content
 * @param {string} fileType - Type of file ('liquid' or 'json')
 * @param {string} filename - Name of the file
 * @returns {string} - Content with header comment
 */
export function addFileComment(content, fileType, filename, metadata = {}) {
    const timestamp = new Date().toISOString();

    if (fileType === 'liquid') {
        let comment = `{%- comment -%}
Generated by HTML-to-Liquid Converter
File: ${filename}
Generated: ${timestamp}`;

        if (metadata.pageType) {
            comment += `
Page Type: ${metadata.pageType}
Template Type: ${metadata.templateType}`;

            if (metadata.hasLoop) {
                comment += `
Contains Loop: Yes (${metadata.loopType})`;
            }
        }

        comment += `
Do not edit unless needed - regenerate from source HTML if major changes required
{%- endcomment -%}

`;
        return comment + content;
    } else if (fileType === 'json') {
        return content;
    }

    return content;
}

/**
 * Generates the theme.liquid layout file
 * @param {string} combinedHeadContent - Combined head content from all files
 * @returns {string} - Formatted theme.liquid content
 */
export function generateThemeLayoutFile(combinedHeadContent) {
    if (!combinedHeadContent || combinedHeadContent.trim() === '') {
        return null;
    }

    const comment = `{%- comment -%}
Complete Theme Layout File - Generated by HTML-to-Liquid Converter
This file replaces your existing layout/theme.liquid file
Generated: ${new Date().toISOString()}
{%- endcomment -%}

`;

    return comment + combinedHeadContent.trim();
}

/**
 * Prepares files for ZIP generation
 * @param {array} convertedFiles - Array of converted file objects
 * @param {string} combinedHeadContent - Combined head content
 * @returns {object} - Files organized for ZIP structure
 */
export function prepareFilesForZip(convertedFiles, combinedHeadContent) {
    const zipFiles = {
        sections: {},
        templates: {},
        layout: {},
        readme: null
    };

    const processedFiles = [];

    convertedFiles.forEach((file, index) => {
        const sectionName = file.sectionName || `page-${index + 1}`;
        const originalFileName = file.originalFile?.fileName || `file-${index + 1}.html`;

        const pageType = file.metadata?.pageType || 'page';
        const templateType = file.metadata?.templateType || 'page';
        const hasLoop = file.metadata?.hasLoop || false;
        const loopType = file.metadata?.loopType || null;

        const processedFile = {
            originalFileName,
            sectionName,
            pageType,
            templateType,
            hasLoop,
            loopType,
            injectedBlocks: file.injectedBlocks || [],
            filenameCorrected: file.filenameCorrected || false,
            errors: file.processingErrors || [],
            detectionReason: file.metadata?.detectionReason || 'Default page template'
        };

        processedFiles.push(processedFile);

        if (file.liquidContent) {
            const liquidWithComment = addFileComment(
                file.liquidContent,
                'liquid',
                `sections/${sectionName}.liquid`,
                {
                    pageType,
                    templateType,
                    hasLoop,
                    loopType
                }
            );
            zipFiles.sections[`${sectionName}.liquid`] = liquidWithComment;
        }

        if (file.jsonTemplate) {
            let templateFileName;

            switch (templateType) {
                case 'collection':
                    templateFileName = `collection.${sectionName}.json`;
                    break;
                case 'product':
                    templateFileName = `product.${sectionName}.json`;
                    break;
                case 'blog':
                    templateFileName = `blog.${sectionName}.json`;
                    break;
                default:
                    templateFileName = `page.${sectionName}.json`;
            }

            const jsonWithComment = addFileComment(
                file.jsonTemplate,
                'json',
                `templates/${templateFileName}`,
                {
                    pageType,
                    templateType,
                    hasLoop,
                    loopType
                }
            );
            zipFiles.templates[templateFileName] = jsonWithComment;
        }
    });

    const themeLayoutFile = generateThemeLayoutFile(combinedHeadContent);
    if (themeLayoutFile) {
        zipFiles.layout['theme.liquid'] = themeLayoutFile;
    }

    zipFiles.readme = generateREADME(processedFiles);

    return zipFiles;
}

/**
 * Creates a download blob for the ZIP file
 * @param {object} zipFiles - Files organized for ZIP
 * @returns {Promise<Blob>} - ZIP file blob
 */
export async function createZipBlob(zipFiles) {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    const sectionsFolder = zip.folder('sections');
    Object.keys(zipFiles.sections).forEach(filename => {
        sectionsFolder.file(filename, zipFiles.sections[filename]);
    });

    const templatesFolder = zip.folder('templates');
    Object.keys(zipFiles.templates).forEach(filename => {
        templatesFolder.file(filename, zipFiles.templates[filename]);
    });

    if (Object.keys(zipFiles.layout).length > 0) {
        const layoutFolder = zip.folder('layout');
        Object.keys(zipFiles.layout).forEach(filename => {
            layoutFolder.file(filename, zipFiles.layout[filename]);
        });
    }

    if (zipFiles.readme) {
        zip.file('README.txt', zipFiles.readme);
    }

    return await zip.generateAsync({ type: 'blob' });
}

/**
 * Downloads the ZIP file
 * @param {Blob} zipBlob - ZIP file blob
 * @param {string} filename - ZIP filename
 */
export function downloadZip(zipBlob, filename = 'shopify-files.zip') {
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Complete ZIP generation and download process
 * @param {array} convertedFiles - Array of converted files
 * @param {string} combinedHeadContent - Combined head content
 * @param {string} zipFilename - Name for the ZIP file
 * @returns {Promise<void>}
 */
export async function generateAndDownloadZip(convertedFiles, combinedHeadContent, zipFilename = 'shopify-files.zip') {
    try {
        const zipFiles = prepareFilesForZip(convertedFiles, combinedHeadContent);

        const zipBlob = await createZipBlob(zipFiles);

        downloadZip(zipBlob, zipFilename);

        return { success: true };
    } catch (error) {
        console.error('Error generating ZIP:', error);
        return { success: false, error: error.message };
    }
}



================================================
FILE: .github/workflows/ubuntu-deploy.yml
================================================
name: Deploy to VPS

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Install SSH Client
        run: sudo apt-get install -y openssh-client

      - name: Deploy to Server (Using Password)
        run: |
          sshpass -p "${{ secrets.SSH_PASSWORD }}" ssh -o StrictHostKeyChecking=no -p ${{ secrets.PORT }} ${{ secrets.USERNAME }}@${{ secrets.HOST }} << 'EOF'
            echo "🚀 Connected to VPS Successfully!"
            ls
            cd html-to-liquid/
            chmod +x .scripts/deploy.sh
            echo "🚀 Running deployment script..."
            .scripts/deploy.sh || { echo "❌ Deployment Failed!"; exit 1; }
            echo "✅ Deployment Complete!"
          EOF



================================================
FILE: .github/workflows/vercel-deploy.yml
================================================
name: Conditional Vercel Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Check Actor and Trigger Deploy (if not owner)
        if: github.actor != 'OsamaHussain'
        run: |
          echo "Push by ${{ github.actor }}, triggering deploy..."
          curl -X POST "${{ secrets.VERCEL_DEPLOY_HOOK_URL }}"

      - name: Skip Deploy (if owner)
        if: github.actor == 'OsamaHussain'
        run: |
          echo "Push by repository owner (${{ github.actor }}), skipping deploy."



================================================
FILE: .scripts/deploy.sh
================================================
#!/bin/bash
set -e  # Stop script execution on any error

echo "🚀 Deployment started..."

# Ensure the repository is clean before pulling latest changes
echo "⚠️ Checking for unstaged changes..."
if [[ $(git status --porcelain) ]]; then
  echo "⚠️ Unstaged changes detected! Resetting repository..."
  git reset --hard HEAD
  git clean -fd
fi

# Fetch and reset to the latest master branch from GitHub
echo "📦 Fetching latest code..."
git fetch origin master || { echo "❌ ERROR: Git fetch failed!"; exit 1; }

echo "🔄 Resetting to latest master..."
git reset --hard origin/master || { echo "❌ ERROR: Git reset failed!"; exit 1; }

echo "📂 Pulling latest changes..."
git pull origin master || { echo "❌ ERROR: Git pull failed!"; exit 1; }
echo "✅ New changes copied to server!"

# Install dependencies (force to avoid conflicts)
echo "📦 Installing Dependencies..."
npm install --force --yes || { echo "❌ ERROR: npm install failed!"; exit 1; }

# Build the application
echo "⚙️ Creating master Build..."
npm run build || { echo "❌ ERROR: Build failed!"; exit 1; }

# Reload PM2 process
echo "♻️ Restarting PM2..."
pm2 restart html-to-liquid || { echo "❌ ERROR: PM2 reload failed!"; exit 1; }

echo "✅ Deployment Finished Successfully!"

