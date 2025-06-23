import CodeViewer from './CodeViewer';
export default function ConversionSection({
    files,
    isConverting,
    currentlyConverting,
    conversionError,
    convertedFiles,
    combinedHeadContent,
    convertToLiquid,
    downloadLiquidFile,
    downloadJsonFile,
    downloadHeadFile,
    downloadCombinedHeadFile
}) {
    const filesWithContent = files.filter(file => file.fileContent);

    if (filesWithContent.length === 0) return null;

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginTop: 'clamp(20px, 5vw, 35px)',
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
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                    flex: '1'
                }}>
                    <div style={{
                        width: 'clamp(40px, 8vw, 50px)',
                        height: 'clamp(40px, 8vw, 50px)',
                        borderRadius: '15px',
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)',
                        flexShrink: 0
                    }}>
                        <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>🚀</span>
                    </div>
                    <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontWeight: '700',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        wordBreak: 'break-word'
                    }}>
                        HTML to Liquid + JSON Converter
                    </h2>
                </div>
                <button
                    onClick={convertToLiquid}
                    disabled={isConverting || filesWithContent.length === 0}
                    style={{
                        background: isConverting
                            ? 'linear-gradient(135deg, #666 0%, #888 100%)'
                            : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                        color: isConverting ? '#ccc' : '#000000',
                        border: 'none',
                        borderRadius: '15px',
                        padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                        cursor: isConverting ? 'not-allowed' : 'pointer',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '700',
                        transition: 'all 0.3s ease',
                        boxShadow: isConverting
                            ? '0 4px 8px rgba(0,0,0,0.2)'
                            : '0 8px 16px rgba(0, 255, 136, 0.3)',
                        transform: isConverting ? 'scale(0.98)' : 'scale(1)',
                        opacity: isConverting ? 0.7 : 1,
                        flexShrink: 0,
                        whiteSpace: 'nowrap'
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
                    {isConverting ? (
                        <>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '2px solid #ffffff',
                                borderRadius: '50%',
                                marginRight: '10px',
                                display: 'inline-block'
                            }} className="spinning-loader"></div>
                            Converting {filesWithContent.length} file{filesWithContent.length > 1 ? 's' : ''}...
                        </>
                    ) : (
                        `🚀 Convert ${filesWithContent.length} File${filesWithContent.length > 1 ? 's' : ''} to Liquid + JSON`
                    )}
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

            {combinedHeadContent && (
                <div style={{
                    marginTop: 'clamp(20px, 5vw, 30px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    background: 'rgba(0, 212, 255, 0.1)',
                    borderRadius: 'clamp(10px, 3vw, 15px)',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                }}>
                    <div style={{
                        marginBottom: 'clamp(15px, 4vw, 20px)',
                        padding: 'clamp(10px, 3vw, 15px)',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{
                            color: '#ffffff',
                            margin: 0,
                            fontSize: 'clamp(16px, 4vw, 20px)',
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            🎨 Combined Theme Head Section
                        </h3>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            margin: '8px 0 0 0',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '500'
                        }}>
                            All head content from your files combined for theme.liquid ({combinedHeadContent.split('\n').filter(line => line.trim()).length} unique lines)
                        </p>
                    </div>

                    <CodeViewer
                        content={combinedHeadContent}
                        fileName="combined-theme-head.liquid"
                        fileType="Liquid"
                        title="Combined Head Content for Theme.liquid"
                        onDownload={downloadCombinedHeadFile}
                    />
                </div>
            )}

            {convertedFiles.map((convertedFile, index) => (
                <div key={index} style={{
                    marginTop: 'clamp(20px, 5vw, 30px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'clamp(10px, 3vw, 15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        marginBottom: 'clamp(15px, 4vw, 20px)',
                        padding: 'clamp(10px, 3vw, 15px)',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{
                            color: '#ffffff',
                            margin: 0,
                            fontSize: 'clamp(16px, 4vw, 20px)',
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            📄 File {index + 1}: {convertedFile.originalFile.fileName || `File-${index + 1}.html`}
                        </h3>
                    </div>
                    {convertedFile.headExtractionError && (
                        <div style={{
                            background: 'linear-gradient(135deg, #ff8800 0%, #cc6600 100%)',
                            color: 'white',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            marginBottom: '15px',
                            fontSize: 'clamp(13px, 3vw, 15px)',
                            fontWeight: '500',
                            border: '1px solid rgba(255, 136, 0, 0.3)',
                            boxShadow: '0 4px 8px rgba(255, 136, 0, 0.2)'
                        }}>
                            ⚠️ Head extraction warning: {convertedFile.headExtractionError}
                        </div>
                    )}
                    {convertedFile.hasError && (
                        <div style={{
                            background: 'linear-gradient(135deg, #ff4444 0%, #cc3333 100%)',
                            color: 'white',
                            padding: '15px 20px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            fontWeight: '600',
                            boxShadow: '0 4px 8px rgba(255, 68, 68, 0.3)',
                            textAlign: 'center'
                        }}>
                            ❌ Conversion Error: {convertedFile.headExtractionError}
                        </div>
                    )}

                    {convertedFile.liquidContent && (
                        <CodeViewer
                            content={convertedFile.liquidContent}
                            fileName={convertedFile.fileNames?.liquidFileName || (convertedFile.originalFile?.fileName ? convertedFile.originalFile.fileName.replace('.html', '.liquid') : `converted-${index + 1}.liquid`)}
                            fileType="Liquid"
                            title={`Converted Liquid Template - File ${index + 1}`}
                            onDownload={() => downloadLiquidFile(convertedFile)}
                        />
                    )}

                    {convertedFile.jsonTemplate && (
                        <CodeViewer
                            content={convertedFile.jsonTemplate}
                            fileName={convertedFile.fileNames?.jsonFileName || (convertedFile.originalFile?.fileName ? `page.${convertedFile.originalFile.fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : `page.custom-${index + 1}.json`)}
                            fileType="JSON"
                            title={`Shopify Page Template - File ${index + 1}`}
                            onDownload={() => downloadJsonFile(convertedFile)}
                        />
                    )}
                </div>
            ))}
            {isConverting && currentlyConverting && (
                <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                    marginTop: 'clamp(20px, 5vw, 30px)',
                    background: 'linear-gradient(145deg, #1a1a2e 0%, #2a2a3e 100%)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #0a5f2a 0%, #1a8f3a 100%)',
                        padding: '15px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', marginRight: '15px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#ff5f56',
                                    boxShadow: '0 2px 4px rgba(255, 95, 86, 0.4)'
                                }} className="floating-icon"></div>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#ffbd2e',
                                    boxShadow: '0 2px 4px rgba(255, 189, 46, 0.4)'
                                }} className="floating-icon"></div>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: '#27ca3f',
                                    boxShadow: '0 2px 4px rgba(39, 202, 63, 0.4)'
                                }} className="floating-icon"></div>
                            </div>
                            <span style={{
                                color: '#ffffff',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                fontWeight: '600',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                            }}>
                                🤖 Converting: {currentlyConverting.fileName}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{
                                color: '#00ff88',
                                fontSize: 'clamp(12px, 2.5vw, 14px)',
                                fontWeight: '600'
                            }}>
                                {currentlyConverting.remaining} remaining
                            </span>
                            <div style={{
                                width: '18px',
                                height: '18px',
                                border: '2px solid rgba(0, 255, 136, 0.3)',
                                borderTop: '2px solid #00ff88',
                                borderRadius: '50%'
                            }} className="spinning-loader"></div>
                        </div>
                    </div>

                    <div style={{
                        padding: 'clamp(20px, 4vw, 30px)',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                        minHeight: 'clamp(120px, 20vh, 150px)',
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
                            fontSize: 'clamp(32px, 6vw, 40px)',
                            marginBottom: '15px',
                            zIndex: 1
                        }} className="bouncing-emoji">
                            ⚡
                        </div>
                        <div style={{
                            color: '#00ff88',
                            fontSize: 'clamp(14px, 3vw, 16px)',
                            fontWeight: '600',
                            marginBottom: '8px',
                            zIndex: 1
                        }}>
                            Processing File {currentlyConverting.index + 1} of {currentlyConverting.total}
                        </div>
                        <div style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 'clamp(12px, 2.5vw, 14px)',
                            marginBottom: '20px',
                            zIndex: 1
                        }}>
                            Converting current file to Liquid + JSON...
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '6px',
                            zIndex: 1
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#00ff88'
                            }} className="loading-dot"></div>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#00ff88'
                            }} className="loading-dot"></div>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#00ff88'
                            }} className="loading-dot"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
