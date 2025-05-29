"use client";
import { useState, useEffect } from "react";

const ErrorPopup = ({ errors, isVisible, onClose, fileName }) => {
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

    if (!isVisible) return null;
    const formatErrors = (errorString) => {
        if (typeof errorString === 'string') {
            const lines = errorString.split('\n').filter(line => line.trim());

            const errorStartIndex = lines.findIndex(line => line.includes('HTML validation errors found:'));
            if (errorStartIndex !== -1) {
                const errorLines = lines.filter(line => {
                    const trimmed = line.trim();
                    return /^\d+\.\s+Line\s+\d+,\s+Col\s+\d+:/.test(trimmed);
                });

                if (errorLines.length > 0) {
                    return errorLines.map(line => line.trim().replace(/^\d+\.\s+/, ''));
                }

                const relevantLines = lines.slice(errorStartIndex + 1).filter(line => {
                    const trimmed = line.trim();
                    return trimmed && !trimmed.startsWith('Please fix these issues');
                });
                return relevantLines;
            }

            return [errorString];
        }
        return Array.isArray(errors) ? errors : [errors];
    };

    const errorList = formatErrors(errors);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #2d1b2e 0%, #1a1a2e 50%, #0f0f23 100%)',
                    borderRadius: '20px',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 87, 87, 0.3)',
                    transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                    transition: 'transform 0.3s ease-out',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    padding: '25px 30px',
                    borderBottom: '1px solid rgba(255, 87, 87, 0.2)',
                    background: 'linear-gradient(90deg, rgba(255, 87, 87, 0.1) 0%, rgba(255, 87, 87, 0.05) 100%)'
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
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ff5757 0%, #ff4757 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px'
                            }}>
                                ⚠️
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    color: '#ff5757',
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>
                                    HTML Validation Errors
                                </h3>
                                {fileName && (
                                    <p style={{
                                        margin: '4px 0 0 0',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '14px'
                                    }}>
                                        File: {fileName}
                                    </p>
                                )}
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
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: '#fff'
                                }
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
                    padding: '0',
                    maxHeight: '60vh',
                    overflowY: 'auto'
                }}>
                    {errorList.map((error, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '20px 30px',
                                borderBottom: index < errorList.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                                background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '15px'
                            }}>
                                <div style={{
                                    minWidth: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    marginTop: '2px'
                                }}>
                                    {index + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        margin: 0,
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                                    }}>
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    padding: '20px 30px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '14px'
                    }}>
                        <span>📋</span>
                        {errorList.length} error{errorList.length !== 1 ? 's' : ''} found
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopup;
