const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/admin',
  configureWebpack: config=>{
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    // resolve: {
    //    symlinks: false
    // }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      return {
          plugins: [new CompressionPlugin({
              test: /\.js$|\.html$|\.css/, //匹配文件名
              threshold: 10240, //对超过10k的数据进行压缩
              deleteOriginalAssets: false //是否删除原文件
          })]
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(args => {args.compilerOptions.whitespace = 'preserve'});

    // config.plugin('copy').tap(([options])=> {
    //   options[0].ignore.push('plugins/ckeditor4/**/*')
    //   return [options]
    // })
  },

  transpileDependencies: [
    '@coreui/utils'
  ]
}
