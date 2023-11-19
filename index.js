'use strict';

const ogs = require('open-graph-scraper');

const getConfig = require('./lib/configure');
const getParameters = require('./lib/parameters');
const generate = require('./lib/generator');

hexo.extend.tag.register(
    'link_preview',
    (args, content) => {
        return generate(ogs, getParameters(args, content, getConfig(hexo.config)))
            .then(tag => tag)
            .catch(error => {
                console.log('generate error:', error);
                return '';
            });
    },
    {
        async: true,
        ends: true,
    }
);
