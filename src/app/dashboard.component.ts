import { Component } from '@angular/core';

type DashboardTab = 'overview' | 'schedule' | 'stats' | 'history';

interface UpcomingMatch {
  date: string;
  time: string;
  event: string;
  location: string;
}

interface PlayerStat {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
}

interface HistoryItem {
  opponent: string;
  date: string;
  result: 'Win' | 'Loss';
  score: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent {
  public username = history.state?.username ?? '';
  public message = history.state?.message ?? 'You are signed in.';
  public activeTab: DashboardTab = 'overview';
  public profileImageUrl = '/assets/ivwpic.jpg';
  public showProfileImage = true;

  public readonly kpiCards = [
    { title: 'Attendance', value: '100%', detail: 'Last 30 days' },
    { title: 'Current Rank', value: '#2' },
    { title: 'Season Win Rate', value: '75%%', detail: '3-1' },
    { title: 'Week #', value: '3' }
  ];

  public readonly upcomingMatches: UpcomingMatch[] = [
    { date: 'Jun 05', time: '6:00 PM', event: 'Bambang ', location: 'IVW court' },
    { date: 'Jun 08', time: '9:30 AM', event: 'Green', location: 'IVW court' },
  ];

  public readonly playerStats: PlayerStat[] = [
    { label: 'PPG (Points Per Game)', value: '24.8', trend: 'up' },
    { label: 'APG (Assists Per Game)', value: '6.3', trend: 'up' },
    { label: 'RPG (Rebounds Per Game)', value: '10.1', trend: 'flat' },
    { label: 'FG% (Field Goal %)', value: '48.7%', trend: 'up' },
    { label: '3P% (Three-Point %)', value: '37.9%', trend: 'up' },
    { label: 'TOV (Turnovers)', value: '2.4', trend: 'down' }
  ];

  public readonly history: HistoryItem[] = [
    { opponent: 'Black', date: 'May 29', result: 'Win', score: '21-16' },
    { opponent: 'Blue', date: 'May 23', result: 'Loss', score: '19-21' },
    { opponent: 'Red', date: 'May 17', result: 'Win', score: '21-12' },
    { opponent: 'White', date: 'May 10', result: 'Win', score: '22-20' }
  ];

  public setTab(tab: DashboardTab): void {
    this.activeTab = tab;
  }

  public isTabActive(tab: DashboardTab): boolean {
    return this.activeTab === tab;
  }

  public get profileInitials(): string {
    const source = this.username.trim() || 'Player';
    const parts = source.split(/\s+/).filter(Boolean);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  public onProfileImageError(): void {
    this.showProfileImage = false;
  }

  public getStatNumericValue(stat: PlayerStat): number {
    const parsedValue = Number.parseFloat(stat.value.replace('%', ''));
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  public getStatsMaxValue(): number {
    const values = this.playerStats.map((stat) => this.getStatNumericValue(stat));
    const maxValue = Math.max(...values, 1);
    return maxValue;
  }

  public getStatBarWidth(stat: PlayerStat): number {
    const maxValue = this.getStatsMaxValue();
    return (this.getStatNumericValue(stat) / maxValue) * 100;
  }
}