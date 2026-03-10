import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { FeedsComponent } from './features/feeds/feeds.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    children: [...authRoutes],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: FeedsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
