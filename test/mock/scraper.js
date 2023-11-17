'use strict';

function mockFullOgValues() {
    const imageUrl = 'test.png';
    const title = 'test_title';
    const description = 'テストデスクリプション';

    const scraper = async function() {
        return {
            error: false,
            result: {
                ogDescription: description,
                ogImage: [{ url: imageUrl }],
                ogTitle: title,
            },
        };
    };

    return { scraper, imageUrl, title, description };
}

function mockTextOgValues() {
    const title = 'test_title';
    const description = 'テストデスクリプション';

    const scraper = async function() {
        return {
            error: false,
            result: {
                ogDescription: description,
                ogImage: [],
                ogTitle: title,
            },
        };
    };

    return { scraper, title, description };
}

function mockInvalidOgValues() {
    const scraper = async function() {
        return { error: false, result: {} };
    };

    return { scraper };
}

function mockThrowError() {
    const scraper = async function() {
        throw new Error('error from mock OpenGraph scraper.');
    };

    return { scraper };
}

module.exports = {
    mockFullOgValues,
    mockTextOgValues,
    mockInvalidOgValues,
    mockThrowError,
};
