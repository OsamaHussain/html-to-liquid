export default function FileUploadSection({
    numberOfFiles,
    onNumberOfFilesChange
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
                    Number of HTML Files
                </h2>
            </div>
            <div style={{
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 'clamp(10px, 3vw, 15px)',
                padding: 'clamp(10px, 2vw, 15px)',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.2)',
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(10px)'
            }}>
                <select
                    value={numberOfFiles}
                    onChange={(e) => onNumberOfFilesChange(parseInt(e.target.value))}
                    style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        color: '#ffffff',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 2.5vw, 16px)',
                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 6px 12px rgba(0, 212, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        maxWidth: 'full',
                        minWidth: '200px',
                        height: 'auto',
                        lineHeight: '1.4'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 8px 16px rgba(0, 212, 255, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 6px 12px rgba(0, 212, 255, 0.3)';
                    }}
                >
                    <option value={0} style={{
                        background: '#1e1e2e',
                        color: '#ffffff',
                        padding: '6px 10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        minHeight: '32px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        📋 Select number of HTML files
                    </option>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num} style={{
                            background: num % 2 === 0 ? '#2a2a3e' : '#1e1e2e',
                            color: '#ffffff',
                            padding: '6px 10px',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '1.3',
                            minHeight: '30px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            📄 {num} {num === 1 ? 'file' : 'files'}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
