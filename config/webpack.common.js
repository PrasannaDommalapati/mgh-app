const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers           = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor':    './src/vendor.ts',
        'app':       './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test:    /\.ts$/,
                exclude: [
                    helpers.root('e2e'),
                ],
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            {
                test:    /\.html$/,
                exclude: [helpers.root('e2e')],
                loader:  'html-loader'

            },
            {
                test:    /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude: [helpers.root('e2e')],
                loader:  'file-loader?name=assets/[name].[hash].[ext]'

            },
            {
                test:    /\.scss$/,
                exclude: [
                    helpers.root('e2e'),
                    helpers.root('node_modules')],
                loaders: [
                    'raw-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test:    /\.css$/,
                exclude: [helpers.root('src', 'app'), helpers.root('e2e')],
                loader:  ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
            },
            {
                test:    /\.css$/,
                include: helpers.root('src', 'app'),
                exclude: [helpers.root('e2e')],
                loader:  'raw-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'),
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin(
            {
                name: ['app', 'vendor', 'polyfills']
            }
        ),

        new HtmlWebpackPlugin(
            {
                template: 'src/index.html'
            }
        ),

        new CopyWebpackPlugin(
            [
                {from: 'src/assets', to: 'assets'},
                {from: 'netlify'}
            ]
        )

    ]
};
