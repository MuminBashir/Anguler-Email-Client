import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatchValidator} from "../validators/match-validator";
import {UniqueUsername} from "../validators/unique-username";

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
        Validators.pattern(/^[a-z0-9]+$/)],[
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

  constructor(private matchValidator: MatchValidator, private uniqueUsername: UniqueUsername) {
  }
}
