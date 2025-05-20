import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

interface Skill {
  name: string;
  icon?: string;
  link?: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <div class="header-content">
          <h1>Settings</h1>
          <p class="subtitle">
            Manage your portfolio preferences and account settings
          </p>
        </div>
        <button
          mat-raised-button
          class="save-btn"
          [disabled]="!profileForm.valid"
        >
          <mat-icon>save</mat-icon>
          Save Changes
        </button>
      </div>

      <div class="settings-content">
        <!-- Profile Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <div class="card-header-content">
              <div class="header-icon profile">
                <mat-icon>person</mat-icon>
              </div>
              <div class="header-text">
                <h2>Profile Settings</h2>
                <p>Update your personal information and profile details</p>
              </div>
            </div>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="profileForm" class="profile-settings">
              <div class="profile-image-section">
                <div class="profile-image">
                  <img
                    [src]="profileImage || 'https://picsum.photos/120/120'"
                    alt="Profile"
                  />
                  <div class="image-overlay" (click)="onImageClick()">
                    <mat-icon>photo_camera</mat-icon>
                  </div>
                </div>
                <button
                  type="button"
                  mat-stroked-button
                  class="change-photo-btn"
                  (click)="onImageClick()"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  #fileInput
                  hidden
                  accept="image/*"
                  (change)="onFileSelected($event)"
                />
              </div>

              <div class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Full Name</mat-label>
                  <input
                    matInput
                    formControlName="fullName"
                    placeholder="Enter your full name"
                    required
                  />
                  <mat-error
                    *ngIf="profileForm.get('fullName')?.hasError('required')"
                  >
                    Full name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input
                    matInput
                    formControlName="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <mat-error
                    *ngIf="profileForm.get('email')?.hasError('required')"
                  >
                    Email is required
                  </mat-error>
                  <mat-error
                    *ngIf="profileForm.get('email')?.hasError('email')"
                  >
                    Please enter a valid email address
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Title</mat-label>
                  <input
                    matInput
                    formControlName="title"
                    placeholder="Enter your job title"
                    required
                  />
                  <mat-error
                    *ngIf="profileForm.get('title')?.hasError('required')"
                  >
                    Title is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Location</mat-label>
                  <input
                    matInput
                    formControlName="location"
                    placeholder="Enter your location"
                    required
                  />
                  <mat-error
                    *ngIf="profileForm.get('location')?.hasError('required')"
                  >
                    Location is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Bio</mat-label>
                  <textarea
                    matInput
                    formControlName="bio"
                    placeholder="Tell us about yourself"
                    rows="4"
                    required
                  ></textarea>
                  <mat-error
                    *ngIf="profileForm.get('bio')?.hasError('required')"
                  >
                    Bio is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Skills</mat-label>
                  <div class="skills-container">
                    <div class="skills-header">
                      <h3>Skill Categories</h3>
                      <button
                        mat-stroked-button
                        color="primary"
                        (click)="openNewCategoryDialog()"
                      >
                        <mat-icon>add</mat-icon>
                        New Category
                      </button>
                    </div>
                    <div class="skill-categories">
                      <div
                        *ngFor="let category of skillCategories"
                        class="skill-category"
                      >
                        <div class="category-header">
                          <mat-icon>{{ category.icon }}</mat-icon>
                          <h3>{{ category.name }}</h3>
                          <button
                            mat-icon-button
                            class="delete-category"
                            (click)="deleteCategory(category)"
                          >
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                        <mat-chip-grid #chipGrid aria-label="Skills">
                          <mat-chip-row
                            *ngFor="let skill of category.skills"
                            (removed)="removeSkill(category, skill)"
                          >
                            <mat-icon *ngIf="skill.icon" class="skill-icon">{{
                              skill.icon
                            }}</mat-icon>
                            {{ skill.name }}
                            <a
                              *ngIf="skill.link"
                              [href]="skill.link"
                              target="_blank"
                              class="skill-link"
                            >
                            </a>
                            <button matChipRemove>
                              <mat-icon>cancel</mat-icon>
                            </button>
                          </mat-chip-row>
                          <input
                            placeholder="New skill..."
                            [matChipInputFor]="chipGrid"
                            (matChipInputTokenEnd)="addSkill($event, category)"
                          />
                        </mat-chip-grid>
                        <div class="add-skill-input">
                          <button
                            mat-stroked-button
                            color="primary"
                            (click)="openAddSkillDialog(category)"
                          >
                            <mat-icon>add</mat-icon>
                            Add Skill
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-form-field>

