// 참고 문서 :
// https://velog.io/@jjunyjjuny/React-TS-boilerplate-%EC%A0%9C%EC%9E%91%EA%B8%B0-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1
//
const dotenv = require('dotenv');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');

const PORT = process.env.PORT || 8080;

module.exports = (env, argv) => {
  if (argv.env.DEPLOY_TYPE) {
    dotenv.config({ path: `./.env.${argv.env.DEPLOY_TYPE}` });
  }
  const { mode } = argv;
  return {
    devtool: undefined,
    mode: 'development',
    entry: './src/index.tsx',
    stats: 'minimal',
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
      fallback: {
        net: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'esbuild-loader',
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.(jpg|png|woff|woff2|eot|ttf|otf|svg)$/,
          use: ['url-loader'],
        },
        {
          test: /\.(npy|onnx)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        hash: true,
      }),
      new DefinePlugin({
        DEPLOY_TYPE: JSON.stringify(process.env.DEPLOY_TYPE),
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: PORT,
      open: true,
      hot: true,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      proxy: {
        '/service/v1': {
          target: `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`,
          changeOrigin: true,
        },
        '/service': {
          target: `ws://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  };
};
