import React from 'react';

export default function HowItWorksPopup({ isOpen, onClose }) {
    if (!isOpen) return null; const steps = [
        {
            step: "1",
            title: "Select Number of Files & Setup",
            description: "Choose how many HTML files you want to convert (1-20). The system dynamically creates tabbed input areas for each file, allowing you to work with multiple projects simultaneously.",
            icon: "📊",
            details: "Dynamic tab creation, flexible file count selection, organized workspace for batch processing"
        },
        {
            step: "2",
            title: "Multi-File HTML Input & Upload",
            description: "Each tab offers dual input methods: upload HTML files (.html only) or paste code directly into the Monaco editor. Mix and match upload/paste methods across different tabs as needed.",
            icon: "📁",
            details: "Tabbed interface, drag & drop uploads, syntax-highlighted code editor, file validation per tab"
        },
        {
            step: "3",
            title: "Advanced HTML Validation",
            description: "Each HTML input is validated independently using HTMLHint. Real-time error detection ensures all files meet quality standards before conversion begins.",
            icon: "✅",
            details: "Per-file validation, detailed error reporting, automatic HTML structure analysis, quality assurance"
        },
        {
            step: "4",
            title: "AI-Powered Batch Conversion",
            description: "Using OpenAI GPT-4, all valid HTML files are converted sequentially into production-ready Shopify Liquid templates. Watch real-time progress as each file is processed.",
            icon: "🔄",
            details: "Sequential processing, real-time progress tracking, auto-tab switching, intelligent content replacement"
        },
        {
            step: "5",
            title: "Individual File Outputs",
            description: "Each converted file generates its own Liquid template and JSON schema. View results in organized tabs with separate download options for each file's Liquid and JSON components.",
            icon: "📄",
            details: "Tabbed result viewing, individual file downloads, separate Liquid/JSON generation per file"
        },
        {
            step: "6",
            title: "Combined Global Head Snippet",
            description: "Automatically extracts and combines all head elements (fonts, Tailwind, Font Awesome, scripts) from all files into a single deduplicated snippet for theme.liquid.",
            icon: "🎨",
            details: "Smart head extraction, duplicate removal, single combined snippet, theme.liquid ready"
        }
    ];
    const features = [
        "🔢 Multi-File Batch Processing - Convert up to 20 HTML files simultaneously with tabbed interface",
        "📝 Dual Input Methods - Upload files or paste code directly in each tab with Monaco editor",
        "🎨 Combined Global Head Snippet - Single deduplicated snippet from all files for theme.liquid",
        "� Individual File Outputs - Each file generates separate Liquid template and JSON schema",
        "⚡ Real-Time Progress Tracking - Watch conversion progress with auto-tab switching",
        "🎯 Tabbed Result Organization - Clean interface for managing multiple file results",
        "🔄 Sequential AI Processing - OpenAI GPT-4 converts each file maintaining quality",
        "📱 Responsive Design Preservation - All original mobile and desktop layouts maintained",
        "🛡️ Per-File HTML Validation - HTMLHint integration with detailed error reporting per file",
        "⬇️ Organized Download System - Individual and batch download options for all outputs",
        "🚀 Dynamic Workspace Creation - Interface adapts based on selected number of files",
        "� Smart Head Content Extraction - Automatically finds and combines fonts, scripts, styles",
        "� Independent File Processing - Each tab works independently with separate validation",
        "🎨 Professional UI/UX - Clean tabbed interface optimized for batch workflow"
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
                            💡 <strong>What This Tool Does:</strong> Converts multiple HTML files (1-20) into complete Shopify sections with organized tabbed interface. Features batch processing, combined head snippet generation, and individual file outputs - perfect for developers managing multiple projects or complex theme conversions.
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
                        💡 Pro Tips for Multi-File Batch Processing:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '8px' }}><strong>Start Small:</strong> Begin with 1-2 files to understand the workflow, then scale up to 20 files</li>
                        <li style={{ marginBottom: '8px' }}><strong>Organize Files:</strong> Use clear, descriptive filenames - they become tab labels for easy navigation</li>
                        <li style={{ marginBottom: '8px' }}><strong>Mix Input Methods:</strong> Upload complex files, paste simple HTML - each tab works independently</li>
                        <li style={{ marginBottom: '8px' }}><strong>Watch Progress:</strong> Conversion auto-switches tabs - follow along to see real-time processing</li>
                        <li style={{ marginBottom: '8px' }}><strong>Check Combined Head:</strong> Review the global head snippet to ensure no conflicts between files</li>
                        <li style={{ marginBottom: '8px' }}><strong>Validation First:</strong> Fix HTML errors in each tab before starting batch conversion</li>
                        <li><strong>Download Strategy:</strong> Download individual files as needed, or batch download for complete projects</li>
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
                        🎯 What You Get After Multi-File Conversion:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: 'clamp(15px, 4vw, 20px)',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        lineHeight: '1.5'
                    }}>
                        <li style={{ marginBottom: '5px' }}>✅ Individual .liquid and .json files for each HTML input (up to 20 sets)</li>
                        <li style={{ marginBottom: '5px' }}>✅ Single combined head snippet with all fonts, scripts, and styles deduplicated</li>
                        <li style={{ marginBottom: '5px' }}>✅ Organized tabbed interface for managing multiple file outputs</li>
                        <li style={{ marginBottom: '5px' }}>✅ Real-time conversion progress with auto-tab switching</li>
                        <li style={{ marginBottom: '5px' }}>✅ Independent download options for each file set</li>
                        <li style={{ marginBottom: '5px' }}>✅ Batch processing efficiency for large-scale theme development</li>
                        <li style={{ marginBottom: '5px' }}>✅ Clean workspace organization for complex multi-page projects</li>
                        <li>✅ Professional workflow designed for agencies and developers handling multiple clients</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
