module.exports = {
  presets: [
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        loose: true,
      },
    ],
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: ['@emotion/babel-plugin'],
};
