/**
 * Advanced head content deduplication utilities
 * Handles smart deduplication of fonts, libraries, and other resources
 */

/**
 * Extracts font information from a link or script tag
 * @param {string} line - The HTML line containing font reference
 * @returns {object|null} - Font info or null if not a font
 */
function extractFontInfo(line) {
    const normalizedLine = line.toLowerCase().trim();

    const googleFontsMatch = normalizedLine.match(/fonts\.googleapis\.com.*family=([^&"']+)/);
    if (googleFontsMatch) {
        const fontFamily = googleFontsMatch[1].split(':')[0].replace(/\+/g, ' ');
        return {
            type: 'google-font',
            family: fontFamily,
            originalLine: line.trim()
        };
    }

    const adobeFontsMatch = normalizedLine.match(/use\.typekit\.net\/([a-z0-9]+)\.css/);
    if (adobeFontsMatch) {
        return {
            type: 'adobe-font',
            kitId: adobeFontsMatch[1],
            originalLine: line.trim()
        };
    }

    const fontAwesomeMatch = normalizedLine.match(/font-?awesome/);
    if (fontAwesomeMatch) {
        return {
            type: 'font-awesome',
            originalLine: line.trim()
        };
    }

    const fontFileMatch = normalizedLine.match(/\.(woff2?|ttf|otf|eot)/);
    if (fontFileMatch) {
        return {
            type: 'font-file',
            format: fontFileMatch[1],
            originalLine: line.trim()
        };
    }

    return null;
}

/**
 * Extracts library information from a script or link tag
 * @param {string} line - The HTML line containing library reference
 * @returns {object|null} - Library info or null if not a library
 */
function extractLibraryInfo(line) {
    const normalizedLine = line.toLowerCase().trim();

    const libraries = [
        { name: 'jquery', pattern: /jquery[\.-](\d+[\.\d]*)?/ },
        { name: 'bootstrap', pattern: /bootstrap[\.-](\d+[\.\d]*)?/ },
        { name: 'tailwind', pattern: /tailwindcss/ },
        { name: 'vue', pattern: /vue[\.-](\d+[\.\d]*)?/ },
        { name: 'react', pattern: /react[\.-](\d+[\.\d]*)?/ },
        { name: 'angular', pattern: /angular[\.-](\d+[\.\d]*)?/ },
        { name: 'lodash', pattern: /lodash[\.-](\d+[\.\d]*)?/ },
        { name: 'gsap', pattern: /gsap[\.-](\d+[\.\d]*)?/ },
        { name: 'swiper', pattern: /swiper[\.-](\d+[\.\d]*)?/ },
        { name: 'aos', pattern: /aos[\.-](\d+[\.\d]*)?/ },
        { name: 'animate-css', pattern: /animate\.css/ },
        { name: 'font-awesome', pattern: /font-?awesome/ },
        { name: 'material-icons', pattern: /material-icons/ },
        { name: 'popper', pattern: /popper[\.-](\d+[\.\d]*)?/ }
    ];

    for (const library of libraries) {
        const match = normalizedLine.match(library.pattern);
        if (match) {
            const version = match[1] || 'latest';
            return {
                type: 'library',
                name: library.name,
                version: version,
                originalLine: line.trim()
            };
        }
    }

    return null;
}

/**
 * Performs intelligent deduplication of head content
 * @param {Set} headLines - Set of head lines to deduplicate
 * @returns {Array} - Deduplicated array of head lines with comments
 */
export function intelligentHeadDeduplication(headLines) {
    const fonts = new Map();
    const libraries = new Map();
    const otherLines = [];
    const duplicatesFound = [];

    for (const line of headLines) {
        const fontInfo = extractFontInfo(line);
        const libraryInfo = extractLibraryInfo(line);

        if (fontInfo) {
            const key = `${fontInfo.type}-${fontInfo.family || fontInfo.kitId || 'unknown'}`;
            if (fonts.has(key)) {
                duplicatesFound.push({
                    type: 'font',
                    original: fonts.get(key),
                    duplicate: line
                });
            } else {
                fonts.set(key, line);
            }
        } else if (libraryInfo) {
            const key = `${libraryInfo.name}`;
            if (libraries.has(key)) {
                const existing = libraries.get(key);
                const existingVersion = extractLibraryInfo(existing)?.version || '0';
                const newVersion = libraryInfo.version || '0';

                if (compareVersions(newVersion, existingVersion) > 0) {
                    duplicatesFound.push({
                        type: 'library',
                        original: existing,
                        duplicate: line,
                        action: 'upgraded'
                    });
                    libraries.set(key, line);
                } else {
                    duplicatesFound.push({
                        type: 'library',
                        original: existing,
                        duplicate: line,
                        action: 'kept_existing'
                    });
                }
            } else {
                libraries.set(key, line);
            }
        } else {
            if (!otherLines.includes(line)) {
                otherLines.push(line);
            } else {
                duplicatesFound.push({
                    type: 'exact',
                    original: line,
                    duplicate: line
                });
            }
        }
    }

    const result = [];

    if (fonts.size > 0) {
        result.push('');
        result.push('<!-- ==================== FONTS ==================== -->');
        for (const fontLine of fonts.values()) {
            result.push(fontLine);
        }
    }

    if (libraries.size > 0) {
        result.push('');
        result.push('<!-- ==================== LIBRARIES ==================== -->');
        for (const libraryLine of libraries.values()) {
            result.push(libraryLine);
        }
    }

    if (otherLines.length > 0) {
        result.push('');
        result.push('<!-- ==================== OTHER RESOURCES ==================== -->');
        otherLines.forEach(line => result.push(line));
    }

    return {
        deduplicatedLines: result.filter(line => line.length > 0),
        duplicatesRemoved: duplicatesFound.length,
        summary: {
            fonts: fonts.size,
            libraries: libraries.size,
            otherResources: otherLines.length,
            duplicatesRemoved: duplicatesFound.length
        }
    };
}

/**
 * Simple version comparison function
 * @param {string} version1 - First version string
 * @param {string} version2 - Second version string
 * @returns {number} - 1 if version1 > version2, -1 if version1 < version2, 0 if equal
 */
function compareVersions(version1, version2) {
    const v1 = version1.split('.').map(num => parseInt(num) || 0);
    const v2 = version2.split('.').map(num => parseInt(num) || 0);

    const maxLength = Math.max(v1.length, v2.length);

    for (let i = 0; i < maxLength; i++) {
        const num1 = v1[i] || 0;
        const num2 = v2[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0;
}

/**
 * Enhanced head content processor with smart deduplication
 * @param {Array} headContentArray - Array of head content strings from different files
 * @param {Array} fileNames - Array of corresponding file names
 * @returns {object} - Processed head content with deduplication info
 */
export function processHeadContentWithDeduplication(headContentArray, fileNames = []) {
    const allLines = new Set();
    const sourceMap = new Map();

    headContentArray.forEach((headContent, index) => {
        if (headContent && headContent.trim()) {
            const fileName = fileNames[index] || `File ${index + 1}`;
            const lines = headContent.split('\n').filter(line => line.trim());

            lines.forEach(line => {
                const normalizedLine = line.trim().replace(/\s+/g, ' ');
                if (normalizedLine) {
                    allLines.add(normalizedLine);
                    if (!sourceMap.has(normalizedLine)) {
                        sourceMap.set(normalizedLine, []);
                    }
                    sourceMap.get(normalizedLine).push(fileName);
                }
            });
        }
    });

    const deduplicationResult = intelligentHeadDeduplication(allLines);

    return {
        content: deduplicationResult.deduplicatedLines.join('\n'),
        duplicatesRemoved: deduplicationResult.duplicatesRemoved,
        summary: deduplicationResult.summary,
        sourceMap: Object.fromEntries(sourceMap)
    };
}
