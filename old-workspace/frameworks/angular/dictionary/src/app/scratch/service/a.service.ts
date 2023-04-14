import { Injectable } from '@angular/core';

@Injectable()
export class AService {

  static aServiceStaticNumber: number;
  static aServiceStaticString: string;
  static aServiceStaticObj: { [key: string]: any };

  aServiceNumber: number;
  aServiceString: string;
  aServiceObj: { [key: string]: any };

  constructor() {
    this.aServiceNumber = Date.now();
    this.aServiceString = Date.now().toString();
    this.aServiceObj = {
      propNumber: Date.now(),
      propString: Date.now().toString()
    };
  }
}
