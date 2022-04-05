const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_config.scss";
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [new webpack.EnvironmentPlugin(["VUE_APP_API_DOMAIN"])],
  },
});
