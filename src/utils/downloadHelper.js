/**
 * Simple and reliable download utility
 * Fixes download issues with cross-browser compatibility
 */

/**
 * Creates a simple, reliable download
 * @param {string} content - File content to download  
 * @param {string} filename - Name of the file
 * @param {string} contentType - MIME type of the content
 * @returns {boolean} - Success status
 */
export function createSimpleDownload(content, filename, contentType = 'text/plain') {
    try {
        if (!content) {
            throw new Error('No content provided for download');
        }

        const contentString = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

        const blob = new Blob([contentString], {
            type: contentType + ';charset=utf-8'
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
            URL.revokeObjectURL(url);
        }, 100);

        return true;

    } catch (error) {
        console.error('Download failed:', error);

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(content).then(() => {
                    alert(`❌ Download failed, but content copied to clipboard!\n\n📝 Instructions:\n1. Open a text editor\n2. Paste the content (Ctrl+V)\n3. Save as "${filename}"\n\nError: ${error.message}`);
                });
                return true;
            }
        } catch (clipboardError) {
            console.error('Clipboard fallback also failed:', clipboardError);
        }

        alert(`❌ Download failed!\n\n📝 Manual Instructions:\n1. Copy the content from the code viewer\n2. Open a text editor\n3. Paste the content\n4. Save as "${filename}"\n\nError: ${error.message}`);

        return false;
    }
}

/**
 * Download multiple files as a zip using JSZip
 * @param {Array} files - Array of file objects with {name, content, type}
 * @param {string} zipName - Name of the zip file
 * @returns {boolean} - Success status
 */
export async function downloadAsZip(files, zipName = 'shopify-files.zip') {
    try {
        if (typeof JSZip === 'undefined') {
            throw new Error('JSZip library not available');
        }

        const zip = new JSZip();

        files.forEach(file => {
            if (file.content && file.name) {
                zip.file(file.name, file.content);
            }
        });

        const zipBlob = await zip.generateAsync({ type: 'blob' });

        return createSimpleDownload(zipBlob, zipName, 'application/zip');

    } catch (error) {
        console.error('Zip download failed:', error);
        return false;
    }
}

/**
 * Download single file with better error handling
 * @param {Object} fileData - File data object
 * @param {string} type - Type of file (liquid, json, theme)
 * @returns {boolean} - Success status
 */
export function downloadSingleFile(fileData, type = 'liquid') {
    try {
        let content, filename, contentType;

        switch (type) {
            case 'liquid':
                content = fileData.liquidContent;
                filename = fileData.fileNames?.liquidFileName ||
                    fileData.metadata?.liquidFileName ||
                    'section.liquid';
                contentType = 'text/plain';
                break;

            case 'json':
                content = fileData.jsonTemplate;
                filename = fileData.fileNames?.jsonFileName ||
                    fileData.metadata?.jsonFileName ||
                    'template.json';
                contentType = 'application/json';
                break;

            case 'theme':
                content = fileData.themeContent || fileData.headContent;
                filename = 'theme.liquid';
                contentType = 'text/plain';
                break;

            default:
                throw new Error(`Unknown file type: ${type}`);
        }

        if (!content) {
            throw new Error(`No ${type} content available for download`);
        }

        return createSimpleDownload(content, filename, contentType);

    } catch (error) {
        console.error(`Error downloading ${type} file:`, error);
        return false;
    }
}
