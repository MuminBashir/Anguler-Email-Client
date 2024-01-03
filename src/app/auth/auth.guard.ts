import {CanMatchFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {skipWhile, take} from "rxjs";
import {map} from "rxjs/operators";

export const authGuard: CanMatchFn = (route, segments) => {
  return inject(AuthService).signedin$.pipe(
    skipWhile(value => value === null),
    map(value => !!value),
    take(1)
  )
};
