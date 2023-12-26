# hexo-tag-ogp-link-preview

A Hexo tag plugin for embedding link preview by OpenGraph on article.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Lint and Test](https://github.com/h-sugawara/hexo-tag-ogp-link-preview/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/h-sugawara/hexo-tag-ogp-link-preview/actions/workflows/lint-and-test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/02bc45163475aa8580c8/maintainability)](https://codeclimate.com/github/h-sugawara/hexo-tag-ogp-link-preview/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/02bc45163475aa8580c8/test_coverage)](https://codeclimate.com/github/h-sugawara/hexo-tag-ogp-link-preview/test_coverage)

## Installation

```bash
npm install hexo-tag-ogp-link-preview
```

## Usage

Write like below to your hexo article markdown file:
```
{% link_preview url [target] [rel] [loading] %}
[Content]
{% endlink_preview %}
```

or you are able to use "Named Parameter":

```
{% link_preview url [rel:{rel_value}] [target:{target_value}] [loading:{loading_value}] %}
[Content]
{% endlink_preview %}
```

### Tag arguments

Notice: All optionally parameters (except for the required `url` parameter) are able to use "Named Parameter".

| Name      | Required? | Default    | Description                                                                                                                                                    |
|-----------|-----------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`     | Yes       |            | This parameter is a target of the link preview.                                                                                                                |
| `target`  | No        | `_blank`   | Specify a `target` attribute of the anchor element.<br>One of `_self`, `_blank`, `_parent`, or `_top`.                                                         |
| `rel`     | No        | `nofollow` | Specify a `rel` attribute of the anchor element.<br>One of `external`, `nofollow`, `noopener`, `noreferrer`, or `opener`.                                      |
| `loading` | No        | `lazy`     | Specify a `loading` attribute of the image element.<br>One of `lazy`, `eager`, or `none`.<br>If specify a `none`, remove loading attribute from image element. |

### Tag content

`content` is fallback text which use when failed to get OpenGraph data from `url`.

## Configuration

You write like below to hexo configuration file `_config.yml`:

```yaml
link_preview:
  class_name:
    anchor_link: link-preview
    image: not-gallery-item
  description_length: 140
  disguise_crawler: true
```

### Setting values

Notice: All setting values are NOT required.

| Name                       | type                 | Default        | Description                                                                                                                                                                                    |
|----------------------------|----------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `class_name`               | `string` or `object` | `link-preview` | If you are specified `string`, set a `class` attribute of the anchor element only.<br>If you are specified `object`, set each a `class` attribute of the anchor element and the image element. |
| `class_name`.`anchor_link` | `string`             | `link-preview` | Set a `class` attribute of the anchor element.                                                                                                                                                 |
| `class_name`.`image`       | `string`             |                | Set a `class` attribute of the image element.<br>If you are not specify (empty string, etc.), nothing to set.                                                                                  |
| `description_length`       | `number`             | `140`          | It sliced to fit if a number of character of the `og:Description` exceeds the specified number value.                                                                                          |
| `disguise_crawler`         | `boolean`            | `true`         | If scraper for OpenGraph want to disguise to crawler, set `true`.<br>Otherwise, set to `false`.                                                                                                |

## Example

Write a following to your hexo article markdown file:

```markdown
{% link_preview http://www.example.com/ loading:lazy %}
fallback Text
{% endlink_preview %}
```

When scraper get OpenGraph successfully, generated html like blow:
```html
<a href="http://www.example.com/" target="_blank" rel="nofollow" class="link-preview">
    <div class="og-image">
        <img src="https://www.example.com/image.png" alt="example image" class="not-gallery-item" loading="lazy">
    </div>
    <div class="descriptions">
        <div class="og-title">title text</div>
        <div class="og-description">description text</div>
    </div>
</a>
```

When scraper fail to get OpenGraph, generated html like blow:
```html
<a href="http://www.example.com/">fallback Text</a>
```
