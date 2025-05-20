import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
          class="login-form"
        >
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input
              matInput
              formControlName="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              Please enter a valid email address
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="hidePassword ? 'password' : 'text'"
              placeholder="Enter your password"
              required
            />
            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="hidePassword = !hidePassword"
            >
              <mat-icon>{{
                hidePassword ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>

          <div class="form-actions">
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="login-button"
            >
              <mat-spinner
                diameter="20"
                *ngIf="isLoading"
                class="spinner"
              ></mat-spinner>
              <span *ngIf="!isLoading">Sign In</span>
            </button>
          </div>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: var(--background-light);
        padding: 20px;
      }

      .login-card {
        width: 100%;
        max-width: 400px;
        padding: 32px;
        border-radius: 16px;
        box-shadow: var(--hover-shadow);
      }

      .login-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .login-header h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .login-header p {
        margin: 8px 0 0;
        color: var(--text-secondary);
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .form-actions {
        margin-top: 8px;
      }

      .login-button {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
        position: relative;
      }

      .spinner {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .error-message {
        color: var(--error);
        text-align: center;
        margin-top: 16px;
        font-size: 0.9rem;
      }

      @media (max-width: 480px) {
        .login-card {
          padding: 24px;
        }

        .login-header h1 {
          font-size: 1.75rem;
        }
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'An error occurred during login';
        },
      });
    }
  }
}
