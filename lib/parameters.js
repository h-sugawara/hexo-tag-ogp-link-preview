'use strict';

const urlRegex = /^(http|https):\/\//g;
const targetKeywords = ['_self', '_blank', '_parent', '_top'];
const relKeywords = ['external', 'nofollow', 'noopener', 'noreferrer', 'opener'];

const CRAWLER_USER_AGENT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/112.0.0.0 Safari/537.36';

function parseArgs(args) {
    const [url, ...opts] = args;

    if (typeof url !== 'string' || url.search(urlRegex) < 0) {
        throw new Error('Scraping target url is not contains.');
    }

    const target = parseOptionalKeywordArg(opts, 'target:', targetKeywords, '_blank');
    const rel = parseOptionalKeywordArg(opts, 'rel:', relKeywords, 'nofollow');

    return { url, target, rel };
}

function parseOptionalKeywordArg(optionals, argName, keywords, defaultValue) {
    return findOptionalArgs(optionals, argName).filter(arg => keywords.includes(arg)).shift() || defaultValue;
}

function findOptionalArgs(optionals, argName) {
    const args = optionals.filter(arg => arg.startsWith(argName)).map(arg => arg.replace(argName, ''));
    return args.length ? args : optionals;
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
