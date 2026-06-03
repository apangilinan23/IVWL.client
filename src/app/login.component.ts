import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

interface LoginResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  private readonly loginApiUrl = 'https://ivlserver-690996479270.asia-southeast1.run.app/login';

  public username = '';
  public password = '';
  public message = '';
  public isError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  submitLogin(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.isError = true;
      this.message = 'Please enter both username and password.';
      return;
    }

    this.http
      .post<LoginResponse>(this.loginApiUrl, {
        username: this.username,
        password: this.password
      })
      .subscribe({
        next: (result) => {
          this.isError = !result.success;
          this.message = result.message;

          if (result.success) {
            this.authService.login(this.username);
            this.router.navigate(['/dashboard'], {
              state: {
                username: this.username,
                message: result.message
              }
            });
          }
        },
        error: (error) => {
          this.isError = true;
          this.message = error?.error?.message ?? 'Unable to sign in right now.';
        }
      });
  }
}