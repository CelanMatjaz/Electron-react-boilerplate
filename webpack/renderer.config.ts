import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import common from './common.config';

const isProd = process.env.NODE_ENV === 'production';

const srcDir = path.resolve('./src');
const rendererDir = path.join(srcDir, 'renderer');
const rendererEntry = path.join(rendererDir, 'index.tsx');

const buildDir = path.resolve('./build');
const outputDir = path.join(buildDir, isProd ? 'dist' : 'debug', 'public');

const templatePath = path.resolve('src/renderer/template.html');

export default (): webpack.Configuration =>
  merge(common(), {
    target: 'electron-renderer',
    entry: rendererEntry,
    output: {
      path: outputDir,
      filename: 'renderer.js',
      publicPath: isProd ? undefined : 'http://localhost:8080/public',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './build'),
          ],
          use: [
            { loader: 'babel-loader' },
            { loader: 'awesome-typescript-loader' },
          ],
        },
        {
          test: /\.(s?css|sass)$/,
          exclude: ['/node_modules'],
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { minify: true } },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    /// @ts-ignore
    plugins: [
      ...common().plugins!,
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        template: templatePath,
        filename: 'index.html',
      }),
      !isProd && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: isProd
      ? undefined
      : {
          hot: true,
          hotOnly: true,
          // Should to be the same as the path in the output
          contentBase: outputDir,
          // Should to be the same as the publicPath in the output
          publicPath: 'http://localhost:8080/public',
        },
  });
