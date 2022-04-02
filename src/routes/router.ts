import { createRouter, createWebHistory, Router } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";

const AppRouter: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomePage,
    },
    {
      name: "Login",
      path: "/login",
      component: LoginPage,
    },
    {
      name: "Register",
      path: "/register",
      component: RegisterPage,
    },
  ],
});

export default AppRouter;
