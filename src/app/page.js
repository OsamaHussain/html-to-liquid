"use client";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import FileUploadSection from "../components/FileUploadSection";
import HtmlEditor from "../components/HtmlEditor";
import ConversionSection from "../components/ConversionSection";
import GlobalStyles from "../components/GlobalStyles";
import HowItWorksPopup from "../components/HowItWorksPopup";
import AIGenerationPopup from "../components/AIGenerationPopup";
import { validateAndExtractHtml } from "../utils/htmlValidation";

export default function Home() {
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [files, setFiles] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [liquidContent, setLiquidContent] = useState("");
  const [jsonTemplate, setJsonTemplate] = useState("");
  const [fileNames, setFileNames] = useState({});
  const [conversionMetadata, setConversionMetadata] = useState(null);
  const [headContent, setHeadContent] = useState("");
  const [headExtractionError, setHeadExtractionError] = useState("");
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
    setLiquidContent('');
    setJsonTemplate('');
    setConversionMetadata(null);

    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], fileContent: text };
    setFiles(newFiles);
    setInputSource(text.trim() ? "manual" : "");
  };

  const handleClearContent = (index) => {
    const newFiles = [...files];
    newFiles[index] = { fileContent: "", fileName: "", isLoading: false };
    setFiles(newFiles);

    // Check if all files are empty
    const hasAnyContent = newFiles.some(file => file.fileContent || file.fileName);
    if (!hasAnyContent) {
      setLiquidContent('');
      setJsonTemplate('');
      setConversionMetadata(null);
      setConversionError('');
      setInputSource('');
    }
  };

  const handleValidationError = (error) => {
    setValidationErrors(error);
    setShowErrorPopup(true);
  };
  const convertToLiquid = async () => {
    // Get the first file with content
    const fileWithContent = files.find(file => file.fileContent);
    if (!fileWithContent) {
      setConversionError('No HTML content to convert');
      return;
    }

    const result = validateAndExtractHtml(fileWithContent.fileContent);
    if (!result.isValid) {
      setValidationErrors(result.error);
      setShowErrorPopup(true);
      setConversionError('Please fix HTML validation errors before converting');
      return;
    }

    setShowAIGenerationPopup(true);
  }; const performConversion = async () => {
    setIsConverting(true);
    setConversionError('');
    setHeadExtractionError('');
    setLiquidContent('');
    setJsonTemplate('');
    setHeadContent('');
    setConversionMetadata(null);
    setFileNames({});

    // Get the first file with content
    const fileWithContent = files.find(file => file.fileContent);
    if (!fileWithContent) {
      setConversionError('No HTML content to convert');
      setIsConverting(false);
      return;
    }

    try {
      const headResponse = await fetch('/api/extract-head', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileWithContent.fileContent,
          fileName: fileWithContent.fileName || (inputSource === "manual" ? "manual-input.html" : "uploaded-file.html"),
        }),
      });

      const headData = await headResponse.json();

      if (headResponse.ok) {
        setHeadContent(headData.headContent);
      } else {
        setHeadExtractionError(headData.error || 'Head extraction failed');
      }

      const response = await fetch('/api/convert-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileWithContent.fileContent,
          fileName: fileWithContent.fileName || (inputSource === "manual" ? "manual-input.html" : "uploaded-file.html"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }

      setLiquidContent(data.liquidContent);
      setJsonTemplate(data.jsonTemplate);
      setFileNames(data.metadata);
      setConversionMetadata(data.metadata);
    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadLiquidFile = () => {
    if (!liquidContent) return;

    const fileWithContent = files.find(file => file.fileContent);
    const blob = new Blob([liquidContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNames?.liquidFileName || (fileWithContent?.fileName ? fileWithContent.fileName.replace('.html', '.liquid') : 'converted.liquid');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJsonFile = () => {
    if (!jsonTemplate) return;

    const fileWithContent = files.find(file => file.fileContent);
    const blob = new Blob([jsonTemplate], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNames?.jsonFileName || (fileWithContent?.fileName ? `page.${fileWithContent.fileName.replace('.html', '').replace(/[^a-zA-Z0-9-_]/g, '-')}.json` : 'page.custom.json');
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
        {files.map((file, index) => (
          <HtmlEditor
            key={index}
            index={index}
            fileContent={file.fileContent}
            fileName={file.fileName}
            isLoading={file.isLoading}
            handleManualInput={(text) => handleManualInput(index, text)}
            onFileUpload={handleFileUpload}
            onClearContent={handleClearContent}
            onValidationError={handleValidationError}
          />
        ))}
        <ConversionSection
          fileContent={files[0]?.fileContent || ''}
          fileName={files[0]?.fileName || ''}
          isConverting={isConverting}
          conversionError={conversionError}
          liquidContent={liquidContent}
          jsonTemplate={jsonTemplate}
          fileNames={fileNames}
          convertToLiquid={convertToLiquid}
          downloadLiquidFile={downloadLiquidFile}
          downloadJsonFile={downloadJsonFile}
          headContent={headContent}
          isExtractingHead={isConverting}
          headExtractionError={headExtractionError}
        />
      </div>
      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        fileName={files[0]?.fileName || ''}
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
