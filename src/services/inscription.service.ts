import { AxiosError, AxiosInstance } from "axios";
import {
  API_DOMAIN,
  CHECK_ENROLL,
  DELETE_TOURNAMENT_INSCRIPTION,
  ENROLL_TO_TOURNAMENT,
  GET_TOURNAMENT_INSCRIPTION,
  UPDATE_TOURNAMENT_INSCRIPTION,
} from "@/config/services-uri.config";
import { ResponseError } from "./interfaces/reponse-error";
import { TournamentInscription } from "@/models/tournament-inscription.model";

export interface InscriptionService {
  getInscription(inscriptionId: string): Promise<TournamentInscription>;
  deleteInscription(inscriptionId: string): Promise<string>;
  isCompetitorEnrolled(
    competitorId: string,
    tournamentId: string
  ): Promise<boolean>;
  enrollToTournament(
    competitorId: string,
    tournamentId: string,
    pokemonShowdownExportTeam: string
  ): Promise<TournamentInscription>;
  updateInscription(
    inscriptionId: string,
    pokemonShowdownExportTeam: string
  ): Promise<TournamentInscription>;
}

export class ApiInscriptionService implements InscriptionService {
  constructor(private _httpClient: AxiosInstance) {}

  async getInscription(inscriptionId: string): Promise<TournamentInscription> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_INSCRIPTION.replace(":inscriptionId", inscriptionId)
      );

      return TournamentInscription.fromJson(
        response.data?.tournament_inscription
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async isCompetitorEnrolled(
    competitorId: string,
    tournamentId: string
  ): Promise<boolean> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          CHECK_ENROLL.replace(":competitorId", competitorId).replace(
            ":tournamentId",
            tournamentId
          )
      );

      return response.data?.is_enrolled;
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async deleteInscription(inscriptionId: string): Promise<string> {
    try {
      const response = await this._httpClient.delete(
        API_DOMAIN +
          DELETE_TOURNAMENT_INSCRIPTION.replace(":inscriptionId", inscriptionId)
      );

      return response.data?.message as string;
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async enrollToTournament(
    competitorId: string,
    tournamentId: string,
    pokemonShowdownExportTeam: string
  ): Promise<TournamentInscription> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN +
          ENROLL_TO_TOURNAMENT.replace(":tournamentId", tournamentId),
        {
          competitor_id: competitorId,
          pokemon_showdown_export_team: pokemonShowdownExportTeam,
        }
      );

      return TournamentInscription.fromJson(
        response.data?.tournament_inscription
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateInscription(
    inscriptionId: string,
    pokemonShowdownExportTeam: string
  ): Promise<TournamentInscription> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_INSCRIPTION.replace(
            ":inscriptionId",
            inscriptionId
          ),
        {
          pokemon_showdown_export_team: pokemonShowdownExportTeam,
        }
      );

      return TournamentInscription.fromJson(
        response.data?.tournament_inscription
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}