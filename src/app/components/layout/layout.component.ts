import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [mode]="isMobile ? 'over' : 'side'"
        [opened]="!isMobile"
      >
        <div class="sidenav-header">
          <div class="logo-container">
            <img
              src="https://avatars.githubusercontent.com/u/113664536?v=4"
              alt="Logo"
              class="logo"
            />
          </div>
          <h2>Portfolio</h2>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <div class="nav-item-content">
              <div class="icon-wrapper">
                <mat-icon>dashboard</mat-icon>
              </div>
              <span>Dashboard</span>
            </div>
          </a>
          <a mat-list-item routerLink="/projects" routerLinkActive="active">
            <div class="nav-item-content">
              <div class="icon-wrapper">
                <mat-icon>work</mat-icon>
              </div>
              <span>Projects</span>
            </div>
          </a>
          <a mat-list-item routerLink="/analytics" routerLinkActive="active">
            <div class="nav-item-content">
              <div class="icon-wrapper">
                <mat-icon>analytics</mat-icon>
              </div>
              <span>Analytics</span>
            </div>
          </a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active">
            <div class="nav-item-content">
              <div class="icon-wrapper">
                <mat-icon>settings</mat-icon>
              </div>
              <span>Settings</span>
            </div>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar class="toolbar">
          <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="toolbar-title">Portfolio Dashboard</span>
          <span class="toolbar-spacer"></span>
          <div class="toolbar-actions">
            <button
              mat-icon-button
              [matMenuTriggerFor]="notificationsMenu"
              class="action-button"
            >
              <mat-icon>notifications</mat-icon>
              <span class="notification-badge">3</span>
            </button>
            <button
              mat-icon-button
              [matMenuTriggerFor]="profileMenu"
              class="action-button"
            >
              <mat-icon>account_circle</mat-icon>
            </button>
          </div>
        </mat-toolbar>

        <mat-menu #notificationsMenu="matMenu" class="custom-menu">
          <div class="menu-header">
            <h3>Notifications</h3>
            <button mat-icon-button class="close-button">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="menu-item">
            <div class="menu-item-icon views">
              <mat-icon>visibility</mat-icon>
            </div>
            <div class="menu-item-content">
              <span class="menu-item-title">New portfolio view</span>
              <span class="menu-item-subtitle">From United States</span>
            </div>
            <span class="menu-item-time">2h ago</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-icon stars">
              <mat-icon>star</mat-icon>
            </div>
            <div class="menu-item-content">
              <span class="menu-item-title">Project received 5 stars</span>
              <span class="menu-item-subtitle">E-commerce Platform</span>
            </div>
            <span class="menu-item-time">5h ago</span>
          </div>
        </mat-menu>

        <mat-menu #profileMenu="matMenu" class="custom-menu">
          <div class="menu-header">
            <h3>Profile</h3>
            <button mat-icon-button class="close-button">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="menu-item">
            <div class="menu-item-icon profile">
              <mat-icon>person</mat-icon>
            </div>
            <div class="menu-item-content">
              <span class="menu-item-title">View Profile</span>
              <span class="menu-item-subtitle">Manage your account</span>
            </div>
          </div>
          <div class="menu-item">
            <div class="menu-item-icon settings">
              <mat-icon>settings</mat-icon>
            </div>
            <div class="menu-item-content">
              <span class="menu-item-title">Settings</span>
              <span class="menu-item-subtitle">Customize dashboard</span>
            </div>
          </div>
          <div class="menu-item">
            <div class="menu-item-icon logout">
              <mat-icon>exit_to_app</mat-icon>
            </div>
            <div class="menu-item-content">
              <span class="menu-item-title">Logout</span>
              <span class="menu-item-subtitle">Sign out of your account</span>
            </div>
          </div>
        </mat-menu>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100vh;
      }

      .sidenav {
        width: 280px;
        background: white;
        border-right: none;
        box-shadow: var(--card-shadow);
      }

      .sidenav-header {
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-bottom: 1px solid var(--border-color);
      }

      .logo-container {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: var(--primary-gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
      }

      .logo {
        width: 32px;
        height: 32px;
        filter: brightness(0) invert(1);
      }

      .sidenav-header h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-primary);
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      mat-nav-list {
        padding: 16px 12px;
      }

      .nav-item-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 8px;
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      mat-nav-list a {
        margin: 4px 0;
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      mat-nav-list a:hover .nav-item-content {
        background: var(--background-light);
      }

      mat-nav-list a.active {
        background: var(--primary-gradient);
      }

      mat-nav-list a.active .nav-item-content {
        background: transparent;
      }

      mat-nav-list a.active span {
        color: white;
      }

      .icon-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: var(--background-light);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      mat-nav-list a.active .icon-wrapper {
        background: rgba(255, 255, 255, 0.2);
      }

      mat-nav-list a mat-icon {
        color: var(--text-secondary);
        transition: all 0.3s ease;
      }

      mat-nav-list a.active mat-icon {
        transform: translate(-50%, -50%);
        color: white;
      }

      mat-nav-list a span {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-primary);
        transition: all 0.3s ease;
      }
      ::ng-deep .mat-mdc-card-content:last-child {
        padding-top: 16px;
      }
      .toolbar {
        background: white;
        border-bottom: 1px solid var(--border-color);
        padding: 0 24px;
        height: 64px;
      }

      .toolbar-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-left: 16px;
      }

      .toolbar-spacer {
        flex: 1 1 auto;
      }

      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .action-button {
        position: relative;
      }

      .notification-badge {
        position: absolute;
        top: 6px;
        right: 3px;
        z-index: 1;
        background: var(--error-color);
        color: white;
        font-size: 0.7rem;
        font-weight: 600;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .menu-button {
        display: none;
      }

      .custom-menu {
        min-width: 320px;
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

      .menu-item-icon.views {
        background: var(--primary-gradient);
      }
      .menu-item-icon.stars {
        background: var(--secondary-gradient);
      }
      .menu-item-icon.profile {
        background: var(--accent-gradient);
      }
      .menu-item-icon.settings {
        background: var(--purple-gradient);
      }
      .menu-item-icon.logout {
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

      .menu-item-time {
        font-size: 0.8rem;
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .menu-button {
          display: block;
        }

        .sidenav {
          width: 100%;
        }

        .content {
          padding: 16px;
        }

        .toolbar {
          padding: 0 16px;
        }

        .toolbar-title {
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class LayoutComponent {
  isMobile = window.innerWidth <= 768;

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
}
