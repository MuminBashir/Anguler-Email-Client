import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedin$ = new BehaviorSubject(false)

  constructor(private auth: AuthService) {
    this.signedin$ = this.auth.signedin$
  }

  ngOnInit() {
    this.auth.checkSignedin().subscribe(() => {
    })
  }
}
