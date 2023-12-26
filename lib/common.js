'use strict';

function hasProperty(obj, key) {
    return obj && Object.hasOwnProperty.call(obj, key);
}

function hasTypeOfProperty(obj, key, type) {
    return hasProperty(obj, key) && typeof obj[key] === type;
}

function getObjectValueFrom(obj, key, type, defaultValue) {
    return hasTypeOfProperty(obj, key, type) ? obj[key] || defaultValue : defaultValue;
}

function getValidNumber(value, defaultValue) {
    return typeof value !== 'number' || isNaN(Number(value)) ? defaultValue : Number(value);
}

module.exports = {
    hasProperty,
    hasTypeOfProperty,
    getObjectValueFrom,
    getValidNumber,
};
