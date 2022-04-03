export class Game {
  constructor(private _id: string, private _name: string) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public static fromJson(json: any): Game {
    return new Game(json["id"], json["name"]);
  }
}
