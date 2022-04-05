import { TournamentFormat } from "./tournament-format.model";
import { TournamentPrice } from "./tournament-price.model";
import { TournamentType } from "./tournament-type.model";

export class Tournament {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string,
    private _place: string,
    private _startDate: Date,
    private _endDate: Date,
    private _totalCompetitors: number,
    private _format: TournamentFormat,
    private _price: TournamentPrice,
    private _type: TournamentType,
    private _status: string,
    private _imageUrl?: string
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

  public get imageUrl(): string | undefined {
    return this._imageUrl;
  }

  public get place(): string {
    return this._place;
  }

  public get hasImage(): boolean {
    return !!this.imageUrl;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get totalCompetitors(): number {
    return this._totalCompetitors;
  }

  public get format(): TournamentFormat {
    return this._format;
  }

  public get price(): TournamentPrice {
    return this._price;
  }

  public get type(): TournamentType {
    return this._type;
  }

  public get status(): string {
    return this._status;
  }

  public get formattedStatus(): string {
    if (this.status == "IN_PROGRESS") return "En progreso";
    if (this.status == "NOT_STARTED") return "Sin empezar";
    return "Finalizado";
  }

  public get canReceiveInscriptions(): boolean {
    return this.status == "NOT_STARTED";
  }

  public get canUpdateInscriptions(): boolean {
    return this.status == "NOT_STARTED";
  }

  public get isStarted(): boolean {
    return this.status == "IN_PROGRESS";
  }

  public get isEnded(): boolean {
    return this.status == "ENDED";
  }

  public static fromJson(json: any): Tournament {
    return new Tournament(
      json["id"],
      json["title"],
      json["description"],
      json["place"],
      new Date(json["start_date"] + "+0"), // using +0 to define is utc 0
      new Date(json["end_date"] + "+0"), // using +0 to define is utc 0
      json["total_competitors"],
      TournamentFormat.fromJson(json["tournament_format"]),
      TournamentPrice.fromJson(json["tournament_price"]),
      TournamentType.fromJson(json["tournament_type"]),
      json["status"],
      "image" in json && json["image"] !== null ? json["image"]["url"] : null
    );
  }
}
