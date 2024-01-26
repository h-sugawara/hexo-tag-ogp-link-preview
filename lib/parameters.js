'use strict';

const urlRegex = /^(http|https):\/\//g;
const targetKeywords = ['_blank', '_self', '_parent', '_top'];
const relKeywords = ['nofollow', 'external', 'noopener', 'noreferrer', 'opener'];
const loadingKeywords = ['lazy', 'eager'];

const CRAWLER_USER_AGENT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/112.0.0.0 Safari/537.36';

function parseArgs(args) {
    const [url, ...opts] = args;

    if (typeof url !== 'string' || url.search(urlRegex) < 0) {
        throw new Error('Scraping target url is not contains.');
    }

    const target = parseOptionalKeywordArg(opts, { argName: 'target:', index: 0 }, targetKeywords);
    const rel = parseOptionalKeywordArg(opts, { argName: 'rel:', index: 1 }, relKeywords);
    const loading = parseOptionalKeywordArg(opts, { argName: 'loading:', index: 2 }, loadingKeywords);

    return { url, target, rel, loading };
}

function parseOptionalKeywordArg(opts, find, keywords, defaultIndex = 0) {
    return findOptionalArgs(opts, find).filter(arg => keywords.includes(arg)).shift() || keywords[defaultIndex];
}

function findOptionalArgs(opts, find) {
    const { argName, index } = find;
    const args = opts.filter(arg => arg.startsWith(argName)).map(arg => arg.replace(argName, ''));
    return args.length ? args : [opts[index]];
}

function getFetchOptions(isCrawler) {
    const fetchOptions = {
        headers: {
            'accept': 'text/html',
        },
    };

    if (typeof isCrawler === 'boolean' && isCrawler) {
        fetchOptions.headers['user-agent'] = CRAWLER_USER_AGENT;
    }

    return fetchOptions;
}

module.exports = (args, content, config) => {
    const { url, target, rel, loading } = parseArgs(args);
    const { class_name: className, description_length: descriptionLength, disguise_crawler: isCrawler } = config;
    const fetchOptions = getFetchOptions(isCrawler);

    return {
        scrape: { url, fetchOptions },
        generate: { target, rel, loading, descriptionLength, className, fallbackText: content },
    };
};
