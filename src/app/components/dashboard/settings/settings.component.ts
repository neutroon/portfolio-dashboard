import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="settings-container">
      <h1>Settings</h1>
      <mat-card>
        <mat-card-header>
          <mat-card-title>Dashboard Settings</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Settings content will be added here</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 20px;
      }
      h1 {
        margin-bottom: 24px;
        color: #333;
      }
    `,
  ],
})
export class SettingsComponent {
  constructor() {}
}
