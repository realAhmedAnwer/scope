import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { FeedsComponent } from './features/feeds/feeds.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { NotificationComponent } from './features/notification/notification.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    children: [...authRoutes],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'feed',
        component: FeedsComponent,
        title: 'Feed',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
      },
      {
        path: 'notifications',
        component: NotificationComponent,
        title: 'Notifications',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Fount',
  },
];
