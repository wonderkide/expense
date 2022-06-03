const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8079,
    "/": {
      target: "http://localhost:9999/",
      ws: false
    },
  }
})


