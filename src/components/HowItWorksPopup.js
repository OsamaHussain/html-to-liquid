import React from 'react';

export default function HowItWorksPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }; const steps = [
        {
            step: "1",
            title: "Select Number of Files",
            description: "Choose how many HTML files you want to convert (1-20). The system creates input tabs for each file.",
            icon: "📊",
            details: "Dynamic tab creation, file count selection, workspace setup"
        },
        {
            step: "2",
            title: "Add HTML Content",
            description: "For each tab: upload HTML files or paste code directly. Each tab has its own editor with syntax highlighting.",
            icon: "📁",
            details: "File upload or paste code, Monaco editor, independent tabs"
        },
        {
            step: "3",
            title: "Enter Section Names",
            description: "Provide section names for all files - this is mandatory. These names become your Shopify .liquid file names.",
            icon: "🏷️",
            details: "Required filename entry, no fallbacks allowed, section naming"
        },
        {
            step: "4",
            title: "Preview & Validate",
            description: "Use HTML preview toggle to check content visually. HTML validation ensures quality before conversion.",
            icon: "�️",
            details: "Live preview toggle, HTMLHint validation, error detection"
        },
        {
            step: "5",
            title: "Convert to Liquid",
            description: "AI converts all files sequentially. Watch real-time progress as each file is processed into Shopify sections.",
            icon: "�",
            details: "AI-powered conversion, progress tracking, sequential processing"
        },
        {
            step: "6",
            title: "Download Results",
            description: "Get individual .liquid and .json files for each input, plus a combined head snippet for theme.liquid.",
            icon: "⬇️",
            details: "Individual downloads, combined head snippet, organized output"
        }
    ];
    const features = [
        "🔢 Convert Multiple Files - Process 1-20 HTML files at once",
        "� Upload or Paste - Add HTML content by uploading files or pasting code",
        "�️ Required Section Names - Enter names for all files before conversion",
        "�️ HTML Preview - Toggle preview to see how HTML looks before converting",
        "⚠️ Schema Conflict Warning - Alerts if HTML already has Shopify schema blocks",
        "🔄 AI-Powered Conversion - Uses OpenAI to convert HTML to Shopify Liquid",
        "� Individual Outputs - Each file creates its own .liquid and .json files",
        "🎨 Combined Head Snippet - Single file with all styles and scripts for theme.liquid",
        "🛡️ HTML Validation - Checks HTML quality before conversion starts",
        "📋 Field Requirements - Clear marking of required vs optional schema fields",
        "⬇️ Easy Downloads - Download individual files or batch download all",
        "� Responsive Design - All original styling and responsiveness preserved"
    ];

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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: 'clamp(10px, 3vw, 20px)',
                overflowY: 'auto'
            }}
            onClick={handleClickOutside}
        >
            <div
                style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    padding: 'clamp(20px, 5vw, 30px)',
                    maxWidth: 'clamp(320px, 90vw, 800px)',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    margin: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'clamp(10px, 3vw, 20px)',
                        right: 'clamp(10px, 3vw, 20px)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 'clamp(32px, 8vw, 40px)',
                        height: 'clamp(32px, 8vw, 40px)',
                        color: 'white',
                        fontSize: 'clamp(16px, 4vw, 20px)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        minHeight: '44px',
                        minWidth: '44px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    ×
                </button>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vw, 30px)' }}>
                    <h2 style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '800',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2'
                    }}>
                        HTML to Shopify Liquid Converter 🚀
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        margin: '0 0 15px 0',
                        lineHeight: '1.4'
                    }}>
                        Transform your static HTML into dynamic Shopify section templates with AI-powered conversion
                    </p>
                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: 'clamp(8px, 2vw, 12px)',
                        padding: 'clamp(12px, 3vw, 15px)',
                        margin: '0 0 20px 0'
                    }}>
                        <p style={{
                            color: '#00d4ff',
                            fontSize: 'clamp(13px, 3.2vw, 15px)',
                            margin: 0,
                            fontWeight: '500'
                        }}>
                            💡 <strong>How It Works:</strong> This tool converts your HTML files into complete Shopify sections. Upload or paste HTML, enter section names, preview content, then convert with AI to get ready-to-use Shopify files.
                        </p>
                    </div>
                </div>
                <div style={{ marginBottom: 'clamp(20px, 5vw, 30px)' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: 'clamp(18px, 4.5vw, 20px)',
                        marginBottom: 'clamp(15px, 4vw, 20px)',
                        textAlign: 'center'
                    }}>
                        How to Use This Tool 📋
                    </h3>

                    <div style={{
                        display: 'grid',
                        gap: 'clamp(12px, 3vw, 15px)'
                    }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'clamp(10px, 3vw, 15px)',
                                padding: 'clamp(12px, 3vw, 15px)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 'clamp(8px, 2vw, 12px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                flexWrap: 'wrap'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateX(5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}>
                                <div style={{
                                    width: 'clamp(40px, 10vw, 50px)',
                                    height: 'clamp(40px, 10vw, 50px)',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 'clamp(14px, 3.5vw, 18px)',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {step.step}
                                </div>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <h4 style={{
                                        color: 'white',
                                        margin: '0 0 5px 0',
                                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                                        fontWeight: '600',
                                        lineHeight: '1.3'
                                    }}>
                                        {step.icon} {step.title}
                                    </h4>
                                    <p style={{
                                        color: '#bbb',
                                        margin: '0 0 8px 0',
                                        fontSize: 'clamp(12px, 3vw, 14px)',
                                        lineHeight: '1.4'
                                    }}>
                                        {step.description}
                                    </p>
                                    <p style={{
                                        color: '#888',
                                        margin: 0,
                                        fontSize: 'clamp(11px, 2.8vw, 13px)',
                                        fontStyle: 'italic',
                                        lineHeight: '1.3'
                                    }}>
                                        <strong>Technical:</strong> {step.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: 'clamp(15px, 4vw, 20px)' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: 'clamp(18px, 4.5vw, 20px)',
                        marginBottom: 'clamp(12px, 3vw, 15px)',
                        textAlign: 'center'
                    }}>
                        What You Get ✨
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 45vw, 250px), 1fr))',
                        gap: 'clamp(8px, 2vw, 10px)'
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} style={{
                                padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 15px)',
                                background: 'rgba(0, 212, 255, 0.1)',
                                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                                border: '1px solid rgba(0, 212, 255, 0.2)',
                                color: '#00d4ff',
                                fontSize: 'clamp(12px, 3vw, 14px)',
                                fontWeight: '500',
                                lineHeight: '1.3'
                            }}>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    marginTop: 'clamp(15px, 4vw, 20px)'
                }}>
                    <h4 style={{
                        color: '#ffc107',
                        margin: '0 0 10px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)'
                    }}>
                        💡 Usage Tips:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '8px' }}><strong>Start Small:</strong> Begin with 1-2 files to understand the process</li>
                        <li style={{ marginBottom: '8px' }}><strong>Use Preview:</strong> Toggle HTML preview to check content before converting</li>
                        <li style={{ marginBottom: '8px' }}><strong>Name Your Sections:</strong> Enter descriptive names - they become your .liquid filenames</li>
                        <li style={{ marginBottom: '8px' }}><strong>Check for Warnings:</strong> Tool will alert you if HTML already has schema blocks</li>
                        <li><strong>Download Strategy:</strong> Get individual files or download all at once</li>
                    </ul>
                </div>

                <div style={{
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    padding: 'clamp(15px, 4vw, 20px)',
                    marginTop: 'clamp(15px, 4vw, 20px)'
                }}>
                    <h4 style={{
                        color: '#00ff7f',
                        margin: '0 0 10px 0',
                        fontSize: 'clamp(14px, 3.5vw, 16px)'
                    }}>
                        🎯 Final Output:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '5px' }}>✅ Ready-to-use .liquid section files for Shopify</li>
                        <li style={{ marginBottom: '5px' }}>✅ JSON template files for page assignment</li>
                        <li style={{ marginBottom: '5px' }}>✅ Combined head snippet for theme.liquid</li>
                        <li style={{ marginBottom: '5px' }}>✅ Schema fields marked as required (*) or optional</li>
                        <li>✅ All content becomes editable in Shopify Theme Editor</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
