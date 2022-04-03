import { Device } from "./device.model";
import { ExternalBracket } from "./external-bracket.model";
import { Game } from "./game.model";
import { Person } from "./person.model";
import { TournamentPrize } from "./tournament-prize.model";
import { TournamentRule } from "./tournament-rule.model";
import { TournamentSystem } from "./tournament-system.model";
import { Tournament } from "./tournament.model";

export class CompleteTournament {
  constructor(
    private _tournament: Tournament,
    private _devices: Device[],
    private _games: Game[],
    private _prizes: TournamentPrize[],
    private _rules: TournamentRule[],
    private _systems: TournamentSystem[],
    private _createdBy: Person,
    private _externalBracket?: ExternalBracket
  ) {}

  public static fromJson(json: any) {
    return new CompleteTournament(
      Tournament.fromJson(json["tournament"]),
      json["devices"].map((device: any) => Device.fromJson(device)),
      json["games"].map((game: any) => Game.fromJson(game)),
      json["tournament_prizes"].map((prize: any) =>
        TournamentPrize.fromJson(prize)
      ),
      json["tournament_rules"].map((rule: any) =>
        TournamentRule.fromJson(rule)
      ),
      json["tournament_systems"].map((system: any) =>
        TournamentSystem.fromJson(system)
      ),
      Person.fromJson(json["created_by"]),
      "external_bracket" in json && json["external_bracket"] !== null
        ? ExternalBracket.fromJson(json["external_bracket"])
        : undefined
    );
  }

  public get tournament(): Tournament {
    return this._tournament;
  }

  public get devices(): Device[] {
    return this._devices;
  }

  public get externalBracket(): ExternalBracket | undefined {
    return this._externalBracket;
  }

  public get hasExternalBracket(): boolean {
    return !!this._externalBracket;
  }

  public get games(): Game[] {
    return this._games;
  }

  public get prizes(): TournamentPrize[] {
    return this._prizes;
  }

  public get rules(): TournamentRule[] {
    return this._rules;
  }

  public get systems(): TournamentSystem[] {
    return this._systems;
  }

  public get createdBy(): Person {
    return this._createdBy;
  }
}
