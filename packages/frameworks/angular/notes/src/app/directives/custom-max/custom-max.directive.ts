import {Directive, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl} from '@angular/forms';
import { AppValidators } from '../../validators/AppValidators';

@Directive({
  selector: '[appCustomMax][formControlName],[appCustomMax][formControl],[appCustomMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true}]
})
export class CustomMaxDirective implements Validator {
  @Input()
  appCustomMax: number = 0;

  validate(c: FormControl): { [key: string]: any } | null {
    return AppValidators.CustomMax(this.appCustomMax)(c);
  }
}
