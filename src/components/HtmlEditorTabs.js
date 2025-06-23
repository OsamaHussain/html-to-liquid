import { useState } from 'react';
import HtmlEditor from './HtmlEditor';

export default function HtmlEditorTabs({
    files,
    handleManualInput,
    onFileUpload,
    onClearContent,
    onValidationError
}) {
    const [activeTab, setActiveTab] = useState(0);
    const filesWithContent = files.filter(file => file.fileContent || file.fileName);

    if (files.length === 0) return null;

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginTop: 'clamp(20px, 5vw, 35px)',
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
                background: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                    flex: '1'
                }}>
                    <div style={{
                        width: 'clamp(40px, 8vw, 50px)',
                        height: 'clamp(40px, 8vw, 50px)',
                        borderRadius: '15px',
                        background: 'linear-gradient(135deg, #7877c6 0%, #5d5ca0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        boxShadow: '0 8px 16px rgba(120, 119, 198, 0.3)',
                        flexShrink: 0
                    }}>
                        <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📝</span>
                    </div>
                    <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontWeight: '700',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        wordBreak: 'break-word'
                    }}>
                        HTML Editor & Validator
                    </h2>
                </div>
            </div>

            {files.length > 1 && (
                <div style={{
                    marginBottom: 'clamp(15px, 4vw, 20px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'clamp(10px, 3vw, 15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden'
                }}>
                    <style jsx>{`
                        .html-tab-container::-webkit-scrollbar {
                            height: 6px;
                        }
                        .html-tab-container::-webkit-scrollbar-track {
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 3px;
                        }
                        .html-tab-container::-webkit-scrollbar-thumb {
                            background: rgba(120, 119, 198, 0.5);
                            border-radius: 3px;
                        }
                        .html-tab-container::-webkit-scrollbar-thumb:hover {
                            background: rgba(120, 119, 198, 0.7);
                        }
                    `}</style>

                    <div className="html-tab-container" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
                    }}>
                        {files.map((file, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                style={{
                                    padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                                    background: activeTab === index
                                        ? 'linear-gradient(135deg, #7877c6 0%, #5d5ca0 100%)'
                                        : 'transparent',
                                    color: activeTab === index ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 'clamp(12px, 3vw, 14px)',
                                    fontWeight: activeTab === index ? '700' : '500',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    minWidth: 'fit-content',
                                    textShadow: activeTab === index ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
                                    borderRadius: activeTab === index ? '8px 8px 0 0' : '0',
                                    position: 'relative'
                                }}
                                onMouseOver={(e) => {
                                    if (activeTab !== index) {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.color = '#ffffff';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (activeTab !== index) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                    }
                                }}
                            >
                                📄 {file.fileName || `File ${index + 1}`}
                                {file.fileContent && ' ✓'}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{
                position: 'relative',
                zIndex: 1
            }}>
                <HtmlEditor
                    key={activeTab}
                    index={activeTab}
                    fileContent={files[activeTab]?.fileContent || ''}
                    fileName={files[activeTab]?.fileName || ''}
                    isLoading={files[activeTab]?.isLoading || false}
                    handleManualInput={(text) => handleManualInput(activeTab, text)}
                    onFileUpload={onFileUpload}
                    onClearContent={onClearContent}
                    onValidationError={onValidationError}
                />
            </div>
        </div>
    );
}
