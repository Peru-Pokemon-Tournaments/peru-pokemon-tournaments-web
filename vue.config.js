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
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          VUE_APP_API_DOMAIN: process.env.VUE_APP_API_DOMAIN,
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Perú Pokémon Tournaments";
      return args;
    });
  },
});
