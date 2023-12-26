'use strict';

const { stringLength, stringSlice } = require('../lib/strings');

describe('common', () => {
    it('Calculate a length of string', () => {
        expect(stringLength('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎')).toEqual(14);
    });

    it('Cannot calculate a length of except for string', () => {
        expect(() => stringLength(0)).toThrow(new Error('text is not string type.'));
    });

    it('Slice a string', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', 0, 3)).toEqual('aBあ');
    });

    it('Cannot slice a value except for string', () => {
        expect(() => stringSlice(0)).toThrow(new Error('text is not string type.'));
    });

    it('Slice a string (start is not number type)', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', 'hoge', 5)).toEqual('aBあア亞');
    });

    it('Slice a string (start is smaller than zero)', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', -5, 13)).toEqual('%+👨🏻‍💻🇯🇵');
    });

    it('Slice a string (end calculate automatically)', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', 7)).toEqual('19%+👨🏻‍💻🇯🇵🍎');
    });

    it('Slice a string (end is smaller than zero)', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', 7, -4)).toEqual('19%');
    });

    it('Slice a string (end is smaller than start)', () => {
        expect(stringSlice('aBあア亞　 19%+👨🏻‍💻🇯🇵🍎', -1, -2)).toEqual('');
    });
});
