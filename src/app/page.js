"use client";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import FileUploadSection from "../components/FileUploadSection";
import HtmlEditor from "../components/HtmlEditor";
import HtmlEditorTabs from "../components/HtmlEditorTabs";
import ConversionSection from "../components/ConversionSection";
import GlobalStyles from "../components/GlobalStyles";
import HowItWorksPopup from "../components/HowItWorksPopup";
import AIGenerationPopup from "../components/AIGenerationPopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { validateAndExtractHtml, validateAllFiles } from "../utils/htmlValidation";
import { validateBatchFilenames } from "../utils/filenameValidation";
import { generateAndDownloadZip } from "../utils/zipGenerator";
import { detectExistingSchema } from "../utils/schemaDetection";

export default function Home() {
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [files, setFiles] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [allFileErrors, setAllFileErrors] = useState(null);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [combinedHeadContent, setCombinedHeadContent] = useState('');
  const [currentlyConverting, setCurrentlyConverting] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");
  const [inputSource, setInputSource] = useState("");
  const [showHowItWorksPopup, setShowHowItWorksPopup] = useState(false);
  const [showAIGenerationPopup, setShowAIGenerationPopup] = useState(false);
  const [showSchemaWarningPopup, setShowSchemaWarningPopup] = useState(false);
  const [pendingFilesWithSchema, setPendingFilesWithSchema] = useState([]);
  const [schemaWarningMessage, setSchemaWarningMessage] = useState('');

  const handleNumberOfFilesChange = (num) => {
    setNumberOfFiles(num);
    if (num === 0) {
      setFiles([]);
    } else {
      setFiles(Array.from({ length: num }, (_, index) =>
        index < files.length ? files[index] : { fileContent: "", fileName: "", isLoading: false }
      ));
    }
  };

  const handleFileUpload = (index, fileName, fileContent) => {
    const newFiles = [...files];
    newFiles[index] = { fileName, fileContent, isLoading: false };
    setFiles(newFiles);
    setInputSource("file");
  };

  const handleFileNameChange = (index, fileName) => {
    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], fileName };
    setFiles(newFiles);
  };

  const handleManualInput = (index, text) => {
    setConversionError('');
    setConvertedFiles([]);
    setCombinedHeadContent('');
    setCurrentlyConverting(null);

    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], fileContent: text };
    setFiles(newFiles);
    setInputSource(text.trim() ? "manual" : "");
  };
  const handleClearContent = (index) => {
    const newFiles = [...files];
    newFiles[index] = { fileContent: "", fileName: "", isLoading: false };
    setFiles(newFiles);
    const hasAnyContent = newFiles.some(file => file.fileContent || file.fileName);
    if (!hasAnyContent) {
      setConvertedFiles([]);
      setCombinedHeadContent('');
      setCurrentlyConverting(null);
      setConversionError('');
      setInputSource('');
    }
  };

  const handleValidationError = (error) => {
    setValidationErrors(error);
    setAllFileErrors(null);
    setShowErrorPopup(true);
  };
  const convertToLiquid = async () => {
    const filesWithContent = files.filter(file => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError('No HTML content to convert');
      return;
    }

    const filesWithoutNames = filesWithContent.filter(file => !file.fileName || !file.fileName.trim());
    if (filesWithoutNames.length > 0) {
      const fileIndices = filesWithoutNames.map((file, i) => {
        const originalIndex = files.findIndex(f => f === file);
        return `File ${originalIndex + 1}`;
      }).join(', ');

      setConversionError(`🚫 CONVERSION BLOCKED: Section Names Required!\n\n❌ Missing filenames for: ${fileIndices}\n\n✅ Please enter section names for ALL files before conversion.\n💡 These names become your Shopify .liquid file names.\n\n⚠️ No fallback names allowed - you must provide each filename.`);
      setValidationErrors('Missing required filenames - conversion blocked');
      setShowErrorPopup(true);
      return;
    }

    const filesWithSchema = filesWithContent.filter(file => {
      const schemaDetection = detectExistingSchema(file.fileContent);
      return schemaDetection.hasSchema;
    });

    if (filesWithSchema.length > 0) {
      const fileNames = filesWithSchema.map((file, i) => {
        const originalIndex = files.findIndex(f => f === file);
        return `"${file.fileName || `File ${originalIndex + 1}`}"`;
      }).join(', ');

      const warningMessage = `⚠️ Existing Schema Blocks Detected!\n\nThe following files already contain {% schema %} blocks:\n${fileNames}\n\nThe converter will automatically replace these with new schemas. Do you want to continue?\n\n• Choose "Continue" to proceed (existing schemas will be replaced)\n• Choose "Cancel" to review your HTML files first`;

      setPendingFilesWithSchema(filesWithSchema);
      setSchemaWarningMessage(warningMessage);
      setShowSchemaWarningPopup(true);
      return;
    }

    continueValidationAndConversion(filesWithContent);
  };

  const continueValidationAndConversion = (filesWithContent) => {

    const validationResult = validateAllFiles(filesWithContent);

    if (!validationResult.isValid) {
      setAllFileErrors(validationResult.allErrors);
      setValidationErrors('Multiple validation errors found');
      setShowErrorPopup(true);
      setConversionError('Please fix HTML validation errors before converting');
      return;
    }

    const filenames = filesWithContent.map(file => file.fileName);
    const filenameValidation = validateBatchFilenames(filenames);

    if (!filenameValidation.valid) {
      const errorMessages = filenameValidation.errors.map(error =>
        `File ${error.index + 1} (${error.filename}): ${error.error}. ${error.suggestion}`
      ).join('\n\n');

      setConversionError(`Invalid filenames for Shopify:\n\n${errorMessages}`);
      setValidationErrors('Filename validation errors');
      setShowErrorPopup(true);
      return;
    }

    setShowAIGenerationPopup(true);
  };

  const handleSchemaWarningConfirm = () => {
    setShowSchemaWarningPopup(false);
    const filesWithContent = files.filter(file => file.fileContent);
    continueValidationAndConversion(filesWithContent);
  };

  const handleSchemaWarningCancel = () => {
    setShowSchemaWarningPopup(false);
    setPendingFilesWithSchema([]);
    setSchemaWarningMessage('');
  };
  const performConversion = async () => {
    setIsConverting(true);
    setConversionError('');
    setConvertedFiles([]);

    const filesWithContent = files.filter(file => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError('No HTML content to convert');
      setIsConverting(false);
      return;
    }
    try {
      setConvertedFiles([]);
      setCombinedHeadContent('');
      setActiveTab(0);

      const allHeadContents = [];
      const fileNames = [];

      for (let i = 0; i < filesWithContent.length; i++) {
        const file = filesWithContent[i];

        setCurrentlyConverting({
          index: i,
          fileName: file.fileName || `File ${i + 1}`,
          total: filesWithContent.length,
          remaining: filesWithContent.length - i
        });

        try {
          const headResponse = await fetch('/api/extract-head', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName: file.fileName || (inputSource === "manual" ? `manual-input-${i + 1}.html` : `uploaded-file-${i + 1}.html`),
            }),
          });

          const headData = await headResponse.json();
          let headContent = '';
          let headExtractionError = '';

          if (headResponse.ok) {
            headContent = headData.headContent;

            if (headContent && headContent.trim()) {
              allHeadContents.push(headContent);
              fileNames.push(file.fileName || `File ${i + 1}`);
            }
          } else {
            headExtractionError = headData.error || 'Head extraction failed';
          }

          const response = await fetch('/api/convert-html', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName: file.fileName || (inputSource === "manual" ? `manual-input-${i + 1}.html` : `uploaded-file-${i + 1}.html`),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || `Conversion failed for file ${i + 1}`);
          }

          const newResult = {
            originalFile: file,
            liquidContent: data.liquidContent,
            jsonTemplate: data.jsonTemplate,
            fileNames: data.metadata,
            headExtractionError: headExtractionError,
            index: i,
            shopifyInfo: data.shopifyInfo || {},
            sectionName: data.shopifyInfo?.sectionName || `page-${i + 1}`,
            injectedBlocks: data.shopifyInfo?.injectedBlocks || [],
            usedBlockTypes: data.shopifyInfo?.usedBlockTypes || [],
            filenameCorrected: data.shopifyInfo?.filenameCorrected || false,
            processingErrors: data.shopifyInfo?.processingErrors || [],
            validation: data.validation || {}
          };
          setConvertedFiles(prev => [...prev, newResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab(prev => prev + 1);
          }

        } catch (fileError) {
          const errorResult = {
            originalFile: file,
            liquidContent: '',
            jsonTemplate: '',
            fileNames: {},
            headExtractionError: fileError.message,
            index: i,
            hasError: true
          }; setConvertedFiles(prev => [...prev, errorResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab(prev => prev + 1);
          }
        }
      }

      if (allHeadContents.length > 0) {
        console.log('🔄 Combining head content from', allHeadContents.length, 'files...');

        const allResources = new Set();

        allHeadContents.forEach((content, index) => {
          const resourceMatch = content.match(/\{\{\s*content_for_header\s*\}\}([\s\S]*?)<\/head>/i);
          if (resourceMatch) {
            const resources = resourceMatch[1].trim();
            if (resources) {
              resources.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine &&
                  (trimmedLine.startsWith('<link') || trimmedLine.startsWith('<script'))) {
                  allResources.add(trimmedLine);
                }
              });
            }
          }
        });

        const combinedResources = Array.from(allResources).join('\n    ');

        const finalThemeContent = `<!doctype html>
<html lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_button }}">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>
      {% if title != blank %}{{ title }}{% else %}{{ shop.name }}{% endif %}
    </title>
    <meta name="description" content="{{ page_description | escape }}">

    <!-- CSS -->
    {{ 'base.css' | asset_url | stylesheet_tag }}
    {{ 'theme.css' | asset_url | stylesheet_tag }}

    <!-- Scripts -->
    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    </script>

    {{ content_for_header }}
    ${combinedResources ? '\n    ' + combinedResources + '\n    ' : ''}
  </head>

  <body class="template-{{ template | handle }}">
    <a href="#MainContent" class="skip-to-content visually-hidden">Skip to content</a>

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {{ content_for_footer }}

    <!-- JavaScript -->
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>`;

        setCombinedHeadContent(finalThemeContent);
        console.log('✅ Successfully combined resources from all', allHeadContents.length, 'files');
        console.log('📊 Total unique resources found:', allResources.size);
      }

    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
      setCurrentlyConverting(null);
    }
  };
  const downloadLiquidFile = (convertedFile) => {
    try {
      if (!convertedFile || !convertedFile.liquidContent) {
        console.error('No liquid content to download');
        setConversionError('No liquid content available for download');
        return;
      }

      const blob = new Blob([convertedFile.liquidContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = convertedFile.fileNames?.liquidFileName || (convertedFile.originalFile?.fileName ? convertedFile.originalFile.fileName.replace('.html', '.liquid') : 'converted.liquid');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Liquid file download initiated successfully');
    } catch (error) {
      console.error('Error downloading liquid file:', error);
      setConversionError(`Failed to download liquid file: ${error.message}`);
    }
  };
  const downloadJsonFile = (convertedFile) => {
    try {
      if (!convertedFile || !convertedFile.jsonTemplate) {
        console.error('No JSON content to download');
        setConversionError('No JSON template available for download');
        return;
      }

      const blob = new Blob([convertedFile.jsonTemplate], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = convertedFile.fileNames?.jsonFileName || (convertedFile.originalFile?.fileName ? `page.${convertedFile.originalFile.fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('JSON file download initiated successfully');
    } catch (error) {
      console.error('Error downloading JSON file:', error);
      setConversionError(`Failed to download JSON file: ${error.message}`);
    }
  };
  const downloadHeadFile = (convertedFile) => {
    if (!convertedFile.headContent) return;

    const blob = new Blob([convertedFile.headContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.originalFile?.fileName ? `${convertedFile.originalFile.fileName.replace('.html', '')}-head.liquid` : `head-section-${convertedFile.index + 1}.liquid`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCombinedHeadFile = () => {
    try {
      if (!combinedHeadContent || !combinedHeadContent.trim()) {
        console.error('No combined head content to download');
        setConversionError('No combined head content available for download');
        return;
      }

      const blob = new Blob([combinedHeadContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combined-theme-head.liquid';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Combined head file download initiated successfully');
    } catch (error) {
      console.error('Error downloading combined head file:', error);
      setConversionError(`Failed to download combined head file: ${error.message}`);
    }
  };

  const downloadAllAsZip = async () => {
    if (convertedFiles.length === 0) {
      setConversionError('No converted files to download');
      return;
    }

    try {
      const result = await generateAndDownloadZip(
        convertedFiles,
        combinedHeadContent,
        'shopify-files.zip'
      );

      if (!result.success) {
        setConversionError(`Failed to generate ZIP: ${result.error}`);
      }
    } catch (error) {
      setConversionError(`ZIP generation error: ${error.message}`);
    }
  };

  const handleHowItWorksClick = () => {
    setShowHowItWorksPopup(true);
  };

  const reconvertSingleFile = async (fileIndex) => {
    const filesWithContent = files.filter(file => file.fileContent);
    const fileToReconvert = filesWithContent[fileIndex];

    if (!fileToReconvert) {
      setConversionError(`File ${fileIndex + 1} not found`);
      return;
    }

    setCurrentlyConverting({
      index: fileIndex,
      fileName: fileToReconvert.fileName || `File ${fileIndex + 1}`,
      total: 1,
      remaining: 1
    });

    try {
      setConvertedFiles(prev => prev.filter(cf => cf.index !== fileIndex));

      const headResponse = await fetch('/api/extract-head', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileToReconvert.fileContent,
          fileName: fileToReconvert.fileName || `reconvert-${fileIndex + 1}.html`,
        }),
      });

      const headData = await headResponse.json();
      let headContent = '';
      let headExtractionError = '';

      if (headResponse.ok) {
        headContent = headData.headContent;
      } else {
        headExtractionError = headData.error || 'Head extraction failed';
      }

      const response = await fetch('/api/convert-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileToReconvert.fileContent,
          fileName: fileToReconvert.fileName || `reconvert-${fileIndex + 1}.html`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Reconversion failed for ${fileToReconvert.fileName || `File ${fileIndex + 1}`}`);
      }

      const newResult = {
        originalFile: fileToReconvert,
        liquidContent: data.liquidContent,
        jsonTemplate: data.jsonTemplate,
        fileNames: data.metadata,
        headExtractionError: headExtractionError,
        index: fileIndex,
        shopifyInfo: data.shopifyInfo || {},
        sectionName: data.shopifyInfo?.sectionName || `page-${fileIndex + 1}`,
        injectedBlocks: data.shopifyInfo?.injectedBlocks || [],
        usedBlockTypes: data.shopifyInfo?.usedBlockTypes || [],
        filenameCorrected: data.shopifyInfo?.filenameCorrected || false,
        processingErrors: data.shopifyInfo?.processingErrors || [],
        validation: data.validation || {},
        isReconverted: true
      };

      setConvertedFiles(prev => {
        const updated = [...prev, newResult];
        return updated.sort((a, b) => a.index - b.index);
      });

      if (headContent && headContent.trim()) {
        setCombinedHeadContent(prev => {
          const existingLines = new Set(prev.split('\n').filter(line => line.trim()));
          const newLines = headContent.split('\n').filter(line => line.trim());
          newLines.forEach(line => {
            const normalizedLine = line.trim().replace(/\s+/g, ' ');
            if (normalizedLine && !existingLines.has(normalizedLine)) {
              existingLines.add(normalizedLine);
            }
          });
          return Array.from(existingLines).join('\n');
        });
      }

      setCurrentlyConverting(null);
      setConversionError('');


    } catch (error) {
      console.error('Reconversion error:', error);
      setConversionError(`❌ Reconversion failed for "${fileToReconvert.fileName || `File ${fileIndex + 1}`}": ${error.message}`);
      setCurrentlyConverting(null);

      const originalConverted = convertedFiles.find(cf => cf.index === fileIndex);
      if (originalConverted) {
        setConvertedFiles(prev => {
          const updated = [...prev, { ...originalConverted, hasError: true }];
          return updated.sort((a, b) => a.index - b.index);
        });
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <GlobalStyles />
      <Header onHowItWorksClick={handleHowItWorksClick} />
      <div className="container" style={{
        paddingBottom: '40px'
      }}>
        <FileUploadSection
          numberOfFiles={numberOfFiles}
          onNumberOfFilesChange={handleNumberOfFilesChange}
        />
        {files.length > 0 && (
          <HtmlEditorTabs
            files={files}
            handleManualInput={handleManualInput}
            onFileUpload={handleFileUpload}
            onClearContent={handleClearContent}
            onValidationError={handleValidationError}
            onFileNameChange={handleFileNameChange}
          />
        )}
        <ConversionSection
          files={files}
          isConverting={isConverting}
          currentlyConverting={currentlyConverting}
          conversionError={conversionError}
          convertedFiles={convertedFiles}
          combinedHeadContent={combinedHeadContent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          convertToLiquid={convertToLiquid}
          downloadLiquidFile={downloadLiquidFile}
          downloadJsonFile={downloadJsonFile}
          downloadHeadFile={downloadHeadFile}
          downloadCombinedHeadFile={downloadCombinedHeadFile}
          downloadAllAsZip={downloadAllAsZip}
          onReconvertFile={reconvertSingleFile}
        />
      </div>
      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => {
          setShowErrorPopup(false);
          setAllFileErrors(null);
        }}
        fileName={files.find(f => f.fileContent)?.fileName || ''}
        allFileErrors={allFileErrors}
      />
      <HowItWorksPopup
        isOpen={showHowItWorksPopup}
        onClose={() => setShowHowItWorksPopup(false)}
      />

      <AIGenerationPopup
        isVisible={showAIGenerationPopup}
        onClose={() => setShowAIGenerationPopup(false)}
        onConfirm={() => {
          setShowAIGenerationPopup(false);
          performConversion();
        }}
      />

      <ConfirmationPopup
        isOpen={showSchemaWarningPopup}
        onConfirm={handleSchemaWarningConfirm}
        onCancel={handleSchemaWarningCancel}
        title="Schema Blocks Detected"
        message={schemaWarningMessage}
        confirmText="Continue"
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
}
