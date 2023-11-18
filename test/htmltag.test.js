'use strict';

const { newHtmlDivTag, newHtmlAnchorTag, newHtmlImgTag } = require('../lib/htmltag');

describe('htmlTag', () => {
    it('Generate a new html div tag', () => {
        expect(newHtmlDivTag('div-class', 'text')).toEqual(
            '<div class="div-class">text</div>'
        );
    });

    it('Generate a new html anchor tag', () => {
        const url = 'http://example.com/';
        const content = 'text';
        const config = {
            target: '_blank',
            rel: 'nofollow',
            className: { anchor_link: 'anchor-class' },
            fallbackText: content,
        };

        expect(newHtmlAnchorTag(url, config, content)).toEqual(
            `<a href="${url}" target="${config.target}" rel="${config.rel}" class="${config.className.anchor_link}">${content}</a>`
        );
    });

    it('Generate a new html anchor tag with fallbackText', () => {
        const url = 'http://example.com/';
        const config = {
            target: '_blank',
            rel: 'nofollow',
            className: { anchor_link: 'anchor-class' },
            fallbackText: 'fallbackText',
        };

        expect(newHtmlAnchorTag(url, config)).toEqual(
            `<a href="${url}" target="${config.target}" rel="${config.rel}">${config.fallbackText}</a>`
        );
    });

    it('Failed to generate a new html anchor tag', () => {
        const url = 'http://example.com/';
        const config = {
            target: '_blank',
            rel: 'nofollow',
            className: { anchor_link: 'anchor-class' },
        };

        expect(() => newHtmlAnchorTag(url, config)).toThrow(
            new Error('failed to generate a new anchor tag.')
        );
    });

    it('Generate a new html image tag', () => {
        const url = 'http://example.com/';
        const config = {
            className: { image: 'image-class' },
        };

        expect(newHtmlImgTag(url, config)).toEqual(
            `<img src="${url}" class="${config.className.image}"></img>`
        );
    });

    it('Generate a new html image tag without class name', () => {
        const url = 'http://example.com/';
        const config = {};

        expect(newHtmlImgTag(url, config)).toEqual(
            `<img src="${url}"></img>`
        );
    });
});
