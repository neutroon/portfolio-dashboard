import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
  ],
  template: `
    <div class="projects-container">
      <div class="projects-header">
        <div class="header-content">
          <h1>My Projects</h1>
          <p class="subtitle">Showcasing my latest work and achievements</p>
        </div>
        <button mat-raised-button class="add-project-btn">
          <mat-icon>add</mat-icon>
          New Project
        </button>
      </div>

      <div class="projects-grid">
        <!-- Featured Project -->
        <mat-card class="project-card featured">
          <div class="project-image">
            <img src="https://picsum.photos/800/400" alt="Featured Project" />
            <div class="featured-badge">
              <mat-icon>star</mat-icon>
              Featured
            </div>
          </div>
          <mat-card-content>
            <div class="project-header">
              <h2>E-commerce Platform</h2>
              <button mat-icon-button [matMenuTriggerFor]="projectMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>
            <p class="project-description">
              A full-stack e-commerce platform with real-time inventory
              management, payment processing, and analytics dashboard.
            </p>
            <div class="project-stats">
              <div class="stat">
                <mat-icon>visibility</mat-icon>
                <span>2.5k views</span>
              </div>
              <div class="stat">
                <mat-icon>star</mat-icon>
                <span>4.9 rating</span>
              </div>
              <div class="stat">
                <mat-icon>code</mat-icon>
                <span>15k lines</span>
              </div>
            </div>
            <div class="project-tags">
              <mat-chip>Angular</mat-chip>
              <mat-chip>Node.js</mat-chip>
              <mat-chip>MongoDB</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Regular Projects -->
        <mat-card class="project-card">
          <div class="project-image">
            <img src="https://picsum.photos/800/401" alt="Project" />
          </div>
          <mat-card-content>
            <div class="project-header">
              <h2>Portfolio Dashboard</h2>
              <button mat-icon-button [matMenuTriggerFor]="projectMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>
            <p class="project-description">
              A modern portfolio dashboard with analytics, project management,
              and real-time updates.
            </p>
            <div class="project-stats">
              <div class="stat">
                <mat-icon>visibility</mat-icon>
                <span>1.2k views</span>
              </div>
              <div class="stat">
                <mat-icon>star</mat-icon>
                <span>4.8 rating</span>
              </div>
            </div>
            <div class="project-tags">
              <mat-chip>Angular</mat-chip>
              <mat-chip>Material</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="project-card">
          <div class="project-image">
            <img src="https://picsum.photos/800/402" alt="Project" />
          </div>
          <mat-card-content>
            <div class="project-header">
              <h2>Task Management App</h2>
              <button mat-icon-button [matMenuTriggerFor]="projectMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>
            <p class="project-description">
              A collaborative task management application with real-time updates
              and team features.
            </p>
            <div class="project-stats">
              <div class="stat">
                <mat-icon>visibility</mat-icon>
                <span>800 views</span>
              </div>
              <div class="stat">
                <mat-icon>star</mat-icon>
                <span>4.7 rating</span>
              </div>
            </div>
            <div class="project-tags">
              <mat-chip>React</mat-chip>
              <mat-chip>Firebase</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="project-card">
          <div class="project-image">
            <img src="https://picsum.photos/800/403" alt="Project" />
          </div>
          <mat-card-content>
            <div class="project-header">
              <h2>Weather Dashboard</h2>
              <button mat-icon-button [matMenuTriggerFor]="projectMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>
            <p class="project-description">
              A weather dashboard with real-time updates, forecasts, and
              location tracking.
            </p>
            <div class="project-stats">
              <div class="stat">
                <mat-icon>visibility</mat-icon>
                <span>500 views</span>
              </div>
              <div class="stat">
                <mat-icon>star</mat-icon>
                <span>4.6 rating</span>
              </div>
            </div>
            <div class="project-tags">
              <mat-chip>Vue.js</mat-chip>
              <mat-chip>OpenWeather</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-menu #projectMenu="matMenu" class="custom-menu">
        <div class="menu-header">
          <h3>Project Actions</h3>
          <button mat-icon-button class="close-button">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div class="menu-item">
          <div class="menu-item-icon edit">
            <mat-icon>edit</mat-icon>
          </div>
          <div class="menu-item-content">
            <span class="menu-item-title">Edit Project</span>
            <span class="menu-item-subtitle">Update project details</span>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-item-icon share">
            <mat-icon>share</mat-icon>
          </div>
          <div class="menu-item-content">
            <span class="menu-item-title">Share Project</span>
            <span class="menu-item-subtitle">Share with others</span>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-item-icon delete">
            <mat-icon>delete</mat-icon>
          </div>
          <div class="menu-item-content">
            <span class="menu-item-title">Delete Project</span>
            <span class="menu-item-subtitle">Remove from portfolio</span>
          </div>
        </div>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      .projects-container {
        padding: 24px;
        animation: fadeIn 0.5s ease-out;
      }

      .projects-header {
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

      .add-project-btn {
        background: var(--primary-gradient);
        color: white;
        padding: 8px 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .add-project-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }

      .project-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .project-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--hover-shadow);
      }

      .project-card.featured {
        grid-column: 1 / -1;
      }

      .project-image {
        position: relative;
        height: 200px;
        overflow: hidden;
      }

      .project-card.featured .project-image {
        height: 300px;
      }

      .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .project-card:hover .project-image img {
        transform: scale(1.05);
      }

      .featured-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: var(--warning-color);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(253, 203, 110, 0.3);
      }

      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }

      .project-header h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .project-description {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 16px;
      }

      .project-stats {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .stat {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      .stat mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .project-tags mat-chip {
        background: var(--background-light);
        color: var(--text-primary);
        font-size: 0.8rem;
        height: 24px;
      }

      .custom-menu {
        min-width: 280px;
        padding: 8px;
      }

      .menu-header {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);
      }

      .menu-header h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .close-button {
        line-height: 32px;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 8px;
      }

      .menu-item:hover {
        background: var(--background-light);
      }

      .menu-item-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .menu-item-icon.edit {
        background: var(--primary-gradient);
      }
      .menu-item-icon.share {
        background: var(--secondary-gradient);
      }
      .menu-item-icon.delete {
        background: var(--error-color);
      }

      .menu-item-icon mat-icon {
        color: white;
        font-size: 20px;
      }

      .menu-item-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .menu-item-title {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .menu-item-subtitle {
        font-size: 0.8rem;
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .projects-container {
          padding: 16px;
        }

        .projects-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .header-content h1 {
          font-size: 1.5rem;
        }

        .add-project-btn {
          width: 100%;
          justify-content: center;
        }

        .projects-grid {
          grid-template-columns: 1fr;
        }

        .project-card.featured .project-image {
          height: 200px;
        }
      }
    `,
  ],
})
export class ProjectsComponent {
  // Add any component logic here
}
