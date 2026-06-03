import { Injectable } from '@angular/core';

const AUTH_USERNAME_KEY = 'ivwl.username';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated(): boolean {
    return sessionStorage.getItem(AUTH_USERNAME_KEY) !== null;
  }

  public login(username: string): void {
    sessionStorage.setItem(AUTH_USERNAME_KEY, username);
  }

  public logout(): void {
    sessionStorage.removeItem(AUTH_USERNAME_KEY);
  }

  public getUsername(): string {
    return sessionStorage.getItem(AUTH_USERNAME_KEY) ?? '';
  }
}