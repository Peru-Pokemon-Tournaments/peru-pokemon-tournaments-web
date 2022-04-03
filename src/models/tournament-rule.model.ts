export class TournamentRule {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public static fromJson(json: any): TournamentRule {
    return new TournamentRule(json["id"], json["name"], json["description"]);
  }
}
