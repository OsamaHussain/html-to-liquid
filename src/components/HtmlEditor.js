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
                onFileNameChange && onFileNameChange(index, baseFileName);
                onFileUpload(index, baseFileName, result.content);
            };

            reader.onerror = () => {
                onValidationError('Error reading file. Please try again.');
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
                    onChange={(e) => handleFileNameChange(e.target.value)}
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
                                onChange={(value) => handleManualInput(value || '')}
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
