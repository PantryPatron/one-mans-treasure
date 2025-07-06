// var path = require("path");
// var SRC_DIR = path.join(__dirname, "/client/src");
// var DIST_DIR = path.join(__dirname, "/client/dist");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// module.exports = {
//     entry: `${SRC_DIR}/index.jsx`,
//     output: {
//         filename: "bundle.js",
//         path: DIST_DIR,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 include: SRC_DIR,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: ["react", "es2015", "stage-1"],
//                     },
//                 },
//             },
//             {
//                 test: /\.less$/,
//                 include: SRC_DIR,
//                 use: ExtractTextPlugin.extract({
//                     use: ["css-loader", "less-loader"],
//                 }),
//             },
//         ],
//     },
//     plugins: [
//         new ExtractTextPlugin({
//             filename: "[name].[contenthash].css",
//         }),
//     ],
// };
