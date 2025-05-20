import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  template: `
    <div class="analytics-container">
      <div class="analytics-header">
        <div class="header-content">
          <h1>Analytics Overview</h1>
          <p class="subtitle">
            Track your portfolio performance and engagement
          </p>
        </div>
        <div class="header-actions">
          <button mat-raised-button class="export-btn">
            <mat-icon>download</mat-icon>
            Export Report
          </button>
          <button mat-raised-button class="refresh-btn">
            <mat-icon>refresh</mat-icon>
            Refresh Data
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon views">
              <mat-icon>visibility</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Total Views</h3>
              <p class="metric-value">12,458</p>
              <div class="metric-trend positive">
                <mat-icon>trending_up</mat-icon>
                <span>+15.3% from last month</span>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon engagement">
              <mat-icon>thumb_up</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Engagement Rate</h3>
              <p class="metric-value">68.5%</p>
              <div class="metric-trend positive">
                <mat-icon>trending_up</mat-icon>
                <span>+8.2% from last month</span>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon time">
              <mat-icon>schedule</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Avg. Time on Site</h3>
              <p class="metric-value">4m 32s</p>
              <div class="metric-trend positive">
                <mat-icon>trending_up</mat-icon>
                <span>+12.1% from last month</span>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon bounce">
              <mat-icon>exit_to_app</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Bounce Rate</h3>
              <p class="metric-value">32.4%</p>
              <div class="metric-trend negative">
                <mat-icon>trending_down</mat-icon>
                <span>-5.7% from last month</span>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Detailed Analytics -->
      <div class="analytics-details">
        <mat-card class="traffic-card">
          <mat-card-header>
            <mat-card-title>Traffic Sources</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="traffic-sources">
              <div class="traffic-source">
                <div class="source-info">
                  <div class="source-icon direct">
                    <mat-icon>link</mat-icon>
                  </div>
                  <div class="source-details">
                    <span class="source-name">Direct</span>
                    <span class="source-value">4,521 visits</span>
                  </div>
                </div>
                <div class="source-stats">
                  <span class="source-percentage">36.3%</span>
                  <mat-progress-bar
                    mode="determinate"
                    value="36.3"
                    color="primary"
                  ></mat-progress-bar>
                </div>
              </div>

              <div class="traffic-source">
                <div class="source-info">
                  <div class="source-icon social">
                    <mat-icon>share</mat-icon>
                  </div>
                  <div class="source-details">
                    <span class="source-name">Social</span>
                    <span class="source-value">3,245 visits</span>
                  </div>
                </div>
                <div class="source-stats">
                  <span class="source-percentage">26.1%</span>
                  <mat-progress-bar
                    mode="determinate"
                    value="26.1"
                    color="accent"
                  ></mat-progress-bar>
                </div>
              </div>

              <div class="traffic-source">
                <div class="source-info">
                  <div class="source-icon search">
                    <mat-icon>search</mat-icon>
                  </div>
                  <div class="source-details">
                    <span class="source-name">Search</span>
                    <span class="source-value">2,891 visits</span>
                  </div>
                </div>
                <div class="source-stats">
                  <span class="source-percentage">23.2%</span>
                  <mat-progress-bar
                    mode="determinate"
                    value="23.2"
                    color="warn"
                  ></mat-progress-bar>
                </div>
              </div>

              <div class="traffic-source">
                <div class="source-info">
                  <div class="source-icon referral">
                    <mat-icon>link</mat-icon>
                  </div>
                  <div class="source-details">
                    <span class="source-name">Referral</span>
                    <span class="source-value">1,801 visits</span>
                  </div>
                </div>
                <div class="source-stats">
                  <span class="source-percentage">14.4%</span>
                  <mat-progress-bar
                    mode="determinate"
                    value="14.4"
                    color="primary"
                  ></mat-progress-bar>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="top-projects-card">
          <mat-card-header>
            <mat-card-title>Top Performing Projects</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="top-projects">
              <div class="project-item">
                <div class="project-info">
                  <img
                    src="https://picsum.photos/40/40"
                    alt="E-commerce Platform"
                    class="project-image"
                  />
                  <div class="project-details">
                    <span class="project-name">E-commerce Platform</span>
                    <span class="project-stats">2,458 views</span>
                  </div>
                </div>
                <div class="project-performance">
                  <div class="performance-bar">
                    <div class="bar-fill" style="width: 85%"></div>
                  </div>
                  <span class="performance-value">85%</span>
                </div>
              </div>

              <div class="project-item">
                <div class="project-info">
                  <img
                    src="https://picsum.photos/40/41"
                    alt="Portfolio Dashboard"
                    class="project-image"
                  />
                  <div class="project-details">
                    <span class="project-name">Portfolio Dashboard</span>
                    <span class="project-stats">1,892 views</span>
                  </div>
                </div>
                <div class="project-performance">
                  <div class="performance-bar">
                    <div class="bar-fill" style="width: 72%"></div>
                  </div>
                  <span class="performance-value">72%</span>
                </div>
              </div>

              <div class="project-item">
                <div class="project-info">
                  <img
                    src="https://picsum.photos/40/42"
                    alt="Task Management App"
                    class="project-image"
                  />
                  <div class="project-details">
                    <span class="project-name">Task Management App</span>
                    <span class="project-stats">1,245 views</span>
                  </div>
                </div>
                <div class="project-performance">
                  <div class="performance-bar">
                    <div class="bar-fill" style="width: 65%"></div>
                  </div>
                  <span class="performance-value">65%</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .analytics-container {
        padding: 24px;
        animation: fadeIn 0.5s ease-out;
      }

      .analytics-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .header-content h1 {
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

      .header-actions {
        display: flex;
        gap: 12px;
      }

      .export-btn,
      .refresh-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      .export-btn {
        background: var(--primary-gradient);
        color: white;
      }

      .refresh-btn {
        background: var(--background-light);
        color: var(--text-primary);
      }

      .export-btn:hover,
      .refresh-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--hover-shadow);
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
      }

      .metric-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
      }

      .metric-content {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 24px;
      }

      .metric-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .metric-icon.views {
        background: var(--primary-gradient);
      }
      .metric-icon.engagement {
        background: var(--secondary-gradient);
      }
      .metric-icon.time {
        background: var(--accent-gradient);
      }
      .metric-icon.bounce {
        background: var(--purple-gradient);
      }

      .metric-icon mat-icon {
        color: white;
        font-size: 28px;
      }

      .metric-info {
        flex: 1;
      }

      .metric-info h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-secondary);
      }

      .metric-value {
        margin: 4px 0;
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .metric-trend {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.9rem;
      }

      .metric-trend.positive {
        color: var(--success-color);
      }

      .metric-trend.negative {
        color: var(--error-color);
      }

      .metric-trend mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .analytics-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
      }

      .traffic-card,
      .top-projects-card {
        background: white;
        border-radius: 16px;
      }

      .traffic-sources {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .traffic-source {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .source-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .source-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .source-icon.direct {
        background: var(--primary-gradient);
      }
      .source-icon.social {
        background: var(--secondary-gradient);
      }
      .source-icon.search {
        background: var(--accent-gradient);
      }
      .source-icon.referral {
        background: var(--purple-gradient);
      }

      .source-icon mat-icon {
        color: white;
        font-size: 20px;
      }

      .source-details {
        display: flex;
        flex-direction: column;
      }

      .source-name {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .source-value {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }

      .source-stats {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 120px;
      }

      .source-percentage {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-primary);
        min-width: 45px;
      }

      .top-projects {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .project-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .project-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .project-image {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
      }

      .project-details {
        display: flex;
        flex-direction: column;
      }

      .project-name {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .project-stats {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }

      .project-performance {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 120px;
      }

      .performance-bar {
        flex: 1;
        height: 8px;
        background: var(--background-light);
        border-radius: 4px;
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        background: var(--primary-gradient);
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .performance-value {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-primary);
        min-width: 45px;
      }

      @media (max-width: 768px) {
        .analytics-container {
          padding: 16px;
        }

        .analytics-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .header-content h1 {
          font-size: 1.5rem;
        }

        .header-actions {
          width: 100%;
        }

        .export-btn,
        .refresh-btn {
          flex: 1;
          justify-content: center;
        }

        .metrics-grid {
          grid-template-columns: 1fr;
        }

        .analytics-details {
          grid-template-columns: 1fr;
        }

        .source-stats,
        .project-performance {
          min-width: 100px;
        }
      }
    `,
  ],
})
export class AnalyticsComponent {
  constructor() {}
}
