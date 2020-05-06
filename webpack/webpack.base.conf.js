'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PATHS = require('./paths').PATHS;

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {

    externals: {
        paths: PATHS
    },
    
    entry: {
        app: PATHS.src + '/js/index.ts'
    }, 
    output: {
        filename: NODE_ENV == 'development' ? `${PATHS.assets}js/[name].js` : `${PATHS.assets}js/[name].[contenthash].js`,
        path: PATHS.public,
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            config: {
                                path: PATHS.src + '/styles/postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            config: {
                                path: PATHS.src + '/styles/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: NODE_ENV == 'development',
                            sassOptions: {
                                includePaths: [
                                    require('path').resolve(__dirname, 'node_modules')
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            }
        ]

    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: NODE_ENV == 'development' ? `${PATHS.assets}css/[name].css` : `${PATHS.assets}css/[name].[hash].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/static`, to: '' },
            { from: `${PATHS.src}/php`, to: '' },
            { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
        ])
    ],

};