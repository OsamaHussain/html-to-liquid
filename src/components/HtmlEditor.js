export default function HtmlEditor({
    fileContent,
    fileName,
    handleManualInput
}) {
    let lineNumbersRef = null;

    const handleScroll = (e) => {
        const textareaElement = e.target;
        if (lineNumbersRef) {
            lineNumbersRef.scrollTop = textareaElement.scrollTop;
        }
    };

    return (
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
                    fontSize: '24px',
                    fontWeight: '700',
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
                <div style={{
                    display: 'flex',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                    position: 'relative'
                }}>
                    <div
                        ref={(el) => lineNumbersRef = el}
                        className="line-numbers"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRight: '2px solid rgba(255, 255, 255, 0.15)',
                            padding: '25px 15px',
                            color: '#888',
                            fontSize: '15px',
                            fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                            lineHeight: '1.7',
                            userSelect: 'none',
                            minWidth: '60px',
                            textAlign: 'right',
                            overflow: 'hidden',
                            maxHeight: '450px',
                            pointerEvents: 'none'
                        }}>
                        {fileContent && fileContent
                            .split('\n')
                            .map((_, index) => (
                                <div key={index} style={{
                                    height: '25.5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}>
                                    {index + 1}
                                </div>
                            ))
                        }
                    </div>
                    <textarea
                        value={fileContent}
                        onChange={(e) => handleManualInput(e.target.value)}
                        onScroll={handleScroll}
                        placeholder="🤖 Unified HTML Editor - Upload file above OR paste/type content here!"
                        style={{
                            flex: 1,
                            height: '450px',
                            padding: '25px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '15px',
                            fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                            lineHeight: '1.7',
                            background: 'transparent',
                            color: '#f0f0f0',
                            resize: 'vertical',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
