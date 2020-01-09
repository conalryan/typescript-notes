import {MyAddress} from './my-address';

export class MyModel {

  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public alias: string,
              public dateOfBirth: string,
              public address: MyAddress,
              public phoneNumbers: string[]) {
  }
}
