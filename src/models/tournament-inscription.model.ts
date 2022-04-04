import { PokemonShowdownTeam } from "./pokemon-showdown-team.model";

export class TournamentInscription {
  constructor(
    private _id: string,
    private _pokemonShowdownTeam: PokemonShowdownTeam
  ) {}

  public get id(): string {
    return this._id;
  }

  public get pokemonShowdownTeam(): PokemonShowdownTeam {
    return this._pokemonShowdownTeam;
  }

  public static fromJson(json: any): TournamentInscription {
    return new TournamentInscription(
      json["id"],
      PokemonShowdownTeam.fromJson(json["pokemon_showdown_team"])
    );
  }
}
