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
