import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {EmailService} from "./email.service";
import {Email} from "./email";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {EMPTY} from "rxjs";

export const EmailResolver: ResolveFn<Email> = (route: ActivatedRouteSnapshot) => {
  const {id} = route.params
  const router = inject(Router)
  return inject(EmailService).getEmail(id).pipe(
    catchError(() => {
      router.navigateByUrl('/inbox/not-found')
      return EMPTY
    })
  )
}
