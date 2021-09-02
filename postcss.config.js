module.exports = ctx => {
  const isProd = ctx.env === 'production';

  const plugins = [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      preserve: false
    }),
    require('postcss-calc'),
    require('postcss-sort-media-queries')
  ];

  if (isProd) {
    plugins.push(require('cssnano')({
      preset: 'default',
    }));
  }

  return {
    map: !isProd,
    verbose: true,
    plugins
  };
};
