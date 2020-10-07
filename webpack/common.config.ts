import * as webpack from 'webpack';

const isProd = process.env.NODE_ENV === 'production';

export default (): webpack.Configuration => ({
  mode: isProd ? 'production' : 'development',
  devtool: !isProd ? '#source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      ),
    }),
  ],
});
