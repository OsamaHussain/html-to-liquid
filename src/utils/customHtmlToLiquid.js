/**
 * Custom HTML to Liquid Converter
 * Professional Shopify-ready conversion following exact client requirements
 */

import * as cheerio from 'cheerio';

/**
 * Extracts head content from HTML
 */
export function extractHeadContent(html) {
    if (!html || typeof html !== 'string') return [];

    const $ = cheerio.load(html);
    const headContent = new Set();

    $('head link[rel="stylesheet"]').each((i, el) => {
        const htmlContent = $.html(el);
        if (htmlContent && htmlContent.trim()) {
            headContent.add(htmlContent);
        }
    });

    $('head script[src]').each((i, el) => {
        const htmlContent = $.html(el);
        if (htmlContent && htmlContent.trim()) {
            headContent.add(htmlContent);
        }
    });

    $('head link[href*="fonts.googleapis.com"]').each((i, el) => {
        const htmlContent = $.html(el);
        if (htmlContent && htmlContent.trim()) {
            headContent.add(htmlContent);
        }
    });

    $('head meta[name="viewport"], head meta[charset]').each((i, el) => {
        const htmlContent = $.html(el);
        if (htmlContent && htmlContent.trim()) {
            headContent.add(htmlContent);
        }
    });

    return Array.from(headContent).filter(item => item && item.trim().length > 0);
}

/**
 * Extracts and processes CSS from HTML
 */
export function extractCSS(html) {
    if (!html || typeof html !== 'string') return '';

    const $ = cheerio.load(html);
    let css = '';

    $('style').each((i, el) => {
        const styleContent = $(el).html();
        if (styleContent && styleContent.trim()) {
            css += styleContent + '\n';
        }
    });

    return css.trim();
}

/**
 * Extracts and processes JavaScript from HTML
 */
export function extractJavaScript(html) {
    if (!html || typeof html !== 'string') return '';

    const $ = cheerio.load(html);
    let js = '';
    let externalScripts = [];

    $('script:not([src])').each((i, el) => {
        const scriptContent = $(el).html();
        if (scriptContent && scriptContent.trim()) {
            js += '// Inline Script ' + (i + 1) + '\n';
            js += scriptContent + '\n\n';
        }
    });

    $('script[src]').each((i, el) => {
        const src = $(el).attr('src') || '';
        if (src && !src.includes('shopify') && !src.includes('theme.js')) {
            externalScripts.push(src);
        }
    });

    if (externalScripts.length > 0) {
        js += '// External Scripts Referenced in Original HTML:\n';
        externalScripts.forEach(src => {
            js += `// ${src}\n`;
        });
        js += '// Note: External scripts should be added to theme.liquid or loaded via CDN\n\n';
    }

    return js.trim();
}

/**
 * Converts HTML content to professional Shopify Liquid following client requirements
 */
