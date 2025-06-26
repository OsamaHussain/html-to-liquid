export const STANDARD_BLOCK_TYPES = {
    heading: {
        type: "heading",
        name: "Heading",
        settings: [
            {
                type: "text",
                id: "heading_text",
                label: "Heading Text",
                default: "Sample Heading"
            },
            {
                type: "select",
                id: "heading_size",
                label: "Heading Size",
                options: [
                    { value: "h1", label: "H1" },
                    { value: "h2", label: "H2" },
                    { value: "h3", label: "H3" },
                    { value: "h4", label: "H4" },
                    { value: "h5", label: "H5" },
                    { value: "h6", label: "H6" }
                ],
                default: "h2"
            }
        ]
    },

    buttons: {
        type: "buttons",
        name: "Button",
        settings: [
            {
                type: "text",
                id: "button_text",
                label: "Button Text",
                default: "Click here"
            },
            {
                type: "url",
                id: "button_url",
                label: "Button URL",
                default: "/"
            },
            {
                type: "select",
                id: "button_style",
                label: "Button Style",
                options: [
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" },
                    { value: "outline", label: "Outline" }
                ],
                default: "primary"
            }
        ]
    },

    testimonial: {
        type: "testimonial",
        name: "Testimonial",
        settings: [
            {
                type: "textarea",
                id: "testimonial_text",
                label: "Testimonial Text",
                default: "This is a great product!"
            },
            {
                type: "text",
                id: "customer_name",
                label: "Customer Name",
                default: "John Doe"
            },
            {
                type: "text",
                id: "customer_title",
                label: "Customer Title",
                default: "CEO, Company"
            },
            {
                type: "image_picker",
                id: "customer_image",
                label: "Customer Image"
            }
        ]
    },

    feature: {
        type: "feature",
        name: "Feature",
        settings: [
            {
                type: "text",
                id: "feature_title",
                label: "Feature Title",
                default: "Feature Title"
            },
            {
                type: "textarea",
                id: "feature_description",
                label: "Feature Description",
                default: "Feature description here"
            },
            {
                type: "image_picker",
                id: "feature_icon",
                label: "Feature Icon"
            }
        ]
    },

    product: {
        type: "product",
        name: "Product",
        settings: [
            {
                type: "text",
                id: "product_title",
                label: "Product Title",
                default: "Product Name"
            },
            {
                type: "text",
                id: "product_price",
                label: "Product Price",
                default: "$99.99"
            },
            {
                type: "textarea",
                id: "product_description",
                label: "Product Description",
                default: "Product description"
            },
            {
                type: "image_picker",
                id: "product_image",
                label: "Product Image"
            },
            {
                type: "url",
                id: "product_url",
                label: "Product URL",
                default: "/products/"
            }
        ]
    },

    team_member: {
        type: "team_member",
        name: "Team Member",
        settings: [
            {
                type: "text",
                id: "member_name",
                label: "Member Name",
                default: "Team Member"
            },
            {
                type: "text",
                id: "member_position",
                label: "Position",
                default: "Position"
            },
            {
                type: "textarea",
                id: "member_bio",
                label: "Bio",
                default: "Member bio"
            },
            {
                type: "image_picker",
                id: "member_image",
                label: "Member Image"
            }
        ]
    },

    gallery: {
        type: "gallery",
        name: "Gallery Item",
        settings: [
            {
                type: "image_picker",
                id: "gallery_image",
                label: "Gallery Image"
            },
            {
                type: "text",
                id: "gallery_caption",
                label: "Caption",
                default: "Image caption"
            }
        ]
    },

    faq: {
        type: "faq",
        name: "FAQ Item",
        settings: [
            {
                type: "text",
                id: "question",
                label: "Question",
                default: "Frequently asked question?"
            },
            {
                type: "textarea",
                id: "answer",
                label: "Answer",
                default: "Answer to the question"
            }
        ]
    },

    header_link: {
        type: "header_link",
        name: "Header Link",
        settings: [
            {
                type: "text",
                id: "link_text",
                label: "Link Text",
                default: "Link"
            },
            {
                type: "url",
                id: "link_url",
                label: "Link URL",
                default: "/"
            }
        ]
    },

    footer_column: {
        type: "footer_column",
        name: "Footer Column",
        settings: [
            {
                type: "text",
                id: "column_title",
                label: "Column Title",
                default: "Links"
            },
            {
                type: "text",
                id: "link_1_text",
                label: "Link 1 Text",
                default: "Link 1"
            },
            {
                type: "url",
                id: "link_1_url",
                label: "Link 1 URL",
                default: "/"
            },
            {
                type: "text",
                id: "link_2_text",
                label: "Link 2 Text",
                default: "Link 2"
            },
            {
                type: "url",
                id: "link_2_url",
                label: "Link 2 URL",
                default: "/"
            },
            {
                type: "text",
                id: "link_3_text",
                label: "Link 3 Text",
                default: "Link 3"
            },
            {
                type: "url",
                id: "link_3_url",
                label: "Link 3 URL",
                default: "/"
            }
        ]
    },

    service: {
        type: "service",
        name: "Service",
        settings: [
            {
                type: "text",
                id: "service_title",
                label: "Service Title",
                default: "Service Name"
            },
            {
                type: "textarea",
                id: "service_description",
                label: "Service Description",
                default: "Service description"
            },
            {
                type: "image_picker",
                id: "service_icon",
                label: "Service Icon"
            },
            {
                type: "url",
                id: "service_url",
                label: "Service URL",
                default: "/"
            }
        ]
    },

    cta_button: {
        type: "cta_button",
        name: "CTA Button",
        settings: [
            {
                type: "text",
                id: "cta_text",
                label: "CTA Text",
                default: "Get Started"
            },
            {
                type: "url",
                id: "cta_url",
                label: "CTA URL",
                default: "/"
            },
            {
                type: "select",
                id: "cta_style",
                label: "CTA Style",
                options: [
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" }
                ],
                default: "primary"
            }
        ]
    },

    social_link: {
        type: "social_link",
        name: "Social Link",
        settings: [
            {
                type: "text",
                id: "social_platform",
                label: "Platform",
                default: "Facebook"
            },
            {
                type: "url",
                id: "social_url",
                label: "Social URL",
                default: "https://facebook.com"
            },
            {
                type: "text",
                id: "social_icon",
                label: "Icon Class",
                default: "fab fa-facebook"
            }
        ]
    },

    contact_info: {
        type: "contact_info",
        name: "Contact Info",
        settings: [
            {
                type: "text",
                id: "contact_type",
                label: "Contact Type",
                default: "Phone"
            },
            {
                type: "text",
                id: "contact_value",
                label: "Contact Value",
                default: "+1 (555) 123-4567"
            },
            {
                type: "text",
                id: "contact_icon",
                label: "Icon Class",
                default: "fas fa-phone"
            }
        ]
    },

    newsletter: {
        type: "newsletter",
        name: "Newsletter",
        settings: [
            {
                type: "text",
                id: "newsletter_title",
                label: "Newsletter Title",
                default: "Subscribe to our newsletter"
            },
            {
                type: "textarea",
                id: "newsletter_description",
                label: "Description",
                default: "Get updates and special offers"
            },
            {
                type: "text",
                id: "button_text",
                label: "Button Text",
                default: "Subscribe"
            }
        ]
    },

    video: {
        type: "video",
        name: "Video",
        settings: [
            {
                type: "text",
                id: "video_url",
                label: "Video URL",
                default: "https://www.youtube.com/watch?v="
            },
            {
                type: "text",
                id: "video_title",
                label: "Video Title",
                default: "Video Title"
            },
            {
                type: "image_picker",
                id: "video_thumbnail",
                label: "Video Thumbnail"
            }
        ]
    },

    pricing: {
        type: "pricing",
        name: "Pricing Plan",
        settings: [
            {
                type: "text",
                id: "plan_name",
                label: "Plan Name",
                default: "Basic Plan"
            },
            {
                type: "text",
                id: "plan_price",
                label: "Plan Price",
                default: "$9.99"
            },
            {
                type: "text",
                id: "plan_period",
                label: "Billing Period",
                default: "per month"
            },
            {
                type: "textarea",
                id: "plan_features",
                label: "Plan Features",
                default: "Feature 1\nFeature 2\nFeature 3"
            },
            {
                type: "text",
                id: "plan_button_text",
                label: "Button Text",
                default: "Choose Plan"
            },
            {
                type: "url",
                id: "plan_button_url",
                label: "Button URL",
                default: "/"
            }
        ]
    },

    stat: {
        type: "stat",
        name: "Statistic",
        settings: [
            {
                type: "text",
                id: "stat_number",
                label: "Statistic Number",
                default: "100+"
            },
            {
                type: "text",
                id: "stat_label",
                label: "Statistic Label",
                default: "Happy Customers"
            },
            {
                type: "text",
                id: "stat_icon",
                label: "Icon Class",
                default: "fas fa-users"
            }
        ]
    },

    step: {
        type: "step",
        name: "Process Step",
        settings: [
            {
                type: "text",
                id: "step_number",
                label: "Step Number",
                default: "1"
            },
            {
                type: "text",
                id: "step_title",
                label: "Step Title",
                default: "Step Title"
            },
            {
                type: "textarea",
                id: "step_description",
                label: "Step Description",
                default: "Step description"
            },
            {
                type: "image_picker",
                id: "step_icon",
                label: "Step Icon"
            }
        ]
    },

    benefit: {
        type: "benefit",
        name: "Benefit",
        settings: [
            {
                type: "text",
                id: "benefit_title",
                label: "Benefit Title",
                default: "Benefit Title"
            },
            {
                type: "textarea",
                id: "benefit_description",
                label: "Benefit Description",
                default: "Benefit description"
            },
            {
                type: "image_picker",
                id: "benefit_icon",
                label: "Benefit Icon"
            }
        ]
    },

    review: {
        type: "review",
        name: "Review",
        settings: [
            {
                type: "textarea",
                id: "review_text",
                label: "Review Text",
                default: "Great product!"
            },
            {
                type: "text",
                id: "reviewer_name",
                label: "Reviewer Name",
                default: "Customer Name"
            },
            {
                type: "range",
                id: "review_rating",
                label: "Rating",
                min: 1,
                max: 5,
                step: 1,
                default: 5
            },
            {
                type: "image_picker",
                id: "reviewer_image",
                label: "Reviewer Image"
            }
        ]
    },

    award: {
        type: "award",
        name: "Award",
        settings: [
            {
                type: "text",
                id: "award_title",
                label: "Award Title",
                default: "Award Title"
            },
            {
                type: "text",
                id: "award_year",
                label: "Award Year",
                default: "2024"
            },
            {
                type: "image_picker",
                id: "award_image",
                label: "Award Image"
            }
        ]
    },

    partner: {
        type: "partner",
        name: "Partner",
        settings: [
            {
                type: "text",
                id: "partner_name",
                label: "Partner Name",
                default: "Partner Name"
            },
            {
                type: "image_picker",
                id: "partner_logo",
                label: "Partner Logo"
            },
            {
                type: "url",
                id: "partner_url",
                label: "Partner URL",
                default: "/"
            }
        ]
    },

    hero: {
        type: "hero",
        name: "Hero Section",
        settings: [
            {
                type: "text",
                id: "hero_title",
                label: "Hero Title",
                default: "Welcome to Our Site"
            },
            {
                type: "textarea",
                id: "hero_subtitle",
                label: "Hero Subtitle",
                default: "Discover amazing products and services"
            },
            {
                type: "text",
                id: "hero_button_text",
                label: "Button Text",
                default: "Get Started"
            },
            {
                type: "url",
                id: "hero_button_url",
                label: "Button URL",
                default: "/"
            },
            {
                type: "image_picker",
                id: "hero_background_image",
                label: "Background Image"
            }
        ]
    },

    about: {
        type: "about",
        name: "About Section",
        settings: [
            {
                type: "text",
                id: "about_title",
                label: "About Title",
                default: "About Us"
            },
            {
                type: "textarea",
                id: "about_description",
                label: "About Description",
                default: "Learn more about our company and mission"
            },
            {
                type: "image_picker",
                id: "about_image",
                label: "About Image"
            }
        ]
    },

    image_text: {
        type: "image_text",
        name: "Image with Text",
        settings: [
            {
                type: "text",
                id: "section_title",
                label: "Section Title",
                default: "Section Title"
            },
            {
                type: "textarea",
                id: "section_text",
                label: "Section Text",
                default: "Section text content"
            },
            {
                type: "image_picker",
                id: "section_image",
                label: "Section Image"
            },
            {
                type: "select",
                id: "layout",
                label: "Layout",
                options: [
                    { value: "left", label: "Image Left" },
                    { value: "right", label: "Image Right" }
                ],
                default: "left"
            }
        ]
    }
};

export function getBlockTemplate(blockType) {
    return STANDARD_BLOCK_TYPES[blockType] || null;
}

export function getAllBlockTypes() {
    return Object.keys(STANDARD_BLOCK_TYPES);
}
