import { join } from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    devServer: {
        compress: true,
        contentBase: join(__dirname, "."),
        port: 9000,
    },
    devtool: "source-map",
    entry: "./src/index.tsx",
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ],
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
};

export default config;
