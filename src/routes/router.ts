import { createRouter, createWebHistory, Router } from "vue-router";
import ForgetPasswordPage from "../pages/ForgetPasswordPage.vue";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ResetPasswordPage from "../pages/ResetPasswordPage.vue";
import TournamentPage from "../pages/TournamentPage.vue";
import TournamentCompetitorsPage from "../pages/TournamentCompetitorsPage.vue";
import TournamentInscriptionPage from "../pages/TournamentInscriptionPage.vue";
import TournamentInscriptionEditPage from "../pages/TournamentInscriptionEditPage.vue";

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
    {
      name: "ForgetPassword",
      path: "/forget-password",
      component: ForgetPasswordPage,
    },
    {
      name: "ResetPassword",
      path: "/reset-password",
      component: ResetPasswordPage,
    },
    {
      name: "Tournament",
      path: "/tournaments/:tournamentId/",
      props: true,
      component: TournamentPage,
    },
    {
      name: "TournamentCompetitors",
      path: "/tournaments/:tournamentId/competitors",
      props: true,
      component: TournamentCompetitorsPage,
    },
    {
      name: "TournamentInscription",
      path: "/tournaments/:tournamentId/inscription",
      props: true,
      component: TournamentInscriptionPage,
    },
    {
      name: "TournamentInscriptionEdit",
      path: "/tournaments/:tournamentId/inscription/edit",
      props: true,
      component: TournamentInscriptionEditPage,
    },
  ],
});

export default AppRouter;
