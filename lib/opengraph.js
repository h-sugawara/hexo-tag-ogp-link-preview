'use strict';

const util = require('hexo-util');
const { hasProperty, stringLength, stringSlice } = require('./common');

function getOgTitle(ogp) {
    const result = { valid: false, title: '' };

    if (!hasProperty(ogp, 'ogTitle')) {
        return result;
    }

    const escapedTitle = util.escapeHTML(ogp.ogTitle);
    if (typeof escapedTitle === 'string' && escapedTitle !== '') {
        result.valid = true;
        result.title = escapedTitle;
    }
    return result;
}

function getOgDescription(ogp, maxLength) {
    const result = { valid: false, description: '' };

    if (!hasProperty(ogp, 'ogDescription')) {
        return result;
    }

    const escapedDescription = util.escapeHTML(ogp.ogDescription);
    const descriptionText = maxLength && stringLength(escapedDescription) > maxLength
        ? stringSlice(escapedDescription, 0, maxLength) + '...' : escapedDescription;
    if (typeof descriptionText === 'string' && descriptionText !== '') {
        result.valid = true;
        result.description = descriptionText;
    }
    return result;
}

function getOgImage(ogp, selectIndex = 0) {
    if (!hasProperty(ogp, 'ogImage') || ogp.ogImage.length === 0) {
        return { valid: false, image: '' };
    }

    const index = selectIndex >= ogp.ogImage.length ? ogp.ogImage.length - 1 : 0;

    return { valid: true, image: ogp.ogImage[index].url };
}

module.exports = {
    getOgTitle,
    getOgDescription,
    getOgImage,
};
