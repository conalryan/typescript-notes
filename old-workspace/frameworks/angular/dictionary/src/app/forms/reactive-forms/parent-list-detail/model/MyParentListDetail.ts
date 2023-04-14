import {MyAddress} from '../../form-array/model/my-address';

export class MyParentListDetail {

  companyId: number;
  companyName: string;
  employees: MyEmployee[];
}

export class MyEmployee {

  id: number;
  firstName: string;
  lastName: string;
  alias: string;
  dateOfBirth: string;
  addresses: MyAddress[];
  phoneNumbers: string[];
  isSelected: boolean;
}
