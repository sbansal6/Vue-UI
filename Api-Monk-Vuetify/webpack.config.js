const path = require('path');
const PATHS = {
    app: path.resolve(__dirname,'app'),
    build: path.resolve(__dirname,'build')
};
module.exports = {
    entry: {
        app: PATHS.app + "/index.js"
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader?presets[]=es2015,presets[]=stage-3,plugins[]=transform-runtime'
                    },
                    autoprefixer: true
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader','css-loader']
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]

    },
    node: {
        fs: 'empty'
    }
};