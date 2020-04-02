module.exports = function(config) {
  const tsxRule = config.module.rules.filter(rule =>
    rule.test.toString().match(/tsx/),
  )[0];
  const tsLoader = tsxRule.use.filter(use => use.loader === 'ts-loader')[0];
  tsLoader.options.configFile = 'tsconfig-webpack.json';

  return config;
};
