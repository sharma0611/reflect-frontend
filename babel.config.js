module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
    env: {
        production: {
            plugins: ['transform-remove-console']
        }
    },
    plugins: [
        [
            'module-resolver',
            {
                root: ['./App'],
                extensions: ['.js', '.ios.js', '.android.js']
            }
        ],

        'transform-inline-environment-variables'
    ],

    ignore: ['web']
}
