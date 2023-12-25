'use strict';

const generate = require('../lib/generator');
const getParameters = require('../lib/parameters');
const getConfig = require('../lib/configure');
const { newHtmlAnchorTag, newHtmlDivTag, newHtmlImgTag } = require('../lib/htmltag');

const { mockFullOgValues, mockTextOgValues, mockInvalidOgValues, mockThrowError } = require('./mock/scraper');

describe('generator', () => {
    it('Was able to get all values from OpenGraph', async () => {
        const { scraper, imageUrl, title, description } = mockFullOgValues();
        const params = getParameters(
            ['https://example.com', '_blank', 'nofollow'],
            'fallbackText',
            getConfig({
                link_preview: {
                    class_name: { anchor_link: 'link-preview' },
                    description_length: 140,
                    disguise_crawler: true,
                },
            })
        );

        await expect(generate(scraper, params)).resolves.toEqual(
            newHtmlAnchorTag(
                params.scrape.url,
                params.generate,
                newHtmlDivTag(
                    'og-image',
                    newHtmlImgTag(imageUrl, title, params.generate)
                )
                + newHtmlDivTag(
                    'descriptions',
                    newHtmlDivTag('og-title', title)
                    + newHtmlDivTag('og-description', description)
                )
            )
        );
    });

    it('Was able to get title and description from OpenGraph', async () => {
        const { scraper, title, description } = mockTextOgValues();
        const params = getParameters(
            ['https://example.com', '_blank', 'nofollow'],
            'fallbackText',
            getConfig({
                link_preview: {
                    class_name: { anchor_link: 'link-preview' },
                    description_length: 140,
                    disguise_crawler: true,
                },
            })
        );

        await expect(generate(scraper, params)).resolves.toEqual(
            newHtmlAnchorTag(
                params.scrape.url,
                params.generate,
                newHtmlDivTag(
                    'descriptions',
                    newHtmlDivTag('og-title', title)
                    + newHtmlDivTag('og-description', description)
                )
            )
        );
    });

    it('Neither able to get title nor description from OpenGraph', async () => {
        const { scraper } = mockInvalidOgValues();
        const params = getParameters(
            ['https://example.com', '_blank', 'nofollow'],
            'fallbackText',
            getConfig({
                link_preview: {
                    class_name: { anchor_link: 'link-preview' },
                    description_length: 140,
                    disguise_crawler: true,
                },
            })
        );

        await expect(generate(scraper, params)).resolves.toEqual(
            newHtmlAnchorTag(params.scrape.url, params.generate)
        );
    });

    it('Throw error from OpenGraph scraper', async () => {
        const { scraper } = mockThrowError();
        const params = getParameters(
            ['https://example.com', '_blank', 'nofollow'],
            'fallbackText',
            getConfig({
                link_preview: {
                    class_name: { anchor_link: 'link-preview' },
                    description_length: 140,
                    disguise_crawler: true,
                },
            })
        );

        await expect(generate(scraper, params)).rejects.toThrow(
            new Error('error from mock OpenGraph scraper.')
        );
    });
});
