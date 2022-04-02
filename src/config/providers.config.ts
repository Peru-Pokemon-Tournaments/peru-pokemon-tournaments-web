import { ApiAuthService, AuthService } from "@/services/auth.service";
import {
  ApiTournamentService,
  TournamentService,
} from "@/services/tournament.service";
import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create();

const authService: AuthService = new ApiAuthService(httpClient);
const tournamentService: TournamentService = new ApiTournamentService(
  httpClient
);

const ServiceProvider = {
  authService,
  tournamentService,
};

export default ServiceProvider;
