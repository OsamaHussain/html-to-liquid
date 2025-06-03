import CodeViewer from './CodeViewer';
export default function ConversionSection({
    fileContent,
    fileName,
    isConverting,
    conversionError,
    liquidContent,
    jsonTemplate,
    fileNames,
    convertToLiquid,
    downloadLiquidFile,
    downloadJsonFile
}) {
    if (!fileContent) return null;

    return (
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
                    </div>                    <h2 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        HTML to Liquid + JSON Converter
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
                    }}                >
                    {isConverting ? '⏳ Converting to Liquid + JSON...' : '🚀 Convert to Liquid + JSON'}
                </button>
            </div>            {conversionError && (
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
            {isConverting && (
                <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                    marginBottom: '25px',
                    background: 'linear-gradient(145deg, #1a1a2e 0%, #2a2a3e 100%)'
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
                                <div style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: '#ff5f56',
                                    boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)'
                                }} className="floating-icon"></div>
                                <div style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: '#ffbd2e',
                                    boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)'
                                }} className="floating-icon"></div>
                                <div style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: '#27ca3f',
                                    boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)'
                                }} className="floating-icon"></div>
                            </div>
                            <span style={{
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: '600',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                            }}>
                                🤖 AI is generating your code...
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid rgba(0, 255, 136, 0.3)',
                                borderTop: '2px solid #00ff88',
                                borderRadius: '50%'
                            }} className="spinning-loader"></div>
                        </div>
                    </div>

                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                        minHeight: '200px',
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
                            fontSize: '48px',
                            marginBottom: '20px',
                            zIndex: 1
                        }} className="bouncing-emoji">
                            🚀
                        </div>

                        <div style={{
                            color: '#00ff88',
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '10px',
                            zIndex: 1
                        }}>
                            Generating Liquid + JSON Files
                        </div>

                        <div style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '14px',
                            marginBottom: '30px',
                            zIndex: 1
                        }}>
                            AI is converting your HTML to Shopify Liquid template...
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '8px',
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
                </div>
            )}
            {liquidContent && (
                <CodeViewer
                    content={liquidContent}
                    fileName={fileNames?.liquidFileName || (fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid')}
                    fileType="Liquid"
                    title="Converted Liquid Template"
                    onDownload={downloadLiquidFile}
                />
            )}

            {jsonTemplate && (
                <CodeViewer
                    content={jsonTemplate}
                    fileName={fileNames?.jsonFileName || (fileName ? `page.${fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json')}
                    fileType="JSON"
                    title="Shopify Page Template"
                    onDownload={downloadJsonFile}
                />
            )}
        </div>
    );
}
