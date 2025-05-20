import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./components/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./components/dashboard/analytics/analytics.component').then(
            (m) => m.AnalyticsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/dashboard/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
