const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer'),
      os: require.resolve('os-browserify/browser')
    }
  }
};
