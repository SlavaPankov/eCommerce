const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = !IS_DEV;
const GLOBAL_SCSS_REGEXP = /\.global\.scss$/;

const filename = (ext) => (IS_DEV ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  mode: IS_DEV ? 'development' : 'production',
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename('js')}`,
    assetModuleFilename: `assets/${filename('[ext]')}`
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8081
  },
  devtool: IS_PROD ? false : 'source-map',
  module: {
    rules: [
      {
        test: /.html$/,
        use: ['html-loader']
      },
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './src/styles/vars.scss')]
            }
          }
        ],
        exclude: GLOBAL_SCSS_REGEXP
      },
      {
        test: GLOBAL_SCSS_REGEXP,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './src/styles/vars.scss')]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './src/styles/vars.scss')]
            }
          }
        ]
      },
      {
        test: /\.(?:ico|png|jpeg|jpg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `images/${filename('[ext]')}`
        }
      },
      {
        test: /\.(?:|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `fonts/${filename('[ext]')}`
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new EslintWebpackPlugin({ extensions: ['ts', 'tsx', 'js', 'jsx'] }),
    new webpack.DefinePlugin({
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.SECRET': JSON.stringify(process.env.SECRET)
    })
  ]
};
