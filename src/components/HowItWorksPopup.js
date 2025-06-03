import React from 'react';

export default function HowItWorksPopup({ isOpen, onClose }) {
    if (!isOpen) return null; const steps = [
        {
            step: "1",
            title: "HTML File Upload & Input",
            description: "Upload your HTML file (.html only) or paste HTML code directly into the live editor. Our system supports both file upload and manual code input for maximum flexibility.",
            icon: "📁",
            details: "Drag & drop files, browse to select, or use the built-in code editor with syntax highlighting"
        },
        {
            step: "2",
            title: "Advanced HTML Validation",
            description: "Powered by HTMLHint library, our system performs comprehensive validation checking HTML structure, syntax errors, missing tags, and code quality to ensure perfect conversion.",
            icon: "✅",
            details: "Real-time error detection, detailed error reporting, and automatic HTML structure analysis"
        },
        {
            step: "3",
            title: "AI-Powered Liquid Conversion",
            description: "Using OpenAI GPT-4, we intelligently convert your HTML into production-ready Shopify Liquid templates while preserving all original styling and CSS classes.",
            icon: "🔄",
            details: "Smart content replacement: Text → Liquid variables, Images → Dynamic settings, Links → Editable URLs"
        },
        {
            step: "4",
            title: "Dynamic Schema Generation",
            description: "Automatically generates complete schema.json with all settings, blocks, and presets. Every text, image, and link becomes editable in Shopify's Theme Editor.",
            icon: "⚙️",
            details: "Creates text inputs, image pickers, URL fields, and repeatable blocks for dynamic content management"
        },
        {
            step: "5",
            title: "Production-Ready Downloads",
            description: "Download complete Shopify section files ready for immediate deployment. No additional coding required - just upload to your theme and start customizing.",
            icon: "⬇️",
            details: "Get .liquid template file and schema.json - both optimized for Shopify Theme Editor compatibility"
        }
    ];
    const features = [
        "🎨 Complete Shopify Section Templates - Ready-to-use sections with full Theme Editor support",
        "📝 Automatic Schema.json Generation - All settings auto-generated for easy customization",
        "🔧 Dynamic Content Management - Every text, image, and link becomes editable",
        "📱 Responsive Design Preservation - Maintains original mobile and desktop layouts",
        "⚡ AI-Powered Fast Conversion - OpenAI GPT-4 ensures professional quality output",
        "🛡️ Advanced HTML Validation - HTMLHint integration with detailed error reporting",
        "🔄 Smart Block System - Repeating elements converted to manageable blocks",
        "🎯 No Hardcoded Content - Everything becomes dynamic Shopify settings",
        "🚀 Production Ready Output - Direct deployment to Shopify themes",
        "💡 Intelligent CSS Preservation - All styling and classes maintained perfectly"
    ];
    return (
        <div style={{
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
        }}>
            <div style={{
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
            }}>
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
                            💡 <strong>What This Tool Does:</strong> Converts any HTML file into a complete Shopify section with schema settings, making all content editable through Shopify's Theme Editor. Perfect for developers transitioning from static HTML to dynamic Shopify themes.
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
                        Step-by-Step Process 📋
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
                        Key Features ✨
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
                        💡 Pro Tips for Best Results:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '8px' }}><strong>Clean HTML Structure:</strong> Use valid HTML5 structure with proper semantic tags for optimal conversion</li>
                        <li style={{ marginBottom: '8px' }}><strong>Descriptive Class Names:</strong> Use meaningful CSS class names - they help in automatic schema generation</li>
                        <li style={{ marginBottom: '8px' }}><strong>Image Optimization:</strong> Include proper image paths and alt text for better Shopify integration</li>
                        <li style={{ marginBottom: '8px' }}><strong>Responsive Design:</strong> Ensure your HTML is mobile-responsive - the tool preserves all responsive features</li>
                        <li style={{ marginBottom: '8px' }}><strong>Content Structure:</strong> Organize repeating elements (cards, testimonials) clearly for automatic block creation</li>
                        <li><strong>File Size:</strong> Tool handles large HTML files efficiently - no need to break down complex layouts</li>
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
                        🎯 What You Get After Conversion:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '5px' }}>✅ Complete .liquid section file ready for Shopify themes</li>
                        <li style={{ marginBottom: '5px' }}>✅ Schema.json with all settings for Theme Editor customization</li>
                        <li style={{ marginBottom: '5px' }}>✅ All text content becomes editable fields</li>
                        <li style={{ marginBottom: '5px' }}>✅ Images become dynamic with upload capability</li>
                        <li style={{ marginBottom: '5px' }}>✅ Links become editable URL and text fields</li>
                        <li style={{ marginBottom: '5px' }}>✅ Repeating content organized as manageable blocks</li>
                        <li>✅ Perfect preservation of original design and responsive behavior</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
