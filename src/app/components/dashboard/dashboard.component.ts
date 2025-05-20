import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Welcome Back! 👋</h1>
        <p class="subtitle">Here's what's happening with your portfolio</p>
      </div>

      <mat-grid-list
        [cols]="isMobile ? 1 : 4"
        rowHeight="140px"
        gutterSize="20px"
      >
        <!-- Portfolio Views Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card views-card">
            <mat-card-content>
              <div class="card-content">
                <div class="icon-wrapper">
                  <mat-icon class="card-icon">visibility</mat-icon>
                </div>
                <div class="card-text">
                  <h3>Portfolio Views</h3>
                  <p class="number">1,234</p>
                  <div class="trend positive">
                    <mat-icon>trending_up</mat-icon>
                    <span>+12% from last week</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Projects Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card projects-card">
            <mat-card-content>
              <div class="card-content">
                <div class="icon-wrapper">
                  <mat-icon class="card-icon">work</mat-icon>
                </div>
                <div class="card-text">
                  <h3>Projects</h3>
                  <p class="number">12</p>
                  <div class="trend">
                    <mat-icon>add_circle</mat-icon>
                    <span>3 new this month</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Skills Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card skills-card">
            <mat-card-content>
              <div class="card-content">
                <div class="icon-wrapper">
                  <mat-icon class="card-icon">psychology</mat-icon>
                </div>
                <div class="card-text">
                  <h3>Skills</h3>
                  <p class="number">8</p>
                  <div class="trend">
                    <mat-icon>school</mat-icon>
                    <span>2 new certifications</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Experience Card -->
        <mat-grid-tile [colspan]="1" [rowspan]="1">
          <mat-card class="dashboard-card experience-card">
            <mat-card-content>
              <div class="card-content">
                <div class="icon-wrapper">
                  <mat-icon class="card-icon">business_center</mat-icon>
                </div>
                <div class="card-text">
                  <h3>Experience</h3>
                  <p class="number">5 years</p>
                  <div class="trend">
                    <mat-icon>star</mat-icon>
                    <span>Senior level</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <!-- Recent Activity Section -->
      <mat-card class="activity-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>notifications_active</mat-icon>
            Recent Activity
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon views">
                <mat-icon>visibility</mat-icon>
              </div>
              <div class="activity-content">
                <span class="activity-text"
                  >New portfolio view from United States</span
                >
                <div class="activity-meta">
                  <span class="location">
                    <mat-icon>location_on</mat-icon>
                    San Francisco, CA
                  </span>
                  <span class="time">2 hours ago</span>
                </div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon stars">
                <mat-icon>star</mat-icon>
              </div>
              <div class="activity-content">
                <span class="activity-text"
                  >Project "E-commerce Platform" received 5 stars</span
                >
                <div class="activity-meta">
                  <span class="rating">
                    <mat-icon>star</mat-icon>
                    <mat-icon>star</mat-icon>
                    <mat-icon>star</mat-icon>
                    <mat-icon>star</mat-icon>
                    <mat-icon>star</mat-icon>
                  </span>
                  <span class="time">5 hours ago</span>
                </div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon message">
                <mat-icon>message</mat-icon>
              </div>
              <div class="activity-content">
                <span class="activity-text"
                  >New message from potential client</span
                >
                <div class="activity-meta">
                  <span class="client">
                    <mat-icon>person</mat-icon>
                    John Doe
                  </span>
                  <span class="time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 24px;
        animation: fadeIn 0.5s ease-out;
      }

      .dashboard-header {
        margin-bottom: 32px;
      }

      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-primary);
        animation: slideIn 0.5s ease-out;
      }

      .subtitle {
        margin: 8px 0 0;
        color: var(--text-secondary);
        font-size: 1rem;
      }

      .dashboard-card {
        width: 100%;
        height: 100%;
        background: white;
        position: relative;
        overflow: hidden;
      }

      .views-card {
        background: var(--primary-gradient);
      }
      .projects-card {
        background: var(--secondary-gradient);
      }
      .skills-card {
        background: var(--accent-gradient);
      }
      .experience-card {
        background: var(--purple-gradient);
      }

      .card-content {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 100%;
        color: white;
      }

      .icon-wrapper {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      }

      .dashboard-card:hover .icon-wrapper {
        transform: scale(1.1) rotate(5deg);
      }

      .card-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        color: white;
      }

      .card-text {
        flex: 1;
      }

      .card-text h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.9;
      }

      .number {
        margin: 4px 0;
        font-size: 1.8rem;
        font-weight: 600;
      }

      .trend {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .trend mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .activity-card {
        margin-top: 32px;
        background: white;
      }

      .activity-card mat-card-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .activity-card mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.2rem;
        color: var(--text-primary);
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .activity-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: 12px;
        background: var(--background-light);
        transition: transform 0.2s ease;
      }

      .activity-item:hover {
        transform: translateX(5px);
      }

      .activity-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .activity-icon.views {
        background: var(--primary-gradient);
      }
      .activity-icon.stars {
        background: var(--secondary-gradient);
      }
      .activity-icon.message {
        background: var(--accent-gradient);
      }

      .activity-icon mat-icon {
        color: white;
        font-size: 24px;
      }

      .activity-content {
        flex: 1;
      }

      .activity-text {
        color: var(--text-primary);
        font-size: 1rem;
        font-weight: 500;
      }

      .activity-meta {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 4px;
      }

      .location,
      .client,
      .rating {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      .rating mat-icon {
        color: var(--warning-color);
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .time {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .dashboard-container {
          padding: 16px;
        }

        h1 {
          font-size: 1.5rem;
        }

        .card-content {
          gap: 12px;
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
        }

        .card-icon {
          font-size: 24px;
        }

        .number {
          font-size: 1.5rem;
        }

        .activity-item {
          padding: 12px;
        }

        .activity-meta {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  isMobile = window.innerWidth <= 768;

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
}
