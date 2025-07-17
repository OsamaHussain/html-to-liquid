/**
 * Featured Product Replacement System
 * Replaces static HTML products with dynamic Shopify featured products
 */

import * as cheerio from "cheerio";

/**
 * Detects and identifies product elements in HTML
 */
function detectProductElements($) {
  const productElements = [];

  const productSelectors = [
    ".product:not(header .product):not(nav .product)",
    ".product-card:not(header .product-card):not(nav .product-card)",
    ".product-item:not(header .product-item):not(nav .product-item)",
    "section .product",
    "main .product",
    'div[class*="product"]:not(header div[class*="product"]):not(nav div[class*="product"])',
  ];

  productSelectors.forEach((selector) => {
    try {
      $(selector).each((i, el) => {
        const $el = $(el);

        if ($el.hasClass("featured-product-processed")) return;

        if ($el.closest("header, nav, .navbar, .navigation").length > 0) return;

        if (
          $el.hasClass("navbar") ||
          $el.hasClass("navigation") ||
          $el.hasClass("header")
        )
          return;

        const hasImage = $el.find("img").length > 0;
        const hasTitle =
          $el.find(
            'h1, h2, h3, h4, h5, h6, .title, .name, [class*="title"], [class*="name"]'
          ).length > 0;
        const hasPrice =
          $el.find(
            '[class*="price"], .cost, .amount, [class*="cost"], [class*="amount"]'
          ).length > 0 || $el.text().match(/\$\d+|\d+\.\d+|\d+,\d+/);
        const hasButton =
          $el.find(
            'button, .btn, .button, a[class*="btn"], a[class*="buy"], a[class*="shop"]'
          ).length > 0;

        const hasRating =
          $el.find('[class*="star"], .rating, [class*="rating"]').length > 0;
        const hasDescription =
          $el.find('p, .description, [class*="desc"]').length > 0;

        let confidence = 0;
        if (hasImage) confidence += 30;
        if (hasTitle) confidence += 25;
        if (hasPrice) confidence += 25;
        if (hasButton) confidence += 20;
        if (hasRating) confidence += 15;
        if (hasDescription) confidence += 10;

        const text = $el.text().toLowerCase();
        if (
          text.includes("view details") ||
          text.includes("add to cart") ||
          text.includes("buy now")
        )
          confidence += 15;
        if (
          text.includes("sale") ||
          text.includes("discount") ||
          text.includes("off")
        )
          confidence += 10;
        if (
          text.includes("product") ||
          text.includes("treatment") ||
          text.includes("serum")
        )
          confidence += 10;

        if (
          $el
            .closest("section")
            .find("h2, h3")
            .text()
            .toLowerCase()
            .includes("product")
        )
          confidence += 20;
        if (
          $el
            .closest("section")
            .find("h2, h3")
            .text()
            .toLowerCase()
            .includes("treatment")
        )
          confidence += 20;

        if (
          confidence >= 40 &&
          hasImage &&
          hasTitle &&
          (hasPrice || hasButton)
        ) {
          productElements.push({
            element: $el,
            confidence: confidence,
            hasImage,
            hasTitle,
            hasPrice,
            hasButton,
            hasRating,
            hasDescription,
            selector: selector,
          });

          $el.addClass("featured-product-processed");
        }
      });
    } catch (e) {}
  });

  $("div.grid, .grid-cols-1, .grid-cols-2, .grid-cols-3, .product-grid").each(
    (i, gridEl) => {
      const $grid = $(gridEl);

      if ($grid.closest("header, nav, .navbar").length > 0) return;

      const productItems = $grid.children("div").filter((j, itemEl) => {
        const $item = $(itemEl);
        if ($item.hasClass("featured-product-processed")) return false;

        const hasImage = $item.find("img").length > 0;
        const hasTitle = $item.find("h1, h2, h3, h4, h5, h6").length > 0;
        const hasPrice =
          $item.text().match(/\$\d+/) ||
          $item.find('[class*="price"]').length > 0;
        const hasButton =
          $item.find('button, .btn, a[class*="btn"]').length > 0;

        return hasImage && hasTitle && (hasPrice || hasButton);
      });

      if (productItems.length >= 2) {
        productItems.each((j, itemEl) => {
          const $item = $(itemEl);
          if (!$item.hasClass("featured-product-processed")) {
            const hasImage = $item.find("img").length > 0;
            const hasTitle = $item.find("h1, h2, h3, h4, h5, h6").length > 0;
            const hasPrice =
              $item.text().match(/\$\d+/) ||
              $item.find('[class*="price"]').length > 0;
            const hasButton =
              $item.find('button, .btn, a[class*="btn"]').length > 0;
            const hasRating = $item.find('[class*="star"]').length > 0;

            let confidence = 70;
            if (hasImage) confidence += 10;
            if (hasTitle) confidence += 10;
            if (hasPrice) confidence += 10;
            if (hasButton) confidence += 10;
            if (hasRating) confidence += 10;

            productElements.push({
              element: $item,
              confidence: confidence,
              hasImage,
              hasTitle,
              hasPrice,
              hasButton,
              hasRating: hasRating,
              hasDescription: $item.find("p").length > 0,
              selector: "grid-product-item",
            });

            $item.addClass("featured-product-processed");
          }
        });
      }
    }
  );

  return productElements.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Extracts product data from HTML element
 */
function extractProductData($element) {
  const data = {};

  const titleEl = $element
    .find(
      'h1, h2, h3, h4, h5, h6, .title, .name, [class*="title"], [class*="name"]'
    )
    .first();
  data.title = titleEl.text().trim() || "Featured Product";

  const descEl = $element
    .find('p, .description, .desc, [class*="description"], [class*="desc"]')
    .first();
  data.description = descEl.html() || "<p>Product description</p>";

  const imgEl = $element.find("img").first();
  data.image_alt =
    imgEl.attr("alt") || titleEl.text().trim() || "Product image";

  const priceEl = $element
    .find(
      '[class*="price"], .cost, .amount, [class*="cost"], [class*="amount"]'
    )
    .first();
  let priceText = priceEl.text().trim();
  if (!priceText) {
    const priceMatch = $element.text().match(/\$\d+(?:\.\d{2})?/);
    priceText = priceMatch ? priceMatch[0] : "$0.00";
  }
  data.price = priceText;

  const buttonEl = $element
    .find(
      'button, .btn, .button, a[class*="btn"], a[class*="buy"], a[class*="shop"]'
    )
    .first();
  data.button_text = buttonEl.text().trim() || "View Product";
  data.button_url = buttonEl.attr("href") || "/";

  const ratingEl = $element.find(
    '.rating, [class*="rating"], .stars, [class*="star"]'
  );
  data.rating_count = ratingEl.length > 0 ? "(Reviews)" : "(New)";

  return data;
}

/**
 * Generates featured product Liquid template using real Shopify product structure
 * Creates a single, clean product grid without block loops to prevent duplication
 */
function generateFeaturedProductLiquid(originalData, index = 0) {
  return `
{%- comment -%} Featured Products Grid - Dynamic Shopify Products {%- endcomment -%}

{%- comment -%} Show "No Products" message if store is empty {%- endcomment -%}
{% if collections.all.products.size == 0 %}
  <div class="no-products-message text-center py-16">
    <div class="text-6xl mb-4">📦</div>
    <h3 class="text-3xl font-semibold mb-3 text-[#ffe0dc]">No Products Available</h3>
    <p class="text-[#d9bfc6] mb-6 max-w-md mx-auto">
      Add products to your Shopify store to display them here. Once you add products, they will automatically appear in this section.
    </p>
    <a href="/admin/products" class="inline-block px-6 py-3 rounded-md font-semibold transition-all duration-300"
       style="background: linear-gradient(90deg,#6a1a23 80%,#a13f4f 100%); color: #ffe0dc; border: 2px solid #6a1a23;">
      Add Products to Store
    </a>
  </div>
{% else %}
  <div class="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
    {%- comment -%} Loop through 6 featured product slots {%- endcomment -%}
    {% for i in (1..6) %}
      {%- liquid
        assign featured_product_setting = 'featured_product_' | append: i
        assign product = section.settings[featured_product_setting]
        assign should_show_product = false
        
        if product != blank
          assign should_show_product = true
        else
          assign available_products = collections.all.products | where: 'available'
          assign total_products = collections.all.products.size
          assign product_index = i | minus: 1
          
          if available_products.size > product_index
            assign product = available_products[product_index]
            assign should_show_product = true
          elsif total_products > product_index
            assign product = collections.all.products[product_index]
            assign should_show_product = true
          endif
        endif
      -%}

      {% if should_show_product and product and product != blank %}
        <div class="product-card bg-gradient-to-br from-[#2d1014] to-[#3d1017] border-2.5 border-[#512228] rounded-2xl overflow-hidden maroon-shadow"
             data-product-id="{{ product.id }}"
             data-product-url="{{ product.url }}">
          
          <div class="image-container relative">
            {% if product.featured_image %}
              <img src="{{ product.featured_image | img_url: 'master' }}" 
                   alt="{{ product.featured_image.alt | default: product.title }}" 
                   class="w-full h-64 object-cover shadow-2xl"
                   loading="lazy">
            {% elsif product.images.size > 0 %}
              <img src="{{ product.images.first | img_url: 'master' }}" 
                   alt="{{ product.images.first.alt | default: product.title }}" 
                   class="w-full h-64 object-cover shadow-2xl"
                   loading="lazy">
            {% else %}
              <div class="w-full h-64 bg-gradient-to-br from-[#3d1017] to-[#23080a] flex items-center justify-center">
                <span class="text-[#ffe0dc] font-semibold">{{ product.title | escape }}</span>
              </div>
            {% endif %}
            

          </div>
          
          <div class="product-info p-7">
            <div class="product-content">
              <h3 class="text-2xl font-semibold mb-2 text-[#ffe0dc]">
                {{ product.title | escape }}
              </h3>
              
              {% if product.description != blank and section.settings.show_product_description %}
                <p class="text-[#d9bfc6] mb-4">
                  {{ product.description | strip_html | truncatewords: section.settings.description_length | default: 15 }}
                </p>
              {% endif %}
            </div>
            
            <div class="product-footer">
              <div class="price mb-4">
                {% if product.compare_at_price > product.price %}
                  <span class="text-[#b08d98] line-through text-sm mr-2">{{ product.compare_at_price | money }}</span>
                  <span class="font-semibold text-[#ffe0dc]">{{ product.price | money }}</span>
                {% else %}
                  <span class="font-semibold text-[#ffe0dc]">{{ product.price | money }}</span>
                {% endif %}
              </div>
              
              {% if product.available %}
                <a href="{{ product.url }}" 
                   class="view-product-btn mt-4 block w-full rounded-lg text-center py-3 px-4 font-semibold transition-all duration-300 hover:opacity-90 hover:transform hover:scale-105"
                   style="background: linear-gradient(135deg, #6a1a23 0%, #a13f4f 100%); color: #ffe0dc; border: 2px solid #6a1a23; box-shadow: 0 4px 12px rgba(106, 26, 35, 0.3);">
                  {{ section.settings.button_text | default: 'View Product' }}
                </a>
              {% else %}
                <button class="sold-out-btn mt-4 block w-full rounded-lg text-center py-3 px-4 font-semibold" 
                        style="background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%); color: #ffe0dc; border: 2px solid #6c757d; box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);" 
                        disabled>
                  Sold Out
                </button>
              {% endif %}
            </div>
          </div>
        </div>
      {% endif %}
    {% endfor %}
  </div>
{% endif %}`;
}

/**
 * Generates schema settings for featured products (Shopify-standard)
 */
function generateFeaturedProductSchema(productCount) {
  const settings = [];

  settings.push({
    type: "header",
    content: "Featured Products",
  });

  settings.push({
    type: "paragraph",
    content:
      "Select products from your store to display. These will show real product data including prices, images, and availability.",
  });

  for (let i = 1; i <= productCount; i++) {
    settings.push({
      type: "product",
      id: `featured_product_${i}`,
      label: `Featured Product ${i}`,
      info: `Choose a product from your store`,
    });
  }

  settings.push({
    type: "header",
    content: "Display Options",
  });

  settings.push({
    type: "text",
    id: "button_text",
    label: "Button text",
    default: "View Product",
    info: "Text to display on product buttons",
  });

  settings.push({
    type: "checkbox",
    id: "show_product_description",
    label: "Show product descriptions",
    default: true,
  });

  settings.push({
    type: "range",
    id: "description_length",
    min: 10,
    max: 50,
    step: 5,
    unit: "wds",
    label: "Description length",
    default: 20,
    info: "Number of words to show in product descriptions",
  });

  return settings;
}

/**
 * Main function to replace static products with featured products
 */
export function replaceWithFeaturedProducts(html) {
  const $ = cheerio.load(html);
  const productElements = detectProductElements($);

  if (productElements.length === 0) {
    return {
      html: $.html(),
      hasProducts: false,
      replacements: 0,
      schemaSettings: [],
    };
  }

  console.log(
    `Found ${productElements.length} product elements to replace with featured products`
  );

  let replacementCount = 0;
  const extractedData = [];

  productElements.forEach((productInfo, index) => {
    const originalData = extractProductData(productInfo.element);
    extractedData.push(originalData);
  });

  if (productElements.length > 0) {
    const featuredProductLiquid = generateFeaturedProductLiquid(
      extractedData[0],
      0
    );
    const comment = `{%- comment -%} Featured Products Grid - Replaced ${productElements.length} static products {%- endcomment -%}`;
    const replacement = comment + featuredProductLiquid;

    console.log("Before replacement, HTML length:", $.html().length);

    const firstElement = productElements[0].element;
    const parentContainer = firstElement.parent();

    if (parentContainer && parentContainer.length > 0) {
      const productsInParent = productElements.filter((p) => {
        const elementParent = p.element.parent();
        return elementParent.length > 0 && elementParent.is(parentContainer);
      }).length;

      if (productsInParent >= 2) {
        console.log(
          `   Replacing parent container (${
            parentContainer.attr("class") || "no class"
          }) with ${productElements.length} products`
        );
        parentContainer.replaceWith(
          `<div class="featured-products-container featured-product-processed">${replacement}</div>`
        );
        replacementCount = productElements.length;
      } else {
        firstElement.replaceWith(
          `<div class="featured-products-container featured-product-processed">${replacement}</div>`
        );
        replacementCount = 1;

        for (let i = 1; i < productElements.length; i++) {
          try {
            productElements[i].element.remove();
            console.log(
              `   Removed duplicate product ${i + 1}: "${
                extractedData[i].title
              }"`
            );
            replacementCount++;
          } catch (error) {
            console.warn(
              `   Failed to remove product ${i + 1}:`,
              error.message
            );
          }
        }
      }
    } else {
      firstElement.replaceWith(
        `<div class="featured-products-container featured-product-processed">${replacement}</div>`
      );
      replacementCount = 1;

      for (let i = 1; i < productElements.length; i++) {
        try {
          productElements[i].element.remove();
          console.log(
            `   Removed duplicate product ${i + 1}: "${extractedData[i].title}"`
          );
          replacementCount++;
        } catch (error) {
          console.warn(`   Failed to remove product ${i + 1}:`, error.message);
        }
      }
    }

    console.log(
      `   Replaced ${productElements.length} products with featured products grid`
    );
  }

  const schemaSettings = generateFeaturedProductSchema(
    Math.min(productElements.length, 6)
  );

  console.log(
    `Successfully processed ${replacementCount} static products into 1 featured products grid`
  );

  return {
    html: $.html(),
    hasProducts: true,
    replacements: replacementCount,
    schemaSettings: schemaSettings,
    extractedData: extractedData,
    summary: {
      totalFound: productElements.length,
      totalReplaced: replacementCount,
      products: extractedData.map((data, i) => ({
        index: i + 1,
        title: data.title,
        price: data.price,
        confidence: productElements[i]?.confidence,
      })),
      note: "Converted to single product grid with smart fallback system!",
    },
  };
}

/**
 * Helper function to add featured product settings to existing schema
 */
export function addFeaturedProductSettings(existingSettings, productCount) {
  const featuredProductSettings = generateFeaturedProductSchema(productCount);

  const insertIndex = existingSettings.findIndex(
    (setting) =>
      setting.type === "header" &&
      (setting.content?.toLowerCase().includes("section") ||
        setting.content?.toLowerCase().includes("padding"))
  );

  if (insertIndex > 0) {
    existingSettings.splice(insertIndex, 0, ...featuredProductSettings);
  } else {
    existingSettings.push(...featuredProductSettings);
  }

  return existingSettings;
}

/**
 * Generate CSS for featured products to maintain styling
 */
export function generateFeaturedProductCSS() {
  return `
/* Featured Product Styles */
.featured-product-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.featured-product-wrapper:hover {
  transform: translateY(-2px);
}

.product-image {
  position: relative;
  width: 100%;
  padding-bottom: 60%; /* 5:3 aspect ratio */
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  font-weight: 500;
}

.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.product-price {
  margin-bottom: 1rem;
}

.price-compare {
  text-decoration: line-through;
  color: #999;
  margin-right: 0.5rem;
}

.price-sale {
  color: #e74c3c;
  font-weight: 600;
}

.price {
  font-weight: 600;
  font-size: 1.1rem;
}

.product-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.product-button:hover {
  background: #0056b3;
}

.product-button--soldout {
  background: #6c757d;
  cursor: not-allowed;
}

.product-rating {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.rating-stars {
  color: #ffc107;
}

.rating-count {
  color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-info {
    padding: 0.75rem;
  }
  
  .product-title {
    font-size: 1.1rem;
  }
}
`;
}
