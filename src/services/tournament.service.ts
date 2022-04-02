import { AxiosError, AxiosInstance } from "axios";
import { API_DOMAIN, GET_ALL_TOURNAMENTS } from "@/config/services-uri.config";
import { ResponseError } from "./interfaces/reponse-error";
import { Tournament } from "@/models/tournament.model";

export interface TournamentService {
  getAllTournaments(): Promise<Tournament[]>;
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
}
