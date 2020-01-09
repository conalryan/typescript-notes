import {Person} from './person';
import {Address} from './address';

export interface HasModels {
  person: Person;
  address: Address;
}
