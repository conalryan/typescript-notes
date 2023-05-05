import {Directive, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl} from '@angular/forms';
import { AppValidators } from '../../validators/AppValidators';

@Directive({
  selector: '[appCustomMin][formControlName],[appCustomMin][formControl],[appCustomMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMinDirective, multi: true}]
})
export class CustomMinDirective implements Validator {
  @Input() appCustomMin: number = 0;

  validate(c: FormControl): { [key: string]: any } | null {
    return AppValidators.CustomMin(this.appCustomMin)(c);
  }
}
