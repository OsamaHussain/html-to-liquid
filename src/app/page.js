"use client";
import { useState } from "react";
import { HTMLHint } from "htmlhint";
import ErrorPopup from "../components/ErrorPopup";

export default function Home() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [liquidContent, setLiquidContent] = useState("");
  const [conversionMetadata, setConversionMetadata] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");
  const [inputSource, setInputSource] = useState("");
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
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.')); if (!allowedExtensions.includes(fileExtension)) {
      setValidationErrors('Please select only .html files. Only HTML files are supported for validation.');
      setShowErrorPopup(true);
      event.target.value = '';
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const reader = new FileReader(); reader.onload = (e) => {
        const rawText = e.target.result;
        const result = validateAndExtractHtml(rawText); if (!result.isValid) {
          setValidationErrors(result.error);
          setShowErrorPopup(true);
          setFileContent('');
          setFileName('');
          event.target.value = '';
          setIsLoading(false);
          return;
        } setFileContent(result.content);
        setInputSource("file");
        setIsLoading(false);
      }; reader.onerror = () => {
        setValidationErrors('Error reading file. Please try again.');
        setShowErrorPopup(true);
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (error) {
      setValidationErrors('Error reading file: ' + error.message);
      setShowErrorPopup(true);
      setFileContent('');
      setFileName('');
      event.target.value = '';
      setIsLoading(false);
    }
  };
  const handleManualInput = (text) => {
    setConversionError('');
    setLiquidContent('');
    setConversionMetadata(null);

    setFileContent(text);
    setInputSource(text.trim() ? "manual" : "");
  };

  const clearContent = () => {
    setFileContent('');
    setFileName('');
    setLiquidContent('');
    setConversionMetadata(null);
    setConversionError('');
    setInputSource('');
    document.getElementById('fileInput').value = '';
  };
  const convertToLiquid = async () => {
    if (!fileContent) {
      setConversionError('No HTML content to convert');
      return;
    }

    const result = validateAndExtractHtml(fileContent);
    if (!result.isValid) {
      setValidationErrors(result.error);
      setShowErrorPopup(true);
      setConversionError('Please fix HTML validation errors before converting');
      return;
    }

    setIsConverting(true);
    setConversionError('');

    try {
      const response = await fetch('/api/convert-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileContent,
          fileName: fileName || (inputSource === "manual" ? "manual-input.html" : "uploaded-file.html"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }

      setLiquidContent(data.liquidContent);
      setConversionMetadata(data.metadata);
    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadLiquidFile = () => {
    if (!liquidContent) return;

    const blob = new Blob([liquidContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadMetadataJson = () => {
    if (!conversionMetadata) return;

    const blob = new Blob([JSON.stringify(conversionMetadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace('.html', '_metadata.json') : 'conversion_metadata.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }; return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '25px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            letterSpacing: '1px'
          }}>
            ⚡ AI HTML to Liquid Converter
          </h1>
          <p style={{
            margin: '12px 0 0 0',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '500'
          }}>
            Intelligent HTML validation with AI-powered Liquid conversion
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
          borderRadius: '25px',
          padding: '35px',
          marginBottom: '35px',
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
            marginBottom: '25px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
              boxShadow: '0 8px 16px rgba(0, 212, 255, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>📁</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Upload HTML File
            </h2>
          </div>

          <div style={{
            border: '2px dashed rgba(0, 212, 255, 0.3)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
            backdropFilter: 'blur(10px)'
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
            <div style={{
              fontSize: '60px',
              marginBottom: '20px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}>
              {isLoading ? '⏳' : '☁️'}
            </div>
            <p style={{
              margin: '0 0 15px 0',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {isLoading ? 'Processing your file...' : 'Click to upload or drag & drop'}
            </p>
            <p style={{
              margin: 0,
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '500'
            }}>
              Only .html files are supported
            </p>
          </div>
          {fileName && (
            <div style={{
              marginTop: '25px',
              padding: '20px',
              background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 10px 20px rgba(0, 255, 136, 0.2)',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontSize: '24px',
                  marginRight: '15px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>✅</span>
                <span style={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: '16px',
                  textShadow: '0 1px 2px rgba(255,255,255,0.1)'
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
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '700',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.2)'}
              >
                🗑️ Clear
              </button>
            </div>
          )}
        </div>

        <div style={{
          background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
          borderRadius: '25px',
          padding: '35px',
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
            background: 'radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 0, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #ff00ff 0%, #cc0099 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
              boxShadow: '0 8px 16px rgba(255, 0, 255, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>📝</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '24px', fontWeight: '700',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              HTML Editor & Validator
            </h2>
          </div>
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
              padding: '20px 25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)' }}></div>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)' }}></div>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27ca3f', boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)' }}></div>
                </div>
                <span style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>
                  {fileName || 'No file selected'}
                </span>
              </div>
              <span style={{
                color: '#ffffff',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                HTML
              </span>
            </div>
            <textarea
              value={fileContent}
              onChange={(e) => handleManualInput(e.target.value)} placeholder="🤖 Unified HTML Editor - Upload file above OR paste/type content here!"
              style={{
                width: '100%',
                height: '450px',
                padding: '25px',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                lineHeight: '1.7',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                color: '#f0f0f0',
                resize: 'vertical',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
              }}
            />
          </div>
        </div>

        {fileContent && (
          <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: '25px',
            padding: '35px',
            marginTop: '35px',
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
              marginBottom: '25px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                  boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)'
                }}>
                  <span style={{ color: 'white', fontSize: '24px' }}>🚀</span>
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Convert to Liquid Template
                </h2>
              </div>

              <button
                onClick={convertToLiquid}
                disabled={isConverting || !fileContent}
                style={{
                  background: isConverting
                    ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                    : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  color: isConverting ? '#ccc' : '#000000',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px 30px',
                  cursor: isConverting ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  boxShadow: isConverting
                    ? '0 4px 8px rgba(0,0,0,0.2)'
                    : '0 8px 16px rgba(0, 255, 136, 0.3)',
                  transform: isConverting ? 'scale(0.98)' : 'scale(1)',
                  opacity: isConverting ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!isConverting) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 12px 24px rgba(0, 255, 136, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isConverting) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 8px 16px rgba(0, 255, 136, 0.3)';
                  }
                }}
              >
                {isConverting ? '⏳ Converting...' : '🚀 Convert to Liquid'}
              </button>
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

            {liquidContent && (<div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              zIndex: 1,
              marginBottom: '25px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                padding: '20px 25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)' }}></div>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)' }}></div>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27ca3f', boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)' }}></div>
                  </div>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}>
                    {fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    LIQUID
                  </span>
                  <button
                    onClick={downloadLiquidFile}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '700',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
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
                </div>
              </div>
              <textarea
                value={liquidContent}
                readOnly
                style={{
                  width: '100%',
                  height: '400px',
                  padding: '25px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                  lineHeight: '1.7',
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                  color: '#f0f0f0',
                  resize: 'vertical',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                }}
              />
            </div>
            )}
            {conversionMetadata && (
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                zIndex: 1
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)' }}></div>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)' }}></div>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27ca3f', boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)' }}>

                      </div>
                    </div>
                    <span style={{
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '600',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>
                      metadata.json
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{
                      color: '#ffffff',
                      fontSize: '14px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                      JSON
                    </span>
                    <button
                      onClick={downloadMetadataJson}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
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
                  </div>
                </div>
                <pre style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                  color: '#f0f0f0',
                  padding: '25px',
                  fontSize: '13px',
                  fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                  lineHeight: '1.6',
                  margin: 0,
                  overflow: 'auto',
                  maxHeight: '300px',
                  border: 'none',
                  outline: 'none',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                }}>
                  {JSON.stringify(conversionMetadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        fileName={fileName}
      />
    </div>
  );
}
