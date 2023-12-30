import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {AbstractControl, AsyncValidator} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {
  constructor(private auth: AuthService) {
  }

  validate = (control: AbstractControl) => {
    const {value} = control
    return this.auth.checkUniqueUsername(value).pipe(
      map(value => {
        if (value?.available) {
          return null
        } else {
          return {invalidUsername: true}
        }
      }),
      catchError(err => {
        if (err.error.username) {
          return of({nonUniqueUsername: true})
        } else {
          return of({noNetworkConnection: true})
        }
      })
    )
  }
}
