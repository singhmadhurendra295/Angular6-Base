import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/api/users/login`, { email: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
        }
        return user;
      }));
  }

  logout() {
    this.loggedIn.next(false);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
