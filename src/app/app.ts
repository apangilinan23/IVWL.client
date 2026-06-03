import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface LoginResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  public username = '';
  public password = '';
  public message = '';
  public isError = false;

  constructor(private http: HttpClient) {}

  submitLogin(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.isError = true;
      this.message = 'Please enter both username and password.';
      return;
    }

    this.http
      .post<LoginResponse>('/login', {
        username: this.username,
        password: this.password
      })
      .subscribe({
        next: (result) => {
          this.isError = !result.success;
          this.message = result.message;
        },
        error: (error) => {
          this.isError = true;
          this.message = error?.error?.message ?? 'Unable to sign in right now.';
        }
      });
  }
}
