/**
 * File name and schema validation utilities
 * Ensures consistency between .liquid file names, schema names, and JSON types
 */

/**
 * Extracts schema information from liquid content
 * @param {string} liquidContent - The liquid template content
 * @returns {object} - Schema information including name and type
 */
export function extractSchemaInfo(liquidContent) {
    if (!liquidContent || typeof liquidContent !== 'string') {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: 'Invalid liquidContent: must be a non-empty string'
        };
    }

    const schemaMatch = liquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

    if (!schemaMatch) {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: 'No schema section found'
        };
    }

    try {
        const schema = JSON.parse(schemaMatch[1]);
        return {
            hasSchema: true,
            schemaName: schema.name || null,
            schemaType: schema.type || null,
            schema: schema
        };
    } catch (error) {
        return {
            hasSchema: false,
            schemaName: null,
            schemaType: null,
            error: `Invalid schema JSON: ${error.message}`
        };
    }
}

/**
 * Extracts section type from JSON template
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - JSON section type information
 */
export function extractJsonSectionType(jsonContent) {
    try {
        const json = JSON.parse(jsonContent);

        if (json.sections && json.sections.main && json.sections.main.type) {
            return {
                hasValidStructure: true,
                sectionType: json.sections.main.type,
                json: json
            };
        }

        return {
            hasValidStructure: false,
            sectionType: null,
            error: 'Invalid JSON structure: missing sections.main.type'
        };
    } catch (error) {
        return {
            hasValidStructure: false,
            sectionType: null,
            error: `Invalid JSON: ${error.message}`
        };
    }
}

/**
 * Normalizes a filename to match Shopify naming conventions
 * @param {string} fileName - The original filename
 * @returns {string} - Normalized filename
 */
