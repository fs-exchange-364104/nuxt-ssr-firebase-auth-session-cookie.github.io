require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  ssr: true,

  target: 'server',

  head: {
    title: 'tangme',
    meta: [
      { charset: 'utf-8' }
    ]
  },

  components: true,

  css: [],

  plugins: [],

  buildModules: [],

  modules: [],

  router: {
    middleware: []
  },

  build: {
    transpile: ['axios'],
    extractCSS: process.env.NODE_ENV === 'production',
    postcss: {
      
    },
    cssSourceMap: false,
    cssOptimization: {},
    optimization: {
      splitChunks: {
        chunks: 'all',
        runtimeChunk: true,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        maxSize: 244000
      }
    }
  }
};
