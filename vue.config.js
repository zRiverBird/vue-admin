const path = require('path');

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "service/dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: (config) => {
    config.resolve = {
      // 配置解析别名
      //自动添加后缀名
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        public: path.resolve(__dirname, "./public"),
        components: path.resolve(__dirname, "./src/components"),
        common: path.resolve(__dirname, "./src/common"),
        api: path.resolve(__dirname, "./src/api"),
        views: path.resolve(__dirname, "./src/views"),
        data: path.resolve(__dirname, "./src/data")
      }
    };
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see vuejs/vue-cli
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/gxyundata": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: {
          "^/gxyundata": "/gxyundata",
        },
      },
    }, // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};
