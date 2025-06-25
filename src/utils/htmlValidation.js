import { HTMLHint } from "htmlhint";

export const validateAndExtractHtml = (text, fileName = '') => {
  try {
    const htmlTagRegex = /<[^>]+>/g;
    const hasHtmlTags = htmlTagRegex.test(text);

    if (!hasHtmlTags) {
      return {
        isValid: false,
        content: '',
        error: 'No HTML content found in this file.',
        fileName: fileName
      };
    }

    const htmlhintConfig = {
      "tagname-lowercase": true,
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "doctype-first": false,
      "tag-pair": true,
      "spec-char-escape": true,
      "id-unique": true,
      "src-not-empty": true,
      "attr-no-duplication": true,
      "title-require": false,
      "tag-self-close": false,
      "empty-tag-not-self-closed": true,
      "attr-value-not-empty": false,
      "id-class-value": false,
      "style-disabled": false,
      "inline-style-disabled": false,
      "inline-script-disabled": false,
      "space-tab-mixed-disabled": "space",
      "id-class-ad-disabled": false,
      "href-abs-or-rel": false,
      "attr-unsafe-chars": true
    };

    const messages = HTMLHint.verify(text, htmlhintConfig);

    if (messages.length > 0) {
      const errors = messages.map(msg =>
        `Line ${msg.line}, Col ${msg.col}: ${msg.message} (${msg.rule.id})`
      );

      const filePrefix = fileName ? `File: ${fileName}\n\n` : '';

      return {
        isValid: false,
        content: '',
        error: `${filePrefix}HTML validation errors found:\n\n${errors.map((err, i) => `${i + 1}. ${err}`).join('\n')}\n\nPlease fix these issues in your HTML file first.`,
        fileName: fileName,
        errorCount: errors.length,
        detailedErrors: errors
      };
    }

    return {
      isValid: true,
      content: text,
      error: null,
      fileName: fileName
    };

  } catch (error) {
    return {
      isValid: false,
      content: '',
      error: `HTML validation error: ${error.message}\n\nPlease check your HTML syntax and try again.`,
      fileName: fileName
    };
  }
};

export const validateAllFiles = (files) => {
  const allErrors = [];
  const validFiles = [];

  files.forEach((file, index) => {
    if (!file.fileContent) return;

    const displayName = file.fileName || `File ${index + 1}`;
    const result = validateAndExtractHtml(file.fileContent, displayName);

    if (result.isValid) {
      validFiles.push(file);
    } else {
      allErrors.push({
        fileName: displayName,
        fileIndex: index,
        error: result.error,
        detailedErrors: result.detailedErrors || [],
        errorCount: result.errorCount || 1
      });
    }
  });

  return {
    isValid: allErrors.length === 0,
    validFiles,
    allErrors,
    totalErrorCount: allErrors.reduce((sum, fileError) => sum + fileError.errorCount, 0)
  };
};
