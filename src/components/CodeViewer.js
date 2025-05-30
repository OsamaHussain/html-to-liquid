export default function CodeViewer({
    content,
    fileName,
    fileType,
    title,
    onDownload,
    readOnly = true
}) {
    return (
        <div style={{
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
                        {title}
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
                            fontSize: '12px',
                            fontWeight: '700',
                            transition: 'all 0.2s ease',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
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
                    )}
                </div>
            </div>
            {fileType === 'JSON' ? (
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
                    {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                </pre>
            ) : (
                <textarea
                    value={content}
                    readOnly={readOnly}
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
            )}
        </div>
    );
}
