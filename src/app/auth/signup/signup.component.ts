import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatchValidator} from "../validators/match-validator";
import {UniqueUsername} from "../validators/unique-username";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  authForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)], [
        this.uniqueUsername.validate
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    }, {validators: [this.matchValidator.validate]}
  )

  constructor(
    private matchValidator: MatchValidator,
    private uniqueUsername: UniqueUsername,
    private auth: AuthService,
    private router: Router) {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }
    this.auth.signup(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({noConnection: true})
        } else {
          this.authForm.setErrors({unknownError: true})
        }
      }
    })
  }
}
