import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';

import common from './common.config';

const isProd = process.env.NODE_ENV === 'production';

const srcDir = path.resolve('./src');
const mainDir = path.join(srcDir, 'main');
const mainEntry = path.join(mainDir, 'index.ts');

const buildDir = path.resolve('build');
const outputDir = path.join(buildDir, isProd ? 'dist' : 'debug');

export default (): webpack.Configuration =>
  merge(common(), {
    target: 'electron-main',
    entry: mainEntry,
    output: {
      path: outputDir,
      filename: 'main.js',
      publicPath: '/public',
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: ['/node_modules'],
          use: [
            { loader: 'babel-loader' },
            { loader: 'awesome-typescript-loader' },
          ],
        },
      ],
    },
  });
