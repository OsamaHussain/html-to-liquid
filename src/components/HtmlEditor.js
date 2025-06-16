import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function HtmlEditor({
    fileContent,
    fileName,
    handleManualInput
}) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
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
                    HTML Editor & Validator
                </h2>
                {fileContent && (
                    <button
                        onClick={() => setShowPreview(true)}
                        style={{
                            background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(26, 143, 58, 0.3)',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(26, 143, 58, 0.4)';
                            e.target.style.background = 'linear-gradient(135deg, #0c6f30 0%, #1ea042 100%)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(26, 143, 58, 0.3)';
                            e.target.style.background = 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)';
                        }}
                    >
                        👁️ Preview
                    </button>
                )}
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
                                cursorSmoothCaretAnimation: 'on',
                                autoIndent: 'full',
                                formatOnPaste: true,
                                formatOnType: true,
                                tabCompletion: 'on',
                                acceptSuggestionOnEnter: 'on',
                                scrollbar: {
                                    verticalScrollbarSize: 12,
                                    horizontalScrollbarSize: 12,
                                    arrowSize: 11
                                }
                            }}
                            loading={
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    fontFamily: '"Fira Code", monospace'
                                }}>
                                    Loading HTML Editor...
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            {showPreview && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
                        borderRadius: '20px',
                        width: '90%',
                        maxWidth: '1200px',
                        height: '90%',
                        maxHeight: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                            padding: '20px 25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <h3 style={{
                                margin: 0,
                                color: '#ffffff',
                                fontSize: '18px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                👁️ HTML Preview - {fileName || 'Untitled'}
                            </h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                ❌ Close
                            </button>
                        </div>

                        <div style={{
                            flex: 1,
                            background: '#ffffff',
                            overflow: 'auto',
                            border: '2px solid rgba(255, 255, 255, 0.1)',
                            margin: '20px',
                            borderRadius: '15px'
                        }}>
                            <iframe
                                srcDoc={fileContent}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    borderRadius: '15px'
                                }}
                                title="HTML Preview"
                                sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
