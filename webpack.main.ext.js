module.exports = function(config) {
  config.module.rules.push({
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
  });

  const path = require('path');
  const tsxRule = config.module.rules.filter(rule =>
    rule.test.toString().match(/tsx/),
  )[0];
  const tsLoader = tsxRule.use.filter(use => use.loader === 'ts-loader')[0];
  tsLoader.options.configFile = path.join(__dirname, 'tsconfig-webpack.json');

  return config;
};
