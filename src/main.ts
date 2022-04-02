import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "datejs";

import App from "./App.vue";
import AppRouter from "./routes/router";
import ServiceProvider from "./config/providers.config";

const app = createApp(App);

const pinia = createPinia();

pinia.use(() => {
  return {
    ...ServiceProvider,
  };
});

app.use(pinia);
app.use(Toast);
app.use(AppRouter);

app.mount("#app");
