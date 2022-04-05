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
      loadingUpdateInscription: false as boolean,
      loadingInscription: false as boolean,
    };
  },
  getters: {
    myInscription(): TournamentInscription {
      return this.inscription as TournamentInscription;
    },
    isLoadingCreateInscription(): boolean {
      return this.loadingCreateInscription;
    },
    isLoadingUpdateInscription(): boolean {
      return this.loadingUpdateInscription;
    },
    isLoadingInscription(): boolean {
      return this.loadingInscription;
    },
    hasInscription(): boolean {
      return this.inscription !== null;
    },
  },
  actions: {
    async loadInscription(): Promise<void> {
      const userStore = useUserStore();
      const tournamentStore = useTournamentStore();

      if (!userStore.isLoggedIn || !tournamentStore.hasSelectedTournament) {
        return;
      }

      this.loadingInscription = true;

      try {
        this.inscription = await this.inscriptionService.getInscription(
          userStore.loggedUser!.competitor.id,
          tournamentStore.selectedTournament!.tournament.id
        );
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      } finally {
        this.loadingInscription = false;
      }
    },
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
    async updateInscription(team: string): Promise<void> {
      if (!this.hasInscription) {
        return;
      }

      this.loadingUpdateInscription = true;

      try {
        const { inscription, message } =
          await this.inscriptionService.updateInscription(
            this.inscription!.id,
            team
          );

        this.inscription = inscription;

        toast.success(message);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      } finally {
        this.loadingUpdateInscription = false;
      }
    },
    async deleteInscription(): Promise<void> {
      const userStore = useUserStore();
      const tournamentStore = useTournamentStore();

      if (!userStore.isLoggedIn || !tournamentStore.hasSelectedTournament) {
        return;
      }

      try {
        const message = await this.inscriptionService.deleteInscription(
          userStore.loggedUser!.competitor.id,
          tournamentStore.selectedTournament!.tournament.id
        );

        this.inscription = null;
        userStore.loadEnrollment(
          tournamentStore.selectedTournament!.tournament.id
        );

        toast.success(message);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      }
    },
  },
});
