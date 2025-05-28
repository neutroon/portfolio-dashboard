import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      @fadeIn
    >
      <mat-card class="max-w-md w-full">
        <mat-card-header>
          <mat-card-title class="text-center w-full text-2xl font-bold">
            Sign in to your account
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form
            class="mt-8 space-y-6"
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
          >
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email address</mat-label>
              <input matInput type="email" formControlName="email" required />
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input
                matInput
                type="password"
                formControlName="password"
                required
              />
              <mat-error
                *ngIf="loginForm.get('password')?.hasError('required')"
              >
                Password is required
              </mat-error>
              <mat-error
                *ngIf="loginForm.get('password')?.hasError('minlength')"
              >
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <mat-checkbox formControlName="remember" color="primary">
              Remember me
            </mat-checkbox>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="w-full"
            >
              <mat-icon>lock</mat-icon>
              <span class="ml-2">{{
                isLoading ? 'Signing in...' : 'Sign in'
              }}</span>
              <mat-spinner
                *ngIf="isLoading"
                diameter="20"
                class="ml-2"
              ></mat-spinner>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      mat-card {
        padding: 2rem;
      }
      mat-form-field {
        width: 100%;
      }
      .mat-mdc-card-header {
        justify-content: center;
        padding: 1rem 0;
      }
      .mat-mdc-card-title {
        margin: 0;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.isLoading = false;
          },
        });
    }
  }
}
