const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const config = {
    entry: './public/src/index.js',
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(json)$/, use: 'cson-loader'},
            {test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader'},
            {test: /\.hbs$/, loader: 'handlebars-loader'},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource'},
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            jpeg: {
                                quality: 100,
                            },
                            webp: {
                                lossless: true,
                            },
                            avif: {
                                lossless: true,
                            },
                            png: {},
                            gif: {},
                        },
                    },
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                        encodeOptions: {
                            multipass: true,
                            plugins: [
                                'preset-default',
                            ],
                        },
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.hbs',
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
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'production' || env.mode === 'production') {
        config.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        });
        config.mode = 'production';
    } else {
        config.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        });
        config.devtool = 'source-map';
        config.devServer = {
            hot: true,
            historyApiFallback: true,
            static: path.join(__dirname, 'dist'),
            client: {
                logging: 'info',
                overlay: true,
                progress: true,
                reconnect: 3,
            },
            compress: true,
            port: 8081,
        };
        config.stats = {
            errorDetails: true,
        };
        config.mode = 'development';
    }

    return config;
};
