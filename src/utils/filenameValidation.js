/**
 * Validates a filename for Shopify compatibility
 * @param {string} filename - The filename to validate
 * @returns {object} - { valid: boolean, error: string, sanitized: string }
 */
export function validateShopifyFilename(filename) {
    if (!filename || typeof filename !== 'string') {
        return {
            valid: false,
            error: "Filename is required",
            sanitized: ""
        };
    }

    const baseName = filename.replace(/\.html?$/i, '');

    if (!baseName.trim()) {
        return {
            valid: false,
            error: "Filename cannot be empty",
            sanitized: ""
        };
    }

    const invalidChars = /[^a-z0-9\-_]/;
    const hasInvalidChars = invalidChars.test(baseName);

    const hasUppercase = /[A-Z]/.test(baseName);

    const specialChars = /[@#$%^&*()+=\[\]{}|\\:";'<>?,./~`!]/;
    const hasSpecialChars = specialChars.test(baseName);

    const hasSpaces = /\s/.test(baseName);

    const hasAccents = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/i.test(baseName);

    const startsOrEndsWithHyphen = /^-|-$/.test(baseName);

    const hasConsecutiveHyphens = /--/.test(baseName);

    const tooShort = baseName.length < 2;

    const tooLong = baseName.length > 25;

    const errors = [];

    if (hasSpecialChars) {
        errors.push("Special characters (@, #, $, %, ^, &, *, etc.) are not allowed");
    }

    if (hasUppercase) {
        errors.push("Uppercase letters are not allowed");
    }

    if (hasSpaces) {
        errors.push("Spaces are not allowed");
    }

    if (hasAccents) {
        errors.push("Accented characters (ä, ö, ü, etc.) are not allowed");
    }

    if (startsOrEndsWithHyphen) {
        errors.push("Filename cannot start or end with a hyphen");
    }

    if (hasConsecutiveHyphens) {
        errors.push("Consecutive hyphens (--) are not allowed");
    }

    if (tooShort) {
        errors.push("Filename must be at least 2 characters long");
    }

    if (tooLong) {
        errors.push("Filename must be 25 characters or less");
    }

    let sanitized = baseName
        .toLowerCase()
        .replace(/[^a-z0-9\-_]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (sanitized.length < 2) {
        sanitized = `page-${Date.now().toString(36).slice(-4)}`;
    }

    if (sanitized.length > 25) {
        sanitized = sanitized.substring(0, 25).replace(/-+$/, '');
    }

    const isValid = errors.length === 0;

    return {
        valid: isValid,
        error: isValid ? null : errors.join('; '),
        sanitized: sanitized,
        suggestions: isValid ? null : `Try: "${sanitized}"`
    };
}

/**
 * Validates multiple filenames for batch processing
 * @param {array} filenames - Array of filenames to validate
 * @returns {object} - { valid: boolean, errors: array, sanitized: array }
 */
export function validateBatchFilenames(filenames) {
    const results = filenames.map(name => validateShopifyFilename(name));
    const errors = [];
    const sanitized = [];

    results.forEach((result, index) => {
        if (!result.valid) {
            errors.push({
                index,
                filename: filenames[index],
                error: result.error,
                suggestion: result.suggestions
            });
        }
        sanitized.push(result.sanitized);
    });

    const duplicates = sanitized.filter((name, index) =>
        sanitized.indexOf(name) !== index
    );

    if (duplicates.length > 0) {
        duplicates.forEach(dupName => {
            const indices = sanitized
                .map((name, idx) => name === dupName ? idx : -1)
                .filter(idx => idx !== -1);

            indices.forEach((idx, position) => {
                if (position > 0) {
                    sanitized[idx] = `${dupName}-${position + 1}`;
                }
            });
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        sanitized
    };
}

/**
 * Generates Shopify-compatible file paths
 * @param {string} baseName - The base filename (without extension)
 * @returns {object} - File paths for different Shopify file types
 */
export function generateShopifyPaths(baseName) {
    const sanitized = validateShopifyFilename(baseName).sanitized;

    return {
        liquid: `sections/${sanitized}.liquid`,
        json: `templates/${sanitized}.json`,
        layout: `layout/theme.liquid`,
        sectionName: sanitized
    };
}

/**
 * Reserved Shopify filenames that should be avoided
 */
export const RESERVED_SHOPIFY_NAMES = [
    'index',
    'product',
    'collection',
    'cart',
    'search',
    'page',
    'blog',
    'article',
    'customer',
    'gift_card',
    'robots',
    'sitemap',
    '404',
    'password'
];

/**
 * Check if filename conflicts with reserved Shopify names
 * @param {string} filename - The filename to check
 * @returns {boolean} - True if filename is reserved
 */
export function isReservedShopifyName(filename) {
    const baseName = filename.replace(/\.html?$/i, '').toLowerCase();
    return RESERVED_SHOPIFY_NAMES.includes(baseName);
}
