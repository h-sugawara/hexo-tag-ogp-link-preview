'use strict';

const { getOgTitle, getOgDescription, getOgImage } = require('./opengraph');
const { newHtmlDivTag, newHtmlAnchorTag, newHtmlImgTag } = require('./htmltag');

module.exports = (scraper, params) => {
    return scraper(params.scrape)
        .then(data => data.result)
        .then(ogp => {
            const { valid: isTitleValid, title: escapedTitle } = getOgTitle(ogp);
            const { valid: isDescValid, description: escapedDesc } = getOgDescription(ogp, params.generate.descriptionLength);
            const { valid: isImageValid, image: imageUrl } = getOgImage(ogp);

            if (!isTitleValid || !isDescValid) {
                return newHtmlAnchorTag(params.scrape.url, params.generate);
            }

            const title = newHtmlDivTag('og-title', escapedTitle);
            const desc = newHtmlDivTag('og-description', escapedDesc);
            const descriptions = newHtmlDivTag('descriptions', title + desc);
            const image = isImageValid
                ? newHtmlDivTag('og-image', newHtmlImgTag(imageUrl, params.generate)) : '';
            const content = image + descriptions;

            return newHtmlAnchorTag(params.scrape.url, params.generate, content);
        })
        .catch(error => {
            throw error;
        });
};
