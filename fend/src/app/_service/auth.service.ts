import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_model/auth/auth.entity';
import { UserStatus } from '../_model/auth/auth-status.enum';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private err: ErrorService,
    ) {
    console.log('constructor');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public get currentUserValue(): User {
    console.log(`currentUserValue: ${this.currentUserSubject.value};`);
    return this.currentUserSubject.value;
  }

  // 
  signin(username: string, password: string) {
    // 
    console.log(`login username: ${username}; password: ${password};`);
    // 
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  signout() {
    console.log('logout');
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  signup(user: User): Observable<User> {
    // 
    console.log(`signup username: ${user.username}; password: ${user.password};`);
    console.log(`signup firstname: ${user.firstname}; lastname: ${user.lastname};`);
    // 
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(`created user w/ id=${newUser.username}`)),
        catchError(this.err.handleError<any>('createUser'))
      );
  }
}