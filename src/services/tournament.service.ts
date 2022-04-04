import { AxiosError, AxiosInstance } from "axios";
import {
  API_DOMAIN,
  GET_ALL_TOURNAMENTS,
  GET_COMPETITORS_IN_TOURNAMENT,
  GET_COMPLETE_TOURNAMENT,
} from "@/config/services-uri.config";
import { ResponseError } from "./interfaces/reponse-error";
import { Tournament } from "@/models/tournament.model";
import { CompleteTournament } from "@/models/complete-tournament.model";
import { Competitor } from "@/models/competitor.model";

export interface TournamentService {
  getAllTournaments(): Promise<Tournament[]>;
  getCompleteTournament(tournamentId: string): Promise<CompleteTournament>;
  getCompetitorsInTournament(tournamentId: string): Promise<Competitor[]>;
}

export class ApiTournamentService implements TournamentService {
  constructor(private _httpClient: AxiosInstance) {}

  async getAllTournaments(): Promise<Tournament[]> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_ALL_TOURNAMENTS
      );

      return response.data?.tournaments?.map((tournament: any) =>
        Tournament.fromJson(tournament)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getCompleteTournament(
    tournamentId: string
  ): Promise<CompleteTournament> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_COMPLETE_TOURNAMENT.replace(":tournamentId", tournamentId)
      );

      const data = {
        tournament: response.data?.tournament,
        ...response.data?.tournament,
      };

      return CompleteTournament.fromJson(data);
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getCompetitorsInTournament(
    tournamentId: string
  ): Promise<Competitor[]> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_COMPETITORS_IN_TOURNAMENT.replace(":tournamentId", tournamentId)
      );

      return response.data?.competitors?.map((competitor: any) =>
        Competitor.fromJson(competitor)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
