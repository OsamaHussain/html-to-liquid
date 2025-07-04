/**
 * Schema field type definitions with required/optional indicators
 */

export const FIELD_REQUIREMENT_TYPES = {
    REQUIRED: 'required',
    OPTIONAL: 'optional'
};

/**
 * Determines if a schema field is required or optional based on its properties
 * @param {object} field - Schema field object
 * @returns {string} - 'required' or 'optional'
 */
export function getFieldRequirement(field) {
    const requiredFieldTypes = [
        'header', 'text', 'textarea'
    ];

    const optionalFieldTypes = [
        'color', 'font_picker', 'select', 'checkbox', 'radio'
    ];

    if (field.label && field.label.includes('*')) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    const criticalIds = [
        'title', 'heading', 'section_title', 'button_text',
        'link_url', 'link_text', 'nav_link', 'menu_item',
        'name', 'content', 'description', 'subtitle'
    ];

    if (field.id && criticalIds.some(id => field.id.includes(id))) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    const requiredPatterns = [
        /^(heading|title|name|content|description)$/i,
        /_(heading|title|name|text|content)$/i,
        /^(button|link|nav|menu)_/i,
        /^section_(title|heading|name)$/i
    ];

    if (field.id && requiredPatterns.some(pattern => pattern.test(field.id))) {
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    if (field.type && requiredFieldTypes.includes(field.type)) {
        if (field.type === 'textarea' && field.id &&
            (field.id.includes('description') || field.id.includes('bio') || field.id.includes('details'))) {
            return FIELD_REQUIREMENT_TYPES.OPTIONAL;
        }
        return FIELD_REQUIREMENT_TYPES.REQUIRED;
    }

    if (field.type && optionalFieldTypes.includes(field.type)) {
        return FIELD_REQUIREMENT_TYPES.OPTIONAL;
    }

    const specialOptionalTypes = [
        'image_picker', 'url', 'richtext', 'html', 'number', 'range',
        'collection', 'product', 'blog', 'page', 'link_list', 'video_url', 'article'
    ];

    if (field.type && specialOptionalTypes.includes(field.type)) {
        if (field.type === 'url' && field.id &&
            (field.id.includes('button') || field.id.includes('link') || field.id.includes('nav'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }
        return FIELD_REQUIREMENT_TYPES.OPTIONAL;
    }

    return FIELD_REQUIREMENT_TYPES.OPTIONAL;
}

/**
 * Adds visual indicators to schema fields for required/optional status
 * @param {object} schema - Complete schema object
 * @returns {object} - Schema with field indicators added
 */
export function addFieldIndicators(schema) {
    const processedSchema = JSON.parse(JSON.stringify(schema));

    if (processedSchema.settings) {
        processedSchema.settings = processedSchema.settings.map(field => {
            const requirement = getFieldRequirement(field);
            return {
                ...field,
                _requirement: requirement,
                _indicator: requirement === FIELD_REQUIREMENT_TYPES.REQUIRED ? '* ' : ''
            };
        });
    }

    if (processedSchema.blocks) {
        processedSchema.blocks = processedSchema.blocks.map(block => {
            if (block.settings) {
                block.settings = block.settings.map(field => {
                    const requirement = getFieldRequirement(field);
                    return {
                        ...field,
                        _requirement: requirement,
                        _indicator: requirement === FIELD_REQUIREMENT_TYPES.REQUIRED ? '* ' : ''
                    };
                });
            }
            return block;
        });
    }

    return processedSchema;
}

/**
 * Gets field statistics for a schema
 * @param {object} schema - Schema object
 * @returns {object} - { totalFields, requiredFields, optionalFields }
 */
export function getSchemaFieldStats(schema) {
    let totalFields = 0;
    let requiredFields = 0;
    let optionalFields = 0;

    if (schema.settings) {
        schema.settings.forEach(field => {
            totalFields++;
            const requirement = getFieldRequirement(field);
            if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                requiredFields++;
            } else {
                optionalFields++;
            }
        });
    }

    if (schema.blocks) {
        schema.blocks.forEach(block => {
            if (block.settings) {
                block.settings.forEach(field => {
                    totalFields++;
                    const requirement = getFieldRequirement(field);
                    if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                        requiredFields++;
                    } else {
                        optionalFields++;
                    }
                });
            }
        });
    }

    return {
        totalFields,
        requiredFields,
        optionalFields
    };
}

/**
 * Formats field labels with requirement indicators
 * @param {string} label - Original field label
 * @param {boolean} isRequired - Whether field is required
 * @returns {string} - Formatted label with indicator
 */
export function formatFieldLabel(label, isRequired) {
    if (!label) return label;

    const cleanLabel = label.replace(/^\*\s*/, '').replace(/\s*\*$/, '');

    return isRequired ? `${cleanLabel} *` : cleanLabel;
}

/**
 * Enhanced field requirement detection with context awareness
 */
export function getEnhancedFieldRequirement(field, blockContext = null) {
    const basicRequirement = getFieldRequirement(field);

    if (blockContext) {
        if (blockContext.type === 'header' && field.id &&
            (field.id.includes('nav') || field.id.includes('logo'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }

        if (blockContext.type === 'button' && field.id &&
            (field.id.includes('text') || field.id.includes('url'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }

        if (blockContext.type === 'product' && field.id &&
            (field.id.includes('title') || field.id.includes('price'))) {
            return FIELD_REQUIREMENT_TYPES.REQUIRED;
        }
    }

    return basicRequirement;
}

/**
 * Valid Shopify schema field types with their required attributes
 */
export const VALID_SHOPIFY_FIELD_TYPES = {
    'text': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'textarea': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'number': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info', 'placeholder']
    },
    'range': {
        required: ['type', 'id', 'label', 'min', 'max', 'step'],
        optional: ['default', 'info']
    },
    'color': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'color_background': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'font_picker': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'collection': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'product': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'blog': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'page': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'link_list': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'url': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'video_url': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'richtext': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'html': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'article': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'image_picker': {
        required: ['type', 'id', 'label'],
        optional: ['info']
    },
    'radio': {
        required: ['type', 'id', 'label', 'options'],
        optional: ['default', 'info']
    },
    'select': {
        required: ['type', 'id', 'label', 'options'],
        optional: ['default', 'info']
    },
    'checkbox': {
        required: ['type', 'id', 'label'],
        optional: ['default', 'info']
    },
    'header': {
        required: ['type', 'content'],
        optional: ['info']
    },
    'paragraph': {
        required: ['type', 'content'],
        optional: []
    }
};

/**
 * Validates a single schema field
 * @param {object} field - Schema field object
 * @returns {object} - { valid: boolean, errors: array, corrected: object }
 */
export function validateSchemaField(field) {
    const errors = [];
    let correctedField = { ...field };

    if (!field || typeof field !== 'object') {
        return {
            valid: false,
            errors: ['Field must be an object'],
            corrected: null
        };
    }

    if (!field.type) {
        errors.push('Field missing required "type" attribute');
        return { valid: false, errors, corrected: null };
    }

    const fieldTypeConfig = VALID_SHOPIFY_FIELD_TYPES[field.type];
    if (!fieldTypeConfig) {
        const correctedType = correctFieldType(field.type, field);
        if (correctedType) {
            correctedField.type = correctedType;
            errors.push(`Invalid field type "${field.type}" corrected to "${correctedType}"`);
        } else {
            errors.push(`Invalid field type: "${field.type}"`);
            return { valid: false, errors, corrected: null };
        }
    }

    const config = VALID_SHOPIFY_FIELD_TYPES[correctedField.type];

    config.required.forEach(attr => {
        if (!correctedField[attr]) {
            if (attr === 'id' && correctedField.type !== 'header' && correctedField.type !== 'paragraph') {
                errors.push(`Field missing required "${attr}" attribute`);
            } else if (attr === 'label' && correctedField.type !== 'header' && correctedField.type !== 'paragraph') {
                errors.push(`Field missing required "${attr}" attribute`);
            } else if (attr === 'content' && (correctedField.type === 'header' || correctedField.type === 'paragraph')) {
                errors.push(`Field missing required "${attr}" attribute`);
            }
        }
    });

    if (correctedField.id && !/^[a-z][a-z0-9_]*$/.test(correctedField.id)) {
        const correctedId = correctedField.id.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/^[0-9]/, 'field_$&');
        errors.push(`Invalid ID format "${correctedField.id}" corrected to "${correctedId}"`);
        correctedField.id = correctedId;
    }

    Object.keys(correctedField).forEach(attr => {
        if (!config.required.includes(attr) && !config.optional.includes(attr)) {
            delete correctedField[attr];
            errors.push(`Removed invalid attribute "${attr}" from field`);
        }
    });

    if (correctedField.type === 'image_picker' && correctedField.default) {
        delete correctedField.default;
        errors.push('Removed invalid "default" attribute from image_picker field');
    }

    if ((correctedField.type === 'radio' || correctedField.type === 'select') && !correctedField.options) {
        correctedField.options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ];
        errors.push('Added default options for radio/select field');
    }

    return {
        valid: errors.length === 0,
        errors,
        corrected: correctedField
    };
}

/**
 * Attempts to correct invalid field types
 * @param {string} invalidType - The invalid field type
 * @param {object} field - The field object for context
 * @returns {string|null} - Corrected type or null if cannot be corrected
 */
function correctFieldType(invalidType, field) {
    const typeCorrections = {
        'email': 'text',
        'password': 'text',
        'tel': 'text',
        'phone': 'text',
        'email_placeholder': 'text',
        'newsletter_email_placeholder': 'text',
        'placeholder': 'text',
        'string': 'text',
        'longtext': 'textarea',
        'wysiwyg': 'richtext',
        'editor': 'richtext',
        'color_picker': 'color',
        'image': 'image_picker',
        'file': 'image_picker',
        'link': 'url',
        'boolean': 'checkbox',
        'toggle': 'checkbox'
    };

    if (typeCorrections[invalidType]) {
        return typeCorrections[invalidType];
    }

    if (invalidType.includes('email') || invalidType.includes('placeholder')) {
        return 'text';
    }

    if (invalidType.includes('color')) {
        return 'color';
    }

    if (invalidType.includes('image') || invalidType.includes('picture')) {
        return 'image_picker';
    }

    if (invalidType.includes('text') || invalidType.includes('string')) {
        return 'text';
    }

    if (invalidType.includes('area') || invalidType.includes('long')) {
        return 'textarea';
    }

    if (invalidType.includes('url') || invalidType.includes('link')) {
        return 'url';
    }

    if (invalidType.includes('rich') || invalidType.includes('html')) {
        return 'richtext';
    }

    if (invalidType.includes('number') || invalidType.includes('numeric')) {
        return 'number';
    }

    if (invalidType.includes('range') || invalidType.includes('slider')) {
        return 'range';
    }

    if (invalidType.includes('select') || invalidType.includes('dropdown')) {
        return 'select';
    }

    if (invalidType.includes('radio') || invalidType.includes('option')) {
        return 'radio';
    }

    if (invalidType.includes('check') || invalidType.includes('bool')) {
        return 'checkbox';
    }

    return null;
}

/**
 * Validates and corrects an entire schema object
 * @param {object} schema - Complete schema object
 * @returns {object} - { valid: boolean, errors: array, corrected: object }
 */
export function validateAndCorrectSchema(schema) {
    const errors = [];
    let correctedSchema = { ...schema };

    if (!schema || typeof schema !== 'object') {
        return {
            valid: false,
            errors: ['Schema must be an object'],
            corrected: null
        };
    }

    if (correctedSchema.settings && Array.isArray(correctedSchema.settings)) {
        correctedSchema.settings = correctedSchema.settings.map((field, index) => {
            const validation = validateSchemaField(field);
            if (!validation.valid) {
                errors.push(`Setting ${index}: ${validation.errors.join(', ')}`);
            }
            return validation.corrected || field;
        }).filter(field => field !== null);
    }

    if (correctedSchema.blocks && Array.isArray(correctedSchema.blocks)) {
        correctedSchema.blocks = correctedSchema.blocks.map((block, blockIndex) => {
            if (block.settings && Array.isArray(block.settings)) {
                block.settings = block.settings.map((field, fieldIndex) => {
                    const validation = validateSchemaField(field);
                    if (!validation.valid) {
                        errors.push(`Block ${blockIndex}, Setting ${fieldIndex}: ${validation.errors.join(', ')}`);
                    }
                    return validation.corrected || field;
                }).filter(field => field !== null);
            }
            return block;
        });
    }

    if (!correctedSchema.presets || !Array.isArray(correctedSchema.presets)) {
        correctedSchema.presets = [{
            name: "Default",
            blocks: []
        }];
        errors.push('Added missing presets section');
    }

    return {
        valid: errors.length === 0,
        errors,
        corrected: correctedSchema
    };
}

/**
 * Advanced schema field requirement analysis with context
 * @param {object} schema - Complete schema object
 * @returns {object} - Enhanced statistics with context analysis
 */
export function getAdvancedSchemaStats(schema) {
    const basicStats = getSchemaFieldStats(schema);
    const analysis = {
        ...basicStats,
        blockAnalysis: [],
        criticalMissing: [],
        recommendations: []
    };

    if (schema.blocks) {
        schema.blocks.forEach((block, index) => {
            const blockStats = {
                blockType: block.type || `Block ${index + 1}`,
                blockName: block.name || block.type,
                totalFields: 0,
                requiredFields: 0,
                optionalFields: 0,
                missingCritical: []
            };

            if (block.settings) {
                block.settings.forEach(field => {
                    blockStats.totalFields++;
                    const requirement = getEnhancedFieldRequirement(field, block);
                    if (requirement === FIELD_REQUIREMENT_TYPES.REQUIRED) {
                        blockStats.requiredFields++;
                    } else {
                        blockStats.optionalFields++;
                    }
                });
            }

            const criticalFieldsForType = getCriticalFieldsForBlockType(block.type);
            criticalFieldsForType.forEach(criticalField => {
                const hasField = block.settings?.some(field =>
                    field.id === criticalField.id ||
                    field.id.includes(criticalField.pattern)
                );
                if (!hasField) {
                    blockStats.missingCritical.push(criticalField);
                    analysis.criticalMissing.push({
                        blockType: block.type,
                        missing: criticalField
                    });
                }
            });

            analysis.blockAnalysis.push(blockStats);
        });
    }

    if (analysis.criticalMissing.length > 0) {
        analysis.recommendations.push(
            'Consider adding missing critical fields for better user experience'
        );
    }

    if (basicStats.requiredFields === 0) {
        analysis.recommendations.push(
            'Schema has no required fields - consider marking important fields as required'
        );
    }

    return analysis;
}

/**
 * Get critical fields that should exist for specific block types
 * @param {string} blockType - The type of block
 * @returns {array} - Array of critical field definitions
 */
function getCriticalFieldsForBlockType(blockType) {
    const criticalFields = {
        'header': [
            { id: 'logo_image', pattern: 'logo', description: 'Logo image for branding' },
            { id: 'nav_link_1_text', pattern: 'nav', description: 'Navigation links' }
        ],
        'button': [
            { id: 'button_text', pattern: 'text', description: 'Button text' },
            { id: 'button_url', pattern: 'url', description: 'Button URL' }
        ],
        'product': [
            { id: 'product_title', pattern: 'title', description: 'Product title' },
            { id: 'product_price', pattern: 'price', description: 'Product price' }
        ],
        'testimonial': [
            { id: 'customer_name', pattern: 'name', description: 'Customer name' },
            { id: 'testimonial_text', pattern: 'text', description: 'Testimonial content' }
        ],
        'feature': [
            { id: 'feature_title', pattern: 'title', description: 'Feature title' },
            { id: 'feature_description', pattern: 'description', description: 'Feature description' }
        ]
    };

    return criticalFields[blockType] || [];
}
