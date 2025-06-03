export default function FileUploadSection({
    isLoading,
    fileName,
    handleFileUpload,
    clearContent
}) {
    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginBottom: 'clamp(20px, 5vw, 35px)',
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
                    background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(0, 212, 255, 0.3)',
                    flexShrink: 0
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📁</span>
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
                    Upload HTML File
                </h2>
            </div>

            <div style={{
                border: '2px dashed rgba(0, 212, 255, 0.3)',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                padding: 'clamp(25px, 6vw, 40px)',
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
                    fontSize: 'clamp(40px, 10vw, 60px)',
                    marginBottom: 'clamp(15px, 4vw, 20px)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}>
                    {isLoading ? '⏳' : '☁️'}
                </div>
                <p style={{
                    margin: '0 0 15px 0',
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    fontWeight: '700',
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    {isLoading ? 'Processing your file...' : 'Click to upload or drag & drop'}
                </p>
                <p style={{
                    margin: 0,
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '500'
                }}>
                    Only .html files are supported
                </p>
            </div>

            {fileName && (
                <div style={{
                    marginTop: 'clamp(15px, 4vw, 25px)',
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
        </div>
    );
}
