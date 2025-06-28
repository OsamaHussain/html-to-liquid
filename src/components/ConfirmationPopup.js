export default function ConfirmationPopup({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Yes, Continue",
    cancelText = "Cancel",
    type = "warning"
}) {
    if (!isOpen) return null;

    const getColors = () => {
        switch (type) {
            case 'danger':
                return {
                    primary: '#ff4444',
                    primaryHover: '#ff6666',
                    secondary: '#cc3333',
                    bg: 'rgba(255, 68, 68, 0.1)',
                    border: 'rgba(255, 68, 68, 0.3)'
                };
            case 'info':
                return {
                    primary: '#0099ff',
                    primaryHover: '#33aaff',
                    secondary: '#0077cc',
                    bg: 'rgba(0, 153, 255, 0.1)',
                    border: 'rgba(0, 153, 255, 0.3)'
                };
            default:
                return {
                    primary: '#ff6b35',
                    primaryHover: '#ff8555',
                    secondary: '#cc5528',
                    bg: 'rgba(255, 107, 53, 0.1)',
                    border: 'rgba(255, 107, 53, 0.3)'
                };
        }
    };

    const colors = getColors();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(5px)',
            padding: '20px'
        }}>
            <div style={{
                background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.border}`,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: colors.bg,
                    pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            boxShadow: `0 8px 16px ${colors.bg}`
                        }}>
                            <span style={{
                                fontSize: '24px',
                                filter: 'brightness(1.2)'
                            }}>
                                {type === 'danger' ? '⚠️' : type === 'info' ? 'ℹ️' : '🔄'}
                            </span>
                        </div>
                        <h3 style={{
                            color: '#ffffff',
                            margin: 0,
                            fontSize: 'clamp(18px, 4vw, 22px)',
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            {title}
                        </h3>
                    </div>

                    <div style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        lineHeight: '1.6',
                        marginBottom: '25px',
                        whiteSpace: 'pre-line'
                    }}>
                        {message}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: cancelText ? 'flex-end' : 'center',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>
                        {cancelText && (
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'linear-gradient(135deg, #666 0%, #888 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)',
                                    cursor: 'pointer',
                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    minWidth: '100px'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            onClick={onConfirm}
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)',
                                cursor: 'pointer',
                                fontSize: 'clamp(14px, 3vw, 16px)',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 8px 16px ${colors.bg}`,
                                minWidth: '120px'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.background = `linear-gradient(135deg, ${colors.primaryHover} 0%, ${colors.primary} 100%)`;
                                e.target.style.boxShadow = `0 12px 24px ${colors.bg}`;
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
                                e.target.style.boxShadow = `0 8px 16px ${colors.bg}`;
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
