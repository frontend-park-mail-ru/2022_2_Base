const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const webPackConfig = {
    entry: {
        'app': './public/src/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {test: /\.(json)$/, use: 'cson-loader'},
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
            {
                test: /\.([cm]?ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
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
                            png: {
                                lossless: true,
                            },
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
        new FaviconsWebpackPlugin(path.resolve(__dirname, 'public/img/favicon.webp')),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new StylelintPlugin({
            configFile: 'stylelint.config.js',
            extensions: ['scss'],
            exclude: ['node_modules', 'dist'],
            fix: true,
            failOnWarning: true,
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('https://www.reazon.ru/api/v1/'),
                    handler: 'NetworkFirst',
                    options: {cacheName: 'api-cache'},
                },
                {
                    urlPattern: new RegExp('https://www.reazon.ru/img/'),
                    handler: 'CacheFirst',
                    options: {cacheName: 'images-cache', expiration: {maxEntries: 10}},
                },
                {
                    urlPattern: new RegExp('https://img.mvideo.ru/'),
                    handler: 'CacheFirst',
                    options: {cacheName: 'images-cache', expiration: {maxEntries: 10}},
                },
            ],
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'production' || env.mode === 'production') {
        webPackConfig.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        });
        webPackConfig.mode = 'production';
    } else {
        webPackConfig.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        });
        webPackConfig.devtool = 'source-map';
        webPackConfig.devServer = {
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
        webPackConfig.stats = {
            errorDetails: true,
        };
        webPackConfig.mode = 'development';
    }

    return webPackConfig;
};
