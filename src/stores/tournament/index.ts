import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { ResponseError } from "@/services/interfaces/reponse-error";
import { Tournament } from "@/models/tournament.model";

const toast = useToast();

export const useTournamentStore = defineStore("tournament", {
  state() {
    return {
      tournaments: [] as Tournament[],
    };
  },
  getters: {
    allTournaments(): Tournament[] {
      return this.tournaments as Tournament[];
    },
  },
  actions: {
    async loadTournaments(): Promise<void> {
      try {
        const tournaments = await this.tournamentService.getAllTournaments();

        this.tournaments = tournaments;
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      }
    },
  },
});
