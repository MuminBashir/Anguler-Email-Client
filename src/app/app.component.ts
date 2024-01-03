import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  signedin$ = new BehaviorSubject<boolean | null>(false)

  constructor(private auth: AuthService) {
    this.signedin$ = this.auth.signedin$
  }

  ngOnInit() {
    this.auth.checkSignedin().subscribe(() => {
    })
  }
}
