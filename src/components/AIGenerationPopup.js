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
                padding: 'clamp(10px, 3vw, 20px)',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                overflowY: 'auto'
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 50%, #1a1a2e 100%)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    maxWidth: 'clamp(320px, 90vw, 500px)',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                    transition: 'transform 0.3s ease-out',
                    position: 'relative',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
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
                    padding: 'clamp(20px, 5vw, 25px) clamp(20px, 5vw, 30px)',
                    borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
                    background: 'linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 12px)',
                            flex: '1',
                            minWidth: '200px'
                        }}>
                            <div style={{
                                width: 'clamp(40px, 10vw, 50px)',
                                height: 'clamp(40px, 10vw, 50px)',
                                borderRadius: 'clamp(12px, 3vw, 15px)',
                                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(20px, 5vw, 24px)',
                                boxShadow: '0 8px 16px rgba(0, 255, 136, 0.3)',
                                flexShrink: 0
                            }}>
                                🤖
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    color: '#00ff88',
                                    fontSize: 'clamp(16px, 4vw, 20px)',
                                    fontWeight: '700',
                                    lineHeight: '1.2'
                                }}>
                                    AI-Powered Code Generation
                                </h3>
                                <p style={{
                                    margin: '4px 0 0 0',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    lineHeight: '1.3'
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
                                width: 'clamp(32px, 8vw, 35px)',
                                height: 'clamp(32px, 8vw, 35px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: 'clamp(16px, 4vw, 18px)',
                                transition: 'all 0.2s ease',
                                minHeight: '44px',
                                minWidth: '44px',
                                flexShrink: 0
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
                    padding: 'clamp(20px, 5vw, 30px)',
                    position: 'relative',
                    zIndex: 1,
                    flex: '1',
                    overflowY: 'auto'
                }}>
                    <div style={{
                        marginBottom: 'clamp(20px, 5vw, 25px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 10px)',
                            marginBottom: 'clamp(12px, 3vw, 15px)'
                        }}>
                            <span style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>⚡</span>
                            <h4 style={{
                                margin: 0,
                                color: '#ffffff',
                                fontSize: 'clamp(14px, 3.5vw, 16px)',
                                fontWeight: '600'
                            }}>
                                AI-Generated Code Notice
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            lineHeight: '1.6',
                            margin: '0 0 15px 0'
                        }}>
                            This tool uses AI to generate Shopify Liquid templates and JSON schema files.
                            <strong style={{ color: '#ffc107' }}> AI provides 95%-98% accuracy, not 100%.</strong> Having
                            <strong style={{ color: '#00ff88' }}> Liquid knowledge is essential</strong> for fine-tuning results.
                            If the first result doesn't meet your expectations, simply click generate again
                            for improved results.
                        </p>
                        <div style={{
                            background: 'rgba(255, 152, 0, 0.1)',
                            border: '1px solid rgba(255, 152, 0, 0.3)',
                            borderRadius: 'clamp(6px, 1.5vw, 8px)',
                            padding: 'clamp(10px, 2.5vw, 12px)',
                            marginTop: '12px'
                        }}>
                            <p style={{
                                color: '#ff9800',
                                fontSize: 'clamp(11px, 2.5vw, 13px)',
                                lineHeight: '1.5',
                                margin: 0,
                                fontWeight: '600'
                            }}>
                                <span style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>🤝</span> I assume you have provided correct HTML code for conversion.
                                If AI repeatedly generates incorrect results, please double-check your HTML code first.
                            </p>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(15px, 4vw, 20px)',
                        marginBottom: 'clamp(20px, 5vw, 25px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 10px)',
                            marginBottom: 'clamp(8px, 2vw, 10px)'
                        }}>
                            <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>📝</span>
                            <h4 style={{
                                margin: 0,
                                color: '#00d4ff',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '600'
                            }}>
                                Important: JSON Schema Configuration
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(11px, 2.5vw, 13px)',
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
                                fontSize: 'clamp(10px, 2.5vw, 12px)'
                            }}>"type": "your-liquid-filename"</code>
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(138, 43, 226, 0.1)',
                        border: '1px solid rgba(138, 43, 226, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(6px, 1.5vw, 8px)',
                            marginBottom: 'clamp(6px, 1.5vw, 8px)'
                        }}>
                            <span style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>⏱️</span>
                            <span style={{
                                color: '#ba68c8',
                                fontSize: 'clamp(11px, 2.8vw, 13px)',
                                fontWeight: '600'
                            }}>
                                Processing Time
                            </span>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(10px, 2.5vw, 12px)',
                            lineHeight: '1.4',
                            margin: 0
                        }}>
                            Less code = faster conversion ⚡ | Large code = 3-5 minutes ⏳ | More complex code = may take longer
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(255, 193, 7, 0.1)',
                        border: '1px solid rgba(255, 193, 7, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(6px, 1.5vw, 8px)',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>💡</span>
                            <span style={{
                                color: '#ffc107',
                                fontSize: 'clamp(11px, 2.8vw, 13px)',
                                fontWeight: '600',
                                lineHeight: '1.3'
                            }}>
                                Pro Tip: Generate multiple times for better results if needed!
                            </span>
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(0, 123, 255, 0.1)',
                        border: '1px solid rgba(0, 123, 255, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(15px, 4vw, 20px)',
                        marginBottom: 'clamp(20px, 5vw, 25px)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 10px)',
                            marginBottom: 'clamp(12px, 3vw, 15px)'
                        }}>
                            <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>📚</span>
                            <h4 style={{
                                margin: 0,
                                color: '#007bff',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '600'
                            }}>
                                Liquid Knowledge Required
                            </h4>
                        </div>
                        <p style={{
                            color: '#e6e6e6',
                            fontSize: 'clamp(11px, 2.5vw, 13px)',
                            lineHeight: '1.5',
                            margin: '0 0 12px 0'
                        }}>
                            <strong style={{ color: '#ffc107' }}>Important:</strong> Basic understanding of Shopify Liquid
                            templating language is essential for customizing and optimizing the AI-generated code.
                        </p>
                        <a
                            href="https://shopify.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#00ff88',
                                textDecoration: 'none',
                                fontSize: 'clamp(11px, 2.5vw, 13px)',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '6px 12px',
                                background: 'rgba(0, 255, 136, 0.1)',
                                borderRadius: '6px',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(0, 255, 136, 0.2)';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(0, 255, 136, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            📖 Learn Liquid - Shopify Docs
                            <span style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>↗</span>
                        </a>
                    </div>
                </div>
                <div style={{
                    padding: 'clamp(15px, 4vw, 20px) clamp(20px, 5vw, 30px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'clamp(10px, 3vw, 15px)',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    marginTop: 'auto',
                    flexShrink: 0
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 'clamp(8px, 2vw, 10px)',
                            padding: 'clamp(8px, 2vw, 10px) clamp(15px, 4vw, 20px)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            minHeight: '44px',
                            flex: '1',
                            minWidth: '100px'
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
                            borderRadius: 'clamp(8px, 2vw, 10px)',
                            padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 25px)',
                            color: '#000',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
                            minHeight: '44px',
                            flex: '1',
                            minWidth: '140px'
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
