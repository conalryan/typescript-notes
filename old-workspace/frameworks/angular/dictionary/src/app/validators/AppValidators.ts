import {FormControl, ValidatorFn} from '@angular/forms';

export class AppValidators {

  static CustomMin(minValue: number) {
    return (c: FormControl) => {
      return c.value >= minValue ? null : {customMin: `Error: must be >= ${minValue}`};
    };
  }

  static CustomMax(maxValue: number) {
    return (c: FormControl) => {
      if (!c.value) {
        return null;
      }
      return c.value <= maxValue ? null : {customMax: `Error: must be <= ${maxValue}`};
    };
  }
}