export function normalizeFileName(fileName) {
    return fileName
        .replace(/\.liquid$|\.html$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Generates display name from filename
 * @param {string} fileName - The normalized filename
 * @returns {string} - Human-readable display name
 */
export function generateDisplayName(fileName) {
    return fileName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Validates consistency between filename, schema, and JSON
 * @param {string} liquidFileName - The .liquid filename (without extension)
 * @param {string} liquidContent - The liquid template content
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - Validation result with mismatches and corrections
 */
export function validateFileSchemaConsistency(liquidFileName, liquidContent, jsonContent) {
    const normalizedFileName = normalizeFileName(liquidFileName);
    const expectedDisplayName = generateDisplayName(normalizedFileName);

    const schemaInfo = extractSchemaInfo(liquidContent);
    const jsonInfo = extractJsonSectionType(jsonContent);

    const mismatches = [];
    const warnings = [];
    const corrections = {
        fileName: normalizedFileName,
        schemaName: expectedDisplayName,
        schemaType: normalizedFileName,
        jsonType: normalizedFileName
    };

    if (!schemaInfo.hasSchema) {
        warnings.push('No schema section found in liquid template');
    } else {
        if (schemaInfo.schemaType && schemaInfo.schemaType !== normalizedFileName) {
            mismatches.push({
                type: 'schema_type_mismatch',
                expected: normalizedFileName,
                actual: schemaInfo.schemaType,
                location: 'liquid schema type',
                message: `Schema type "${schemaInfo.schemaType}" doesn't match filename "${normalizedFileName}"`
            });
        }

        if (schemaInfo.schemaName) {
            const normalizedSchemaName = schemaInfo.schemaName.toLowerCase().replace(/\s+/g, '-');
            if (normalizedSchemaName !== normalizedFileName) {
                warnings.push(`Schema name "${schemaInfo.schemaName}" doesn't match filename pattern`);
            }
        }
    }

    if (!jsonInfo.hasValidStructure) {
        warnings.push(jsonInfo.error || 'Invalid JSON template structure');
    } else {
        if (jsonInfo.sectionType !== normalizedFileName) {
            mismatches.push({
                type: 'json_type_mismatch',
                expected: normalizedFileName,
                actual: jsonInfo.sectionType,
                location: 'JSON sections.main.type',
                message: `JSON section type "${jsonInfo.sectionType}" doesn't match filename "${normalizedFileName}"`
            });
        }
    }

    const isValid = mismatches.length === 0;

    return {
        valid: isValid,
        mismatches,
        warnings,
        corrections,
        normalizedFileName,
        expectedDisplayName,
        schemaInfo,
        jsonInfo,
        summary: {
            fileName: normalizedFileName,
            schemaType: schemaInfo.schemaType,
            schemaName: schemaInfo.schemaName,
            jsonType: jsonInfo.sectionType,
            issuesFound: mismatches.length
        }
    };
}

/**
 * Automatically fixes mismatches between filename, schema, and JSON
 * @param {string} liquidFileName - The .liquid filename
 * @param {string} liquidContent - The liquid template content
 * @param {string} jsonContent - The JSON template content
 * @returns {object} - Fixed content and validation results
 */
export function fixFileSchemaConsistency(liquidFileName, liquidContent, jsonContent) {
    const validation = validateFileSchemaConsistency(liquidFileName, liquidContent, jsonContent);

    if (validation.valid) {
        return {
            success: true,
            liquidContent,
            jsonContent,
            message: 'No consistency issues found',
            changes: []
        };
    }

    const changes = [];
    let fixedLiquidContent = liquidContent;
    let fixedJsonContent = jsonContent;

    const schemaMismatch = validation.mismatches.find(m => m.type === 'schema_type_mismatch');
    if (schemaMismatch && validation.schemaInfo.hasSchema) {
        try {
            const updatedSchema = { ...validation.schemaInfo.schema };
            updatedSchema.type = validation.corrections.schemaType;

            if (!updatedSchema.name || !updatedSchema.name.trim()) {
                updatedSchema.name = validation.corrections.schemaName;
                changes.push(`Set schema name to "${validation.corrections.schemaName}"`);
            }

            const newSchemaBlock = `{% schema %}\n${JSON.stringify(updatedSchema, null, 2)}\n{% endschema %}`;
            const schemaMatch = fixedLiquidContent.match(/{% schema %}([\s\S]*?){% endschema %}/);

            if (schemaMatch) {
                fixedLiquidContent = fixedLiquidContent.replace(schemaMatch[0], newSchemaBlock);
                changes.push(`Updated schema type from "${schemaMismatch.actual}" to "${validation.corrections.schemaType}"`);
            }
        } catch (error) {
            console.error('Error fixing schema:', error);
        }
    }

    const jsonMismatch = validation.mismatches.find(m => m.type === 'json_type_mismatch');
    if (jsonMismatch && validation.jsonInfo.hasValidStructure) {
        try {
            const updatedJson = { ...validation.jsonInfo.json };
            updatedJson.sections.main.type = validation.corrections.jsonType;

            fixedJsonContent = JSON.stringify(updatedJson, null, 2);
            changes.push(`Updated JSON section type from "${jsonMismatch.actual}" to "${validation.corrections.jsonType}"`);
        } catch (error) {
            console.error('Error fixing JSON:', error);
        }
    }

    return {
        success: true,
        liquidContent: fixedLiquidContent,
        jsonContent: fixedJsonContent,
        message: `Fixed ${changes.length} consistency issue${changes.length !== 1 ? 's' : ''}`,
        changes,
        validation
    };
}

/**
 * Validates multiple files for naming consistency
 * @param {Array} files - Array of file objects with liquidContent, jsonContent, and fileName
 * @returns {object} - Batch validation results
 */
export function validateBatchConsistency(files) {
    const results = [];
    const globalIssues = [];
    let totalIssues = 0;

    files.forEach((file, index) => {
        if (!file.liquidContent || !file.jsonContent || !file.fileName) {
            globalIssues.push(`File ${index + 1}: Missing required content (liquid, JSON, or filename)`);
            return;
        }

        const validation = validateFileSchemaConsistency(
            file.fileName,
            file.liquidContent,
            file.jsonContent
        );

        results.push({
            ...validation,
            fileIndex: index,
            originalFileName: file.fileName
        });

        totalIssues += validation.mismatches.length;
    });

    return {
        results,
        globalIssues,
        totalFiles: files.length,
        totalIssues,
        summary: {
            filesWithIssues: results.filter(r => !r.valid).length,
            totalMismatches: totalIssues,
            globalIssues: globalIssues.length
        }
    };
}
