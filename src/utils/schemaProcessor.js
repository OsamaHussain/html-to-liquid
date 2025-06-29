import { STANDARD_BLOCK_TYPES, getBlockTemplate } from './blockTemplates';

/**
 * Scans Liquid content for block type references
 * @param {string} liquidContent - The Liquid template content
 * @returns {array} - Array of block types found in the content
 */
export function scanLiquidForBlocks(liquidContent) {
    const blockTypes = new Set();

    const blockTypePattern = /block\.type\s*==\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = blockTypePattern.exec(liquidContent)) !== null) {
        blockTypes.add(match[1]);
    }

    const casePattern = /when\s+['"]([^'"]+)['"]/g;
    while ((match = casePattern.exec(liquidContent)) !== null) {
        blockTypes.add(match[1]);
    }

    const blockSettingsPattern = /block\.settings\.(\w+)/g;
    const settingsFound = new Set();

    while ((match = blockSettingsPattern.exec(liquidContent)) !== null) {
        settingsFound.add(match[1]);
    }

    Object.keys(STANDARD_BLOCK_TYPES).forEach(blockType => {
        const template = STANDARD_BLOCK_TYPES[blockType];
        if (template.settings) {
            const templateSettings = template.settings.map(s => s.id);
            const hasMatchingSettings = templateSettings.some(settingId =>
                settingsFound.has(settingId)
            );

            if (hasMatchingSettings) {
                blockTypes.add(blockType);
            }
        }
    });

    return Array.from(blockTypes);
}

/**
 * Checks if liquid content already has schema blocks
 * @param {string} liquidContent - The Liquid template content
 * @returns {object} - { hasSchema: boolean, hasSchemaTag: boolean, hasEndSchemaTag: boolean }
 */
export function checkExistingSchemaBlocks(liquidContent) {
    const hasSchemaTag = /{% schema %}/.test(liquidContent);
    const hasEndSchemaTag = /{% endschema %}/.test(liquidContent);
    const hasCompleteSchema = hasSchemaTag && hasEndSchemaTag;

    return {
        hasSchema: hasCompleteSchema,
        hasSchemaTag,
        hasEndSchemaTag,
        warning: hasSchemaTag !== hasEndSchemaTag ?
            'Incomplete schema block detected. Found opening or closing tag but not both.' : null
    };
}

/**
 * Extracts existing block definitions from schema
 * @param {string} liquidContent - The Liquid template content
 * @returns {object} - { blocks: array, settings: array, schema: object, hasExistingSchema: boolean }
 */
export function extractExistingSchema(liquidContent) {
    const schemaCheck = checkExistingSchemaBlocks(liquidContent);
    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            blocks: [],
            settings: [],
            schema: null,
            hasExistingSchema: false,
            schemaCheck
        };
    }

    try {
        const schema = JSON.parse(schemaMatch[1]);
        return {
            blocks: schema.blocks || [],
            settings: schema.settings || [],
            schema: schema,
            hasExistingSchema: true,
            schemaCheck
        };
    } catch (error) {
        console.error('Error parsing schema:', error);
        return {
            blocks: [],
            settings: [],
            schema: null,
            hasExistingSchema: false,
            schemaCheck,
            parseError: error.message
        };
    }
}

/**
 * Merges new block definitions into existing schema without overwriting
 * @param {object} existingSchema - The existing schema object
 * @param {array} usedBlockTypes - Array of block types found in the content
 * @param {string} sectionType - The section type for proper naming
 * @returns {object} - Updated schema with injected blocks
 */
export function injectMissingBlocks(existingSchema, usedBlockTypes, sectionType = null) {
    if (!existingSchema) {
        existingSchema = {
            name: sectionType ? formatSectionName(sectionType) : "Custom Section",
            settings: [],
            blocks: [],
            presets: [{
                name: "Default",
                blocks: []
            }]
        };
    }

    if (!existingSchema.presets || !Array.isArray(existingSchema.presets)) {
        existingSchema.presets = [{
            name: "Default",
            blocks: []
        }];
    }

    existingSchema.presets.forEach(preset => {
        if (!preset.blocks) {
            preset.blocks = [];
        }
    });

    if (!existingSchema.blocks) {
        existingSchema.blocks = [];
    }

    if (sectionType && existingSchema.name !== formatSectionName(sectionType)) {
        existingSchema.name = formatSectionName(sectionType);
    }

    const existingBlockTypes = new Set(
        existingSchema.blocks.map(block => block.type)
    );

    const injectedBlocks = [];

    usedBlockTypes.forEach(blockType => {
        if (!existingBlockTypes.has(blockType)) {
            const template = getBlockTemplate(blockType);

            if (template) {
                existingSchema.blocks.push(template);
                injectedBlocks.push(blockType);
            } else {
                console.warn(`Unknown block type: ${blockType}`);
            }
        }
    });

    return {
        schema: existingSchema,
        injectedBlocks
    };
}

/**
 * Formats section name to match Shopify naming conventions
 * @param {string} sectionType - The section type
 * @returns {string} - Formatted section name
 */