export function convertHtmlToLiquid(html, fileName) {
    if (!html || typeof html !== 'string') {
        return {
            settings: [],
            blocks: [],
            liquidBody: '',
            jsonBlocks: {},
            jsonBlockOrder: [],
            sectionGroups: { content: { settings: [] }, layout: { settings: [] }, styling: { settings: [] } },
            extractedJS: ''
        };
    }

    const $ = cheerio.load(html);
    const settings = [];
    const blocks = [];
    const jsonBlocks = {};
    const jsonBlockOrder = [];

    const extractedJS = extractJavaScript(html);

    $('head, style, script').remove();

    const blockPatterns = [
        { selector: '.feature, .feature-item, .feature-card', name: 'Feature', type: 'feature', max: 12 },
        { selector: '.card, .info-card', name: 'Card', type: 'card', max: 8 },
        { selector: '.testimonial, .review', name: 'Testimonial', type: 'testimonial', max: 6 },
        { selector: '.faq-item, .faq', name: 'FAQ', type: 'faq', max: 20 },
        { selector: '.team-member, .team', name: 'Team Member', type: 'team_member', max: 8 },
        { selector: '.service, .service-item', name: 'Service', type: 'service', max: 10 },
        { selector: '.benefit, .benefit-item', name: 'Benefit', type: 'benefit', max: 8 },
        { selector: '.step, .process-step', name: 'Step', type: 'step', max: 6 },
        { selector: '.product, .product-card', name: 'Product', type: 'product', max: 12 },
        { selector: '.gallery-item, .image-item', name: 'Gallery Item', type: 'gallery_item', max: 20 },
        { selector: '.guide-card', name: 'Guide', type: 'guide', max: 10 }
    ];

    const contentBlocks = [];

    const sustainabilitySlides = $('div').filter((i, el) => {
        const $el = $(el);
        const hasSlideClass = $el.hasClass('sustainability-slide') ||
            $el.closest('.sustainability-slideshow').length > 0;
        const hasHeading = $el.find('h3, h4').length > 0;
        const hasContent = $el.find('p, .sustainability-content').length > 0;
        const isSlideContainer = $el.hasClass('sustainability-slideshow');

        return hasSlideClass && hasHeading && hasContent && !isSlideContainer;
    });

    if (sustainabilitySlides.length >= 2) {
        contentBlocks.push({
            elements: sustainabilitySlides,
            selector: 'sustainability-slide-detected',
            name: 'Sustainability Slide',
            type: 'sustainability_slide',
            max: 8
        });
    }

    const transformationSlides = $('div').filter((i, el) => {
        const $el = $(el);
        const hasSlideClass = $el.hasClass('transformation-slide') ||
            $el.closest('.transformations-images').length > 0;
        const hasBeforeAfter = $el.find('.before-image, .after-image').length >= 2 ||
            $el.find('img').length >= 2;
        const isSlideContainer = $el.hasClass('transformations-container') ||
            $el.hasClass('transformations-images');

        return hasSlideClass && hasBeforeAfter && !isSlideContainer;
    });

    if (transformationSlides.length >= 2) {
        contentBlocks.push({
            elements: transformationSlides,
            selector: 'transformation-slide-detected',
            name: 'Transformation',
            type: 'transformation',
            max: 6
        });
    }

    const productCards = $('div').filter((i, el) => {
        const $el = $(el);
        const text = $el.text() || '';
        const hasImage = $el.find('img').length > 0;
        const hasPrice = text.includes('$') || $el.find('[class*="price"]').length > 0;
        const hasRating = $el.find('i[class*="star"]').length >= 3;
        const buttonText = ($el.find('a, button, .btn').text() || '').toLowerCase();
        const hasButton = buttonText.includes('view') ||
            buttonText.includes('details') ||
            buttonText.includes('buy') ||
            buttonText.includes('add');
        const hasHeading = $el.find('h1, h2, h3, h4, h5, h6').length > 0;
        const hasDescription = $el.find('p').length > 0;

        const isContainer = $el.find('div').filter((j, nested) => {
            const $nested = $(nested);
            return $nested.find('img').length > 0 &&
                $nested.find('h1, h2, h3, h4, h5, h6').length > 0 &&
                $nested.find('i[class*="star"]').length >= 3;
        }).length > 1;

        return hasImage && (hasPrice || hasRating) && hasButton && hasHeading && hasDescription && !isContainer;
    });

    if (productCards.length >= 2) {
        contentBlocks.push({
            elements: productCards,
            selector: 'product-card-detected',
            name: 'Product Card',
            type: 'product_card',
            max: 12
        });
    }

    const testimonialCards = $('div').filter((i, el) => {
        const $el = $(el);
        const text = $el.text() || '';
        const pText = $el.find('p').text() || '';
        const hasQuote = text.includes('"') || pText.length > 30;
        const hasStars = $el.find('i[class*="star"]').length >= 3;
        const hasName = $el.find('h4, h5, h6, .name, strong').length > 0 ||
            text.match(/[A-Z][a-z]+\s+[A-Z]\./) ||
            text.toLowerCase().includes('customer');

        const isContainer = $el.find('div').filter((j, nested) => {
            const $nested = $(nested);
            return $nested.find('i[class*="star"]').length >= 3;
        }).length > 1;

        return hasQuote && hasStars && hasName && !isContainer;
    });

    if (testimonialCards.length >= 2) {
        contentBlocks.push({
            elements: testimonialCards,
            selector: 'testimonial-card-detected',
            name: 'Testimonial Card',
            type: 'testimonial_card',
            max: 8
        });
    }

    const guideCards = $('div').filter((i, el) => {
        const $el = $(el);
        const hasImage = $el.find('img').length > 0;
        const hasHeading = $el.find('h3, h4, h5').length > 0;
        const hasDescription = $el.find('p').length > 0;
        const linkText = ($el.find('a').text() || '').toLowerCase();
        const hasReadMore = linkText.includes('read') ||
            linkText.includes('→') ||
            linkText.includes('guide') ||
            linkText.includes('learn') ||
            linkText.includes('more');

        const hasMultipleCards = $el.find('div').filter((j, nested) => {
            const $nested = $(nested);
            return $nested.find('img').length > 0 &&
                $nested.find('h3, h4, h5').length > 0 &&
                $nested.find('p').length > 0;
        }).length > 1;

        return hasImage && hasHeading && hasDescription && hasReadMore && !hasMultipleCards;
    });

    if (guideCards.length >= 2) {
        contentBlocks.push({
            elements: guideCards,
            selector: 'guide-card-detected',
            name: 'Guide Card',
            type: 'guide_card',
            max: 10
        });
    }

    const allBlockPatterns = [...blockPatterns, ...contentBlocks];

    const seenTypes = new Set();
    const uniqueBlockPatterns = allBlockPatterns.filter(pattern => {
        if (seenTypes.has(pattern.type)) {
            console.warn(`Duplicate block type detected: ${pattern.type}, skipping...`);
            return false;
        }
        seenTypes.add(pattern.type);
        return true;
    });

    uniqueBlockPatterns.forEach(pattern => {
        let elements;
        if (pattern.elements) {
            elements = pattern.elements;
        } else {
            elements = $(pattern.selector);
        }

        if (elements.length >= 2) {
            const blockType = pattern.type;
            const blockSettings = [];

            const originalData = [];
            elements.each((index, element) => {
                const $el = $(element);

                const headingEl = $el.find('h1, h2, h3, h4, h5, h6').first();
                const descriptionEl = $el.find('p').first();
                const buttonEl = $el.find('a, .btn, .button').first();
                const imageEl = $el.find('img').first();
                const iconEl = $el.find('i[class*="fa"], .icon').first();

                const data = {
                    heading: headingEl.length ? headingEl.text().trim() : '',
                    subheading: $el.find('h1, h2, h3, h4, h5, h6').eq(1).text().trim(),
                    description: descriptionEl.length ? descriptionEl.text().trim() : '',
                    richtext: descriptionEl.length ? descriptionEl.html() : '',
                    buttonText: buttonEl.length ? buttonEl.text().trim() : '',
                    buttonUrl: buttonEl.length ? buttonEl.attr('href') : '',
                    imageAlt: imageEl.length ? imageEl.attr('alt') : '',
                    imageSrc: imageEl.length ? imageEl.attr('src') : '',
                    icon: iconEl.length ? iconEl.attr('class') : '',
                    price: $el.find('.price, [class*="price"], span:contains("$")').first().text().trim(),
                    rating: $el.find('.rating, [class*="rating"]').first().text().trim()
                };

                if (!data.heading) {
                    const directHeading = $el.children('h1, h2, h3, h4, h5, h6').first();
                    if (directHeading.length) data.heading = directHeading.text().trim();
                }

                if (!data.description) {
                    const directPara = $el.children('p').first();
                    if (directPara.length) {
                        data.description = directPara.text().trim();
                        data.richtext = directPara.html();
                    }
                }

                originalData.push(data);
            });

            const firstData = originalData[0];

            if (firstData.heading) {
                blockSettings.push({
                    type: 'text',
                    id: 'heading',
                    label: `${pattern.name} Heading`,
                    default: firstData.heading,
                    info: 'Main heading for this item'
                });
            }

            if (firstData.subheading) {
                blockSettings.push({
                    type: 'text',
                    id: 'subheading',
                    label: `${pattern.name} Subheading`,
                    default: firstData.subheading
                });
            }

            if (firstData.description && firstData.description.length > 3) {
                blockSettings.push({
                    type: 'richtext',
                    id: 'description',
                    label: `${pattern.name} Description`,
                    default: formatAsRichtext(firstData.richtext || firstData.description),
                    info: 'Rich text editor for formatting'
                });
            }

            if (firstData.imageSrc) {
                blockSettings.push({
                    type: 'image_picker',
                    id: 'image',
                    label: `${pattern.name} Image`,
                    info: 'Upload image for this item'
                });

                if (firstData.imageAlt) {
                    blockSettings.push({
                        type: 'text',
                        id: 'image_alt',
                        label: `${pattern.name} Image Alt Text`,
                        default: firstData.imageAlt,
                        info: 'Alternative text for accessibility'
                    });
                }
            }

            if (firstData.icon) {
                blockSettings.push({
                    type: 'text',
                    id: 'icon',
                    label: `${pattern.name} Icon`,
                    default: firstData.icon,
                    info: 'Icon class (e.g., fa-home, fa-star)'
                });
            }

            if (firstData.buttonText) {
                blockSettings.push({
                    type: 'text',
                    id: 'button_text',
                    label: `${pattern.name} Button Text`,
                    default: firstData.buttonText
                });

                if (firstData.buttonUrl && firstData.buttonUrl !== '#') {
                    blockSettings.push({
                        type: 'url',
                        id: 'button_url',
                        label: `${pattern.name} Button URL`,
                        default: firstData.buttonUrl,
                        info: 'Link destination'
                    });
                }
            }

            if (firstData.price) {
                blockSettings.push({
                    type: 'text',
                    id: 'price',
                    label: `${pattern.name} Price`,
                    default: firstData.price
                });
            }

            if (firstData.rating) {
                blockSettings.push({
                    type: 'range',
                    id: 'rating',
                    label: `${pattern.name} Rating`,
                    min: 1,
                    max: 5,
                    step: 0.1,
                    default: 5,
                    unit: 'stars'
                });
            }

            if (blockSettings.length > 0) {
                blocks.push({
                    type: blockType,
                    name: pattern.name,
                    limit: pattern.max,
                    settings: blockSettings
                });

                originalData.forEach((data, index) => {
                    const blockId = `${blockType}_${Date.now()}_${index}`;
                    const blockData = {
                        type: blockType,
                        settings: {}
                    };

                    blockSettings.forEach(setting => {
                        switch (setting.id) {
                            case 'heading':
                                blockData.settings[setting.id] = data.heading || setting.default;
                                break;
                            case 'subheading':
                                blockData.settings[setting.id] = data.subheading || setting.default;
                                break;
                            case 'description':
                                blockData.settings[setting.id] = formatAsRichtext(data.richtext || data.description) || setting.default;
                                break;
                            case 'button_text':
                                blockData.settings[setting.id] = data.buttonText || setting.default;
                                break;
                            case 'button_url':
                                blockData.settings[setting.id] = data.buttonUrl || setting.default;
                                break;
                            case 'image_alt':
                                blockData.settings[setting.id] = data.imageAlt || setting.default;
                                break;
                            case 'icon':
                                blockData.settings[setting.id] = data.icon || setting.default;
                                break;
                            case 'price':
                                blockData.settings[setting.id] = data.price || setting.default;
                                break;
                            case 'rating':
                                blockData.settings[setting.id] = parseFloat(data.rating) || setting.default;
                                break;
                            default:
                                blockData.settings[setting.id] = setting.default;
                        }
                    });

                    jsonBlocks[blockId] = blockData;
                    jsonBlockOrder.push(blockId);
                });

                elements.each((index, element) => {
                    const $el = $(element);

                    $el.find('h1, h2, h3, h4, h5, h6').each((i, heading) => {
                        if ($(heading).text().trim()) {
                            if (i === 0) {
                                $(heading).text('{{ block.settings.heading }}');
                            } else if (i === 1 && firstData.subheading) {
                                $(heading).text('{{ block.settings.subheading }}');
                            }
                        }
                    });

                    $el.find('p').each((i, p) => {
                        if ($(p).text().trim() && i === 0) {
                            $(p).html('{{ block.settings.description }}');
                        }
                    });

                    $el.find('.content, .description, .text').each((i, content) => {
                        if ($(content).html() && i === 0) {
                            $(content).html('{{ block.settings.description }}');
                        }
                    });

                    $el.find('a, .btn, .button').each((i, btn) => {
                        if ($(btn).text().trim() && i === 0) {
                            $(btn).text('{{ block.settings.button_text }}');
                            if ($(btn).attr('href')) {
                                $(btn).attr('href', '{{ block.settings.button_url }}');
                            }
                        }
                    });

                    $el.find('img').each((i, img) => {
                        if ($(img).attr('src') && i === 0) {
                            $(img).attr('src', 'LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER');
                            if ($(img).attr('alt')) {
                                $(img).attr('alt', 'LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER');
                            }
                        }
                    });

                    $el.find('i[class*="fa"], .icon').each((i, icon) => {
                        if ($(icon).attr('class') && i === 0) {
                            $(icon).attr('class', '{{ block.settings.icon }}');
                        }
                    });

                    $el.find('.price, [class*="price"]').each((i, price) => {
                        if ($(price).text().trim() && i === 0) {
                            $(price).text('{{ block.settings.price }}');
                        }
                    });
                });

                const firstElementHtml = $.html($(elements[0]));
                const blockHtml = formatBlockHtml(firstElementHtml);

                const wrapper = `
{%- comment -%} ${pattern.name} Blocks {%- endcomment -%}
{% for block in section.blocks %}
  {% case block.type %}
    {% when '${blockType}' %}
${blockHtml}
    {% endcase %}
{% endfor %}`;

                $(elements[0]).replaceWith(wrapper);
                elements.slice(1).each((index, el) => {
                    $(el).remove();
                });
            }
        }
    });

    let settingCounter = 1;

    const sectionGroups = {
        content: { label: 'Content Settings', settings: [] },
        layout: { label: 'Layout & Spacing', settings: [] },
        styling: { label: 'Colors & Styling', settings: [] },
        advanced: { label: 'Advanced Settings', settings: [] }
    };

    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
        const text = $(el).text().trim() || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide').length > 0;

        if (text && !text.includes('{{') && !isInsideBlock) {
            const tagName = el.tagName.toLowerCase();
            const settingId = `section_${tagName}_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'text',
                id: settingId,
                label: `Section ${tagName.toUpperCase()}: ${text.substring(0, 40)}${text.length > 40 ? '...' : ''}`,
                default: text,
                info: 'Main section heading'
            });

            $(el).text(`{{ section.settings.${settingId} }}`);
        }
    });

    $('p').each((i, el) => {
        const text = $(el).text().trim() || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide').length > 0;

        if (text && text.length > 10 && !text.includes('{{') && !isInsideBlock) {
            const settingId = `section_text_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'richtext',
                id: settingId,
                label: `Section Text: ${text.substring(0, 40)}${text.length > 40 ? '...' : ''}`,
                default: formatAsRichtext(text),
                info: 'Section description with rich formatting'
            });

            $(el).html(`{{ section.settings.${settingId} }}`);
        }
    });

    $('a, button, .btn, .button').each((i, el) => {
        const text = $(el).text().trim() || '';
        const href = $(el).attr('href') || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide').length > 0;

        if (text && !text.includes('{{') && !isInsideBlock) {
            const textSettingId = `section_button_text_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'text',
                id: textSettingId,
                label: `Button: ${text}`,
                default: text
            });

            if (href && href !== '#') {
                const urlSettingId = `section_button_url_${settingCounter++}`;
                sectionGroups.content.settings.push({
                    type: 'url',
                    id: urlSettingId,
                    label: `Button URL: ${text}`,
                    default: href,
                    info: 'Button destination URL'
                });
                $(el).attr('href', `{{ section.settings.${urlSettingId} }}`);
            }

            $(el).text(`{{ section.settings.${textSettingId} }}`);
        }
    });

    let imageCounter = 1;
    $('img').each((i, el) => {
        const src = $(el).attr('src') || '';
        const alt = $(el).attr('alt') || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide').length > 0;

        if (src && !src.includes('{{') && !isInsideBlock) {
            const imgSettingId = `section_image_${imageCounter}`;

            sectionGroups.content.settings.push({
                type: 'image_picker',
                id: imgSettingId,
                label: `Section Image ${imageCounter}`,
                info: 'Upload section image'
            });

            if (alt) {
                const altSettingId = `section_image_alt_${imageCounter + 1}`;
                sectionGroups.content.settings.push({
                    type: 'text',
                    id: altSettingId,
                    label: `Image Alt Text ${imageCounter}`,
                    default: alt,
                    info: 'Alternative text for accessibility'
                });
                $(el).attr('alt', `{{ section.settings.${altSettingId} }}`);
            }

            $(el).attr('src', `{{ section.settings.${imgSettingId} | img_url: 'master' }}`);
            imageCounter++;
        }
    });


    sectionGroups.styling.settings.push(
        {
            type: 'checkbox',
            id: 'use_custom_background',
            label: 'Override Background Color',
            default: false,
            info: 'Enable to override original background color'
        },
        {
            type: 'color',
            id: 'background_color',
            label: 'Background Color',
            default: '#ffffff',
            info: 'Section background color (only applied if override is enabled)'
        },
        {
            type: 'checkbox',
            id: 'use_custom_text_color',
            label: 'Override Text Color',
            default: false,
            info: 'Enable to override original text color'
        },
        {
            type: 'color',
            id: 'text_color',
            label: 'Text Color',
            default: '#000000',
            info: 'Main text color (only applied if override is enabled)'
        }
    );

    const allSettings = [
        ...sectionGroups.content.settings,
        ...sectionGroups.layout.settings,
        ...sectionGroups.styling.settings
    ];

    const liquidBody = $('body').html() || $(':root').html() || '';

    return {
        settings: allSettings,
        blocks,
        liquidBody: formatProfessionalLiquid(liquidBody),
        jsonBlocks,
        jsonBlockOrder,
        sectionGroups,
        extractedJS: extractedJS || ''
    };
}

/**
 * Formats block HTML with proper indentation and Liquid variable replacement
 */
function formatBlockHtml(html) {
    if (!html) return '';

    return html
        .replace(/LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER/g, '{{ block.settings.image | img_url: \'master\' }}')
        .replace(/LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER/g, '{{ block.settings.image_alt }}')
        .replace(/>\s*</g, '>\n<')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => '      ' + line)
        .join('\n');
}

/**
 * Professional Liquid HTML formatting with exact preservation and proper replacements
 */
function formatProfessionalLiquid(html) {
    if (!html) return '';

    return html
        .replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, liquid) => {
            const decoded = liquid
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .trim();
            return `{{ ${decoded} }}`;
        })
        .replace(/\{\%-?\s*([^%]+?)\s*-?\%\}/g, (match, liquid) => {
            const decoded = liquid
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .trim();
            return match.includes('-') ? `{%- ${decoded} -%}` : `{% ${decoded} %}`;
        })
        .replace(/LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER/g, '{{ block.settings.image | img_url: \'master\' }}')
        .replace(/LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER/g, '{{ block.settings.image_alt }}')
        .replace(/>\s*</g, '>\n<')
        .replace(/\{\%-?\s*comment\s*-?\%\}/g, '\n{%- comment -%}')
        .replace(/\{\%-?\s*endcomment\s*-?\%\}/g, '{%- endcomment -%}\n')
        .replace(/\{\%\s*for\s/g, '\n{% for ')
        .replace(/\{\%\s*case\s/g, '\n  {% case ')
        .replace(/\{\%\s*when\s/g, '\n    {% when ')
        .replace(/\{\%\s*endcase\s*\%\}/g, '\n  {% endcase %}')
        .replace(/\{\%\s*endfor\s*\%\}/g, '\n{% endfor %}')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
}

/**
 * Generates professional Shopify Liquid template following client requirements
 */
export function generateLiquidTemplate(html, fileName) {
    if (!html || typeof html !== 'string') {
        throw new Error('Invalid HTML input: HTML must be a non-empty string');
    }

    if (!fileName || typeof fileName !== 'string') {
        throw new Error('Invalid fileName input: fileName must be a non-empty string');
    }

    const normalizedFileName = fileName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    const headContent = extractHeadContent(html);
    const css = extractCSS(html);
    const { settings, blocks, liquidBody, jsonBlocks, jsonBlockOrder, extractedJS } = convertHtmlToLiquid(html, fileName);
    const js = extractedJS;

    const schema = {
        name: fileName.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        tag: 'section',
        class: normalizedFileName,
        blocks: blocks,
        settings: settings,
        presets: [
            {
                name: 'Default',
                settings: settings.reduce((acc, setting) => {
                    if (setting.default !== undefined) {
                        acc[setting.id] = setting.default;
                    }
                    return acc;
                }, {}),
                blocks: Object.keys(jsonBlocks).map(blockId => ({
                    type: jsonBlocks[blockId].type,
                    settings: jsonBlocks[blockId].settings
                }))
            }
        ],
        enabled_on: {
            templates: ['*']
        }
    };

    const liquidTemplate = `{%- comment -%}
  Section: ${fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
  
  Shopify Section Settings:
  • ${settings.length} section settings
  • ${blocks.length} block types
  • Fully responsive design
  • Theme editor compatible
  • Professional conversion by HTML-to-Liquid Converter
{%- endcomment -%}

{%- comment -%} Section Variables {%- endcomment -%}
{%- liquid
  assign section_id = section.id
  assign use_custom_bg = section.settings.use_custom_background | default: false
  assign custom_bg_color = section.settings.background_color | default: '#ffffff'
  assign use_custom_text = section.settings.use_custom_text_color | default: false
  assign custom_text_color = section.settings.text_color | default: '#000000'
-%}

{%- comment -%} Section Content - Preserving Original HTML Structure {%- endcomment -%}
<div 
  id="{{ section_id }}" 
  class="${normalizedFileName}-section"
  {% if use_custom_bg %}style="background-color: {{ custom_bg_color }};"{% endif %}
>
  <div class="${normalizedFileName}-content"{% if use_custom_text %} style="color: {{ custom_text_color }};"{% endif %}>
${liquidBody}
  </div>
</div>

{%- comment -%} Section Schema {%- endcomment -%}
{% schema %}
${JSON.stringify(schema, null, 2)}
{% endschema %}

{%- comment -%} Section Styles {%- endcomment -%}
{% stylesheet %}
/* ORIGINAL HTML STYLES - PRESERVED EXACTLY */
${css}

/* Minimal section wrapper - no interference with original layout */
.${normalizedFileName}-section {
  /* Transparent wrapper - preserves all original styling */
}

.${normalizedFileName}-content {
  /* No additional styling - maintain original HTML layout exactly */
}
{% endstylesheet %}

{%- comment -%} Section Scripts {%- endcomment -%}
{% javascript %}
// Original JavaScript from HTML
${js}

// Shopify-compatible initialization
document.addEventListener('DOMContentLoaded', function() {
  // Re-run any initialization that might be needed for Shopify
  const section = document.getElementById('{{ section.id }}');
  if (section) {
    // Trigger any custom events that might have been set up
    if (typeof window.initCustomScripts === 'function') {
      window.initCustomScripts(section);
    }
  }
});

// Theme editor support - reinitialize when section is reloaded
document.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId === '{{ section.id }}') {
    // Re-run initialization for this section
    const section = document.getElementById('{{ section.id }}');
    if (section && typeof window.initCustomScripts === 'function') {
      window.initCustomScripts(section);
    }
  }
});
{% endjavascript %}`;

    const pageTemplate = {
        sections: {
            main: {
                type: normalizedFileName,
                blocks: jsonBlocks,
                block_order: jsonBlockOrder,
                settings: settings.reduce((acc, setting) => {
                    if (setting.default !== undefined) {
                        acc[setting.id] = setting.default;
                    }
                    return acc;
                }, {})
            }
        },
        order: ['main']
    };

    return {
        liquidContent: liquidTemplate,
        jsonTemplate: JSON.stringify(pageTemplate, null, 2),
        pageTemplate: `page.${normalizedFileName}.json`,
        headContent: headContent.join('\n'),
        schema: schema,
        css: css,
        javascript: js,
        sectionFileName: `${normalizedFileName}.liquid`,
        isStandalonePage: true
    };
}

/**
 * Processes multiple HTML files and combines head content
 */
export function processMultipleFiles(files) {
    const results = [];
    const allHeadContent = new Set();

    files.forEach((file, index) => {
        const result = generateLiquidTemplate(file.content, file.name);
        results.push({
            ...result,
            originalName: file.name,
            index: index
        });

        if (result.headContent) {
            result.headContent.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed) {
                    allHeadContent.add(trimmed);
                }
            });
        }
    });

    const combinedHead = Array.from(allHeadContent).join('\n');

    return {
        files: results,
        combinedHeadContent: combinedHead
    };
}

/**
 * Formats text as valid Shopify richtext HTML - EXACT preservation
 * Maintains original formatting without unnecessary paragraph wrapping
 */
function formatAsRichtext(text) {
    if (!text || typeof text !== 'string') return '<p></p>';

    if (text.trim().startsWith('<') && (
        text.includes('<p>') ||
        text.includes('<h1>') || text.includes('<h2>') || text.includes('<h3>') ||
        text.includes('<h4>') || text.includes('<h5>') || text.includes('<h6>') ||
        text.includes('<ul>') || text.includes('<ol>') ||
        text.includes('<div>') || text.includes('<span>')
    )) {
        return text.trim();
    }

    const cleanText = text.trim();
    if (cleanText.length === 0) return '<p></p>';

    if (cleanText.includes('\n')) {
        const paragraphs = cleanText.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        if (paragraphs.length > 1) {
            return paragraphs.map(para => {
                const lines = para.trim().split('\n').filter(line => line.trim().length > 0);
                if (lines.length === 1) {
                    return `<p>${lines[0].trim()}</p>`;
                } else {
                    return `<p>${lines.join('<br>')}</p>`;
                }
            }).join('');
        } else {
            const lines = cleanText.split('\n').filter(line => line.trim().length > 0);
            if (lines.length > 1) {
                return `<p>${lines.join('<br>')}</p>`;
            }
        }
    }

    return `<p>${cleanText}</p>`;
}
