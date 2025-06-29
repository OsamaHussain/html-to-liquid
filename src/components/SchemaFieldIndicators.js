import { getFieldRequirement, getSchemaFieldStats, FIELD_REQUIREMENT_TYPES } from '../utils/schemaFieldTypes';

export default function SchemaFieldIndicators({ schema, isVisible = true }) {
    if (!isVisible || !schema) return null;

    const stats = getSchemaFieldStats(schema);

    const renderFieldIndicator = (field, index) => {
        const requirement = getFieldRequirement(field);
        const isRequired = requirement === FIELD_REQUIREMENT_TYPES.REQUIRED;

        return (
            <div
                key={`field-${index}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    background: isRequired
                        ? 'rgba(255, 107, 107, 0.1)'
                        : 'rgba(108, 117, 125, 0.1)',
                    borderRadius: '8px',
                    border: `1px solid ${isRequired
                        ? 'rgba(255, 107, 107, 0.3)'
                        : 'rgba(108, 117, 125, 0.3)'}`,
                    marginBottom: '6px'
                }}
            >
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isRequired ? '#ff6b6b' : '#6c757d',
                    flexShrink: 0
                }}></div>
                <span style={{
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: isRequired ? '600' : '400'
                }}>
                    {field.label || field.id || 'Unnamed Field'}
                </span>
                <span style={{
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    color: isRequired ? '#ff6b6b' : '#6c757d',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {isRequired ? 'Required' : 'Optional'}
                </span>
                {field.type && (
                    <span style={{
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginLeft: 'auto'
                    }}>
                        {field.type}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            padding: 'clamp(20px, 5vw, 35px)',
            marginBottom: 'clamp(20px, 5vw, 35px)',
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
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(108, 117, 125, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: 'clamp(15px, 4vw, 25px)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    width: 'clamp(40px, 8vw, 50px)',
                    height: 'clamp(40px, 8vw, 50px)',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)',
                    flexShrink: 0
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(18px, 4vw, 24px)' }}>📋</span>
                </div>
                <div>
                    <h3 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Schema Field Requirements
                    </h3>
                    <p style={{
                        margin: '5px 0 0 0',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        {stats.totalFields} total fields • {stats.requiredFields} required • {stats.optionalFields} optional
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '25px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    padding: '16px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#ff6b6b',
                        marginBottom: '5px'
                    }}>
                        {stats.requiredFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Required Fields
                    </div>
                </div>

                <div style={{
                    padding: '16px',
                    background: 'rgba(108, 117, 125, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(108, 117, 125, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#6c757d',
                        marginBottom: '5px'
                    }}>
                        {stats.optionalFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Optional Fields
                    </div>
                </div>

                <div style={{
                    padding: '16px',
                    background: 'rgba(120, 119, 198, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(120, 119, 198, 0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: 'clamp(24px, 6vw, 32px)',
                        fontWeight: '700',
                        color: '#7877c6',
                        marginBottom: '5px'
                    }}>
                        {stats.totalFields}
                    </div>
                    <div style={{
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500'
                    }}>
                        Total Fields
                    </div>
                </div>
            </div>

            <div style={{
                position: 'relative',
                zIndex: 1
            }}>
                {schema.settings && schema.settings.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{
                            margin: '0 0 12px 0',
                            fontSize: 'clamp(16px, 4vw, 18px)',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}>
                            Section Settings
                        </h4>
                        {schema.settings.map((field, index) => renderFieldIndicator(field, `main-${index}`))}
                    </div>
                )}

                {schema.blocks && schema.blocks.map((block, blockIndex) => (
                    block.settings && block.settings.length > 0 && (
                        <div key={`block-${blockIndex}`} style={{ marginBottom: '20px' }}>
                            <h4 style={{
                                margin: '0 0 12px 0',
                                fontSize: 'clamp(16px, 4vw, 18px)',
                                fontWeight: '600',
                                color: 'rgba(255, 255, 255, 0.9)'
                            }}>
                                Block: {block.name || block.type || `Block ${blockIndex + 1}`}
                            </h4>
                            {block.settings.map((field, fieldIndex) =>
                                renderFieldIndicator(field, `block-${blockIndex}-${fieldIndex}`)
                            )}
                        </div>
                    )
                ))}
            </div>

            <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <h5 style={{
                    margin: '0 0 12px 0',
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)'
                }}>
                    Legend
                </h5>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#ff6b6b'
                        }}></div>
                        <span style={{
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            Required - Critical for functionality
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#6c757d'
                        }}></div>
                        <span style={{
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            Optional - Has defaults or decorative
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
