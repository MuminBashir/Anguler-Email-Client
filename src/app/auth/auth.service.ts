import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";

interface checkUsernameResponse {
  available: boolean
}

interface signupCredentials {
  username?: string | null | undefined,
  password?: string | null | undefined,
  passwordConfirmation?: string | null | undefined,
}

interface signupResponse {
  username: string
}

interface checkSignedinResponse {
  authenticated: boolean,
  username: string
}

interface signinCredentials {
  username?: string | null | undefined,
  password?: string | null | undefined,
}

interface signinResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = "https://api.angular-email.com"
  signedin$ = new BehaviorSubject<boolean | null>(null)
  username = ""

  constructor(private http: HttpClient) {
  }

  checkUniqueUsername(username: string) {
    return this.http.post<checkUsernameResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signup(credentials: signupCredentials) {
    return this.http.post<signupResponse>(`${this.rootUrl}/auth/signup`, credentials).pipe(
      tap(value => {
        this.signedin$.next(true)
        this.username = value.username
      })
    )
  }

  checkSignedin() {
    return this.http.get<checkSignedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap((value) => {
        if (value.authenticated) {
          this.signedin$.next(true)
          this.username = value.username
        } else {
          this.signedin$.next(false)
        }
      })
    )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }

  signin(credentials: signinCredentials) {
    return this.http.post<signinResponse>(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap((value) => {
        this.signedin$.next(true)
        this.username = value.username
      })
    )
  }
}
