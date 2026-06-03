import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent {
  public username = history.state?.username ?? '';
  public message = history.state?.message ?? 'You are signed in.';
}