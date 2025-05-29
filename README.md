# ⚡ AI HTML to Liquid Converter

A modern web application that validates HTML files and converts them to Shopify Liquid templates using OpenAI's GPT-4.

## 🌟 Features

- **HTML Validation**: Advanced HTML validation using HTMLHint with detailed error reporting
- **AI-Powered Conversion**: Convert HTML to Liquid templates using OpenAI GPT-4
- **Real-time Feedback**: Instant validation and error detection
- **Download Options**: Download both Liquid files and conversion metadata
- **Modern UI**: Beautiful, responsive interface with dark theme
- **Error Handling**: Comprehensive error handling and user feedback

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

1. **Upload HTML File**: Click the upload area and select an HTML file
2. **Validation**: The file will be automatically validated for HTML errors
3. **View Content**: If valid, the HTML content will be displayed
4. **Convert to Liquid**: Click "Convert to Liquid" to transform HTML to Liquid template
5. **Download**: Download the converted Liquid file and metadata JSON

## 🔄 API Endpoints

### POST `/api/convert-html`

Converts HTML content to Liquid template format.

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
    "recommendations": [ ... ]
  }
}
```

## 🛠️ Built With

- **Next.js 15** - React framework
- **OpenAI API** - AI-powered HTML to Liquid conversion
- **HTMLHint** - HTML validation library
- **React 19** - UI library

## 📝 Notes

- Only `.html` files are supported for upload
- The AI conversion uses GPT-4 for optimal results
- Conversion metadata excludes the original HTML content as requested
- All conversions include comprehensive metadata and statistics

---

Updated @30/05/2025

Hassan
