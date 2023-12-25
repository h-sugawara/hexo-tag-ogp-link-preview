'use strict';

const util = require('hexo-util');
const { hasTypeOfProperty } = require('./common');

function newHtmlDivTag(className, content) {
    return util.htmlTag('div', { class: className }, content, false);
}

function newHtmlAnchorTag(url, config, content) {
    const tagAttrs = { href: url, target: config.target, rel: config.rel };

    if (typeof content === 'string' && content !== '') {
        tagAttrs.class = config.className.anchor_link;
        return util.htmlTag('a', tagAttrs, content, false);
    }
    if (hasTypeOfProperty(config, 'fallbackText', 'string') && config.fallbackText !== '') {
        return util.htmlTag('a', tagAttrs, config.fallbackText);
    }

    throw new Error('failed to generate a new anchor tag.');
}

function newHtmlImgTag(url, alt, config) {
    const tagAttrs = { src: url, alt: alt };

    if (hasTypeOfProperty(config.className, 'image', 'string') && config.className.image !== '') {
        tagAttrs.class = config.className.image;
    }
    if (hasTypeOfProperty(config, 'loading', 'string') && ['lazy', 'eager'].includes(config.loading)) {
        tagAttrs.loading = config.loading;
    }

    return util.htmlTag('img', tagAttrs);
}

module.exports = {
    newHtmlDivTag,
    newHtmlAnchorTag,
    newHtmlImgTag,
};
