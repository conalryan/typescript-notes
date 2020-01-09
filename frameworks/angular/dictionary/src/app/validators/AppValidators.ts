import {FormControl, ValidatorFn} from '@angular/forms';

export class AppValidators {

  static CustomMin(minValue: number): ValidatorFn {
    return (c: FormControl): { [key: string]: any } => {
      return c.value >= minValue ? null : {customMin: `Error: must be >= ${minValue}`};
    };
  }

  static CustomMax(maxValue: number): ValidatorFn {
    return (c: FormControl): { [key: string]: any } => {
      if (!c.value) {
        return null;
      }
      return c.value <= maxValue ? null : {customMax: `Error: must be <= ${maxValue}`};
    };
  }
}
