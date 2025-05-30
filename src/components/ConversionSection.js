import CodeViewer from './CodeViewer';
export default function ConversionSection({
    fileContent,
    fileName,
    isConverting,
    conversionError,
    liquidContent,
    conversionMetadata,
    convertToLiquid,
    downloadLiquidFile,
    downloadMetadataJson
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

            {liquidContent && (
                <CodeViewer
                    content={liquidContent}
                    fileName={fileName}
                    fileType="LIQUID"
                    title={fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid'}
                    onDownload={downloadLiquidFile}
                />
            )}

            {conversionMetadata && (
                <CodeViewer
                    content={conversionMetadata}
                    fileName={fileName}
                    fileType="JSON"
                    title="metadata.json"
                    onDownload={downloadMetadataJson}
                />
            )}
        </div>
    );
}
