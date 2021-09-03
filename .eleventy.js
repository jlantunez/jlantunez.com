const yaml = require('js-yaml');
const htmlmin = require('html-minifier');
const addHash = require('./eleventy/filters/add-hash');
const i18n = require('./eleventy/filters/i18n');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  eleventyConfig.addNunjucksAsyncFilter('addHash', addHash);
  eleventyConfig.addNunjucksFilter('i18n', i18n);

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        sortClassName: true,
        sortAttributes: true,
        html5: true,
        decodeEntities: true,
        minifyCSS: true,
      });
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'liquid',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
