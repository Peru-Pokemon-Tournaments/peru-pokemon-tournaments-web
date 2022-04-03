export class TournamentSystem {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _anotherDescription?: string
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

  public get anotherDescription(): string | undefined {
    return this._anotherDescription;
  }

  public static fromJson(json: any): TournamentSystem {
    return new TournamentSystem(
      json["id"],
      json["name"],
      json["description"],
      "pivot" in json && json["pivot"] !== null
        ? json["pivot"]["description"]
        : null
    );
  }
}
