export class TournamentPrize {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public static fromJson(json: any): TournamentPrize {
    return new TournamentPrize(json["id"], json["title"], json["description"]);
  }
}
