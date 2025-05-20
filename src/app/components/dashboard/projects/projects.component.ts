import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="projects-container">
      <h1>Projects Management</h1>
      <mat-card>
        <mat-card-header>
          <mat-card-title>My Projects</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Projects content will be added here</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .projects-container {
        padding: 20px;
      }
      h1 {
        margin-bottom: 24px;
        color: #333;
      }
    `,
  ],
})
export class ProjectsComponent {
  constructor() {}
}
