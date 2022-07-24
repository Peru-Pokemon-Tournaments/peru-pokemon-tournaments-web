export const API_DOMAIN: string =
  process.env.VUE_APP_API_DOMAIN ?? "http://localhost:8000";
export const REGISTER_USER_URI: string = "/api/register";
export const LOGIN_URI: string = "/api/login";
export const GET_ALL_TOURNAMENTS: string = "/api/tournaments";
export const GET_COMPLETE_TOURNAMENT: string = "/api/tournaments/:tournamentId";
export const CHECK_ENROLL: string =
  "/api/tournaments/:tournamentId/competitors/:competitorId/is-enrolled";
export const ENROLL_TO_TOURNAMENT: string =
  "/api/tournaments/:tournamentId/inscriptions";
export const GET_COMPETITORS_IN_TOURNAMENT: string =
  "/api/tournaments/:tournamentId/inscriptions";
export const GET_TOURNAMENT_INSCRIPTION: string =
  "/api/tournaments/:tournamentId/competitors/:competitorId/inscription";
export const GET_TOURNAMENT_RESULTS: string =
  "/api/tournaments/:tournamentId/results";
export const GET_TOURNAMENT_RESULT_CERTIFICATE: string =
  "/api/tournament-results/:tournamentResultId/certificate";
export const DELETE_TOURNAMENT_INSCRIPTION: string =
  "/api/tournaments/:tournamentId/competitors/:competitorId/inscription";
export const UPDATE_TOURNAMENT_INSCRIPTION: string =
  "/api/inscriptions/:inscriptionId";
export const RESET_PASSWORD: string = "/api/users/password/reset";
export const UPDATE_PASSWORD: string = "/api/users/password";
