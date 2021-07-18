module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: 'usage',
          targets: '> 1.5%',
          corejs: { version: 3, proposals: true },
        },
      },
    ],
  ],
  plugins: [
    [
      'inline-dotenv',
      {
        path: '.env',
        systemVar: 'disable',
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: './',
        alias: {
          components: './components',
          lib: './lib',
          public: './public',
          stores: './stores',
          styles: './styles',
          template: './template',
        },
      },
    ],
  ],
};
