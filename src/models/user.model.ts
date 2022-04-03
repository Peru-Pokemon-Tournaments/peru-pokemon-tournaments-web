import { Person } from "./person.model";

export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _person: Person
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get person(): Person {
    return this._person;
  }

  public static fromJson(json: any): User {
    return new User(
      json["id"],
      json["name"],
      json["email"],
      Person.fromJson(json["person"])
    );
  }

  public toJson(): object {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      person: this.person.toJson(),
    };
  }
}
