import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
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
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
