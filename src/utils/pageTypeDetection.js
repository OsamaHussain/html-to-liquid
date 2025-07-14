/**
 * Page Type Detection for Shopify Templates
 * Detects whether HTML should generate collection, product, blog, or page templates
 */

import * as cheerio from 'cheerio';

/**
 * Detects the page type based on HTML content and filename
 * @param {string} html - HTML content
 * @param {string} fileName - File name
 * @returns {object} - Page type information
 */
export function detectPageType(html, fileName) {
    if (!html || typeof html !== 'string') {
        return { type: 'page', template: 'page', hasLoop: false };
    }

    const $ = cheerio.load(html);
    const normalizedFileName = fileName.toLowerCase();

    if (normalizedFileName.includes('shop') ||
        normalizedFileName.includes('collection') ||
        normalizedFileName.includes('products') ||
        normalizedFileName.includes('catalog')) {
        return analyzeCollectionPage($, fileName);
    }

    if (normalizedFileName.includes('product') ||
        normalizedFileName.includes('item')) {
        return analyzeProductPage($, fileName);
    }

    if (normalizedFileName.includes('blog') ||
        normalizedFileName.includes('news') ||
        normalizedFileName.includes('articles')) {
        return analyzeBlogPage($, fileName);
    }

    const productCards = detectProductCards($);
    const blogPosts = detectBlogPosts($);
    const singleProduct = detectSingleProduct($);

    if (productCards.count >= 3) {
        return {
            type: 'collection',
            template: 'collection',
            hasLoop: true,
            loopType: 'products',
            productCards: productCards,
            reason: `Detected ${productCards.count} product cards - generating collection template`
        };
    }

    if (singleProduct.isProduct) {
        return {
            type: 'product',
            template: 'product',
            hasLoop: false,
            productData: singleProduct,
            reason: 'Detected single product page - generating product template'
        };
    }

    if (blogPosts.count >= 2) {
        return {
            type: 'blog',
            template: 'blog',
            hasLoop: true,
            loopType: 'articles',
            blogPosts: blogPosts,
            reason: `Detected ${blogPosts.count} blog posts - generating blog template`
        };
    }

    return {
        type: 'page',
        template: 'page',
        hasLoop: false,
        reason: 'Default page template - no specific patterns detected'
    };
}

/**
 * Analyzes collection page patterns
 */
function analyzeCollectionPage($, fileName) {
    const productCards = detectProductCards($);

    return {
        type: 'collection',
        template: 'collection',
        hasLoop: true,
        loopType: 'products',
        productCards: productCards,
        reason: `Collection page detected from filename "${fileName}" with ${productCards.count} product cards`
    };
}

/**
 * Analyzes product page patterns
 */
function analyzeProductPage($, fileName) {
    const singleProduct = detectSingleProduct($);

    return {
        type: 'product',
        template: 'product',
        hasLoop: false,
        productData: singleProduct,
        reason: `Product page detected from filename "${fileName}"`
    };
}

/**
 * Analyzes blog page patterns
 */
function analyzeBlogPage($, fileName) {
    const blogPosts = detectBlogPosts($);

    return {
        type: 'blog',
        template: 'blog',
        hasLoop: true,
        loopType: 'articles',
        blogPosts: blogPosts,
        reason: `Blog page detected from filename "${fileName}" with ${blogPosts.count} blog posts`
    };
}

/**
 * Detects product cards in HTML
 */
function detectProductCards($) {
    const productCards = $('div, article, section').filter((i, el) => {
        const $el = $(el);
        const text = $el.text() || '';
        const hasImage = $el.find('img').length > 0;
        const hasPrice = text.includes('$') || $el.find('[class*="price"], .price, [data-price]').length > 0;
        const hasTitle = $el.find('h1, h2, h3, h4, h5, h6').length > 0;
        const hasButton = $el.find('a, button, .btn, [class*="button"]').length > 0;

        const hasProductClass = $el.attr('class') && (
            $el.attr('class').includes('product') ||
            $el.attr('class').includes('item') ||
            $el.attr('class').includes('card')
        );

        const score = [hasImage, hasPrice, hasTitle, hasButton, hasProductClass].filter(Boolean).length;

        return score >= 3;
    });

    return {
        count: productCards.length,
        elements: productCards,
        hasVariants: $('[data-variant], .variant, [class*="variant"]').length > 0,
        hasRatings: $('[class*="star"], [class*="rating"], .rating').length > 0
    };
}

/**
 * Detects single product page patterns
 */
function detectSingleProduct($) {
    const hasProductGallery = $('.product-gallery, .product-images, [class*="product-image"]').length > 0;
    const hasProductInfo = $('.product-info, .product-details, [class*="product-detail"]').length > 0;
    const hasAddToCart = $('[class*="add-to-cart"], .add-to-cart, button[type="submit"]').length > 0;
    const hasProductPrice = $('.product-price, [class*="product-price"], [data-price]').length > 0;
    const hasProductTitle = $('h1, .product-title, [class*="product-title"]').length > 0;

    const score = [hasProductGallery, hasProductInfo, hasAddToCart, hasProductPrice, hasProductTitle].filter(Boolean).length;

    return {
        isProduct: score >= 3,
        hasGallery: hasProductGallery,
        hasAddToCart: hasAddToCart,
        hasVariants: $('[data-variant], .variant-selector, [class*="variant"]').length > 0,
        hasReviews: $('[class*="review"], .reviews, [class*="testimonial"]').length > 0
    };
}

/**
 * Detects blog post patterns
 */
function detectBlogPosts($) {
    const blogPosts = $('article, .post, .blog-post, [class*="post"], [class*="article"]').filter((i, el) => {
        const $el = $(el);
        const hasTitle = $el.find('h1, h2, h3, h4, h5, h6').length > 0;
        const hasContent = $el.find('p').length > 0;
        const hasDate = $el.find('.date, [class*="date"], time').length > 0 ||
            $el.text().match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}/);
        const hasReadMore = $el.find('a, .read-more, [class*="read"]').length > 0;

        const score = [hasTitle, hasContent, hasDate, hasReadMore].filter(Boolean).length;
        return score >= 2;
    });

    return {
        count: blogPosts.length,
        elements: blogPosts,
        hasAuthors: $('.author, [class*="author"], .by-line').length > 0,
        hasCategories: $('.category, [class*="category"], .tag').length > 0
    };
}

/**
 * Generates template structure based on page type
 */
export function generateTemplateStructure(pageType, fileName) {
    const normalizedFileName = fileName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    switch (pageType.type) {
        case 'collection':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/collection.${normalizedFileName}.json`,
                templateType: 'collection',
                requiresLoop: true,
                loopVariable: 'collection.products'
            };

        case 'product':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/product.${normalizedFileName}.json`,
                templateType: 'product',
                requiresLoop: false,
                productData: true
            };

        case 'blog':
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/blog.${normalizedFileName}.json`,
                templateType: 'blog',
                requiresLoop: true,
                loopVariable: 'blog.articles'
            };

        default:
            return {
                liquid: `sections/${normalizedFileName}.liquid`,
                json: `templates/page.${normalizedFileName}.json`,
                templateType: 'page',
                requiresLoop: false
            };
    }
}
