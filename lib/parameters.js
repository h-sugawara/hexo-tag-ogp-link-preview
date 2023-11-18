'use strict';

const urlRegex = /^(http|https):\/\//g;
const targetKeywords = ['_self', '_blank', '_parent', '_top'];
const relKeywords = ['external', 'nofollow', 'noopener', 'noreferrer', 'opener'];

const CRAWLER_USER_AGENT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/112.0.0.0 Safari/537.36';

function parseArgs(args) {
    const urls = args.filter(arg => arg.search(urlRegex) === 0);
    if (urls.length < 1) {
        throw new Error('Scraping target url is not contains.');
    }

    const targets = args.filter(arg => targetKeywords.includes(arg));
    const relationships = args.filter(arg => relKeywords.includes(arg));

    return {
        url: urls[0],
        target: targets[0] || '_blank',
        rel: relationships[0] || 'nofollow',
    };
}

function getFetchOptions(isCrawler) {
    const fetchOptions = {};
    const headers = {};

    if (typeof isCrawler === 'boolean' && isCrawler) {
        headers['user-agent'] = CRAWLER_USER_AGENT;
    }

    if (Object.keys(headers).length !== 0) {
        fetchOptions.headers = headers;
    }

    return fetchOptions;
}

module.exports = (args, content, config) => {
    const { url, target, rel } = parseArgs(args);
    const { class_name: className, description_length: descriptionLength, disguise_crawler: isCrawler } = config;
    const fetchOptions = getFetchOptions(isCrawler);

    return {
        scrape: { url, fetchOptions },
        generate: { target, rel, descriptionLength, className, fallbackText: content },
    };
};
