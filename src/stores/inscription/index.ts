import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { ResponseError } from "@/services/interfaces/reponse-error";
import { TournamentInscription } from "@/models/tournament-inscription.model";
import { useUserStore } from "../user";
import { useTournamentStore } from "../tournament";

const toast = useToast();

export const useInscriptionStore = defineStore("inscription", {
  state() {
    return {
      inscription: null as TournamentInscription | null,
      loadingCreateInscription: false as boolean,
    };
  },
  getters: {
    myInscription(): TournamentInscription {
      return this.inscription as TournamentInscription;
    },
    isLoadingCreateInscription(): boolean {
      return this.loadingCreateInscription;
    },
  },
  actions: {
    async createInscription(team: string): Promise<void> {
      const userStore = useUserStore();
      const tournamentStore = useTournamentStore();

      if (!userStore.isLoggedIn || !tournamentStore.hasSelectedTournament) {
        return;
      }

      this.loadingCreateInscription = true;

      try {
        const { inscription, message } =
          await this.inscriptionService.enrollToTournament(
            userStore.loggedUser!.competitor.id,
            tournamentStore.selectedTournament!.tournament.id,
            team
          );

        this.inscription = inscription;

        toast.success(message);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      } finally {
        this.loadingCreateInscription = false;
      }
    },
  },
});
