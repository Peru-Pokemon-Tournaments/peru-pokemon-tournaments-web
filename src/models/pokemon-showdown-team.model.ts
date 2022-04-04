export class PokemonShowdownTeam {
  constructor(private _id: string, private _team: string) {}

  public get id(): string {
    return this._id;
  }

  public get team(): string {
    return this._team;
  }

  public static fromJson(json: any): PokemonShowdownTeam {
    return new PokemonShowdownTeam(json["id"], json["team"]);
  }
}
