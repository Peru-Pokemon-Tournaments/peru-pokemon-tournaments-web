import "pinia";
import { AuthService } from "./services/auth.service";
import { InscriptionService } from "./services/inscription.service";
import { TournamentService } from "./services/tournament.service";

declare module "pinia" {
  export interface PiniaCustomProperties {
    authService: AuthService;
    tournamentService: TournamentService;
    inscriptionService: InscriptionService;
  }
}
