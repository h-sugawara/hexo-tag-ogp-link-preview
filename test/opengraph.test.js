'use strict';

const { getOgTitle, getOgDescription, getOgImage } = require('../lib/opengraph');

describe('opengraph', () => {
    it('Has a valid value at OpenGraphTitle', () => {
        const ogp = { 'ogTitle': 'test_title' };

        expect(getOgTitle(ogp)).toEqual({ valid: true, title: 'test_title' });
    });

    it('Not contains a value of OpenGraphTitle', () => {
        const ogp = {};

        expect(getOgTitle(ogp)).toEqual({ valid: false, title: '' });
    });

    it('Has a empty value at OpenGraphTitle', () => {
        const ogp = { 'ogTitle': '' };

        expect(getOgTitle(ogp)).toEqual({ valid: false, title: '' });
    });

    it('Has a invalid value at OpenGraphTitle', () => {
        const ogp = { 'ogTitle': 1000 };

        expect(getOgTitle(ogp)).toEqual({ valid: false, title: '' });
    });

    it('Has a valid value at OpenGraphDescription', () => {
        const ogp = { 'ogDescription': 'test_description' };

        expect(getOgDescription(ogp, 140)).toEqual({ valid: true, description: 'test_description' });
    });

    it('Has a valid english sentence which is over max length at OpenGraphDescription', () => {
        const ogp = { 'ogDescription': 'test_description' };

        expect(getOgDescription(ogp, 4)).toEqual({ valid: true, description: 'test...' });
    });

    it('Has a valid japanese sentence which is over max length at OpenGraphDescription', () => {
        const ogp = { 'ogDescription': '👨🏻‍💻󠁧󠁢󠁥󠁮󠁧󠁿テストの🇯🇵ですくりぷしょん🍎を書きました。' };

        expect(getOgDescription(ogp, 15)).toEqual({ valid: true, description: '👨🏻‍💻󠁧󠁢󠁥󠁮󠁧󠁿テストの🇯🇵ですくりぷしょん🍎...' });
    });

    it('Not contains a value of OpenGraphDescription', () => {
        const ogp = {};

        expect(getOgDescription(ogp, 140)).toEqual({ valid: false, description: '' });
    });

    it('Has a empty value at OpenGraphDescription', () => {
        const ogp = { 'ogDescription': '' };

        expect(getOgDescription(ogp, 140)).toEqual({ valid: false, description: '' });
    });

    it('Has a invalid value at OpenGraphDescription', () => {
        const ogp = { 'ogDescription': 1234 };

        expect(getOgDescription(ogp, 140)).toEqual({ valid: false, description: '' });
    });

    it('Has a value at OpenGraphImage', () => {
        const ogp = { 'ogImage': [{ url: 'test.png' }]};

        expect(getOgImage(ogp)).toEqual({ valid: true, image: 'test.png' });
    });

    it('Has a empty value at OpenGraphImage', () => {
        const ogp = { 'ogImage': [{ url: '' }]};

        expect(getOgImage(ogp)).toEqual({ valid: false, image: '' });
    });

    it('Has a invalid value at OpenGraphImage', () => {
        const ogp = { 'ogImage': [{ url: 1234 }]};

        expect(getOgImage(ogp)).toEqual({ valid: false, image: '' });
    });

    it('Has a value at OpenGraphImage (selectIndex is larger than length)', () => {
        const ogp = { 'ogImage': [{ url: 'test.png' }]};

        expect(getOgImage(ogp, 2)).toEqual({ valid: true, image: 'test.png' });
    });

    it('Not contains a value of OpenGraphImage', () => {
        const ogp = {};

        expect(getOgImage(ogp)).toEqual({ valid: false, image: '' });
    });

    it('Not contains a url value in OpenGraphImage', () => {
        const ogp = { 'ogImage': [{ width: 1200 }]};

        expect(getOgImage(ogp)).toEqual({ valid: false, image: '' });
    });
});
