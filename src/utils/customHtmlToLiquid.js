/**
 * Custom HTML to Liquid Converter
 * Professional Shopify-ready conversion following exact client requirements
 */

import * as cheerio from 'cheerio';

/**
 * Validates and sanitizes setting defaults to ensure Shopify compatibility
 */
function validateSettingDefault(value, type, fallback = '') {
    if (value === null || value === undefined || value === '') {
        return type === 'url' ? '/' : (typeof fallback === 'string' ? fallback : '');
    }

    switch (type) {
        case 'text':
        case 'textarea':
        case 'richtext':
            return typeof value === 'string' ? value : (typeof fallback === 'string' ? fallback : '');
        case 'url':
            if (typeof value === 'string' && value.trim() !== '' && value !== '#') {
                return value;
            }
            return '/';
        case 'number':
        case 'range':
            return typeof value === 'number' ? value : (typeof fallback === 'number' ? fallback : 0);
        case 'checkbox':
            return typeof value === 'boolean' ? value : false;
        case 'color':
            return (typeof value === 'string' && value.startsWith('#')) ? value : '#000000';
        default:
            return value || fallback || '';
    }
}

/**
 * Validates JSON setting values to prevent Liquid template syntax
 */
function validateJsonSettingValue(value, settingDefault, type = 'text') {
    if (typeof value === 'string' && (value.includes('{{') || value.includes('{%'))) {
        return getCleanDefault(settingDefault, type);
    }

    if (value === null || value === undefined || value === '') {
        return getCleanDefault(settingDefault, type);
    }

    return value;
}

/**
 * Gets a clean default value without Liquid syntax
 */
function getCleanDefault(settingDefault, type = 'text') {
    if (typeof settingDefault === 'string' && (settingDefault.includes('{{') || settingDefault.includes('{%'))) {
        switch (type) {
            case 'text':
                return 'Product Title';
            case 'richtext':
                return '<p>Product description</p>';
            case 'url':
                return '/';
            case 'number':
            case 'range':
                return 0;
            case 'checkbox':
                return false;
            default:
                return '';
        }
    }

    return settingDefault;
}

/**
 * Truncates labels to meet Shopify's 70 character limit
 */
