'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dayjs = require('dayjs')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '综合视频管理平台' // page title
// 构建dist.zip 包名
const packageName = `${name}_测试_v1.0.0_${dayjs().format('YYYY年MM月DD日HH时mm分')}`
// 将之前的plugins提出来封装成一个函数
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())

function getPlugins() {
  const plugins = [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      APP_VERSION: `"${require('./package.json').version}"`,
      BUILD_DATE: buildDate
    })
  ]

  return plugins
}
const port = process.env.port || process.env.npm_config_port || 8081 // dev port
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    hot: true, // 自动保存
    compress: true, // 启用 gzip compression
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        // target: 'http://192.168.0.133:8000', // 测试环境
        target: 'http://8.142.150.108:8000', // 测试环境
        // target: 'http://vss.jyipm.com:1733', // 测试环境
        changeOrigin: true, // 是否跨域
        secure: true, // 设置支持https协议的代理
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    config.module.rules.filter(rule => {
      return rule.test.toString().indexOf('scss') !== -1
    })
      .forEach(rule => {
        rule.oneOf.forEach(oneOfRule => {
          oneOfRule.use.splice(oneOfRule.use.indexOf(require.resolve('sass-loader')), 0, {
            loader: require.resolve('css-unicode-loader')
          })
        })
      })
    // 获取plugins函数的内容
    const plugins = getPlugins()
    // 开发生产共同配置别名
    config.resolve = {
      ...config.resolve,
      alias: {
        '@': resolve('src')
      }
    }
    // 这里要返回一个对象
    return {
      plugins
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('html')
      .tap(args => {
        args[0].title = name
        return args
      })
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      // filemanager-webpack-plugin 压缩dist目录
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('fileManager').use(FileManagerPlugin).tap(args => [{
        events: {
          onEnd: {
            // 首先需要删除项目根目录下的dist.zip
            delete: [
              `./dist.zip`
            ],
            archive: [ // 选择文件夹将之打包成xxx.zip并放在根目录
              { source: `./dist`, destination: `./dist/${packageName}.zip` }
            ]
          }
        }
      }])
    }
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',	// 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 3,		// 单位转换后保留的精度
            propList: [		// 能转化为vw的属性列表
              '*'
            ],
            viewportUnit: 'vw',		// 希望使用的视口单位
            fontViewportUnit: 'vw',		// 字体使用的视口单位
            selectorBlackList: [],	// 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1,		// 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,		// 媒体查询里的单位是否需要转换单位
            replace: true,		// 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/		// 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    }
  }
}
