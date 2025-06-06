import Editor from '@monaco-editor/react';

export default function CodeViewer({
    content,
    fileName,
    fileType,
    title,
    onDownload,
    readOnly = true
}) {
    const getLanguage = () => {
        switch (fileType?.toLowerCase()) {
            case 'html':
            case 'liquid':
                return 'html';
            case 'css':
                return 'css';
            case 'javascript':
            case 'js':
                return 'javascript';
            case 'json':
                return 'json';
            case 'xml':
                return 'xml';
            case 'markdown':
            case 'md':
                return 'markdown';
            default:
                return 'plaintext';
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
                background: '#1E1E1E',
                position: 'relative',
                borderRadius: '0 0 15px 15px',
                paddingLeft: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
            }}>
                <div style={{
                    width: '100%',
                    height: fileType === 'JSON' ? 'clamp(250px, 40vh, 300px)' : 'clamp(300px, 50vh, 400px)'
                }}>
                    <Editor
                        height="100%"
                        language={getLanguage()}
                        value={typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                        theme="vs-dark"
                        options={{
                            readOnly: readOnly,
                            minimap: { enabled: true },
                            lineNumbers: 'on',
                            lineNumbersMinChars: 3,
                            glyphMargin: false,
                            folding: true,
                            lineDecorationsWidth: 10,
                            lineNumbersMinChars: 4,
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
                            suggest: {
                                enabled: !readOnly
                            },
                            quickSuggestions: !readOnly,
                            parameterHints: { enabled: !readOnly },
                            hover: { enabled: true },
                            contextmenu: true,
                            mouseWheelZoom: true,
                            smoothScrolling: true,
                            cursorSmoothCaretAnimation: 'on',
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
                                Loading Monaco Editor...
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