function truncateLabel(label, maxLength = 70) {
    if (typeof label !== 'string') return 'Setting';
    if (label.length <= maxLength) return label;

    const truncated = label.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.7) {
        return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
}

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
        { selector: '.team-member, .team, .team-card', name: 'Team Member', type: 'team_member', max: 8 },
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

    const footerColumns = $('footer div').filter((i, el) => {
        const $el = $(el);
        const hasHeading = $el.find('h3, h4, h5, h6').length > 0;
        const hasList = $el.find('ul, ol').length > 0;
        const hasLinks = $el.find('a').length >= 2;
        const hasContent = $el.find('p').length > 0 || hasList || hasLinks;

        const isLayoutContainer = $el.hasClass('grid') && $el.children('div').length > 2;
        const isMainContainer = $el.hasClass('max-w') && $el.hasClass('mx-auto');
        const isWrapperContainer = $el.hasClass('px-4') && $el.children('div').length > 0;

        const isNotMainContainer = !isLayoutContainer && !isMainContainer && !isWrapperContainer;

        return hasHeading && hasContent && isNotMainContainer;
    });

    if (footerColumns.length >= 1) {
        contentBlocks.push({
            elements: footerColumns,
            selector: 'footer-column-detected',
            name: 'Footer Column',
            type: 'footer_column',
            max: 8
        });
    }

    const socialLinks = $('footer a').filter((i, el) => {
        const $el = $(el);
        const hasIcon = $el.find('i[class*="fa-"], .icon').length > 0;
        const linkClass = $el.attr('class') || '';
        const hasHoverClass = linkClass.includes('hover') || linkClass.includes('transition');
        const isInColumn = $el.closest('div').find('h3, h4, h5').length > 0;

        return hasIcon && (hasHoverClass || $el.parent().find('a').length >= 3) && !isInColumn;
    });

    if (socialLinks.length >= 2) {
        contentBlocks.push({
            elements: socialLinks,
            selector: 'social-link-detected',
            name: 'Social Link',
            type: 'social_link',
            max: 10
        });
    }

    const headerElements = $('header, nav, .navbar').filter((i, el) => {
        const $el = $(el);
        const hasLogo = $el.find('img').length > 0;
        const hasNavLinks = $el.find('a').filter((j, link) => {
            const $link = $(link);
            return $link.text().trim() && !$link.find('img').length;
        }).length >= 1;

        return hasLogo || hasNavLinks;
    });

    if (headerElements.length >= 1) {
        contentBlocks.push({
            elements: headerElements,
            selector: 'header-detected',
            name: 'Header',
            type: 'header',
            max: 1
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

        const allowSingleElement = ['header', 'footer_column'].includes(pattern.type);
        const minimumElements = allowSingleElement ? 1 : 2;

        if (elements.length >= minimumElements) {
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

                let data = {
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

                if (pattern.type === 'footer_column') {
                    const listItems = $el.find('ul li a, ol li a');
                    data.links = [];
                    listItems.each((i, link) => {
                        const $link = $(link);
                        data.links.push({
                            text: $link.text().trim(),
                            url: $link.attr('href') || '#'
                        });
                    });

                    const socialLinksInColumn = $el.find('a').filter((i, link) => {
                        const $link = $(link);
                        return $link.find('i[class*="fa-"]').length > 0;
                    });

                    data.socialLinks = [];
                    socialLinksInColumn.each((i, link) => {
                        const $link = $(link);
                        data.socialLinks.push({
                            url: $link.attr('href') || '#',
                            icon: $link.find('i').attr('class') || '',
                            text: $link.attr('title') || $link.attr('aria-label') || ''
                        });
                    });
                } else if (pattern.type === 'social_link') {
                    data.url = $el.attr('href') || '#';
                    data.text = $el.text().trim() || $el.attr('title') || $el.attr('aria-label') || '';
                    data.icon = $el.find('i').attr('class') || '';
                } else if (pattern.type === 'team_member') {
                    data.name = headingEl.length ? headingEl.text().trim() : '';

                    const positionEl = $el.find('p').first();
                    data.position = positionEl.length ? positionEl.text().trim() : '';

                    const descPara = $el.find('p').eq(1);
                    if (descPara.length && descPara.text().trim().length > 50) {
                        data.description = descPara.html();
                    } else if (descriptionEl.length && descriptionEl.text().trim().length > 50) {
                        data.description = descriptionEl.html();
                    }

                    data.socialLinks = [];
                    $el.find('a').each((i, link) => {
                        const $link = $(link);
                        const href = $link.attr('href') || '';
                        const icon = $link.find('i').attr('class') || '';

                        if (href !== '#' && href.trim() !== '') {
                            data.socialLinks.push({
                                url: href,
                                icon: icon,
                                text: $link.attr('title') || $link.attr('aria-label') || ''
                            });
                        }
                    });
                }

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

            if (pattern.type !== 'footer_column') {
                if (firstData.heading) {
                    blockSettings.push({
                        type: 'text',
                        id: 'heading',
                        label: truncateLabel(`${pattern.name} Heading`),
                        default: validateSettingDefault(firstData.heading, 'text', `${pattern.name} Title`),
                        info: 'Main heading for this item'
                    });
                }

                if (firstData.subheading) {
                    blockSettings.push({
                        type: 'text',
                        id: 'subheading',
                        label: truncateLabel(`${pattern.name} Subheading`),
                        default: validateSettingDefault(firstData.subheading, 'text', `${pattern.name} Subtitle`)
                    });
                }

                if (firstData.description && firstData.description.length > 3) {
                    blockSettings.push({
                        type: 'richtext',
                        id: 'description',
                        label: truncateLabel(`${pattern.name} Description`),
                        default: validateSettingDefault(formatAsRichtext(firstData.richtext || firstData.description), 'richtext', `<p>${pattern.name} description</p>`),
                        info: 'Rich text editor for formatting'
                    });
                }

                if (pattern.type === 'sustainability_slide') {
                    blockSettings.push({
                        type: 'image_picker',
                        id: 'background_image',
                        label: 'Slide Background Image',
                        info: 'Upload background image for this slide'
                    });
                } else if (pattern.type === 'transformation') {
                    blockSettings.push({
                        type: 'image_picker',
                        id: 'before_image',
                        label: 'Before Image',
                        info: 'Upload the before transformation image'
                    });

                    blockSettings.push({
                        type: 'text',
                        id: 'before_image_alt',
                        label: 'Before Image Alt Text',
                        default: 'Before transformation',
                        info: 'Alt text for before image'
                    });

                    blockSettings.push({
                        type: 'image_picker',
                        id: 'after_image',
                        label: 'After Image',
                        info: 'Upload the after transformation image'
                    });

                    blockSettings.push({
                        type: 'text',
                        id: 'after_image_alt',
                        label: 'After Image Alt Text',
                        default: 'After transformation',
                        info: 'Alt text for after image'
                    });
                } else if (firstData.imageSrc) {
                    blockSettings.push({
                        type: 'image_picker',
                        id: 'image',
                        label: truncateLabel(`${pattern.name} Image`),
                        info: 'Upload image for this item'
                    });

                    if (firstData.imageAlt) {
                        blockSettings.push({
                            type: 'text',
                            id: 'image_alt',
                            label: truncateLabel(`${pattern.name} Image Alt Text`),
                            default: validateSettingDefault(firstData.imageAlt, 'text', 'Image'),
                            info: 'Alternative text for accessibility'
                        });
                    }
                }

                if (firstData.icon) {
                    blockSettings.push({
                        type: 'text',
                        id: 'icon',
                        label: truncateLabel(`${pattern.name} Icon`),
                        default: validateSettingDefault(firstData.icon, 'text', 'fas fa-star'),
                        info: 'Icon class (e.g., fa-home, fa-star)'
                    });
                }

                if (firstData.buttonText) {
                    blockSettings.push({
                        type: 'text',
                        id: 'button_text',
                        label: truncateLabel(`${pattern.name} Button Text`),
                        default: validateSettingDefault(firstData.buttonText, 'text', 'View Details')
                    });

                    blockSettings.push({
                        type: 'url',
                        id: 'button_url',
                        label: truncateLabel(`${pattern.name} Button URL`),
                        default: validateSettingDefault(firstData.buttonUrl, 'url', '/'),
                        info: 'Link destination'
                    });
                }

                if (firstData.price) {
                    blockSettings.push({
                        type: 'text',
                        id: 'price',
                        label: truncateLabel(`${pattern.name} Price`),
                        default: validateSettingDefault(firstData.price, 'text', '$0.00')
                    });
                }

                if (firstData.rating) {
                    blockSettings.push({
                        type: 'range',
                        id: 'rating',
                        label: truncateLabel(`${pattern.name} Rating`),
                        min: 1,
                        max: 5,
                        step: 0.1,
                        default: 5,
                        unit: '★'
                    });
                }

                if (pattern.type === 'product_card') {
                    blockSettings.push({
                        type: 'text',
                        id: 'rating_count',
                        label: 'Rating Count',
                        default: '(128)',
                        info: 'Number of reviews (e.g., (128))'
                    });
                }
            }

            if (pattern.type === 'footer_column') {
                const anyColumnHasLinks = originalData.some(data => data.links && data.links.length > 0);
                const anyColumnHasSocialLinks = originalData.some(data => data.socialLinks && data.socialLinks.length > 0);

                blockSettings.push({
                    type: 'text',
                    id: 'column_title',
                    label: 'Column Title',
                    default: validateSettingDefault(firstData.heading, 'text', 'Column Title'),
                    info: 'Footer column heading'
                });

                if (firstData.description && firstData.description !== '<p></p>') {
                    blockSettings.push({
                        type: 'richtext',
                        id: 'column_description',
                        label: 'Column Description',
                        default: formatAsRichtext(firstData.description),
                        info: 'Footer column description text'
                    });
                }

                if (anyColumnHasLinks) {
                    for (let i = 1; i <= 6; i++) {
                        blockSettings.push({
                            type: 'text',
                            id: `link_${i}_text`,
                            label: `Link ${i} Text`,
                            default: `Link ${i}`,
                            info: `Text for footer link ${i}`
                        });

                        blockSettings.push({
                            type: 'url',
                            id: `link_${i}_url`,
                            label: `Link ${i} URL`,
                            default: "/",
                            info: `URL for footer link ${i}`
                        });
                    }
                }

                if (anyColumnHasSocialLinks) {
                    const socialPlatforms = ['facebook', 'instagram', 'twitter', 'youtube', 'pinterest'];

                    socialPlatforms.forEach((platform, index) => {
                        blockSettings.push({
                            type: 'url',
                            id: `social_${platform}_url`,
                            label: truncateLabel(`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`),
                            default: "/",
                            info: `${platform} profile URL`
                        });
                    });
                }
            } else if (pattern.type === 'header') {
                const headerData = originalData[0];
                const headerElement = $(elements[0]);

                const logoImg = headerElement.find('img').first();
                if (logoImg.length) {
                    blockSettings.push({
                        type: 'image_picker',
                        id: 'logo_image',
                        label: 'Header Logo',
                        info: 'Upload header logo image'
                    });

                    if (logoImg.attr('alt')) {
                        blockSettings.push({
                            type: 'text',
                            id: 'logo_alt',
                            label: 'Logo Alt Text',
                            default: validateSettingDefault(logoImg.attr('alt'), 'text', 'Logo'),
                            info: 'Alt text for logo'
                        });
                    }
                }

                const navLinks = [];

                const allNavLinks = new Set();

                headerElement.find('a').each((i, link) => {
                    const $link = $(link);
                    const text = $link.text().trim();
                    const href = $link.attr('href') || '';
                    const isLogo = $link.find('img').length > 0;
                    const isIcon = $link.find('i').length > 0 && !text;

                    if (text && !isLogo && !isIcon) {
                        const linkKey = `${text}:${href}`;
                        if (!allNavLinks.has(linkKey) && navLinks.length < 8) {
                            allNavLinks.add(linkKey);
                            navLinks.push({
                                text: text,
                                href: href
                            });
                        }
                    }
                });

                const minNavLinks = Math.max(navLinks.length, 3);

                for (let i = 0; i < minNavLinks; i++) {
                    const link = navLinks[i];
                    blockSettings.push({
                        type: 'text',
                        id: `nav_link_${i + 1}_text`,
                        label: link ? truncateLabel(`Navigation Link: ${link.text}`) : `Navigation Link ${i + 1}`,
                        default: validateSettingDefault(link ? link.text : `Link ${i + 1}`, 'text', `Link ${i + 1}`),
                        info: `Navigation link ${i + 1} text`
                    });

                    blockSettings.push({
                        type: 'url',
                        id: `nav_link_${i + 1}_url`,
                        label: link ? truncateLabel(`Navigation URL: ${link.text}`) : `Navigation URL ${i + 1}`,
                        default: validateSettingDefault(link ? link.href : '/', 'url', '/'),
                        info: `Navigation link ${i + 1} URL`
                    });
                }
            } else if (pattern.type === 'social_link') {
                if (firstData.url) {
                    blockSettings.push({
                        type: 'url',
                        id: 'url',
                        label: truncateLabel(`${pattern.name} URL`),
                        default: validateSettingDefault(firstData.url, 'url', '/'),
                        info: 'Social media profile URL'
                    });
                }
                if (firstData.text) {
                    blockSettings.push({
                        type: 'text',
                        id: 'text',
                        label: truncateLabel(`${pattern.name} Text`),
                        default: validateSettingDefault(firstData.text, 'text', 'Social Link'),
                        info: 'Social link text or title'
                    });
                }
            } else if (pattern.type === 'team_member') {
                blockSettings.push({
                    type: 'image_picker',
                    id: 'member_image',
                    label: 'Team Member Photo',
                    info: 'Upload team member photo'
                });

                if (firstData.name) {
                    blockSettings.push({
                        type: 'text',
                        id: 'member_name',
                        label: 'Team Member Name',
                        default: validateSettingDefault(firstData.name, 'text', 'Team Member'),
                        info: 'Full name of team member'
                    });
                }

                if (firstData.position) {
                    blockSettings.push({
                        type: 'text',
                        id: 'member_position',
                        label: 'Position/Title',
                        default: validateSettingDefault(firstData.position, 'text', 'Team Member'),
                        info: 'Job title or position'
                    });
                }

                if (firstData.description) {
                    blockSettings.push({
                        type: 'richtext',
                        id: 'member_description',
                        label: 'Team Member Bio',
                        default: formatAsRichtext(firstData.description),
                        info: 'Brief description or bio'
                    });
                }

                const socialPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
                socialPlatforms.forEach(platform => {
                    blockSettings.push({
                        type: 'url',
                        id: `${platform}_url`,
                        label: truncateLabel(`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`),
                        default: '/',
                        info: `Team member's ${platform} profile URL`
                    });
                });

                blockSettings.push({
                    type: 'text',
                    id: 'member_image_alt',
                    label: 'Image Alt Text',
                    default: firstData.name ? `Photo of ${firstData.name}` : 'Team Member',
                    info: 'Alt text for team member photo'
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
                        let settingValue;
                        switch (setting.id) {
                            case 'heading':
                                settingValue = data.heading || setting.default;
                                break;
                            case 'column_title':
                                settingValue = data.heading || setting.default;
                                break;
                            case 'column_description':
                                settingValue = formatAsRichtext(data.richtext || data.description) || setting.default;
                                break;
                            case 'subheading':
                                settingValue = data.subheading || setting.default;
                                break;
                            case 'description':
                                settingValue = formatAsRichtext(data.richtext || data.description) || setting.default;
                                break;
                            case 'button_text':
                                settingValue = data.buttonText || setting.default;
                                break;
                            case 'button_url':
                                settingValue = (data.buttonUrl && data.buttonUrl !== '#') ? data.buttonUrl : setting.default;
                                break;
                            case 'image_alt':
                                settingValue = data.imageAlt || setting.default;
                                break;
                            case 'icon':
                                settingValue = data.icon || setting.default;
                                break;
                            case 'price':
                                settingValue = data.price || setting.default;
                                break;
                            case 'rating':
                                settingValue = parseFloat(data.rating) || setting.default;
                                break;
                            case 'url':
                                settingValue = data.url || setting.default;
                                break;
                            case 'text':
                                settingValue = data.text || setting.default;
                                break;
                            case 'member_name':
                                settingValue = data.name || setting.default;
                                break;
                            case 'member_position':
                                settingValue = data.position || setting.default;
                                break;
                            case 'member_description':
                                settingValue = formatAsRichtext(data.description) || setting.default;
                                break;
                            case 'member_image_alt':
                                settingValue = data.imageAlt || (data.name ? `Photo of ${data.name}` : setting.default);
                                break;
                            default:
                                if (setting.id.startsWith('nav_link_') && setting.id.endsWith('_text')) {
                                    const linkIndex = parseInt(setting.id.split('_')[2]) - 1;
                                    if (pattern.type === 'header') {
                                        const headerEl = $(elements[0]);
                                        const navLinks = [];
                                        headerEl.find('a').each((i, link) => {
                                            const $link = $(link);
                                            const text = $link.text().trim();
                                            const isLogo = $link.find('img').length > 0;
                                            if (text && !isLogo) {
                                                navLinks.push({ text: text, href: $link.attr('href') || '/' });
                                            }
                                        });
                                        settingValue = navLinks[linkIndex] ? navLinks[linkIndex].text : setting.default;
                                    } else if (data.links && data.links[linkIndex]) {
                                        settingValue = data.links[linkIndex].text || setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else if (setting.id.startsWith('nav_link_') && setting.id.endsWith('_url')) {
                                    const linkIndex = parseInt(setting.id.split('_')[2]) - 1;
                                    if (pattern.type === 'header') {
                                        const headerEl = $(elements[0]);
                                        const navLinks = [];
                                        headerEl.find('a').each((i, link) => {
                                            const $link = $(link);
                                            const text = $link.text().trim();
                                            const isLogo = $link.find('img').length > 0;
                                            if (text && !isLogo) {
                                                navLinks.push({ text: text, href: $link.attr('href') || '/' });
                                            }
                                        });
                                        settingValue = navLinks[linkIndex] ? (navLinks[linkIndex].href !== '#' ? navLinks[linkIndex].href : '/') : setting.default;
                                    } else if (data.links && data.links[linkIndex]) {
                                        settingValue = data.links[linkIndex].url || setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else if (setting.id.startsWith('link_') && setting.id.endsWith('_text')) {
                                    const linkIndex = parseInt(setting.id.split('_')[1]) - 1;
                                    if (data.links && data.links[linkIndex]) {
                                        settingValue = data.links[linkIndex].text || setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else if (setting.id.startsWith('link_') && setting.id.endsWith('_url')) {
                                    const linkIndex = parseInt(setting.id.split('_')[1]) - 1;
                                    if (data.links && data.links[linkIndex]) {
                                        settingValue = data.links[linkIndex].url || setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else if (setting.id.startsWith('social_') && setting.id.endsWith('_url')) {
                                    const platform = setting.id.replace('social_', '').replace('_url', '');
                                    if (data.socialLinks) {
                                        const socialLink = data.socialLinks.find(link =>
                                            link.icon && (
                                                link.icon.includes(platform) ||
                                                link.text && link.text.toLowerCase().includes(platform)
                                            )
                                        );
                                        settingValue = socialLink ? socialLink.url : setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else if (setting.id.endsWith('_url') && ['linkedin_url', 'twitter_url', 'instagram_url', 'facebook_url'].includes(setting.id)) {
                                    const platform = setting.id.replace('_url', '');
                                    if (data.socialLinks) {
                                        const socialLink = data.socialLinks.find(link =>
                                            link.icon && (
                                                link.icon.includes(platform) ||
                                                link.text && link.text.toLowerCase().includes(platform)
                                            )
                                        );
                                        settingValue = socialLink ? socialLink.url : setting.default;
                                    } else {
                                        settingValue = setting.default;
                                    }
                                } else {
                                    settingValue = setting.default;
                                }
                        }

                        blockData.settings[setting.id] = validateJsonSettingValue(settingValue, setting.default, setting.type);
                    });

                    jsonBlocks[blockId] = blockData;
                    jsonBlockOrder.push(blockId);
                });

                elements.each((index, element) => {
                    const $el = $(element);

                    if (pattern.type === 'footer_column') {
                        $el.find('h1, h2, h3, h4, h5, h6').each((i, heading) => {
                            if ($(heading).text().trim() && i === 0) {
                                $(heading).text('{{ block.settings.column_title }}');
                            }
                        });

                        $el.find('p').each((i, p) => {
                            if ($(p).text().trim() && i === 0) {
                                $(p).html('{{ block.settings.column_description }}');
                            }
                        });

                        $el.find('ul, ol').each((i, list) => {
                            if (i === 0) {
                                $(list).html(`
                                    {% for i in (1..6) %}
                                      {% assign link_text_id = 'link_' | append: i | append: '_text' %}
                                      {% assign link_url_id = 'link_' | append: i | append: '_url' %}
                                      {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
                                        <li><a href="{{ block.settings[link_url_id] }}">{{ block.settings[link_text_id] }}</a></li>
                                      {% endif %}
                                    {% endfor %}
                                `);
                            }
                        });

                        $el.find('div').filter((i, socialDiv) => {
                            return $(socialDiv).find('a i[class*="fa-"]').length > 0;
                        }).each((i, socialDiv) => {
                            if (i === 0) {
                                $(socialDiv).html(`
                                    {% assign social_platforms = 'facebook,instagram,twitter,youtube,pinterest' | split: ',' %}
                                    {% for platform in social_platforms %}
                                      {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
                                      {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                                        <a href="{{ block.settings[social_url_id] }}" class="hover:text-white text-2xl transition" title="{{ platform | capitalize }}">
                                          <i class="fab fa-{{ platform }}"></i>
                                        </a>
                                      {% endif %}
                                    {% endfor %}
                                `);
                            }
                        });
                    } else if (pattern.type === 'social_link') {
                        $el.attr('href', '{{ block.settings.url }}');
                        $el.find('i').attr('class', '{{ block.settings.icon }}');
                        if ($el.text().trim()) {
                            $el.text('{{ block.settings.text }}');
                        }
                    } else if (pattern.type === 'header') {
                        $el.find('img').each((i, img) => {
                            if ($(img).attr('src') && i === 0) {
                                $(img).attr('src', '{{ block.settings.logo_image | img_url: \'master\' }}');
                                if ($(img).attr('alt')) {
                                    $(img).attr('alt', '{{ block.settings.logo_alt }}');
                                }
                            }
                        });

                        let navLinkIndex = 1;
                        $el.find('a').each((i, link) => {
                            const $link = $(link);
                            const text = $link.text().trim();
                            const isLogo = $link.find('img').length > 0;
                            const isMobileMenu = $link.closest('.mobile-menu, #mobile-menu').length > 0;
                            const isIcon = $link.find('i').length > 0 && !text;

                            if (text && !isLogo && !isIcon && navLinkIndex <= 8) {
                                $link.text(`{{ block.settings.nav_link_${navLinkIndex}_text }}`);
                                $link.attr('href', `{{ block.settings.nav_link_${navLinkIndex}_url }}`);

                                if (!isMobileMenu) {
                                    navLinkIndex++;
                                }
                            }
                        });

                        $el.find('.mobile-menu, #mobile-menu').each((i, mobileMenu) => {
                            const $mobileMenu = $(mobileMenu);
                            let mobileMenuHtml = '';

                            for (let i = 1; i <= 8; i++) {
                                mobileMenuHtml += `
                                    {% if block.settings.nav_link_${i}_text != blank and block.settings.nav_link_${i}_url != blank %}
                                        <a href="{{ block.settings.nav_link_${i}_url }}">{{ block.settings.nav_link_${i}_text }}</a>
                                    {% endif %}`;
                            }

                            $mobileMenu.html(mobileMenuHtml.trim());
                        });
                    } else if (pattern.type === 'team_member') {
                        $el.find('img').each((i, img) => {
                            if ($(img).attr('src') && i === 0) {
                                $(img).attr('src', '{{ block.settings.member_image | img_url: \'master\' }}');
                                if ($(img).attr('alt')) {
                                    $(img).attr('alt', '{{ block.settings.member_image_alt }}');
                                }
                            }
                        });

                        $el.find('h3, h4, h5, .name, .member-name, strong').each((i, nameEl) => {
                            if ($(nameEl).text().trim() && i === 0) {
                                $(nameEl).text('{{ block.settings.member_name }}');
                            }
                        });

                        $el.find('p').each((i, p) => {
                            const $p = $(p);
                            const text = $p.text().trim();
                            if (text && i === 0 && text.length < 100) {
                                $p.html('{{ block.settings.member_position }}');
                            } else if (text && i === 1 && text.length > 50) {
                                $p.html('{{ block.settings.member_description }}');
                            }
                        });

                        $el.find('a').each((i, link) => {
                            const $link = $(link);
                            const href = $link.attr('href') || '';
                            const icon = $link.find('i').attr('class') || '';

                            if (href.includes('linkedin') || icon.includes('linkedin')) {
                                $link.attr('href', '{{ block.settings.linkedin_url }}');
                                $link.html('{% if block.settings.linkedin_url != blank and block.settings.linkedin_url != "/" %}<i class="fab fa-linkedin-in"></i>{% endif %}');
                            }
                            else if (href.includes('twitter') || icon.includes('twitter')) {
                                $link.attr('href', '{{ block.settings.twitter_url }}');
                                $link.html('{% if block.settings.twitter_url != blank and block.settings.twitter_url != "/" %}<i class="fab fa-twitter"></i>{% endif %}');
                            }
                            else if (href.includes('instagram') || icon.includes('instagram')) {
                                $link.attr('href', '{{ block.settings.instagram_url }}');
                                $link.html('{% if block.settings.instagram_url != blank and block.settings.instagram_url != "/" %}<i class="fab fa-instagram"></i>{% endif %}');
                            }
                            else if (href.includes('facebook') || icon.includes('facebook')) {
                                $link.attr('href', '{{ block.settings.facebook_url }}');
                                $link.html('{% if block.settings.facebook_url != blank and block.settings.facebook_url != "/" %}<i class="fab fa-facebook"></i>{% endif %}');
                            }
                        });
                    } else {
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
                    }

                    if (pattern.type === 'transformation') {
                        $el.find('.before-image, .before img').each((i, img) => {
                            if ($(img).attr('src') && i === 0) {
                                $(img).attr('src', '{{ block.settings.before_image | img_url: \'master\' }}');
                                if ($(img).attr('alt')) {
                                    $(img).attr('alt', '{{ block.settings.before_image_alt }}');
                                }
                            }
                        });

                        $el.find('.after-image, .after img').each((i, img) => {
                            if ($(img).attr('src') && i === 0) {
                                $(img).attr('src', '{{ block.settings.after_image | img_url: \'master\' }}');
                                if ($(img).attr('alt')) {
                                    $(img).attr('alt', '{{ block.settings.after_image_alt }}');
                                }
                            }
                        });

                        const allImages = $el.find('img');
                        if (allImages.length >= 2 &&
                            $el.find('.before-image, .after-image, .before, .after').length === 0) {
                            $(allImages[0]).attr('src', '{{ block.settings.before_image | img_url: \'master\' }}');
                            $(allImages[0]).attr('alt', '{{ block.settings.before_image_alt }}');
                            $(allImages[1]).attr('src', '{{ block.settings.after_image | img_url: \'master\' }}');
                            $(allImages[1]).attr('alt', '{{ block.settings.after_image_alt }}');
                        }
                    } else {
                        $el.find('img').each((i, img) => {
                            if ($(img).attr('src') && i === 0) {
                                $(img).attr('src', 'LIQUID_BLOCK_IMAGE_SRC_PLACEHOLDER');
                                if ($(img).attr('alt')) {
                                    $(img).attr('alt', 'LIQUID_BLOCK_IMAGE_ALT_PLACEHOLDER');
                                }
                            }
                        });
                    }

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

                    if (pattern.type === 'product_card') {
                        $el.find('span').each((i, span) => {
                            const text = $(span).text().trim();
                            if (text.includes('(') && text.includes(')') && /\d/.test(text)) {
                                $(span).text('{{ block.settings.rating_count }}');
                            }
                        });
                    }
                });

                if (pattern.type === 'footer_column') {
                    const footerContainer = $(elements[0]).closest('footer, .footer');

                    if (footerContainer.length > 0) {
                        const gridContainer = $(elements[0]).parent();

                        const footerWrapper = `
{%- comment -%} Footer Column Blocks {%- endcomment -%}
{% for block in section.blocks %}
  {% case block.type %}
    {% when 'footer_column' %}
      <div>
        {% if block.settings.column_title != blank %}
          <h3 class="text-2xl font-semibold mb-4">{{ block.settings.column_title }}</h3>
        {% endif %}
        {% if block.settings.column_description != blank %}
          {{ block.settings.column_description }}
        {% endif %}
        
        {%- comment -%} Individual Link Settings {%- endcomment -%}
        {% assign has_links = false %}
        {% for i in (1..6) %}
          {% assign link_text_id = 'link_' | append: i | append: '_text' %}
          {% assign link_url_id = 'link_' | append: i | append: '_url' %}
          {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
            {% assign has_links = true %}
            {% break %}
          {% endif %}
        {% endfor %}
        
        {% if has_links %}
          <ul class="space-y-1">
            {% for i in (1..6) %}
              {% assign link_text_id = 'link_' | append: i | append: '_text' %}
              {% assign link_url_id = 'link_' | append: i | append: '_url' %}
              {% if block.settings[link_text_id] != blank and block.settings[link_url_id] != blank and block.settings[link_url_id] != "/" %}
                <li><a href="{{ block.settings[link_url_id] }}">{{ block.settings[link_text_id] }}</a></li>
              {% endif %}
            {% endfor %}
          </ul>
        {% endif %}
        
        {%- comment -%} Individual Social Link Settings {%- endcomment -%}
        {% assign has_social = false %}
        {% assign social_platforms = 'facebook,instagram,twitter,youtube,pinterest' | split: ',' %}
        {% for platform in social_platforms %}
          {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
          {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
            {% assign has_social = true %}
            {% break %}
          {% endif %}
        {% endfor %}
        
        {% if has_social %}
          <div class="flex space-x-5 mt-2">
            {% for platform in social_platforms %}
              {% assign social_url_id = 'social_' | append: platform | append: '_url' %}
              {% if block.settings[social_url_id] != blank and block.settings[social_url_id] != "/" %}
                <a href="{{ block.settings[social_url_id] }}" class="hover:text-white text-2xl transition" title="{{ platform | capitalize }}">
                  <i class="fab fa-{{ platform }}"></i>
                </a>
              {% endif %}
            {% endfor %}
          </div>
        {% endif %}
      </div>
    {% endcase %}
{% endfor %}`;

                        gridContainer.html(footerWrapper);
                    } else {
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
                } else {
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
        }
    });

    let settingCounter = 1;

    const sectionGroups = {
        content: { label: 'Content Settings', settings: [] },
        layout: { label: 'Layout & Spacing', settings: [] },
        styling: { label: 'Colors & Styling', settings: [] },
        advanced: { label: 'Advanced Settings', settings: [] }
    };

    const processedHeaderElements = new Set();

    uniqueBlockPatterns.forEach(pattern => {
        if (pattern.type === 'header' && pattern.elements) {
            pattern.elements.each((index, element) => {
                processedHeaderElements.add(element);
            });
        }
    });
    $('header h1, header h2, header h3, nav h1, nav h2, nav h3, .navbar h1, .navbar h2, .navbar h3, .logo-text, .brand-text, .site-title').each((i, el) => {
        const text = $(el).text().trim() || '';

        const isInsideProcessedHeaderBlock = $(el).closest('header, nav, .navbar').get().some(headerEl =>
            processedHeaderElements.has(headerEl)
        );

        if (text && !text.includes('{{') && !isInsideProcessedHeaderBlock) {
            const settingId = `header_title_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'text',
                id: settingId,
                label: `Header Title: ${text.substring(0, 30)}${text.length > 30 ? '...' : ''}`,
                default: text,
                info: 'Header/brand title text'
            });

            $(el).text(`{{ section.settings.${settingId} }}`);
        }
    });

    $('header a, nav a, .navbar a, .nav-link').each((i, el) => {
        const text = $(el).text().trim() || '';
        const href = $(el).attr('href') || '';
        const isLogo = $(el).find('img').length > 0 || $(el).closest('.logo, .brand').length > 0;

        const isInsideProcessedHeaderBlock = $(el).closest('header, nav, .navbar').get().some(headerEl =>
            processedHeaderElements.has(headerEl)
        );

        if (text && !text.includes('{{') && !isLogo && href && href !== '#' && href.trim() !== '' && !isInsideProcessedHeaderBlock) {
            const textSettingId = `nav_link_text_${settingCounter}`;
            const urlSettingId = `nav_link_url_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'text',
                id: textSettingId,
                label: truncateLabel(`Navigation: ${text}`),
                default: validateSettingDefault(text, 'text', 'Navigation'),
                info: 'Navigation link text'
            });

            sectionGroups.content.settings.push({
                type: 'url',
                id: urlSettingId,
                label: truncateLabel(`Navigation URL: ${text}`),
                default: validateSettingDefault(href, 'url', '/'),
                info: 'Navigation link destination'
            });

            $(el).text(`{{ section.settings.${textSettingId} }}`);
            $(el).attr('href', `{{ section.settings.${urlSettingId} }}`);
        }
    });

    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
        const text = $(el).text().trim() || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer').length > 0;
        const isInHeader = $(el).closest('header, nav, .navbar, .logo, .brand').length > 0 ||
            $(el).hasClass('logo-text') || $(el).hasClass('brand-text') || $(el).hasClass('site-title');

        if (text && !text.includes('{{') && !isInsideBlock && !isInHeader) {
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
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer').length > 0;

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
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .team, .team-card, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer').length > 0;
        const isInHeader = $(el).closest('header, nav, .navbar').length > 0 || $(el).hasClass('nav-link');
        const isLogoLink = $(el).find('img').length > 0 || $(el).closest('.logo, .brand').length > 0;

        if (text && !text.includes('{{') && !href.includes('{{') && !isInsideBlock && !isInHeader && !isLogoLink) {
            const textSettingId = `section_button_text_${settingCounter++}`;

            sectionGroups.content.settings.push({
                type: 'text',
                id: textSettingId,
                label: truncateLabel(`Button: ${text}`),
                default: validateSettingDefault(text, 'text', 'Button')
            });

            if (href && href !== '#' && href.trim() !== '') {
                const urlSettingId = `section_button_url_${settingCounter++}`;
                sectionGroups.content.settings.push({
                    type: 'url',
                    id: urlSettingId,
                    label: truncateLabel(`Button URL: ${text}`),
                    default: validateSettingDefault(href, 'url', '/'),
                    info: 'Button destination URL'
                });
                $(el).attr('href', `{{ section.settings.${urlSettingId} }}`);
            }

            $(el).text(`{{ section.settings.${textSettingId} }}`);
        }
    });

    $('[style*="background-image"]').each((i, el) => {
        const $el = $(el);
        const style = $el.attr('style') || '';

        if (style.includes('background-image')) {
            if ($el.hasClass('relative') && $el.find('h1').length > 0) {
                const newStyle = style.replace(/background-image:[^;]+;?/g, '');
                $el.attr('style', newStyle);
                $el.attr('style', ($el.attr('style') || '') + ' background-image: url({{ section.settings.hero_background_image | img_url: \'master\' }});');
            }
            else if ($el.find('h2').text().toLowerCase().includes('elevate') || $el.find('h2').text().toLowerCase().includes('shop')) {
                const newStyle = style.replace(/background-image:[^;]+;?/g, '');
                $el.attr('style', newStyle);
                $el.attr('style', ($el.attr('style') || '') + ' background-image: url({{ section.settings.shop_background_image | img_url: \'master\' }});');
            }
            else if ($el.hasClass('sustainability-slide')) {
                const newStyle = style.replace(/background-image:[^;]+;?/g, '');
                $el.attr('style', newStyle);
                $el.attr('style', ($el.attr('style') || '') + ' background-image: url({{ block.settings.background_image | img_url: \'master\' }});');
            }
        }
    });

    $('nav a, .navbar a').each((i, el) => {
        const $el = $(el);
        const text = $el.text().trim();
        const href = $el.attr('href');
        const isLogo = $el.find('img').length > 0;
        const isInsideHeaderBlock = $el.closest('header, nav, .navbar').parent().find('header, nav, .navbar').length > 0;

        if (!isLogo && text && href && i < 5 && !isInsideHeaderBlock) {
            $el.text(`{{ section.settings.nav_link_${i + 1}_text }}`);
            $el.attr('href', `{{ section.settings.nav_link_${i + 1}_url }}`);
        }
    });

    $('footer p').each((i, el) => {
        const $el = $(el);
        const text = $el.text().trim();
        if (text.includes('©') || text.includes('copyright') || text.includes('rights reserved')) {
            $el.text('{{ section.settings.footer_copyright }}');
        }
    });

    let imageCounter = 1;

    $('header img, nav img, .navbar img, .logo img, .brand img, img[alt*="logo"], img[src*="logo"], .header img').each((i, el) => {
        const src = $(el).attr('src') || '';
        const alt = $(el).attr('alt') || '';

        const isInsideProcessedHeaderBlock = $(el).closest('header, nav, .navbar').get().some(headerEl =>
            processedHeaderElements.has(headerEl)
        );

        if (src && !src.includes('{{') && !isInsideProcessedHeaderBlock) {
            const imgSettingId = `header_logo_${imageCounter}`;

            sectionGroups.content.settings.push({
                type: 'image_picker',
                id: imgSettingId,
                label: `Header Logo ${imageCounter}`,
                info: 'Upload header/logo image'
            });

            if (alt) {
                const altSettingId = `header_logo_alt_${imageCounter}`;
                sectionGroups.content.settings.push({
                    type: 'text',
                    id: altSettingId,
                    label: `Header Logo Alt Text ${imageCounter}`,
                    default: alt,
                    info: 'Alt text for header/logo image'
                });
                $(el).attr('alt', `{{ section.settings.${altSettingId} }}`);
            }

            $(el).attr('src', `{{ section.settings.${imgSettingId} | img_url: 'master' }}`);
            imageCounter++;
        }
    });

    $('img').each((i, el) => {
        const src = $(el).attr('src') || '';
        const alt = $(el).attr('alt') || '';
        const isInsideBlock = $(el).closest('.feature, .card, .product, .product-card, .testimonial, .team-member, .service, .benefit, .step, .faq, .gallery-item, .sustainability-slide, .transformation-slide, .guide, footer').length > 0;
        const isHeaderImage = $(el).closest('header, nav, .navbar, .logo, .brand, .header').length > 0 ||
            $(el).attr('alt') && $(el).attr('alt').toLowerCase().includes('logo') ||
            $(el).attr('src') && $(el).attr('src').toLowerCase().includes('logo');

        if (src && !src.includes('{{') && !isInsideBlock && !isHeaderImage) {
            const imgSettingId = `section_image_${imageCounter}`;

            sectionGroups.content.settings.push({
                type: 'image_picker',
                id: imgSettingId,
                label: `Section Image ${imageCounter}`,
                info: 'Upload section image'
            });

            if (alt) {
                const altSettingId = `section_image_alt_${imageCounter}`;
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


    sectionGroups.content.settings.push({
        type: 'image_picker',
        id: 'hero_background_image',
        label: 'Hero Background Image',
        info: 'Upload hero section background image'
    });

    sectionGroups.content.settings.push({
        type: 'image_picker',
        id: 'shop_background_image',
        label: 'Shop Section Background Image',
        info: 'Upload shop section background image'
    });

    const actualNavLinks = [];
    $('header a, nav a, .navbar a, .nav-link').each((i, el) => {
        const $el = $(el);
        const text = $el.text().trim();
        const href = $el.attr('href') || '';
        const isLogo = $el.find('img').length > 0 || $el.closest('.logo, .brand').length > 0;

        const isInsideProcessedHeaderBlock = $el.closest('header, nav, .navbar').get().some(headerEl =>
            processedHeaderElements.has(headerEl)
        );

        if (text && !text.includes('{{') && !isLogo && href && i < 5 && !isInsideProcessedHeaderBlock) {
            actualNavLinks.push({
                text: text,
                href: href
            });
        }
    });

    actualNavLinks.forEach((link, index) => {
        sectionGroups.content.settings.push({
            type: 'text',
            id: `nav_link_${index + 1}_text`,
            label: `Navigation Link: ${link.text}`,
            default: link.text,
            info: `Navigation link ${index + 1} text`
        });

        sectionGroups.content.settings.push({
            type: 'url',
            id: `nav_link_${index + 1}_url`,
            label: `Navigation URL: ${link.text}`,
            default: link.href !== '#' ? link.href : '/',
            info: `Navigation link ${index + 1} URL`
        });
    });

    sectionGroups.content.settings.push({
        type: 'text',
        id: 'footer_copyright',
        label: 'Footer Copyright Text',
        default: '© 2025 Mäertin. All rights reserved.',
        info: 'Footer copyright text'
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
