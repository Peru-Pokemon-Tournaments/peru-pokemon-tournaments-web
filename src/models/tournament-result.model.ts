import {
  API_DOMAIN,
  GET_TOURNAMENT_RESULT_CERTIFICATE,
} from "@/config/services-uri.config";
import { TournamentInscription } from "./tournament-inscription.model";

export class TournamentResult {
  constructor(
    private _id: string,
    private _score: number,
    private _place: number,
    private _tournamentInscription: TournamentInscription
  ) {}

  public static fromJson(json: any): TournamentResult {
    return new TournamentResult(
      json["id"],
      json["score"],
      json["place"],
      TournamentInscription.fromJson(json["tournament_inscription"])
    );
  }

  public get id(): string {
    return this._id;
  }

  public get score(): number {
    return this._score;
  }

  public get place(): number {
    return this._place;
  }

  public get hasCertificate(): boolean {
    return this._place <= 3;
  }

  public get certificateUrl(): string | null {
    if (this.hasCertificate) {
      return (
        API_DOMAIN +
        GET_TOURNAMENT_RESULT_CERTIFICATE.replace(
          ":tournamentResultId",
          this._id
        )
      );
    }

    return null;
  }

  public get tournamentInscription(): TournamentInscription {
    return this._tournamentInscription;
  }
}
