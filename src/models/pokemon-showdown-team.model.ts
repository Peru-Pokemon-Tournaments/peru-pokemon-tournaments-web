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

  public get isTeamValid(): boolean {
    return this._team != null && this.team.split("\r\n\r\n").length === 6;
  }
}
