'use strict';

function hasProperty(obj, key) {
    return obj && Object.hasOwnProperty.call(obj, key);
}

function stringLength(text) {
    if (typeof text !== 'string') {
        throw new Error('text is not string type.');
    }

    const segmentation = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    return [...segmentation.segment(text)].length;
}

function stringSlice(text, start, end) {
    if (typeof text !== 'string') {
        throw new Error('text is not string type.');
    }

    const strLength = stringLength(text);

    let startIndex = typeof start !== 'number' || isNaN(Number(start)) ? 0 : Number(start);
    if (startIndex < 0) {
        startIndex = Math.max(startIndex + strLength, 0);
    }

    let endIndex = typeof end !== 'number' || isNaN(Number(end)) ? strLength : Number(end);
    if (endIndex >= strLength) {
        endIndex = strLength;
    } else if (endIndex < 0) {
        endIndex = Math.max(endIndex + strLength, 0);
    }

    let strings = '';

    if (startIndex >= strLength || endIndex <= startIndex) {
        return strings;
    }
    const segmentation = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    [...segmentation.segment(text)]
        .forEach((value, index) => {
            if (startIndex <= index && index < endIndex) {
                strings += value.segment;
            }
        });
    return strings;
}

module.exports = {
    hasProperty,
    stringLength,
    stringSlice,
};
