'use strict';

const { hasProperty, hasTypeOfProperty, getObjectValueFrom, getValidNumber } = require('../lib/common');

describe('common', () => {
    it('Has a property at object', () => {
        const obj = { 'test_key': 'test_value' };

        expect(hasProperty(obj, 'test_key')).toBeTruthy();
    });

    it('Has not a property at object', () => {
        const obj = { 'test_key': 'test_value' };

        expect(hasProperty(obj, 'not_test_key')).toBeFalsy();
    });

    it('Has a property at object which string type', () => {
        const obj = { 'test_key': 'test_value' };

        expect(hasTypeOfProperty(obj, 'test_key', 'string')).toBeTruthy();
    });

    it('Has a property at object which except for string type', () => {
        const obj = { 'test_key': 1234 };

        expect(hasTypeOfProperty(obj, 'test_key', 'string')).toBeFalsy();
    });

    it('Get a value of property at object which string type successfully', () => {
        const obj = { 'test_key': 'test_value' };

        expect(getObjectValueFrom(obj, 'test_key', 'string', 'default_value')).toEqual('test_value');
    });

    it('Get a default value which specified because fail to get a value of object property', () => {
        const obj = { 'test_key': 1234 };

        expect(getObjectValueFrom(obj, 'test_key', 'string', 'default_value')).toEqual('default_value');
    });

    it('Get a valid number from specified value successfully', () => {
        expect(getValidNumber(1234, 9876)).toEqual(1234);
    });

    it('Get a default number which specified because value is not valid number', () => {
        expect(getValidNumber('test_value', 9876)).toEqual(9876);
    });
});
