"use client";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import FileUploadSection from "../components/FileUploadSection";
import HtmlEditor from "../components/HtmlEditor";
import ConversionSection from "../components/ConversionSection";
import GlobalStyles from "../components/GlobalStyles";
import { validateAndExtractHtml } from "../utils/htmlValidation";

export default function Home() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [liquidContent, setLiquidContent] = useState("");
  const [conversionMetadata, setConversionMetadata] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");
  const [inputSource, setInputSource] = useState(""); const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const allowedExtensions = ['.html'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) {
      setValidationErrors('Please select only .html files. Only HTML files are supported for validation.');
      setShowErrorPopup(true);
      event.target.value = '';
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawText = e.target.result;
        const result = validateAndExtractHtml(rawText);

        if (!result.isValid) {
          setValidationErrors(result.error);
          setShowErrorPopup(true);
          setFileContent('');
          setFileName('');
          event.target.value = '';
          setIsLoading(false);
          return;
        }

        setFileContent(result.content);
        setInputSource("file");
        setIsLoading(false);
      };

      reader.onerror = () => {
        setValidationErrors('Error reading file. Please try again.');
        setShowErrorPopup(true);
        setIsLoading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      setValidationErrors('Error reading file: ' + error.message);
      setShowErrorPopup(true);
      setFileContent('');
      setFileName('');
      event.target.value = '';
      setIsLoading(false);
    }
  };
  const handleManualInput = (text) => {
    setConversionError('');
    setLiquidContent('');
    setConversionMetadata(null);

    setFileContent(text);
    setInputSource(text.trim() ? "manual" : "");
  };

  const clearContent = () => {
    setFileContent('');
    setFileName('');
    setLiquidContent('');
    setConversionMetadata(null);
    setConversionError('');
    setInputSource('');
    document.getElementById('fileInput').value = '';
  };
  const convertToLiquid = async () => {
    if (!fileContent) {
      setConversionError('No HTML content to convert');
      return;
    }

    const result = validateAndExtractHtml(fileContent);
    if (!result.isValid) {
      setValidationErrors(result.error);
      setShowErrorPopup(true);
      setConversionError('Please fix HTML validation errors before converting');
      return;
    }

    setIsConverting(true);
    setConversionError('');

    try {
      const response = await fetch('/api/convert-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: fileContent,
          fileName: fileName || (inputSource === "manual" ? "manual-input.html" : "uploaded-file.html"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }

      setLiquidContent(data.liquidContent);
      setConversionMetadata(data.metadata);
    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadLiquidFile = () => {
    if (!liquidContent) return;

    const blob = new Blob([liquidContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace('.html', '.liquid') : 'converted.liquid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const downloadMetadataJson = () => {
    if (!conversionMetadata) return;

    const blob = new Blob([JSON.stringify(conversionMetadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace('.html', '_metadata.json') : 'conversion_metadata.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCustomTemplate = () => {
    if (!conversionMetadata?.shopifyIntegration?.customTemplate) return;

    const templateContent = conversionMetadata.shopifyIntegration.customTemplate.content;
    const templateFilename = conversionMetadata.shopifyIntegration.customTemplate.filename;

    const blob = new Blob([templateContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = templateFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }; return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <GlobalStyles />
      <Header />

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 20px 40px 20px'
      }}>
        <FileUploadSection
          isLoading={isLoading}
          fileName={fileName}
          handleFileUpload={handleFileUpload}
          clearContent={clearContent}
        />

        <HtmlEditor
          fileContent={fileContent}
          fileName={fileName}
          handleManualInput={handleManualInput}
        />        <ConversionSection
          fileContent={fileContent}
          fileName={fileName}
          isConverting={isConverting}
          conversionError={conversionError}
          liquidContent={liquidContent}
          conversionMetadata={conversionMetadata}
          convertToLiquid={convertToLiquid}
          downloadCustomTemplate={downloadCustomTemplate}
          downloadLiquidFile={downloadLiquidFile}
        />
      </div>

      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        fileName={fileName}
      />
    </div>
  );
}
