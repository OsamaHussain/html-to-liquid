/**
 * Detects existing schema blocks in HTML content
 * @param {string} htmlContent - The HTML content to check
 * @returns {object} - { hasSchema: boolean, schemaContent: string, position: number }
 */
export function detectExistingSchema(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
        return { hasSchema: false, schemaContent: '', position: -1 };
    }

    // Check for {% schema %} blocks
    const schemaPattern = /{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/gi;
    const match = schemaPattern.exec(htmlContent);

    if (match) {
        return {
            hasSchema: true,
            schemaContent: match[1].trim(),
            position: match.index,
            fullMatch: match[0]
        };
    }

    return { hasSchema: false, schemaContent: '', position: -1 };
}

/**
 * Removes existing schema block from HTML content
 * @param {string} htmlContent - The HTML content
 * @returns {string} - HTML content with schema removed
 */
export function removeExistingSchema(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
        return htmlContent;
    }

    const schemaPattern = /{%\s*schema\s*%}[\s\S]*?{%\s*endschema\s*%}/gi;
    return htmlContent.replace(schemaPattern, '').trim();
}

/**
 * Extracts and parses existing schema JSON
 * @param {string} schemaContent - The schema content between tags
 * @returns {object} - { isValid: boolean, schema: object, error: string }
 */
export function parseExistingSchema(schemaContent) {
    if (!schemaContent || !schemaContent.trim()) {
        return { isValid: false, schema: null, error: 'Empty schema content' };
    }

    try {
        const schema = JSON.parse(schemaContent);
        return { isValid: true, schema, error: null };
    } catch (error) {
        return { isValid: false, schema: null, error: error.message };
    }
}
