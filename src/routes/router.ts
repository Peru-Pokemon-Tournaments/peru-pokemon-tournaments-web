import { createRouter, createWebHistory, Router } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
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
