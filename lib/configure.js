'use strict';

const { hasProperty } = require('./common');

const ANCHOR_LINK_CLASS_NAME = 'link-preview';
const DESCRIPTION_LENGTH = 140;
const DISGUISE_CRAWLER = true;

module.exports = hexoCfg => {
    const config = {
        class_name: {
            anchor_link: ANCHOR_LINK_CLASS_NAME,
        },
        description_length: DESCRIPTION_LENGTH,
        disguise_crawler: DISGUISE_CRAWLER,
    };

    if (!hasProperty(hexoCfg, 'link_preview')) {
        return config;
    }

    const hexoCfgLinkPreview = hexoCfg.link_preview;

    if (hasProperty(hexoCfgLinkPreview, 'class_name')) {
        const hexoCfgLinkPreviewClassName = hexoCfgLinkPreview.class_name;

        if (typeof hexoCfgLinkPreviewClassName === 'string') {
            config.class_name.anchor_link = hexoCfgLinkPreviewClassName || config.class_name.anchor_link;
        } else if (typeof hexoCfgLinkPreviewClassName === 'object') {
            if (hasProperty(hexoCfgLinkPreviewClassName, 'anchor_link') && typeof hexoCfgLinkPreviewClassName.anchor_link === 'string') {
                config.class_name.anchor_link = hexoCfgLinkPreviewClassName.anchor_link || config.class_name.anchor_link;
            }

            if (hasProperty(hexoCfgLinkPreviewClassName, 'image') && hexoCfgLinkPreviewClassName.image !== '') {
                config.class_name.image = hexoCfgLinkPreviewClassName.image;
            }
        }
    }

    if (hasProperty(hexoCfgLinkPreview, 'description_length') && typeof hexoCfgLinkPreview.description_length === 'number') {
        config.description_length = hexoCfgLinkPreview.description_length || config.description_length;
    }

    if (hasProperty(hexoCfgLinkPreview, 'disguise_crawler') && typeof hexoCfgLinkPreview.disguise_crawler === 'boolean') {
        config.disguise_crawler = hexoCfgLinkPreview.disguise_crawler;
    }

    return config;
};
