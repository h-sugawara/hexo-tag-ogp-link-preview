'use strict';

const util = require('hexo-util');
const { hasProperty, hasTypeOfProperty, getObjectValueFrom } = require('./common');
const { stringLength, stringSlice } = require('./strings');

function getOgTitle(ogp) {
    if (!hasTypeOfProperty(ogp, 'ogTitle', 'string')) {
        return { valid: false, title: '' };
    }

    const escapedTitle = util.escapeHTML(ogp.ogTitle);

    return { valid: escapedTitle !== '', title: escapedTitle };
}

function getOgDescription(ogp, maxLength) {
    if (!hasTypeOfProperty(ogp, 'ogDescription', 'string')) {
        return { valid: false, description: '' };
    }

    const escapedDescription = util.escapeHTML(ogp.ogDescription);
    const descriptionText = maxLength && stringLength(escapedDescription) > maxLength
        ? stringSlice(escapedDescription, 0, maxLength) + '...' : escapedDescription;

    return { valid: descriptionText !== '', description: descriptionText };
}

function getOgImage(ogp, selectIndex = 0) {
    if (!hasProperty(ogp, 'ogImage') || ogp.ogImage.length === 0) {
        return { valid: false, image: '' };
    }

    const index = selectIndex >= ogp.ogImage.length ? ogp.ogImage.length - 1 : 0;
    const imageUrl = getObjectValueFrom(ogp.ogImage[index], 'url', 'string', '');

    return { valid: imageUrl !== '', image: imageUrl };
}

module.exports = {
    getOgTitle,
    getOgDescription,
    getOgImage,
};
