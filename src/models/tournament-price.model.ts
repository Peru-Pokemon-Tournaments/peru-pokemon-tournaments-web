export class TournamentPrice {
  constructor(
    private _id: string,
    private _amount: number,
    private _symbol: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get amount(): number {
    return this._amount;
  }

  public get symbol(): string {
    return this._symbol;
  }

  public get formatted(): string {
    return this.amount > 0 ? `${this.symbol} ${this.amount}` : "Gratis";
  }

  public static fromJson(json: any): TournamentPrice {
    return new TournamentPrice(json["id"], json["amount"], json["symbol"]);
  }
}
