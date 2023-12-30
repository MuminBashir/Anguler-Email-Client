import {AbstractControl, Validator} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class MatchValidator implements Validator {
  validate(formControl: AbstractControl) {
    const {password, passwordConfirmation} = formControl.value
    if (password === passwordConfirmation) {
      return null
    } else {
      return {passwordNotMatched: true}
    }
  }
}
