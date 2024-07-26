module.exports = {
  entry: './script.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
  },
  devServer: {
    port: 9001,
    host: "127.0.0.1",
    allowedHosts: "all"
  },
};