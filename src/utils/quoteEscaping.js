/**
 * Schema quote escaping and validation utilities
 * Handles proper escaping of quotes in schema default values
 */

/**
 * Escapes quotes in schema default values
 * @param {string} value - The value to escape
 * @returns {string} - Escaped value safe for JSON
 */
export function escapeSchemaQuotes(value) {
    if (typeof value !== 'string') {
        return value;
    }

    return value.replace(/"/g, '\\"');
}

/**
 * Wraps values with problematic quotes in single quotes
 * @param {string} value - The value to wrap
 * @returns {string} - Wrapped value
 */
export function wrapInSingleQuotes(value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.includes('"')) {
        const escapedValue = value.replace(/'/g, "\\'");
        return `'${escapedValue}'`;
    }

    return value;
}

/**
 * Safely processes schema default values to handle quotes
 * @param {any} value - The schema value to process
 * @returns {any} - Processed value
 */
export function safeSchemaValue(value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.includes('"')) {
        return escapeSchemaQuotes(value);
    }

    return value;
}

/**
 * Recursively processes a schema object to escape quotes in default values
 * @param {object} schema - The schema object to process
 * @returns {object} - Processed schema with escaped quotes
 */
export function escapeSchemaDefaultQuotes(schema) {
    if (!schema || typeof schema !== 'object') {
        return schema;
    }

    const processedSchema = JSON.parse(JSON.stringify(schema));

    if (processedSchema.settings && Array.isArray(processedSchema.settings)) {
        processedSchema.settings.forEach(setting => {
            if (setting.default && typeof setting.default === 'string') {
                setting.default = safeSchemaValue(setting.default);
            }
        });
    }

    if (processedSchema.blocks && Array.isArray(processedSchema.blocks)) {
        processedSchema.blocks.forEach(block => {
            if (block.settings && Array.isArray(block.settings)) {
                block.settings.forEach(setting => {
                    if (setting.default && typeof setting.default === 'string') {
                        setting.default = safeSchemaValue(setting.default);
                    }
                });
            }
        });
    }

    return processedSchema;
}

/**
 * Validates schema for quote-related issues
 * @param {string} schemaString - JSON schema string
 * @returns {object} - Validation result with errors and fixes
 */
export function validateSchemaQuotes(schemaString) {
    const errors = [];
    const warnings = [];
    let correctedSchema = schemaString;

    try {
        const schema = JSON.parse(schemaString);
        const issues = [];

        if (schema.settings && Array.isArray(schema.settings)) {
            schema.settings.forEach((setting, index) => {
                if (setting.default && typeof setting.default === 'string') {
                    if (setting.default.includes('"') && !setting.default.startsWith('\\"')) {
                        issues.push({
                            type: 'unescaped_quotes',
                            location: `settings[${index}].default`,
                            setting: setting.id || `setting_${index}`,
                            value: setting.default,
                            fixed: safeSchemaValue(setting.default)
                        });
                    }
                }
            });
        }

        if (schema.blocks && Array.isArray(schema.blocks)) {
            schema.blocks.forEach((block, blockIndex) => {
                if (block.settings && Array.isArray(block.settings)) {
                    block.settings.forEach((setting, settingIndex) => {
                        if (setting.default && typeof setting.default === 'string') {
                            if (setting.default.includes('"') && !setting.default.startsWith('\\"')) {
                                issues.push({
                                    type: 'unescaped_quotes',
                                    location: `blocks[${blockIndex}].settings[${settingIndex}].default`,
                                    setting: setting.id || `setting_${settingIndex}`,
                                    block: block.type || `block_${blockIndex}`,
                                    value: setting.default,
                                    fixed: safeSchemaValue(setting.default)
                                });
                            }
                        }
                    });
                }
            });
        }

        if (issues.length > 0) {
            const correctedSchemaObj = escapeSchemaDefaultQuotes(schema);
            correctedSchema = JSON.stringify(correctedSchemaObj, null, 2);

            issues.forEach(issue => {
                warnings.push(`Quote issue in ${issue.location}: "${issue.value}" → "${issue.fixed}"`);
            });
        }

        return {
            valid: issues.length === 0,
            errors,
            warnings,
            issues,
            correctedSchema,
            issuesFound: issues.length
        };

    } catch (parseError) {
        errors.push(`Invalid JSON schema: ${parseError.message}`);
        return {
            valid: false,
            errors,
            warnings,
            issues: [],
            correctedSchema: schemaString,
            issuesFound: 0
        };
    }
}

/**
 * Automatically fixes quote issues in a liquid template's schema section
 * @param {string} liquidContent - The liquid template content
 * @returns {object} - Result with fixed content and validation info
 */
export function fixSchemaQuotesInLiquid(liquidContent) {
    if (!liquidContent || typeof liquidContent !== 'string') {
        return {
            success: false,
            error: 'Invalid liquidContent: must be a non-empty string',
            content: liquidContent || '',
            issues: []
        };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            success: false,
            error: 'No schema section found',
            content: liquidContent,
            issues: []
        };
    }

    const schemaContent = schemaMatch[1].trim();
    const validation = validateSchemaQuotes(schemaContent);

    if (validation.valid) {
        return {
            success: true,
            content: liquidContent,
            issues: [],
            message: 'No quote issues found'
        };
    }

    if (validation.errors.length > 0) {
        return {
            success: false,
            error: validation.errors.join(', '),
            content: liquidContent,
            issues: validation.issues
        };
    }

    const newSchemaBlock = `{% schema %}\n${validation.correctedSchema}\n{% endschema %}`;
    const fixedContent = liquidContent.replace(schemaMatch[0], newSchemaBlock);

    return {
        success: true,
        content: fixedContent,
        issues: validation.issues,
        warnings: validation.warnings,
        message: `Fixed ${validation.issuesFound} quote issue${validation.issuesFound !== 1 ? 's' : ''}`
    };
}
