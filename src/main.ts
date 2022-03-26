import { createApp } from "vue";
import { createPinia } from "pinia";
import AppRouter from "./routes/router";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(AppRouter);

app.mount("#app");
