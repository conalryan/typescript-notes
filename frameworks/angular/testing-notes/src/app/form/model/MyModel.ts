export class MyModel {

  private _myString: string;
  private _myNumber: number;
  private _myBooelan: boolean;
  private _myStringArray: string[];

  constructor(myString: string) {
    this._myString = myString;
  }

  get myString(): string {
    return this._myString;
  }

  set myString(value: string) {
    this._myString = value;
  }

  get myNumber(): number {
    return this._myNumber;
  }

  set myNumber(value: number) {
    this._myNumber = value;
  }

  get myBooelan(): boolean {
    return this._myBooelan;
  }

  set myBooelan(value: boolean) {
    this._myBooelan = value;
  }

  get myStringArray(): string[] {
    return this._myStringArray;
  }

  set myStringArray(value: string[]) {
    this._myStringArray = value;
  }
}
