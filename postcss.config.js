module.exports = ctx => {
  const isProd = ctx.env === 'production';

  const plugins = [
    require('postcss-import'),
    require('postcss-calc'),
    require('postcss-custom-media'),
    require('postcss-custom-selectors'),
    require('postcss-media-minmax'),
    require('postcss-nesting'),
    require('postcss-sort-media-queries'),
  ];

  if (isProd) {
    const cssnano = require('cssnano');
    const plugin = cssnano({ preset: 'default' });
    plugins.push(plugin);
  }

  return {
    map: !isProd,
    verbose: true,
    plugins,
  };
};
