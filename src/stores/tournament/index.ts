import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { ResponseError } from "@/services/interfaces/reponse-error";
import { Tournament } from "@/models/tournament.model";
import { CompleteTournament } from "@/models/complete-tournament.model";
import { Competitor } from "@/models/competitor.model";

const toast = useToast();

export const useTournamentStore = defineStore("tournament", {
  state() {
    return {
      tournaments: [] as Tournament[],
      tournament: null as CompleteTournament | null,
      competitors: [] as Competitor[],
    };
  },
  getters: {
    allTournaments(): Tournament[] {
      return this.tournaments as Tournament[];
    },
    selectedTournament(): CompleteTournament | null {
      return this.tournament as CompleteTournament;
    },
    selectedTournamentCompetitors(): Competitor[] {
      return this.competitors as Competitor[];
    },
    hasSelectedTournament(): boolean {
      return this.tournament !== null;
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

    async loadTournament(tournamentId: string): Promise<void> {
      this.tournament = null;

      try {
        this.tournament = await this.tournamentService.getCompleteTournament(
          tournamentId
        );
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      }
    },

    async loadTournamentCompetitors(tournamentId: string): Promise<void> {
      try {
        this.competitors =
          await this.tournamentService.getCompetitorsInTournament(tournamentId);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      }
    },
  },
});
