"use client";
import { useState, useEffect } from "react";

const AIGenerationPopup = ({ isVisible, onClose, onConfirm }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleConfirm = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onConfirm();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                overflowY: 'auto'
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 50%, #1a1a2e 100%)',
                    borderRadius: '20px',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                    transition: 'transform 0.3s ease-out',
                    position: 'relative',
                    margin: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
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
                    padding: '25px 30px',
                    borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
                    background: 'linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '15px',
                                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)'
                            }}>
                                🤖
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    color: '#00ff88',
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>
                                    AI-Powered Code Generation
                                </h3>
                                <p style={{
                                    margin: '4px 0 0 0',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '14px'
                                }}>
                                    Smart Liquid + JSON Conversion
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '35px',
                                height: '35px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '18px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div style={{
                    padding: '30px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '15px'
                        }}>
                            <span style={{ fontSize: '20px' }}>⚡</span>
                            <h4 style={{
                                margin: 0,
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}>
                                AI-Generated Code Notice
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            margin: '0 0 15px 0'
                        }}>
                            This tool uses AI to generate Shopify Liquid templates and JSON schema files.
                            If the first result doesn't meet your expectations, simply click generate again
                            for improved results.
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                        }}>
                            <span style={{ fontSize: '18px' }}>📝</span>
                            <h4 style={{
                                margin: 0,
                                color: '#00d4ff',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                Important: JSON Schema Configuration
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            margin: 0
                        }}>
                            In the generated JSON file, make sure to set the <strong style={{ color: '#00ff88' }}>"type"</strong> value
                            to match your <strong style={{ color: '#00ff88' }}>.liquid</strong> file name.
                            For example: <code style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                color: '#00ff88',
                                fontSize: '12px'
                            }}>"type": "your-liquid-filename"</code>
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(138, 43, 226, 0.1)',
                        border: '1px solid rgba(138, 43, 226, 0.3)',
                        borderRadius: '12px',
                        padding: '15px',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>⏱️</span>
                            <span style={{
                                color: '#ba68c8',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                Processing Time
                            </span>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            margin: 0
                        }}>
                            Less code = faster conversion ⚡ | More code = may take longer ⏳
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255, 193, 7, 0.1)',
                        border: '1px solid rgba(255, 193, 7, 0.3)',
                        borderRadius: '12px',
                        padding: '15px',
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>💡</span>
                            <span style={{
                                color: '#ffc107',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                Pro Tip: Generate multiple times for better results if needed!
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{
                    padding: '20px 30px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '15px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '12px 25px',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
                        }}
                    >
                        🚀 OK I understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIGenerationPopup;
