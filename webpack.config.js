const path = require('path');
const Handlebars = require('handlebars');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
     main:  './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.png'],
     /*   alias: {
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@': path.resolve(__dirname, 'src'),
            '@images': path.resolve(__dirname, 'src/images'),
            '@components': path.resolve(__dirname, 'src/components'),
        }*/
    },
    plugins: [
        new HTMLWebpackPlugin({
                template: "./src/index.html"
            }
        ),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, './static/images'),
                to: path.resolve(__dirname, 'dist/images')
            }]
        }
        )
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        port: 4000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },{
                        loader: 'css-loader',
                    },{
                        loader: 'less-loader',
                    },
                ]

            },
            {
            test: /\.(png|jpeg|svg|gif)$/,
            use: ['file-loader']
            }
        ]
    },
};


