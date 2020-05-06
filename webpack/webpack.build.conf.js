const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const PATHS = require('./paths').PATHS;
const preamble = require('./preamble');

const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AssetsManifest = require('webpack-assets-manifest');

const buildWebpackConfig = merge(baseWebpackConfig, {

    mode: 'production',

    optimization: {
        minimize: true,
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: false,
                        keep_fargs: false,
                        passes: 1
                    },
                    ecma: 5,
                    mangle: true,
                    output: {
                        beautify: false,
                        comments: false,
                        preamble: preamble
                    }
                }
            })
        ],
        usedExports: true,
        sideEffects: true
    },

    plugins: [
        new CleanWebpackPlugin({
            verbose: false,
            cleanStaleWebpackAssets: true,
            dry: false,
        }),
        new ImageminPlugin({
            disable: false,
            pngquant: {
                quality: '95-100'
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'BundleAnalyzer.html',
            openAnalyzer: false
        }),
        new AssetsManifest({
            output: PATHS.public + '/assets-manifest.json',
            publicPath: true,
        }),
    ]   

});

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig);
});