export function formatSectionName(sectionType) {
    return sectionType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Updates the complete Liquid content with the new schema
 * @param {string} liquidContent - Original Liquid content
 * @param {object} updatedSchema - Updated schema object
 * @param {boolean} skipIfExists - Skip injection if schema already exists
 * @returns {object} - { content: string, warnings: array }
 */
export function updateLiquidSchema(liquidContent, updatedSchema, skipIfExists = false) {
    const schemaCheck = checkExistingSchemaBlocks(liquidContent);
    const warnings = [];

    if (schemaCheck.warning) {
        warnings.push(schemaCheck.warning);
    }

    if (skipIfExists && schemaCheck.hasSchema) {
        warnings.push('Existing schema block detected. Skipping schema injection to prevent conflicts.');
        return { content: liquidContent, warnings };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}\n\n`;
        return {
            content: newSchemaBlock + liquidContent,
            warnings: warnings.concat(['New schema block added to the beginning of the file.'])
        };
    }

    const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}`;
    return {
        content: liquidContent.replace(schemaMatch[0], newSchemaBlock),
        warnings: warnings.concat(['Existing schema block updated.'])
    };
}

/**
 * Validates JSON structure for Shopify compatibility
 * @param {string} jsonString - JSON template string
 * @param {string} expectedSectionType - Expected section type
 * @returns {object} - { valid: boolean, error: string, corrected: string }
 */
export function validateAndFixJSON(jsonString, expectedSectionType) {
    try {
        const json = JSON.parse(jsonString);

        if (!json.sections) {
            return {
                valid: false,
                error: "JSON must have a 'sections' property",
                corrected: null
            };
        }

        if (!json.sections.main) {
            return {
                valid: false,
                error: "JSON must have a 'sections.main' property",
                corrected: null
            };
        }

        if (json.sections.main.type !== expectedSectionType) {
            json.sections.main.type = expectedSectionType;
        }

        if (!json.sections.main.settings) {
            json.sections.main.settings = {};
        }

        if (!json.sections.main.blocks) {
            json.sections.main.blocks = {};
        }

        return {
            valid: true,
            error: null,
            corrected: JSON.stringify(json, null, 2)
        };

    } catch (error) {
        return {
            valid: false,
            error: `Invalid JSON: ${error.message}`,
            corrected: null
        };
    }
}

/**
 * Validates that block types in JSON match schema definitions
 * @param {string} jsonString - JSON template string
 * @param {array} schemaBlocks - Array of block definitions from schema
 * @returns {object} - { valid: boolean, errors: array, fixed: string }
 */
export function validateBlockTypes(jsonString, schemaBlocks) {
    try {
        const json = JSON.parse(jsonString);
        const validBlockTypes = new Set(schemaBlocks.map(block => block.type));
        const errors = [];
        let hasChanges = false;

        if (json.sections && json.sections.main && json.sections.main.blocks) {
            Object.keys(json.sections.main.blocks).forEach(blockKey => {
                const block = json.sections.main.blocks[blockKey];

                if (!validBlockTypes.has(block.type)) {
                    const similarType = Array.from(validBlockTypes).find(validType =>
                        validType.includes(block.type) || block.type.includes(validType)
                    );

                    if (similarType) {
                        block.type = similarType;
                        hasChanges = true;
                    } else {
                        errors.push(`Block "${blockKey}" uses undefined type "${block.type}"`);
                    }
                }
            });
        }

        return {
            valid: errors.length === 0,
            errors,
            fixed: hasChanges ? JSON.stringify(json, null, 2) : jsonString
        };

    } catch (error) {
        return {
            valid: false,
            errors: [`Invalid JSON: ${error.message}`],
            fixed: jsonString
        };
    }
}

/**
 * Complete schema processing pipeline
 * @param {string} liquidContent - Original Liquid content
 * @param {string} jsonContent - Original JSON content
 * @param {string} sectionType - Expected section type
 * @returns {object} - Complete processing result
 */
export function processSchemaAndBlocks(liquidContent, jsonContent, sectionType) {
    const usedBlockTypes = scanLiquidForBlocks(liquidContent);

    const { schema: existingSchema, hasExistingSchema, schemaCheck } = extractExistingSchema(liquidContent);

    const { schema: updatedSchema, injectedBlocks } = injectMissingBlocks(
        existingSchema,
        usedBlockTypes,
        sectionType
    );

    const { content: updatedLiquid, warnings } = updateLiquidSchema(
        liquidContent,
        updatedSchema,
        false
    );

    const { valid: jsonValid, error: jsonError, corrected: correctedJSON } =
        validateAndFixJSON(jsonContent, sectionType);

    if (!jsonValid) {
        return {
            success: false,
            error: jsonError,
            liquidContent: updatedLiquid,
            jsonContent: jsonContent,
            warnings,
            schemaCheck
        };
    }

    const { valid: blocksValid, errors: blockErrors, fixed: fixedJSON } =
        validateBlockTypes(correctedJSON, updatedSchema.blocks);

    return {
        success: blocksValid,
        errors: blockErrors,
        liquidContent: updatedLiquid,
        jsonContent: fixedJSON,
        injectedBlocks,
        usedBlockTypes,
        processedSchema: updatedSchema,
        warnings,
        hasExistingSchema,
        schemaCheck
    };
}
