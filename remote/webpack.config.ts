import * as webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import { dependencies } from './package.json';
const { ModuleFederationPlugin } = webpack.container;

const config: webpack.Configuration = {
    entry: './src/index',
    mode: 'development',
    // @ts-ignore
    devServer: {
        port: 4000,
        static: { 
            directory: path.resolve(path.dirname(''), './public'), 
            publicPath: '/static'
        }
    },
    module: {
        rules: [
            {
                test: /\.([tj]s|[tj]sx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new InterpolateHtmlPlugin({ PUBLIC_URL: 'static' }),   
        new ModuleFederationPlugin({
            name: 'Remote',
            filename: 'moduleEntry.js',
            exposes: {
                "./App": "./src/App",
                "./Button": "./src/components/button/Button",
              },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies['react']
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom']
                }
            }
        })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    target: 'web',
}

export default config;