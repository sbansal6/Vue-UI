var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                babel: {
                    "presets": ["es2015"],
                    "plugins": ["transform-runtime"]
                },
            }
        })
    ]

}