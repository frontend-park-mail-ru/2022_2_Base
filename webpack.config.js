const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './public/src/index.js',
    module: {
        rules: [
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(json)$/, use: 'cson-loader'},
            {test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader'},
            {test: /\.hbs$/, loader: 'handlebars-loader'},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource'},
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource'},
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.hbs',
        }),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'development',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/img'),
                    to: path.resolve(__dirname, 'dist/img'),
                },
            ],
        }),
        new FaviconsWebpackPlugin(path.resolve(__dirname, 'public/img/favicon.png')),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    stats: {
        errorDetails: true,
    },
};
