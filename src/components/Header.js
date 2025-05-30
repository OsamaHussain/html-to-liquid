export default function Header() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px 20px 20px'
        }}>
            <div className="animated-logo-container" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '20px 30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}>
                <div className="floating-icon" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <span className="lightning-icon" style={{
                        fontSize: '28px',
                        zIndex: 2,
                        position: 'relative'
                    }}>⚡</span>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
                        animation: 'gradientShift 3s ease infinite',
                        zIndex: 1
                    }}></div>
                </div>
                <div>
                    <h1 className="gradient-text" style={{
                        margin: 0,
                        fontSize: '28px',
                        fontWeight: '800',
                        letterSpacing: '0.5px'
                    }}>
                        HTML to Liquid Converter
                    </h1>
                    <p className="shimmer-text" style={{
                        margin: '5px 0 0 0',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        AI-Powered Template Conversion
                    </p>
                </div>
            </div>
        </div>
    );
}
