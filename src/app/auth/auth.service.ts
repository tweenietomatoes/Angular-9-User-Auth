import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, Login } from '../auth.model';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn = false;
  redirectUrl: string;
  user: User;

  checkSession(): boolean {
    if (sessionStorage.user) {
      return this.isLoggedIn = true;
    }
  }

  login(loginInfo: Login): Observable<void> {
    return this.http.post<User>(env.loginUrl, loginInfo)
      .pipe(map(data => {
        this.user = {
          access_token: data.access_token,
          token_type: data.token_type,
          expires_in: data.expires_in
        };
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedIn = true;

        !this.redirectUrl ? this.router.navigate(['']) : this.router.navigate([this.redirectUrl]);
      }), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Password incorrect.');
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['auth/login']);
  }

}
