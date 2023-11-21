'use strict';

const { hasTypeOfProperty, getObjectValueFrom } = require('./common');

const ANCHOR_LINK_CLASS_NAME = 'link-preview';
const DESCRIPTION_LENGTH = 140;
const DISGUISE_CRAWLER = true;

function getDefaultConfig() {
    return {
        class_name: { anchor_link: ANCHOR_LINK_CLASS_NAME },
        description_length: DESCRIPTION_LENGTH,
        disguise_crawler: DISGUISE_CRAWLER,
    };
}

function getClassNameObject(linkPreviewCfg, defaultValue) {
    const classNameCfg = linkPreviewCfg.class_name;

    const classNameObj = {
        anchor_link: getAnchorLinkClassName(classNameCfg, defaultValue),
    };

    if (hasTypeOfProperty(classNameCfg, 'image', 'string') && classNameCfg.image !== '') {
        classNameObj.image = classNameCfg.image;
    }

    return classNameObj;
}

function getAnchorLinkClassName(classNameCfg, defaultValue) {
    switch (typeof classNameCfg) {
        case 'object':
            return getObjectValueFrom(classNameCfg, 'anchor_link', 'string', defaultValue);
        case 'string':
            return classNameCfg || defaultValue;
    }
    return defaultValue;
}

function getDescriptionLength(linkPreviewCfg, defaultValue) {
    return getObjectValueFrom(linkPreviewCfg, 'description_length', 'number', defaultValue);
}

function getDisguiseCrawler(linkPreviewCfg, defaultValue) {
    if (hasTypeOfProperty(linkPreviewCfg, 'disguise_crawler', 'boolean')) {
        return linkPreviewCfg.disguise_crawler;
    }
    return defaultValue;
}

module.exports = hexoCfg => {
    if (!hasTypeOfProperty(hexoCfg, 'link_preview', 'object')) {
        return getDefaultConfig();
    }

    const linkPreviewCfg = hexoCfg.link_preview;

    return {
        class_name: getClassNameObject(linkPreviewCfg, ANCHOR_LINK_CLASS_NAME),
        description_length: getDescriptionLength(linkPreviewCfg, DESCRIPTION_LENGTH),
        disguise_crawler: getDisguiseCrawler(linkPreviewCfg, DISGUISE_CRAWLER),
    };
};
