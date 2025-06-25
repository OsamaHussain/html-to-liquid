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
import { validateAndExtractHtml, validateAllFiles } from "../utils/htmlValidation";

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

    const validationResult = validateAllFiles(filesWithContent);

    if (!validationResult.isValid) {
      setAllFileErrors(validationResult.allErrors);
      setValidationErrors('Multiple validation errors found');
      setShowErrorPopup(true);
      setConversionError('Please fix HTML validation errors before converting');
      return;
    }

    setShowAIGenerationPopup(true);
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

      let allHeadLines = new Set();
      let fileSourceMap = new Map();

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
            headContent = headData.headContent; if (headContent && headContent.trim()) {
              const headLines = headContent.split('\n').filter(line => line.trim());
              const fileName = file.fileName || `File ${i + 1}`;

              headLines.forEach(line => {
                const normalizedLine = line.trim().replace(/\s+/g, ' ');
                if (normalizedLine && !allHeadLines.has(normalizedLine)) {
                  allHeadLines.add(normalizedLine);
                  fileSourceMap.set(normalizedLine, fileName);
                }
              });
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
            index: i
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
      if (allHeadLines.size > 0) {
        const uniqueHeadContent = Array.from(allHeadLines).join('\n');
        setCombinedHeadContent(uniqueHeadContent);
      }

    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
      setCurrentlyConverting(null);
    }
  };
  const downloadLiquidFile = (convertedFile) => {
    if (!convertedFile.liquidContent) return;

    const blob = new Blob([convertedFile.liquidContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.fileNames?.liquidFileName || (convertedFile.originalFile?.fileName ? convertedFile.originalFile.fileName.replace('.html', '.liquid') : 'converted.liquid');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const downloadJsonFile = (convertedFile) => {
    if (!convertedFile.jsonTemplate) return;

    const blob = new Blob([convertedFile.jsonTemplate], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.fileNames?.jsonFileName || (convertedFile.originalFile?.fileName ? `page.${convertedFile.originalFile.fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    if (!combinedHeadContent) return;

    const blob = new Blob([combinedHeadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'combined-theme-head.liquid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleHowItWorksClick = () => {
    setShowHowItWorksPopup(true);
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
    </div>
  );
}