                <div class="social-links full-width">
                  <div class="social-header">
                    <h3>Social Media Links</h3>
                    <button
                      mat-stroked-button
                      color="primary"
                      (click)="openSocialLinkDialog()"
                    >
                      <mat-icon>add</mat-icon>
                      Add Social Link
                    </button>
                  </div>
                  <div class="social-grid">
                    <div
                      *ngFor="let link of socialLinks"
                      class="social-link-card"
                    >
                      <div class="social-link-header">
                        <div class="platform-info">
                          <mat-icon
                            [style.color]="getPlatformColor(link.platform)"
                            >{{ link.icon }}</mat-icon
                          >
                          <span>{{ link.platform }}</span>
                        </div>
                        <div class="social-actions">
                          <button
                            mat-icon-button
                            (click)="editSocialLink(link)"
                          >
                            <mat-icon>edit</mat-icon>
                          </button>
                          <button
                            mat-icon-button
                            (click)="deleteSocialLink(link)"
                          >
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                      </div>
                      <a [href]="link.url" target="_blank" class="social-url">
                        {{ link.url }}
                        <mat-icon>open_in_new</mat-icon>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Notification Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <div class="card-header-content">
              <div class="header-icon notifications">
                <mat-icon>notifications</mat-icon>
              </div>
              <div class="header-text">
                <h2>Notification Preferences</h2>
                <p>Manage how you receive notifications</p>
              </div>
            </div>
          </mat-card-header>
          <mat-card-content>
            <div class="notification-settings">
              <div class="notification-item">
                <div class="notification-info">
                  <h3>Email Notifications</h3>
                  <p>Receive email updates about your portfolio</p>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>

              <mat-divider></mat-divider>

              <div class="notification-item">
                <div class="notification-info">
                  <h3>Project Updates</h3>
                  <p>Get notified when your projects receive new views</p>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>

              <mat-divider></mat-divider>

              <div class="notification-item">
                <div class="notification-info">
                  <h3>New Messages</h3>
                  <p>Receive notifications for new messages</p>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>

              <mat-divider></mat-divider>

              <div class="notification-item">
                <div class="notification-info">
                  <h3>Weekly Reports</h3>
                  <p>Get weekly analytics reports</p>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Appearance Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <div class="card-header-content">
              <div class="header-icon appearance">
                <mat-icon>palette</mat-icon>
              </div>
              <div class="header-text">
                <h2>Appearance</h2>
                <p>Customize your portfolio's look and feel</p>
              </div>
            </div>
          </mat-card-header>
          <mat-card-content>
            <div class="appearance-settings">
              <div class="setting-item">
                <div class="setting-info">
                  <h3>Dark Mode</h3>
                  <p>Switch between light and dark themes</p>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>

              <mat-divider></mat-divider>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Color Scheme</h3>
                  <p>Choose your preferred color palette</p>
                </div>
                <mat-form-field appearance="outline">
                  <mat-select>
                    <mat-option value="default">Default</mat-option>
                    <mat-option value="blue">Blue</mat-option>
                    <mat-option value="green">Green</mat-option>
                    <mat-option value="purple">Purple</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <mat-divider></mat-divider>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Font Size</h3>
                  <p>Adjust the text size across your portfolio</p>
                </div>
                <mat-form-field appearance="outline">
                  <mat-select>
                    <mat-option value="small">Small</mat-option>
                    <mat-option value="medium">Medium</mat-option>
                    <mat-option value="large">Large</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Security Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <div class="card-header-content">
              <div class="header-icon security">
                <mat-icon>security</mat-icon>
              </div>
              <div class="header-text">
                <h2>Security</h2>
                <p>Manage your account security settings</p>
              </div>
            </div>
          </mat-card-header>
          <mat-card-content>
            <div class="security-settings">
              <div class="setting-item">
                <div class="setting-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button mat-stroked-button color="primary">Enable</button>
              </div>

              <mat-divider></mat-divider>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <button mat-stroked-button color="primary">Change</button>
              </div>

