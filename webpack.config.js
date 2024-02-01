const path = require('path');

module.exports = {
    target: 'node',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
};