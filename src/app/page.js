"use client";
import { useState } from "react";
import { HTMLHint } from "htmlhint";

export default function Home() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState(""); const [isLoading, setIsLoading] = useState(false);
  const validateAndExtractHtml = (text) => {
    try {
      const htmlTagRegex = /<[^>]+>/g;
      const hasHtmlTags = htmlTagRegex.test(text);

      if (!hasHtmlTags) {
        return {
          isValid: false,
          content: '',
          error: 'No HTML content found in this file.'
        };
      }

      const htmlhintConfig = {
        "tagname-lowercase": true,
        "attr-lowercase": true,
        "attr-value-double-quotes": true,
        "doctype-first": false,
        "tag-pair": true,
        "spec-char-escape": true,
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

        return {
          isValid: false,
          content: '',
          error: `HTML validation errors found:\n\n${errors.map((err, i) => `${i + 1}. ${err}`).join('\n')}\n\nPlease fix these issues in your HTML file first.`
        };
      }

      return {
        isValid: true,
        content: text,
        error: null
      };

    } catch (error) {
      return {
        isValid: false,
        content: '',
        error: `HTML validation error: ${error.message}\n\nPlease check your HTML syntax and try again.`
      };
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const allowedExtensions = ['.html'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please select only .html files');
      event.target.value = '';
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const reader = new FileReader(); reader.onload = (e) => {
        const rawText = e.target.result;
        const result = validateAndExtractHtml(rawText);

        if (!result.isValid) {
          alert(result.error);
          setFileContent('');
          setFileName('');
          event.target.value = '';
          setIsLoading(false);
          return;
        }

        setFileContent(result.content);
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (error) {
      alert('Error reading file: ' + error.message);
      setFileContent('');
      setFileName('');
      event.target.value = ''; setIsLoading(false);
    }
  };

  const clearContent = () => {
    setFileContent('');
    setFileName('');
    document.getElementById('fileInput').value = '';
  };
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            ✨ AI HTML Validator & Extractor
          </h1>
          <p style={{
            margin: '8px 0 0 0',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px'
          }}>
            Intelligent HTML validation with real-time feedback
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Upload Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>📁</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '600',
              color: '#2d3748'
            }}>
              Upload HTML File
            </h2>
          </div>

          <div style={{
            border: '2px dashed #cbd5e0',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            background: '#f7fafc',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}>
            <input
              id="fileInput"
              type="file"
              accept=".html"
              onChange={handleFileUpload}
              disabled={isLoading}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            />
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>
              {isLoading ? '⏳' : '☁️'}
            </div>
            <p style={{
              margin: '0 0 10px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#4a5568'
            }}>
              {isLoading ? 'Processing your file...' : 'Click to upload or drag & drop'}
            </p>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#718096'
            }}>
              Only .html files are supported
            </p>
          </div>

          {fileName && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'linear-gradient(45deg, #48bb78, #38a169)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>✅</span>
                <span style={{ color: 'white', fontWeight: '500' }}>
                  {fileName}
                </span>
              </div>
              <button
                onClick={clearContent}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                🗑️ Clear
              </button>
            </div>
          )}
        </div>

        {/* Content Display Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(45deg, #ed8936, #dd6b20)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>📝</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '600',
              color: '#2d3748'
            }}>
              Validated HTML Content
            </h2>
          </div>

          <div style={{
            position: 'relative',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              background: '#2d3748',
              padding: '15px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', marginRight: '15px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
                </div>
                <span style={{ color: '#a0aec0', fontSize: '14px' }}>
                  {fileName || 'No file selected'}
                </span>
              </div>
              <span style={{
                color: '#68d391',
                fontSize: '12px',
                background: 'rgba(104, 211, 145, 0.1)',
                padding: '4px 8px',
                borderRadius: '6px'
              }}>
                HTML
              </span>
            </div>
            <textarea
              value={fileContent}
              readOnly
              placeholder="🤖 Your validated HTML content will appear here...

✨ Upload an HTML file to see the magic happen!
🔍 I'll validate it for errors and display clean content
⚡ Real-time validation with detailed error reports"
              style={{
                width: '100%',
                height: '400px',
                padding: '20px',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                fontFamily: '"Fira Code", "Monaco", "Cascadia Code", monospace',
                lineHeight: '1.6',
                background: '#1a202c',
                color: '#e2e8f0',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            ✨ Powered by HTMLHint • Built with ❤️ by Hassan
          </p>
        </div>
      </div>
    </div>
  );
}
