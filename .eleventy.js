const yaml = require('js-yaml');
const addHash = require('./eleventy/filters/add-hash');
const i18n = require('./eleventy/filters/i18n');
const newline2br = require('./eleventy/filters/newline-to-br');
const getSameAsLinks = require('./eleventy/filters/same-as-links');
const footerLinks = require('./eleventy/filters/footer-links');
const commentFormat = require('./eleventy/filters/comment-format');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  eleventyConfig.addNunjucksAsyncFilter('addHash', addHash);
  eleventyConfig.addNunjucksFilter('i18n', i18n);
  eleventyConfig.addNunjucksFilter('newline2br', newline2br);
  eleventyConfig.addNunjucksFilter('sameAs', getSameAsLinks);
  eleventyConfig.addNunjucksFilter('footerLinks', footerLinks);
  eleventyConfig.addNunjucksFilter('commentFormat', commentFormat);

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img');
  eleventyConfig.addPassthroughCopy('./src/static/fonts');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');

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
