import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
    title: 'Signin | Livecode',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard | Livecode',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (com) => com.DashboardComponent
          ),
      },
      {
        path: 'repositories',
        title: 'Repositories | Livecode',
        loadComponent: () =>
          import('./pages/repositories/repositories.component').then(
            (com) => com.RepositoriesComponent
          ),
      },
      {
        path: 'profile',
        title: 'Profile | Livecode',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (com) => com.ProfileComponent
          ),
      },
    ],
  },
];
