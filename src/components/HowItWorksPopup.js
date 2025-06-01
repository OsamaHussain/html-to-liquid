import React from 'react';

export default function HowItWorksPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    const steps = [
        {
            step: "1",
            title: "HTML File Upload",
            description: "Upload your HTML file or paste HTML code directly into the editor",
            icon: "📁"
        },
        {
            step: "2",
            title: "Validation Process",
            description: "System automatically validates your HTML file structure and syntax",
            icon: "✅"
        },
        {
            step: "3",
            title: "Liquid Conversion",
            description: "HTML will be converted into Shopify Liquid template format",
            icon: "🔄"
        },
        {
            step: "4",
            title: "Schema Generation",
            description: "Automatic schema.json file generation with customization options",
            icon: "⚙️"
        },
        {
            step: "5",
            title: "Download Files",
            description: "Download ready-to-use Liquid template and schema files",
            icon: "⬇️"
        }
    ];

    const features = [
        "🎨 Complete Shopify section templates",
        "📝 Automatic schema.json generation",
        "🔧 Customizable template options",
        "📱 Responsive design support",
        "⚡ Fast conversion process",
        "🛡️ HTML validation & error checking"
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
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
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '32px',
                        fontWeight: '800',
                        margin: '0 0 10px 0'
                    }}>
                        How Does The Software Work? 🚀
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: '16px',
                        margin: 0
                    }}>
                        Complete process to convert HTML to Shopify Liquid templates
                    </p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: '20px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        Step-by-Step Process 📋
                    </h3>

                    <div style={{
                        display: 'grid',
                        gap: '15px'
                    }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '15px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease'
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
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>
                                    {step.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        color: 'white',
                                        margin: '0 0 5px 0',
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    }}>
                                        {step.icon} {step.title}
                                    </h4>
                                    <p style={{
                                        color: '#bbb',
                                        margin: 0,
                                        fontSize: '14px'
                                    }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: '20px',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        Key Features ✨
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '10px'
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} style={{
                                padding: '10px 15px',
                                background: 'rgba(0, 212, 255, 0.1)',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 212, 255, 0.2)',
                                color: '#00d4ff',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginTop: '20px'
                }}>
                    <h4 style={{
                        color: '#ffc107',
                        margin: '0 0 10px 0',
                        fontSize: '16px'
                    }}>
                        💡 Pro Tips:
                    </h4>
                    <ul style={{
                        color: '#e6e6e6',
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '14px'
                    }}>
                        <li>Use valid HTML structure for best results</li>
                        <li>Keep class names descriptive for automatic schema generation</li>
                        <li>Include images and assets with proper paths</li>
                        <li>Generated files can be customized according to your needs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
