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
import {
  validateAndExtractHtml,
  validateAllFiles,
} from "../utils/htmlValidation";
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
  const [combinedHeadContent, setCombinedHeadContent] = useState("");
  const [currentlyConverting, setCurrentlyConverting] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");
  const [inputSource, setInputSource] = useState("");
  const [showHowItWorksPopup, setShowHowItWorksPopup] = useState(false);
  const [showAIGenerationPopup, setShowAIGenerationPopup] = useState(false);
  const [showSchemaWarningPopup, setShowSchemaWarningPopup] = useState(false);
  const [pendingFilesWithSchema, setPendingFilesWithSchema] = useState([]);
  const [schemaWarningMessage, setSchemaWarningMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleNumberOfFilesChange = (num) => {
    setNumberOfFiles(num);
    if (num === 0) {
      setFiles([]);
    } else {
      setFiles(
        Array.from({ length: num }, (_, index) =>
          index < files.length
            ? files[index]
            : { fileContent: "", fileName: "", isLoading: false }
        )
      );
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
    setConversionError("");
    setConvertedFiles([]);
    setCombinedHeadContent("");
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
    const hasAnyContent = newFiles.some(
      (file) => file.fileContent || file.fileName
    );
    if (!hasAnyContent) {
      setConvertedFiles([]);
      setCombinedHeadContent("");
      setCurrentlyConverting(null);
      setConversionError("");
      setInputSource("");
    }
  };

  const handleValidationError = (error) => {
    setValidationErrors(error);
    setAllFileErrors(null);
    setShowErrorPopup(true);
  };
  const convertToLiquid = async () => {
    const filesWithContent = files.filter((file) => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError("No HTML content to convert");
      return;
    }

    const filesWithoutNames = filesWithContent.filter(
      (file) => !file.fileName || !file.fileName.trim()
    );
    if (filesWithoutNames.length > 0) {
      const fileIndices = filesWithoutNames
        .map((file, i) => {
          const originalIndex = files.findIndex((f) => f === file);
          return `File ${originalIndex + 1}`;
        })
        .join(", ");

      setConversionError(
        `🚫 CONVERSION BLOCKED: Section Names Required!\n\n❌ Missing filenames for: ${fileIndices}\n\n✅ Please enter section names for ALL files before conversion.\n💡 These names become your Shopify .liquid file names.\n\n⚠️ No fallback names allowed - you must provide each filename.`
      );
      setValidationErrors("Missing required filenames - conversion blocked");
      setShowErrorPopup(true);
      return;
    }

    const filesWithSchema = filesWithContent.filter((file) => {
      const schemaDetection = detectExistingSchema(file.fileContent);
      return schemaDetection.hasSchema;
    });

    if (filesWithSchema.length > 0) {
      const fileNames = filesWithSchema
        .map((file, i) => {
          const originalIndex = files.findIndex((f) => f === file);
          return `"${file.fileName || `File ${originalIndex + 1}`}"`;
        })
        .join(", ");

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
      setValidationErrors("Multiple validation errors found");
      setShowErrorPopup(true);
      setConversionError("Please fix HTML validation errors before converting");
      return;
    }

    const filenames = filesWithContent.map((file) => file.fileName);
    const filenameValidation = validateBatchFilenames(filenames);

    if (!filenameValidation.valid) {
      const errorMessages = filenameValidation.errors
        .map(
          (error) =>
            `File ${error.index + 1} (${error.filename}): ${error.error}. ${
              error.suggestion
            }`
        )
        .join("\n\n");

      setConversionError(`Invalid filenames for Shopify:\n\n${errorMessages}`);
      setValidationErrors("Filename validation errors");
      setShowErrorPopup(true);
      return;
    }

    setShowAIGenerationPopup(true);
  };

  const handleSchemaWarningConfirm = () => {
    setShowSchemaWarningPopup(false);
    const filesWithContent = files.filter((file) => file.fileContent);
    continueValidationAndConversion(filesWithContent);
  };

  const handleSchemaWarningCancel = () => {
    setShowSchemaWarningPopup(false);
    setPendingFilesWithSchema([]);
    setSchemaWarningMessage("");
  };
  const performConversion = async () => {
    setIsConverting(true);
    setConversionError("");
    setConvertedFiles([]);

    const filesWithContent = files.filter((file) => file.fileContent);
    if (filesWithContent.length === 0) {
      setConversionError("No HTML content to convert");
      setIsConverting(false);
      return;
    }
    try {
      setConvertedFiles([]);
      setCombinedHeadContent("");
      setActiveTab(0);

      const allHeadContents = [];
      const fileNames = [];

      for (let i = 0; i < filesWithContent.length; i++) {
        const file = filesWithContent[i];

        setCurrentlyConverting({
          index: i,
          fileName: file.fileName || `File ${i + 1}`,
          total: filesWithContent.length,
          remaining: filesWithContent.length - i,
        });

        try {
          const headResponse = await fetch("/api/extract-head", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName:
                file.fileName ||
                (inputSource === "manual"
                  ? `manual-input-${i + 1}.html`
                  : `uploaded-file-${i + 1}.html`),
            }),
          });

          const headData = await headResponse.json();
          let headContent = "";
          let headExtractionError = "";

          if (headResponse.ok) {
            headContent = headData.headContent;

            if (headContent && headContent.trim()) {
              allHeadContents.push(headContent);
              fileNames.push(file.fileName || `File ${i + 1}`);
            }
          } else {
            headExtractionError = headData.error || "Head extraction failed";
          }

          const response = await fetch("/api/convert-html", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              htmlContent: file.fileContent,
              fileName:
                file.fileName ||
                (inputSource === "manual"
                  ? `manual-input-${i + 1}.html`
                  : `uploaded-file-${i + 1}.html`),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || `Conversion failed for file ${i + 1}`
            );
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
            validation: data.validation || {},
          };
          setConvertedFiles((prev) => [...prev, newResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
        } catch (fileError) {
          const errorResult = {
            originalFile: file,
            liquidContent: "",
            jsonTemplate: "",
            fileNames: {},
            headExtractionError: fileError.message,
            index: i,
            hasError: true,
          };
          setConvertedFiles((prev) => [...prev, errorResult]);

          if (i < filesWithContent.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
        }
      }

      if (allHeadContents.length > 0) {
        console.log(
          "🔄 Combining head content from",
          allHeadContents.length,
          "files..."
        );

        const allResources = new Set();

        allHeadContents.forEach((content, index) => {
          console.log(
            "Processing head content:",
            index,
            "Length:",
            content.length
          );
          console.log("Raw content:", content.substring(0, 500) + "...");

          // Extract resources from between content_for_header and </head>
          const headerMatch = content.match(
            /\{\{\s*content_for_header\s*\}\}([\s\S]*?)<\/head>/i
          );
          if (headerMatch) {
            const headerSection = headerMatch[1].trim();
            console.log("Found header section:", headerSection);

            if (headerSection) {
              // Use regex to extract complete tags instead of line-by-line
              const linkMatches = headerSection.match(/<link[^>]*>/g) || [];
              const scriptMatches =
                headerSection.match(
                  /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/\s*>/g
                ) || [];

              [...linkMatches, ...scriptMatches].forEach((tag) => {
                const trimmedTag = tag.trim();
                if (trimmedTag.includes("http") || trimmedTag.includes("//")) {
                  console.log("Adding header resource:", trimmedTag);
                  allResources.add(trimmedTag);
                }
              });
            }
          }

          // Also extract from "External Resources" comment section
          const externalMatch = content.match(
            /<!--\s*External\s+Resources\s*-->([\s\S]*?)<\/head>/i
          );
          if (externalMatch) {
            const externalSection = externalMatch[1].trim();
            console.log("Found external resources section:", externalSection);

            if (externalSection) {
              // Use regex to extract complete tags instead of line-by-line
              const linkMatches = externalSection.match(/<link[^>]*>/g) || [];
              const scriptMatches =
                externalSection.match(
                  /<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/\s*>/g
                ) || [];

              [...linkMatches, ...scriptMatches].forEach((tag) => {
                const trimmedTag = tag.trim();
                if (trimmedTag.includes("http") || trimmedTag.includes("//")) {
                  console.log("Adding external resource:", trimmedTag);
                  allResources.add(trimmedTag);
                }
              });
            }
          }
        });

        const combinedResources = Array.from(allResources).join("\n    ");

        const finalThemeContent = `{%- liquid
  assign use_original_layout = false
  assign request_path = request.path

  if request_path contains '/products/'
    assign use_original_layout = true
  elsif request_path == '/cart'
    assign use_original_layout = true
  elsif request_path contains '/checkout'
    assign use_original_layout = true
  elsif request_path contains '/checkouts/'
    assign use_original_layout = true
  endif
-%}

{% if use_original_layout %}
  <!doctype html>
  <html class="js" lang="{{ request.locale.iso_code }}">
    <head>
      <!-- Original theme.liquid head content -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="theme-color" content="">
      <link rel="canonical" href="{{ canonical_url }}">

      {%- if settings.favicon != blank -%}
        <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
      {%- endif -%}

      {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
        <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
      {%- endunless -%}

      <title>
        {{ page_title }}
        {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
        {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
        {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
      </title>

      {% if page_description %}
        <meta name="description" content="{{ page_description | escape }}">
      {% endif %}

      {% render 'meta-tags' %}

      <script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'pubsub.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-disclosure.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'details-modal.js' | asset_url }}" defer="defer"></script>
      <script src="{{ 'search-form.js' | asset_url }}" defer="defer"></script>

      {%- if settings.animations_reveal_on_scroll -%}
        <script src="{{ 'animations.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {{ content_for_header }}

      {%- liquid
        assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'
        assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'
        assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
      %}

      {% style %}
        {{ settings.type_body_font | font_face: font_display: 'swap' }}
        {{ body_font_bold | font_face: font_display: 'swap' }}
        {{ body_font_italic | font_face: font_display: 'swap' }}
        {{ body_font_bold_italic | font_face: font_display: 'swap' }}
        {{ settings.type_header_font | font_face: font_display: 'swap' }}

        {% for scheme in settings.color_schemes -%}
          {% assign scheme_classes = scheme_classes | append: ', .color-' | append: scheme.id %}
          {% if forloop.index == 1 -%}
            :root,
          {%- endif %}
          .color-{{ scheme.id }} {
            --color-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          {% if scheme.settings.background_gradient != empty %}
            --gradient-background: {{ scheme.settings.background_gradient }};
          {% else %}
            --gradient-background: {{ scheme.settings.background }};
          {% endif %}
          --color-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-background-contrast: {{ background_color_contrast.red }},{{ background_color_contrast.green }},{{ background_color_contrast.blue }};
          --color-shadow: {{ scheme.settings.shadow.red }},{{ scheme.settings.shadow.green }},{{ scheme.settings.shadow.blue }};
          --color-button: {{ scheme.settings.button.red }},{{ scheme.settings.button.green }},{{ scheme.settings.button.blue }};
          --color-button-text: {{ scheme.settings.button_label.red }},{{ scheme.settings.button_label.green }},{{ scheme.settings.button_label.blue }};
          --color-secondary-button: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-secondary-button-text: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-link: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};
          --color-badge-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --color-badge-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};
          --color-badge-border: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};
          --payment-terms-background-color: rgb({{ scheme.settings.background.rgb }});
        }
        {% endfor %}

        {{ scheme_classes | prepend: 'body' }} {
          color: rgba(var(--color-foreground), 0.75);
          background-color: rgb(var(--color-background));
        }

        :root {
          --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
          --font-body-style: {{ settings.type_body_font.style }};
          --font-body-weight: {{ settings.type_body_font.weight }};
          --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};

          --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};
          --font-heading-style: {{ settings.type_header_font.style }};
          --font-heading-weight: {{ settings.type_header_font.weight }};

          --font-body-scale: {{ settings.body_scale | divided_by: 100.0 }};
          --font-heading-scale: {{ settings.heading_scale | times: 1.0 | divided_by: settings.body_scale }};

          --media-padding: {{ settings.media_padding }}px;
          --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};
          --media-border-width: {{ settings.media_border_thickness }}px;
          --media-radius: {{ settings.media_radius }}px;
          --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};
          --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;
          --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;
          --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;
          --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};

          --page-width: {{ settings.page_width | divided_by: 10 }}rem;
          --page-width-margin: {% if settings.page_width == '1600' %}2{% else %}0{% endif %}rem;

          --product-card-image-padding: {{ settings.card_image_padding | divided_by: 10.0 }}rem;
          --product-card-corner-radius: {{ settings.card_corner_radius | divided_by: 10.0 }}rem;
          --product-card-text-alignment: {{ settings.card_text_alignment }};
          --product-card-border-width: {{ settings.card_border_thickness | divided_by: 10.0 }}rem;
          --product-card-border-opacity: {{ settings.card_border_opacity | divided_by: 100.0 }};
          --product-card-shadow-opacity: {{ settings.card_shadow_opacity | divided_by: 100.0 }};
          --product-card-shadow-visible: {% if settings.card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --product-card-shadow-horizontal-offset: {{ settings.card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-vertical-offset: {{ settings.card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --product-card-shadow-blur-radius: {{ settings.card_shadow_blur | divided_by: 10.0 }}rem;

          --collection-card-image-padding: {{ settings.collection_card_image_padding | divided_by: 10.0 }}rem;
          --collection-card-corner-radius: {{ settings.collection_card_corner_radius | divided_by: 10.0 }}rem;
          --collection-card-text-alignment: {{ settings.collection_card_text_alignment }};
          --collection-card-border-width: {{ settings.collection_card_border_thickness | divided_by: 10.0 }}rem;
          --collection-card-border-opacity: {{ settings.collection_card_border_opacity | divided_by: 100.0 }};
          --collection-card-shadow-opacity: {{ settings.collection_card_shadow_opacity | divided_by: 100.0 }};
          --collection-card-shadow-visible: {% if settings.collection_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --collection-card-shadow-horizontal-offset: {{ settings.collection_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-vertical-offset: {{ settings.collection_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --collection-card-shadow-blur-radius: {{ settings.collection_card_shadow_blur | divided_by: 10.0 }}rem;

          --blog-card-image-padding: {{ settings.blog_card_image_padding | divided_by: 10.0 }}rem;
          --blog-card-corner-radius: {{ settings.blog_card_corner_radius | divided_by: 10.0 }}rem;
          --blog-card-text-alignment: {{ settings.blog_card_text_alignment }};
          --blog-card-border-width: {{ settings.blog_card_border_thickness | divided_by: 10.0 }}rem;
          --blog-card-border-opacity: {{ settings.blog_card_border_opacity | divided_by: 100.0 }};
          --blog-card-shadow-opacity: {{ settings.blog_card_shadow_opacity | divided_by: 100.0 }};
          --blog-card-shadow-visible: {% if settings.blog_card_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --blog-card-shadow-horizontal-offset: {{ settings.blog_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-vertical-offset: {{ settings.blog_card_shadow_vertical_offset | divided_by: 10.0 }}rem;
          --blog-card-shadow-blur-radius: {{ settings.blog_card_shadow_blur | divided_by: 10.0 }}rem;

          --badge-corner-radius: {{ settings.badge_corner_radius | divided_by: 10.0 }}rem;

          --popup-border-width: {{ settings.popup_border_thickness }}px;
          --popup-border-opacity: {{ settings.popup_border_opacity | divided_by: 100.0 }};
          --popup-corner-radius: {{ settings.popup_corner_radius }}px;
          --popup-shadow-opacity: {{ settings.popup_shadow_opacity | divided_by: 100.0 }};
          --popup-shadow-horizontal-offset: {{ settings.popup_shadow_horizontal_offset }}px;
          --popup-shadow-vertical-offset: {{ settings.popup_shadow_vertical_offset }}px;
          --popup-shadow-blur-radius: {{ settings.popup_shadow_blur }}px;

          --drawer-border-width: {{ settings.drawer_border_thickness }}px;
          --drawer-border-opacity: {{ settings.drawer_border_opacity | divided_by: 100.0 }};
          --drawer-shadow-opacity: {{ settings.drawer_shadow_opacity | divided_by: 100.0 }};
          --drawer-shadow-horizontal-offset: {{ settings.drawer_shadow_horizontal_offset }}px;
          --drawer-shadow-vertical-offset: {{ settings.drawer_shadow_vertical_offset }}px;
          --drawer-shadow-blur-radius: {{ settings.drawer_shadow_blur }}px;

          --spacing-sections-desktop: {{ settings.spacing_sections }}px;
          --spacing-sections-mobile: {% if settings.spacing_sections < 24 %}{{ settings.spacing_sections }}{% else %}{{ settings.spacing_sections | times: 0.7 | round | at_least: 20 }}{% endif %}px;

          --grid-desktop-vertical-spacing: {{ settings.spacing_grid_vertical }}px;
          --grid-desktop-horizontal-spacing: {{ settings.spacing_grid_horizontal }}px;
          --grid-mobile-vertical-spacing: {{ settings.spacing_grid_vertical | divided_by: 2 }}px;
          --grid-mobile-horizontal-spacing: {{ settings.spacing_grid_horizontal | divided_by: 2 }}px;

          --text-boxes-border-opacity: {{ settings.text_boxes_border_opacity | divided_by: 100.0 }};
          --text-boxes-border-width: {{ settings.text_boxes_border_thickness }}px;
          --text-boxes-radius: {{ settings.text_boxes_radius }}px;
          --text-boxes-shadow-opacity: {{ settings.text_boxes_shadow_opacity | divided_by: 100.0 }};
          --text-boxes-shadow-visible: {% if settings.text_boxes_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --text-boxes-shadow-horizontal-offset: {{ settings.text_boxes_shadow_horizontal_offset }}px;
          --text-boxes-shadow-vertical-offset: {{ settings.text_boxes_shadow_vertical_offset }}px;
          --text-boxes-shadow-blur-radius: {{ settings.text_boxes_shadow_blur }}px;

          --buttons-radius: {{ settings.buttons_radius }}px;
          --buttons-radius-outset: {% if settings.buttons_radius > 0 %}{{ settings.buttons_radius | plus: settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-width: {% if settings.buttons_border_opacity > 0 %}{{ settings.buttons_border_thickness }}{% else %}0{% endif %}px;
          --buttons-border-opacity: {{ settings.buttons_border_opacity | divided_by: 100.0 }};
          --buttons-shadow-opacity: {{ settings.buttons_shadow_opacity | divided_by: 100.0 }};
          --buttons-shadow-visible: {% if settings.buttons_shadow_opacity > 0 %}1{% else %}0{% endif %};
          --buttons-shadow-horizontal-offset: {{ settings.buttons_shadow_horizontal_offset }}px;
          --buttons-shadow-vertical-offset: {{ settings.buttons_shadow_vertical_offset }}px;
          --buttons-shadow-blur-radius: {{ settings.buttons_shadow_blur }}px;
          --buttons-border-offset: {% if settings.buttons_radius > 0 or settings.buttons_shadow_opacity > 0 %}0.3{% else %}0{% endif %}px;

          --inputs-radius: {{ settings.inputs_radius }}px;
          --inputs-border-width: {{ settings.inputs_border_thickness }}px;
          --inputs-border-opacity: {{ settings.inputs_border_opacity | divided_by: 100.0 }};
          --inputs-shadow-opacity: {{ settings.inputs_shadow_opacity | divided_by: 100.0 }};
          --inputs-shadow-horizontal-offset: {{ settings.inputs_shadow_horizontal_offset }}px;
          --inputs-margin-offset: {% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_opacity > 0 %}{{ settings.inputs_shadow_vertical_offset | abs }}{% else %}0{% endif %}px;
          --inputs-shadow-vertical-offset: {{ settings.inputs_shadow_vertical_offset }}px;
          --inputs-shadow-blur-radius: {{ settings.inputs_shadow_blur }}px;
          --inputs-radius-outset: {% if settings.inputs_radius > 0 %}{{ settings.inputs_radius | plus: settings.inputs_border_thickness }}{% else %}0{% endif %}px;

          --variant-pills-radius: {{ settings.variant_pills_radius }}px;
          --variant-pills-border-width: {{ settings.variant_pills_border_thickness }}px;
          --variant-pills-border-opacity: {{ settings.variant_pills_border_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-opacity: {{ settings.variant_pills_shadow_opacity | divided_by: 100.0 }};
          --variant-pills-shadow-horizontal-offset: {{ settings.variant_pills_shadow_horizontal_offset }}px;
          --variant-pills-shadow-vertical-offset: {{ settings.variant_pills_shadow_vertical_offset }}px;
          --variant-pills-shadow-blur-radius: {{ settings.variant_pills_shadow_blur }}px;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-size: calc(var(--font-body-scale) * 62.5%);
          height: 100%;
        }

        body {
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          grid-template-columns: 100%;
          min-height: 100%;
          margin: 0;
          font-size: 1.5rem;
          letter-spacing: 0.06rem;
          line-height: calc(1 + 0.8 / var(--font-body-scale));
          font-family: var(--font-body-family);
          font-style: var(--font-body-style);
          font-weight: var(--font-body-weight);
        }

        @media screen and (min-width: 750px) {
          body {
            font-size: 1.6rem;
          }
        }
      {% endstyle %}

      {{ 'base.css' | asset_url | stylesheet_tag }}
      <link
        rel="stylesheet"
        href="{{ 'component-cart-items.css' | asset_url }}"
        media="print"
        onload="this.media='all'"
      >

      {%- if settings.cart_type == 'drawer' -%}
        {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
        {{ 'component-cart.css' | asset_url | stylesheet_tag }}
        {{ 'component-totals.css' | asset_url | stylesheet_tag }}
        {{ 'component-price.css' | asset_url | stylesheet_tag }}
        {{ 'component-discounts.css' | asset_url | stylesheet_tag }}
      {%- endif -%}

      {%- unless settings.type_body_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_body_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}
      {%- unless settings.type_header_font.system? -%}
        <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
      {%- endunless -%}

      {%- if localization.available_countries.size > 1 or localization.available_languages.size > 1 -%}
        {{ 'component-localization-form.css' | asset_url | stylesheet_tag: preload: true }}
        <script src="{{ 'localization-form.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.predictive_search_enabled -%}
        <link
          rel="stylesheet"
          href="{{ 'component-predictive-search.css' | asset_url }}"
          media="print"
          onload="this.media='all'"
        >
      {%- endif -%}

      <script>
        if (Shopify.designMode) {
          document.documentElement.classList.add('shopify-design-mode');
        }
      </script>
    </head>

    <body class="gradient{% if settings.animations_hover_elements != 'none' %} animate--hover-{{ settings.animations_hover_elements }}{% endif %}">
      <a class="skip-to-content-link button visually-hidden" href="#MainContent">
        {{ 'accessibility.skip_to_text' | t }}
      </a>

      {%- if settings.cart_type == 'drawer' -%}
        {%- render 'cart-drawer' -%}
      {%- endif -%}

      {% sections 'header-group' %}

      <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
        {{ content_for_layout }}
      </main>

      {% sections 'footer-group' %}

      <ul hidden>
        <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
        <li id="a11y-new-window-message">{{ 'accessibility.link_messages.new_window' | t }}</li>
      </ul>

      <script>
      window.shopUrl = '{{ request.origin }}';
      window.routes = {
        cart_add_url: '{{ routes.cart_add_url }}',
        cart_change_url: '{{ routes.cart_change_url }}',
        cart_update_url: '{{ routes.cart_update_url }}',
        cart_url: '{{ routes.cart_url }}',
        predictive_search_url: '{{ routes.predictive_search_url }}',
      };

      window.cartStrings = {
        error: \`{{ 'sections.cart.cart_error' | t }}\`,
        quantityError: \`{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}\`,
      };

      window.variantStrings = {
        addToCart: \`{{ 'products.product.add_to_cart' | t }}\`,
        soldOut: \`{{ 'products.product.sold_out' | t }}\`,
        unavailable: \`{{ 'products.product.unavailable' | t }}\`,
        unavailable_with_option: \`{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}\`,
      };

      window.quickOrderListStrings = {
        itemsAdded: \`{{ 'sections.quick_order_list.items_added.other' | t: quantity: '[quantity]' }}\`,
        itemAdded: \`{{ 'sections.quick_order_list.items_added.one' | t: quantity: '[quantity]' }}\`,
        itemsRemoved: \`{{ 'sections.quick_order_list.items_removed.other' | t: quantity: '[quantity]' }}\`,
        itemRemoved: \`{{ 'sections.quick_order_list.items_removed.one' | t: quantity: '[quantity]' }}\`,
        viewCart: \`{{- 'sections.quick_order_list.view_cart' | t -}}\`,
        each: \`{{- 'sections.quick_order_list.each' | t: money: '[money]' }}\`,
      };

      window.accessibilityStrings = {
        imageAvailable: \`{{ 'products.product.media.image_available' | t: index: '[index]' }}\`,
        shareSuccess: \`{{ 'general.share.success_message' | t }}\`,
        pauseSlideshow: \`{{ 'sections.slideshow.pause_slideshow' | t }}\`,
        playSlideshow: \`{{ 'sections.slideshow.play_slideshow' | t }}\`,
        recipientFormExpanded: \`{{ 'recipient.form.expanded' | t }}\`,
        recipientFormCollapsed: \`{{ 'recipient.form.collapsed' | t }}\`,
        countrySelectorSearchCount: \`{{ 'localization.country_results_count' | t: count: '[count]' }}\`,
      };
      </script>

      {%- if settings.predictive_search_enabled -%}
        <script src="{{ 'predictive-search.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}

      {%- if settings.cart_type == 'drawer' -%}
        <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
      {%- endif -%}
    </body>
  </html>

{% else %}
  <!doctype html>
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
      ${combinedResources ? "\n    " + combinedResources + "\n    " : ""}
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
</html>
{% endif %}`;

        setCombinedHeadContent(finalThemeContent);
        console.log(
          "✅ Successfully combined resources from all",
          allHeadContents.length,
          "files"
        );
        console.log("📊 Total unique resources found:", allResources.size);
      }
    } catch (error) {
      setConversionError(error.message);
    } finally {
      setIsConverting(false);
      setCurrentlyConverting(null);
    }
  };
  const createDownload = (content, filename, contentType = "text/plain") => {
    try {
      console.log(`[DOWNLOAD] Starting download for ${filename}`);
      console.log(
        `[DOWNLOAD] Content length: ${content?.length || "undefined"}`
      );
      console.log(`[DOWNLOAD] Content type: ${contentType}`);
      console.log(`[DOWNLOAD] User agent: ${navigator.userAgent}`);

      if (!content) {
        throw new Error("No content provided for download");
      }

      const contentString =
        typeof content === "string"
          ? content
          : JSON.stringify(content, null, 2);
      console.log(`[DOWNLOAD] Final content length: ${contentString.length}`);

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        console.log("[DOWNLOAD] Using IE/Edge msSaveOrOpenBlob method");
        const blob = new Blob([contentString], { type: contentType });
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
      }

      let blobContent = contentString;
      if (
        contentType.includes("text/") ||
        contentType.includes("application/json")
      ) {
        blobContent = "\ufeff" + contentString;
      }

      const blob = new Blob([blobContent], {
        type: contentType + ";charset=utf-8",
      });
      console.log(`[DOWNLOAD] Created blob with size: ${blob.size} bytes`);

      const url = URL.createObjectURL(blob);
      console.log(`[DOWNLOAD] Created blob URL: ${url}`);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      link.setAttribute("download", filename);

      console.log(
        `[DOWNLOAD] Link created with href: ${link.href} and download: ${link.download}`
      );

      if (!link.download || link.download !== filename) {
        console.warn(
          "[DOWNLOAD] Download attribute not properly set, trying alternative approach"
        );
        link.setAttribute("download", filename);
      }

      document.body.appendChild(link);
      console.log("[DOWNLOAD] Link added to DOM");

      console.log("[DOWNLOAD] Attempting to trigger download...");

      try {
        link.click();
        console.log("[DOWNLOAD] Direct click() succeeded");
      } catch (clickError) {
        console.warn("[DOWNLOAD] Direct click() failed:", clickError);

        try {
          const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          link.dispatchEvent(clickEvent);
          console.log("[DOWNLOAD] MouseEvent dispatch succeeded");
        } catch (eventError) {
          console.warn("[DOWNLOAD] MouseEvent dispatch failed:", eventError);

          try {
            link.style.position = "absolute";
            link.style.top = "-1000px";
            link.style.display = "block";
            link.focus();
            link.click();
            console.log("[DOWNLOAD] Focus and click succeeded");
          } catch (focusError) {
            console.error("[DOWNLOAD] All click methods failed:", focusError);
            throw new Error("Could not trigger download");
          }
        }
      }

      setTimeout(() => {
        try {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
          URL.revokeObjectURL(url);
          console.log("[DOWNLOAD] Cleanup completed successfully");
        } catch (cleanupError) {
          console.warn("[DOWNLOAD] Cleanup error:", cleanupError);
        }
      }, 500);

      console.log("[DOWNLOAD] Download process initiated successfully");
      return true;
    } catch (error) {
      console.error("[DOWNLOAD] Primary download method failed:", error);

      if (content && content.length < 1000000) {
        try {
          console.log("[DOWNLOAD] Trying data URL fallback");
          const dataUrl = `data:${contentType};charset=utf-8,${encodeURIComponent(
            content
          )}`;
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("[DOWNLOAD] Data URL fallback succeeded");
          return true;
        } catch (dataUrlError) {
          console.error("[DOWNLOAD] Data URL fallback failed:", dataUrlError);
        }
      }

      try {
        console.log("[DOWNLOAD] Opening new window with content");
        const newWindow = window.open(
          "",
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
        if (newWindow) {
          const escapedContent = content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Download: ${filename}</title>
                <style>
                  body { 
                    font-family: 'Courier New', monospace; 
                    padding: 20px; 
                    line-height: 1.5;
                    background: #f5f5f5;
                  }
                  .header {
                    background: #333;
                    color: white;
                    padding: 15px;
                    margin: -20px -20px 20px -20px;
                  }
                  .content {
                    background: white;
                    padding: 15px;
                    border: 1px solid #ddd;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    max-height: 70vh;
                    overflow: auto;
                  }
                  .instructions {
                    background: #e7f3ff;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-left: 4px solid #2196F3;
                  }
                  button {
                    background: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                    margin: 10px 5px;
                  }
                  button:hover { background: #45a049; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h2>File Download: ${filename}</h2>
                </div>
                <div class="instructions">
                  <strong>Download Instructions:</strong><br>
                  1. Right-click in the content area below<br>
                  2. Select "Save As" or "Save Page As"<br>
                  3. Change the filename to: <strong>${filename}</strong><br>
                  4. Save the file
                </div>
                <button onclick="document.getElementById('content').select(); document.execCommand('copy'); alert('Content copied to clipboard!');">
                  📋 Copy All Content
                </button>
                <button onclick="window.close();">❌ Close Window</button>
                <div class="content" id="content">${escapedContent}</div>
                <script>
                  // Auto-select all content for easy copying
                  function selectAll() {
                    const content = document.getElementById('content');
                    const range = document.createRange();
                    range.selectNodeContents(content);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                  // Auto-focus content area
                  setTimeout(selectAll, 100);
                </script>
              </body>
            </html>
          `);
          newWindow.document.close();
          console.log("[DOWNLOAD] New window opened successfully");
          return true;
        }
      } catch (windowError) {
        console.error("[DOWNLOAD] New window fallback failed:", windowError);
      }

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(content)
            .then(() => {
              alert(
                `❌ Download failed, but content has been copied to clipboard!\n\n📝 Instructions:\n1. Open a text editor\n2. Paste the content (Ctrl+V)\n3. Save as "${filename}"\n\nContent length: ${content.length} characters`
              );
            })
            .catch(() => {
              throw new Error("Clipboard write failed");
            });
          console.log("[DOWNLOAD] Content copied to clipboard as fallback");
          return true;
        } else {
          throw new Error("Clipboard API not available");
        }
      } catch (clipboardError) {
        console.error("[DOWNLOAD] Clipboard fallback failed:", clipboardError);
      }

      alert(
        `❌ Download failed!\n\n📝 Manual Instructions:\n1. Copy the content from the code viewer\n2. Open a text editor\n3. Paste the content\n4. Save as "${filename}"\n\nError: ${error.message}\n\nPlease check browser console for more details.`
      );
      console.error("[DOWNLOAD] All fallback methods failed");
      return false;
    }
  };

  const downloadLiquidFile = (convertedFile) => {
    try {
      console.log("downloadLiquidFile called with:", convertedFile);
      setDownloadStatus("Preparing Liquid file download...");

      if (!convertedFile || !convertedFile.liquidContent) {
        console.error("No liquid content to download");
        setConversionError("No liquid content available for download");
        setDownloadStatus(null);
        return;
      }

      const fileName =
        convertedFile.fileNames?.liquidFileName ||
        (convertedFile.originalFile?.fileName
          ? convertedFile.originalFile.fileName.replace(".html", ".liquid")
          : "converted.liquid");

      const success = createDownload(
        convertedFile.liquidContent,
        fileName,
        "text/plain"
      );
      if (success) {
        setDownloadStatus(`✅ ${fileName} download started!`);
        setTimeout(() => setDownloadStatus(null), 3000);
      } else {
        setDownloadStatus("❌ Download failed - check browser console");
        setTimeout(() => setDownloadStatus(null), 5000);
      }
      console.log("Liquid file download initiated successfully");
    } catch (error) {
      console.error("Error downloading liquid file:", error);
      setConversionError(`Failed to download liquid file: ${error.message}`);
      setDownloadStatus("❌ Download error occurred");
      setTimeout(() => setDownloadStatus(null), 5000);
    }
  };
  const downloadJsonFile = (convertedFile) => {
    try {
      console.log("downloadJsonFile called with:", convertedFile);
      setDownloadStatus("Preparing JSON file download...");

      if (!convertedFile || !convertedFile.jsonTemplate) {
        console.error("No JSON content to download");
        setConversionError("No JSON template available for download");
        setDownloadStatus(null);
        return;
      }

      const fileName =
        convertedFile.fileNames?.jsonFileName ||
        (convertedFile.originalFile?.fileName
          ? `page.${convertedFile.originalFile.fileName
              .replace(".html", "")
              .replace(/[^a-zA-Z0-9-_]/g, "-")}.json`
          : "page.custom.json");

      const success = createDownload(
        convertedFile.jsonTemplate,
        fileName,
        "application/json"
      );
      if (success) {
        setDownloadStatus(`✅ ${fileName} download started!`);
        setTimeout(() => setDownloadStatus(null), 3000);
      } else {
        setDownloadStatus("❌ Download failed - check browser console");
        setTimeout(() => setDownloadStatus(null), 5000);
      }
      console.log("JSON file download initiated successfully");
    } catch (error) {
      console.error("Error downloading JSON file:", error);
      setConversionError(`Failed to download JSON file: ${error.message}`);
      setDownloadStatus("❌ Download error occurred");
      setTimeout(() => setDownloadStatus(null), 5000);
    }
  };
  const downloadHeadFile = (convertedFile) => {
    if (!convertedFile.headContent) return;

    const blob = new Blob([convertedFile.headContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile.originalFile?.fileName
      ? `${convertedFile.originalFile.fileName.replace(
          ".html",
          ""
        )}-head.liquid`
      : `head-section-${convertedFile.index + 1}.liquid`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCombinedHeadFile = () => {
    try {
      console.log("downloadCombinedHeadFile called");

      if (!combinedHeadContent || !combinedHeadContent.trim()) {
        console.error("No combined head content to download");
        setConversionError("No combined head content available for download");
        return;
      }

      createDownload(
        combinedHeadContent,
        "combined-theme-head.liquid",
        "text/plain"
      );
      console.log("Combined head file download initiated successfully");
    } catch (error) {
      console.error("Error downloading combined head file:", error);
      setConversionError(
        `Failed to download combined head file: ${error.message}`
      );
    }
  };

  const downloadAllAsZip = async () => {
    if (convertedFiles.length === 0) {
      setConversionError("No converted files to download");
      return;
    }

    try {
      const result = await generateAndDownloadZip(
        convertedFiles,
        combinedHeadContent,
        "shopify-files.zip"
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <GlobalStyles />
      <Header onHowItWorksClick={handleHowItWorksClick} />

      {/* Download Status Indicator */}
      {downloadStatus && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            background: downloadStatus.includes("✅")
              ? "rgba(76, 175, 80, 0.9)"
              : "rgba(244, 67, 54, 0.9)",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 9999,
            fontSize: "14px",
            fontWeight: "600",
            maxWidth: "300px",
            wordWrap: "break-word",
          }}
        >
          {downloadStatus}
        </div>
      )}

      <div
        className="container"
        style={{
          paddingBottom: "40px",
        }}
      >
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
        />
      </div>
      <ErrorPopup
        errors={validationErrors}
        isVisible={showErrorPopup}
        onClose={() => {
          setShowErrorPopup(false);
          setAllFileErrors(null);
        }}
        fileName={files.find((f) => f.fileContent)?.fileName || ""}
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
