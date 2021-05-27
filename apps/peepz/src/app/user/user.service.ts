import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register, User } from 'libs/api-interfaces/src';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  public get userValue(): User {
    const userEntry = JSON.parse(localStorage.getItem('user'));
    if (!userEntry) {
      return null;
    }
    if (new Date(userEntry.refreshExpiry).getTime() > new Date().getTime()) {
      if (!this.jwtTokenTimeout) {
        this.refreshToken().subscribe(
          (success) => {},
          (error) => {
            console.error('Error refreshing JWT Token', error);
            this.logout();
          }
        );
        this.startTokenTimer(userEntry.user);
      }

      return userEntry.user;
    }
    return null;
  }

  changeUsername(username: string) {
    return this.http.put('/api/user/username', { username });
  }
  changePassword(password: string) {
    return this.http.put('/api/user/password', { password });
  }

  register(username, password, captcha) {
    const register: Register = { username, password, captcha };
    return this.http.post('/api/user/register', register);
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        '/api/auth/log-in',
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        map((user: User) => {
          this.startTokenTimer(user);
          return user;
        })
      );
  }

  logout() {
    this.http
      .post<any>('/api/auth/log-out', {}, { withCredentials: true })
      .subscribe();
    this.stopRefreshTokenTimer();
    localStorage.removeItem('user');
    this.router.navigate(['/user/login']);
  }

  refreshToken(): Observable<User> {
    return this.http
      .post<User>('/api/auth/refresh', {}, { withCredentials: true })
      .pipe(
        map((user: User) => {
          this.startTokenTimer(user);
          return user;
        })
      );
  }

  // helper methods

  private jwtTokenTimeout;

  private startTokenTimer(user: User) {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));
    const refreshToken = JSON.parse(atob(user.jwtRefreshToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const jwtExpiry = new Date(jwtToken.exp * 1000);
    const refreshExpiry = new Date(refreshToken.exp * 1000);
    const jwtTimeout = jwtExpiry.getTime() - Date.now() - 60 * 1000;
    this.jwtTokenTimeout = setTimeout(
      () =>
        this.refreshToken().subscribe(
          (success) => {},
          (error) => {
            console.error('Error refreshing JWT Token', error);
            this.logout();
          }
        ),
      jwtTimeout
    );
    localStorage.setItem(
      'user',
      JSON.stringify({ user, jwtExpiry, refreshExpiry })
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.jwtTokenTimeout);
  }
}
