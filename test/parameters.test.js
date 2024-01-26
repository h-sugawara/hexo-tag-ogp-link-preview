'use strict';

const getParameters = require('../lib/parameters');

describe('parameters', () => {
    it('Specify all arguments explicitly', () => {
        const args = ['https://example.com', '_self', 'rel:noopener', 'loading:eager'];
        const fallbackText = 'fallbackText';
        const config = { class_name: { anchor_link: 'link-preview' }, descriptionLength: 140, disguise_crawler: true };
        const { class_name: className, description_length: descriptionLength } = config;

        expect(getParameters(args, fallbackText, config)).toEqual(
            {
                scrape: {
                    url: args[0],
                    fetchOptions: {
                        headers: {
                            'accept': 'text/html',
                            'user-agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/112.0.0.0 Safari/537.36',
                        },
                    },
                },
                generate: {
                    target: args[1],
                    rel: args[2].replace('rel:', ''),
                    loading: args[3].replace('loading:', ''),
                    descriptionLength,
                    className,
                    fallbackText,
                },
            }
        );
    });

    it('Specify first argument only', () => {
        const args = ['https://example.com'];
        const fallbackText = 'fallbackText';
        const config = { class_name: { anchor_link: 'link-preview' }, descriptionLength: 140, disguise_crawler: true };
        const { class_name: className, description_length: descriptionLength } = config;

        expect(getParameters(args, fallbackText, config)).toEqual(
            {
                scrape: {
                    url: args[0],
                    fetchOptions: {
                        headers: {
                            'accept': 'text/html',
                            'user-agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/112.0.0.0 Safari/537.36',
                        },
                    },
                },
                generate: { target: '_blank', rel: 'nofollow', loading: 'lazy', descriptionLength, className, fallbackText },
            }
        );
    });

    it('Specify first argument only and set disguise_crawler of config to false', () => {
        const args = ['https://example.com'];
        const fallbackText = 'fallbackText';
        const config = { class_name: { anchor_link: 'link-preview' }, descriptionLength: 140, disguise_crawler: false };
        const { class_name: className, description_length: descriptionLength } = config;

        expect(getParameters(args, fallbackText, config)).toEqual(
            {
                scrape: { url: args[0], fetchOptions: { headers: { accept: 'text/html' } } },
                generate: { target: '_blank', rel: 'nofollow', loading: 'lazy', descriptionLength, className, fallbackText },
            }
        );
    });

    it('Specify nothing arguments', () => {
        const fallbackText = 'fallbackText';
        const config = { class_name: { anchor_link: 'link-preview' }, descriptionLength: 140, disguise_crawler: true };

        expect(() => getParameters([], fallbackText, config)).toThrow(
            new Error('Scraping target url is not contains.')
        );
    });

    it('Not contains url in all specified arguments', () => {
        const args = ['_blank', 'nofollow'];
        const fallbackText = 'fallbackText';
        const config = { class_name: { anchor_link: 'link-preview' }, descriptionLength: 140, disguise_crawler: true };

        expect(() => getParameters(args, fallbackText, config)).toThrow(
            new Error('Scraping target url is not contains.')
        );
    });
});
