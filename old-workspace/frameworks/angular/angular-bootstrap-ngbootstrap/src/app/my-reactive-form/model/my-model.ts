import {MyAddress} from './my-address';

export class MyModel {

  constructor(public id: number,
              public name: string,
              public alias: string,
              public address: MyAddress,
              public phoneNumbers: string[],
              public item?: string) {
  }
}
