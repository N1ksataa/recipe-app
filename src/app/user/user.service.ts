import { Injectable, OnDestroy } from '@angular/core';
import { ProfileDetails, UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login (username: string, password: string){
    return this.http.post<UserForAuth>(`/api/users/login`, {username, password})
    .pipe(tap(user => this.user$$.next(user)));
  }

  register(user: { email: string; username: string; password: string }) {
    return this.http.post<UserForAuth>(`/api/users/register`, user).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  logout() {
    return this.http
    .post('/api/users/logout', {})
    .pipe(tap((user)=> this.user$$.next(null)));
  }
  
  getProfile(){
    return this.http
    .get<UserForAuth>('/api/users/profile')
    .pipe(tap((user) => this.user$$.next(user)))
  }

  getCurrentUser(): Observable<UserForAuth | null> {
    return this.user$;
  }
  
  changeUserDetails(newUsername: string, newEmail: string) {
    return this.http.put<ProfileDetails>('/api/users/profile', { username: newUsername, email: newEmail }).pipe(
      tap((updatedUser) => {
        const currentUser = this.user$$.value;
        if (currentUser) {
          this.user$$.next({ ...currentUser, username: updatedUser.username, email: updatedUser.email });
        }
      })
    );
  }
   
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put('/api/users/profile/update-password', { oldPassword, newPassword });
  }


}