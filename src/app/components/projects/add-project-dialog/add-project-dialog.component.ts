import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Add New Project</h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form
        [formGroup]="projectForm"
        (ngSubmit)="onSubmit()"
        class="dialog-content"
      >
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Project Title</mat-label>
          <input
            matInput
            formControlName="title"
            placeholder="Enter project title"
          />
          <mat-error *ngIf="projectForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea
            matInput
            formControlName="description"
            rows="4"
            placeholder="Enter project description"
          ></textarea>
          <mat-error
            *ngIf="projectForm.get('description')?.hasError('required')"
          >
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Project Image URL</mat-label>
          <input
            matInput
            formControlName="imageUrl"
            placeholder="Enter image URL"
          />
          <mat-error *ngIf="projectForm.get('imageUrl')?.hasError('required')">
            Image URL is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Technologies</mat-label>
          <mat-chip-grid #chipGrid>
            <mat-chip-row
              *ngFor="let tech of technologies"
              (removed)="removeTechnology(tech)"
            >
              {{ tech }}
              <button matChipRemove>
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input
            placeholder="Add technology..."
            [matChipInputFor]="chipGrid"
            (matChipInputTokenEnd)="addTechnology($event)"
          />
        </mat-form-field>

        <div class="form-actions">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button
            mat-raised-button
            type="submit"
            [disabled]="!projectForm.valid"
            class="submit-btn"
          >
            <mat-icon>add</mat-icon>
            Add Project
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 24px;
        max-width: 600px;
        width: 100%;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .dialog-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .dialog-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .full-width {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 16px;
      }

      .submit-btn {
        background: var(--primary-gradient);
        color: white;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .submit-btn:disabled {
        background: var(--background-light);
        color: var(--text-secondary);
      }

      mat-form-field {
        margin-bottom: 8px;
      }

      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }

      ::ng-deep .mat-mdc-form-field {
        margin-bottom: 0;
      }

      ::ng-deep .mat-mdc-chip {
        background: var(--background-light) !important;
        color: var(--text-primary) !important;
      }

      ::ng-deep .mat-mdc-chip-remove {
        color: var(--text-secondary) !important;
      }

      @media (max-width: 768px) {
        .dialog-container {
          padding: 16px;
        }

        .dialog-header h2 {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class AddProjectDialogComponent {
  projectForm: FormGroup;
  technologies: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProjectDialogComponent>
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  addTechnology(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.technologies.push(value);
      event.chipInput!.clear();
    }
  }

  removeTechnology(tech: string): void {
    const index = this.technologies.indexOf(tech);
    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        technologies: this.technologies,
        stats: {
          views: 0,
          rating: 0,
        },
        createdAt: new Date(),
      };
      this.dialogRef.close(projectData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
