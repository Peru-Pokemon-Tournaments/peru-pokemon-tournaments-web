export class ExternalBracket {
  constructor(
    private _id: string,
    private _reference: string,
    private _url: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get reference(): string {
    return this._reference;
  }

  public get url(): string {
    return this._url;
  }

  public static fromJson(json: any): ExternalBracket {
    return new ExternalBracket(json["id"], json["reference"], json["url"]);
  }
}
