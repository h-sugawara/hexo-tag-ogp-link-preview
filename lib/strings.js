'use strict';

const { getValidNumber } = require('./common');

function getStringSegmentOf(text) {
    const segmentation = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    return [...segmentation.segment(text)];
}

function stringLength(text) {
    if (typeof text !== 'string') {
        throw new Error('text is not string type.');
    }

    return getStringSegmentOf(text).length;
}

function getStartIndex(start, strLength) {
    const startIndex = getValidNumber(start, 0);
    return startIndex < 0 ? Math.max(startIndex + strLength, 0) : startIndex;
}

function getEndIndex(end, strLength) {
    const endIndex = getValidNumber(end, strLength);
    if (endIndex >= strLength) {
        return strLength;
    }
    return endIndex < 0 ? Math.max(endIndex + strLength, 0) : endIndex;
}

function stringSlice(text, start, end) {
    if (typeof text !== 'string') {
        throw new Error('text is not string type.');
    }

    const strLength = stringLength(text);
    const startIndex = getStartIndex(start, strLength);
    const endIndex = getEndIndex(end, strLength);

    if (startIndex >= strLength || endIndex <= startIndex) {
        return '';
    }
    return getStringSegmentOf(text)
        .map((element, index) => {
            return startIndex <= index && index < endIndex ? element.segment : '';
        })
        .join('');
}

module.exports = {
    stringLength,
    stringSlice,
};
