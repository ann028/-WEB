module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      // '/api': {
      //   target: 'http://118.190.84.130:9080',
      //   changOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/api': '',
      //   },
      // },
      '/api': {
        target: 'http://192.168.41.225/api',
        changOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