              <mat-divider></mat-divider>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Login History</h3>
                  <p>View your recent login activity</p>
                </div>
                <button mat-stroked-button color="primary">View</button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 24px;
        animation: fadeIn 0.5s ease-out;
      }

      .settings-header {
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

      .save-btn {
        background: var(--primary-gradient);
        color: white;
        padding: 8px 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .save-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--hover-shadow);
      }

      .settings-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .settings-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
      }

      .card-header-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px;
      }

      .header-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .header-icon.profile {
        background: var(--primary-gradient);
      }
      .header-icon.notifications {
        background: var(--secondary-gradient);
      }
      .header-icon.appearance {
        background: var(--accent-gradient);
      }
      .header-icon.security {
        background: var(--purple-gradient);
      }

      .header-icon mat-icon {
        color: white;
        font-size: 24px;
      }

      .header-text h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .header-text p {
        margin: 4px 0 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
      }

      .profile-settings {
        padding: 0 24px 24px;
      }

      .profile-image-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-bottom: 32px;
      }

      .profile-image {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 60px;
        overflow: hidden;
        box-shadow: var(--hover-shadow);
        transition: transform 0.3s ease;
      }

      .profile-image:hover {
        transform: scale(1.05);
      }

      .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
      }

      .profile-image:hover .image-overlay {
        opacity: 1;
      }

      .image-overlay mat-icon {
        color: white;
        font-size: 32px;
      }

      .change-photo-btn {
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .change-photo-btn:hover {
        background: var(--background-light);
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .full-width {
        grid-column: 1 / -1;
      }

      .notification-settings,
      .appearance-settings,
      .security-settings {
        padding: 0 24px 24px;
      }

      .notification-item,
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
      }

      .notification-info,
      .setting-info {
        flex: 1;
      }

      .notification-info h3,
      .setting-info h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .notification-info p,
      .setting-info p {
        margin: 4px 0 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      mat-form-field {
        // width: 100%;
      }

      .social-links {
        margin-top: 16px;
      }

      .social-links h3 {
        margin: 0 0 16px;
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .social-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .skills-container {
        margin-top: 16px;
      }

      .skill-categories {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .skill-category {
        background: var(--background-light);
        border-radius: 12px;
        padding: 16px;
        transition: all 0.3s ease;
      }

      .skill-category:hover {
        transform: translateY(-2px);
        box-shadow: var(--hover-shadow);
      }

      .category-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        position: relative;
      }

      .category-header mat-icon {
        color: var(--primary);
        font-size: 24px;
      }

      .category-header h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .add-skill-input {
        margin-top: 12px;
      }

      .add-skill-input input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: white;
        font-size: 0.9rem;
      }

      .add-skill-input input:focus {
        outline: none;
        border-color: var(--primary);
      }

      .mat-mdc-chip {
        background: white !important;
        color: var(--text-primary) !important;
        border: 1px solid var(--border-color) !important;
      }

      .mat-mdc-chip-remove {
        color: var(--text-secondary) !important;
      }

      .skills-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .skills-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .delete-category {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .skill-category:hover .delete-category {
        opacity: 1;
      }

      .delete-category mat-icon {
        color: var(--text-secondary);
        font-size: 20px;
      }

      .delete-category:hover mat-icon {
        color: var(--error);
      }

      .skill-icon {
        font-size: 18px;
        height: 18px;
        width: 18px;
        margin-right: 4px;
      }

      .skill-link {
        display: flex;
        align-items: center;
        margin-left: 4px;
        color: var(--primary);
        text-decoration: none;
      }

      .skill-link mat-icon {
        font-size: 16px;
        height: 16px;
        width: 16px;
      }

      .skill-link:hover {
        color: var(--primary-dark);
      }

      .add-skill-input {
        margin-top: 12px;
        display: flex;
        justify-content: center;
      }

      .add-skill-input button {
        width: 100%;
      }

      .social-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .social-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .social-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .social-link-card {
        background: var(--background-light);
        border-radius: 12px;
        padding: 16px;
        transition: all 0.3s ease;
      }

      .social-link-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--hover-shadow);
      }

      .social-link-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .platform-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .platform-info mat-icon {
        font-size: 24px;
      }

      .platform-info span {
        font-weight: 500;
        color: var(--text-primary);
      }

      .social-actions {
        display: flex;
        gap: 4px;
      }

      .social-actions button {
        width: 32px;
        height: 32px;
        line-height: 32px;
      }

      .social-actions mat-icon {
        font-size: 18px;
      }

      .social-url {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        word-break: break-all;
      }

      .social-url:hover {
        color: var(--primary);
      }

      .social-url mat-icon {
        font-size: 16px;
      }

      @media (max-width: 768px) {
        .settings-container {
          padding: 16px;
        }

        .settings-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .header-content h1 {
          font-size: 1.5rem;
        }

        .save-btn {
          width: 100%;
          justify-content: center;
        }

        .form-grid {
          grid-template-columns: 1fr;
        }

        .notification-item,
        .setting-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .social-grid {
          grid-template-columns: 1fr;
        }

        .skill-category {
          padding: 12px;
        }
      }
    `,
  ],
})
export class SettingsComponent {
  profileForm: FormGroup;
  profileImage: string | null = null;

  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: 'web',
      skills: [
        {
          name: 'HTML',
          icon: 'html',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        },
        {
          name: 'CSS',
          icon: 'css',
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },
        {
          name: 'JavaScript',
          icon: 'javascript',
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        { name: 'Angular', icon: 'angular', link: 'https://angular.io/' },
        { name: 'React', icon: 'react', link: 'https://reactjs.org/' },
        { name: 'Vue.js', icon: 'vue', link: 'https://vuejs.org/' },
      ],
    },
    {
      name: 'Backend',
      icon: 'storage',
      skills: [
        { name: 'Node.js', icon: 'node', link: 'https://nodejs.org/' },
        { name: 'Python', icon: 'python', link: 'https://www.python.org/' },
        { name: 'Java', icon: 'java', link: 'https://www.java.com/' },
        {
          name: 'C#',
          icon: 'csharp',
          link: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
        },
        { name: '.NET', icon: 'dotnet', link: 'https://dotnet.microsoft.com/' },
        { name: 'PHP', icon: 'php', link: 'https://www.php.net/' },
      ],
    },
    {
      name: 'Database',
      icon: 'database',
      skills: [
        { name: 'MongoDB', icon: 'database', link: 'https://www.mongodb.com/' },
        { name: 'MySQL', icon: 'database', link: 'https://www.mysql.com/' },
        {
          name: 'PostgreSQL',
          icon: 'database',
          link: 'https://www.postgresql.org/',
        },
        { name: 'Redis', icon: 'database', link: 'https://redis.io/' },
        {
          name: 'Firebase',
          icon: 'firebase',
          link: 'https://firebase.google.com/',
        },
      ],
    },
    {
      name: 'DevOps',
      icon: 'cloud',
      skills: [
        { name: 'Docker', icon: 'docker', link: 'https://www.docker.com/' },
        {
          name: 'Kubernetes',
          icon: 'kubernetes',
          link: 'https://kubernetes.io/',
        },
        { name: 'AWS', icon: 'aws', link: 'https://aws.amazon.com/' },
        { name: 'Azure', icon: 'azure', link: 'https://azure.microsoft.com/' },
        { name: 'CI/CD', icon: 'cicd', link: 'https://www.jenkins.io/' },
      ],
    },
    {
      name: 'Tools',
      icon: 'build',
      skills: [
        { name: 'Git', icon: 'git', link: 'https://git-scm.com/' },
        {
          name: 'VS Code',
          icon: 'vscode',
          link: 'https://code.visualstudio.com/',
        },
        { name: 'Webpack', icon: 'webpack', link: 'https://webpack.js.org/' },
        { name: 'npm', icon: 'npm', link: 'https://www.npmjs.com/' },
        { name: 'yarn', icon: 'yarn', link: 'https://yarnpkg.com/' },
      ],
    },
  ];

  socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/in/your-profile',
    },
    {
      platform: 'GitHub',
      icon: 'code',
      url: 'https://github.com/your-username',
    },
    {
      platform: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com/your-handle',
    },
    {
      platform: 'Portfolio',
      icon: 'language',
      url: 'https://your-portfolio.com',
    },
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
      linkedin: [''],
      github: [''],
      twitter: [''],
      portfolio: [''],
    });
  }

  onImageClick() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addSkill(event: any, category: SkillCategory) {
    const value = (event.value || '').trim();
    if (value) {
      category.skills.push(value);
      event.chipInput!.clear();
    }
  }

  removeSkill(category: SkillCategory, skill: Skill) {
    const index = category.skills.indexOf(skill);
    if (index >= 0) {
      category.skills.splice(index, 1);
    }
  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryDialogComponent, {
      width: '400px',
      data: { name: '', icon: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.skillCategories.push({
          name: result.name,
          icon: result.icon,
          skills: [],
        });
      }
    });
  }

  deleteCategory(category: SkillCategory) {
    const index = this.skillCategories.indexOf(category);
    if (index >= 0) {
      this.skillCategories.splice(index, 1);
    }
  }

  openAddSkillDialog(category: SkillCategory) {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '400px',
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        category.skills.push(result);
      }
    });
  }

  getPlatformColor(platform: string): string {
    const colors: { [key: string]: string } = {
      LinkedIn: '#0077B5',
      GitHub: '#333',
      Twitter: '#1DA1F2',
      Portfolio: 'var(--primary)',
    };
    return colors[platform] || 'var(--text-primary)';
  }

  openSocialLinkDialog(link?: SocialLink) {
    const dialogRef = this.dialog.open(SocialLinkDialogComponent, {
      width: '400px',
      data: link || { platform: '', icon: '', url: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (link) {
          // Edit existing link
          const index = this.socialLinks.findIndex((l) => l === link);
          if (index >= 0) {
            this.socialLinks[index] = result;
          }
        } else {
          // Add new link
          this.socialLinks.push(result);
        }
      }
    });
  }

  editSocialLink(link: SocialLink) {
    this.openSocialLinkDialog(link);
  }

  deleteSocialLink(link: SocialLink) {
    const index = this.socialLinks.indexOf(link);
    if (index >= 0) {
      this.socialLinks.splice(index, 1);
    }
  }
}

@Component({
  selector: 'app-add-skill-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Add New Skill</h2>
      <mat-dialog-content>
        <form [formGroup]="skillForm" class="skill-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Skill Name</mat-label>
            <input
              matInput
              formControlName="name"
              placeholder="Enter skill name"
              required
            />
            <mat-error *ngIf="skillForm.get('name')?.hasError('required')">
              Skill name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Icon</mat-label>
            <mat-select formControlName="icon">
              <mat-option value="">None</mat-option>
              <mat-option value="html">HTML</mat-option>
              <mat-option value="css">CSS</mat-option>
              <mat-option value="javascript">JavaScript</mat-option>
              <mat-option value="angular">Angular</mat-option>
              <mat-option value="react">React</mat-option>
              <mat-option value="vue">Vue</mat-option>
              <mat-option value="node">Node.js</mat-option>
              <mat-option value="python">Python</mat-option>
              <mat-option value="java">Java</mat-option>
              <mat-option value="database">Database</mat-option>
              <mat-option value="cloud">Cloud</mat-option>
              <mat-option value="code">Code</mat-option>
            </mat-select>
            <mat-icon matSuffix *ngIf="skillForm.get('icon')?.value">
              {{ skillForm.get('icon')?.value }}
            </mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Documentation Link</mat-label>
            <input
              matInput
              formControlName="link"
              placeholder="Enter documentation URL"
            />
            <mat-icon matSuffix>link</mat-icon>
            <mat-error *ngIf="skillForm.get('link')?.hasError('pattern')">
              Please enter a valid URL
            </mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!skillForm.valid"
          (click)="onSubmit()"
        >
          Add Skill
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 20px;
      }

      .skill-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
      }

      .full-width {
        width: 100%;
      }

      mat-dialog-actions {
        margin-top: 24px;
        padding: 0;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddSkillDialogComponent {
  skillForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: SkillCategory }
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      icon: [''],
      link: ['', [Validators.pattern('https?://.+')]],
    });
  }

  onSubmit() {
    if (this.skillForm.valid) {
      this.dialogRef.close(this.skillForm.value);
    }
  }
}

@Component({
  selector: 'app-social-link-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.platform ? 'Edit' : 'Add' }} Social Link</h2>
      <mat-dialog-content>
        <form [formGroup]="socialLinkForm" class="social-link-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Platform</mat-label>
            <mat-select formControlName="platform" required>
              <mat-option value="LinkedIn">LinkedIn</mat-option>
              <mat-option value="GitHub">GitHub</mat-option>
              <mat-option value="Twitter">Twitter</mat-option>
              <mat-option value="Portfolio">Portfolio</mat-option>
              <mat-option value="Facebook">Facebook</mat-option>
              <mat-option value="Instagram">Instagram</mat-option>
              <mat-option value="YouTube">YouTube</mat-option>
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="Dev.to">Dev.to</mat-option>
              <mat-option value="Stack Overflow">Stack Overflow</mat-option>
            </mat-select>
            <mat-error
              *ngIf="socialLinkForm.get('platform')?.hasError('required')"
            >
              Platform is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>URL</mat-label>
            <input
              matInput
              formControlName="url"
              placeholder="Enter profile URL"
              required
            />
            <mat-icon matSuffix>link</mat-icon>
            <mat-error *ngIf="socialLinkForm.get('url')?.hasError('required')">
              URL is required
            </mat-error>
            <mat-error *ngIf="socialLinkForm.get('url')?.hasError('pattern')">
              Please enter a valid URL
            </mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!socialLinkForm.valid"
          (click)="onSubmit()"
        >
          {{ data.platform ? 'Save' : 'Add' }} Link
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 20px;
      }

      .social-link-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
      }

      .full-width {
        width: 100%;
      }

      mat-dialog-actions {
        margin-top: 24px;
        padding: 0;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SocialLinkDialogComponent {
  socialLinkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SocialLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SocialLink
  ) {
    this.socialLinkForm = this.fb.group({
      platform: [data.platform, Validators.required],
      icon: [this.getPlatformIcon(data.platform)],
      url: [data.url, [Validators.required, Validators.pattern('https?://.+')]],
    });

    // Update icon when platform changes
    this.socialLinkForm.get('platform')?.valueChanges.subscribe((platform) => {
      this.socialLinkForm.patchValue({ icon: this.getPlatformIcon(platform) });
    });
  }

  getPlatformIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      LinkedIn: 'linkedin',
      GitHub: 'code',
      Twitter: 'twitter',
      Portfolio: 'language',
      Facebook: 'facebook',
      Instagram: 'photo_camera',
      YouTube: 'smart_display',
      Medium: 'article',
      'Dev.to': 'code',
      'Stack Overflow': 'code',
    };
    return icons[platform] || 'link';
  }

  onSubmit() {
    if (this.socialLinkForm.valid) {
      this.dialogRef.close(this.socialLinkForm.value);
    }
  }
}

@Component({
  selector: 'app-new-category-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>New Skill Category</h2>
      <mat-dialog-content>
        <form [formGroup]="categoryForm" class="category-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Category Name</mat-label>
            <input
              matInput
              formControlName="name"
              placeholder="Enter category name"
              required
            />
            <mat-error *ngIf="categoryForm.get('name')?.hasError('required')">
              Category name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Icon</mat-label>
            <mat-select formControlName="icon" required>
              <mat-option value="web">Web</mat-option>
              <mat-option value="storage">Storage</mat-option>
              <mat-option value="database">Database</mat-option>
              <mat-option value="cloud">Cloud</mat-option>
              <mat-option value="build">Build</mat-option>
              <mat-option value="code">Code</mat-option>
              <mat-option value="devices">Devices</mat-option>
              <mat-option value="security">Security</mat-option>
              <mat-option value="analytics">Analytics</mat-option>
              <mat-option value="category">Category</mat-option>
            </mat-select>
            <mat-icon matSuffix *ngIf="categoryForm.get('icon')?.value">
              {{ categoryForm.get('icon')?.value }}
            </mat-icon>
            <mat-error *ngIf="categoryForm.get('icon')?.hasError('required')">
              Icon is required
            </mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!categoryForm.valid"
          (click)="onSubmit()"
        >
          Create Category
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 20px;
      }

      .category-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
      }

      .full-width {
        width: 100%;
      }

      mat-dialog-actions {
        margin-top: 24px;
        padding: 0;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewCategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; icon: string }
  ) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      icon: [data.icon, Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
