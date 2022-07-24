import { Competitor } from "./competitor.model";
import { PokemonShowdownTeam } from "./pokemon-showdown-team.model";

export class TournamentInscription {
  constructor(
    private _id: string,
    private _competitor: Competitor,
    private _pokemonShowdownTeam: PokemonShowdownTeam
  ) {}

  public get id(): string {
    return this._id;
  }

  public get competitor(): Competitor {
    return this._competitor;
  }

  public get pokemonShowdownTeam(): PokemonShowdownTeam {
    return this._pokemonShowdownTeam;
  }

  public static fromJson(json: any): TournamentInscription {
    return new TournamentInscription(
      json["id"],
      Competitor.fromJson(json["competitor"]),
      PokemonShowdownTeam.fromJson(json["pokemon_showdown_team"])
    );
  }
}
