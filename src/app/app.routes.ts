import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { FeedsComponent } from './features/feeds/feeds.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { NotificationComponent } from './features/notification/notification.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from '@core/auth/guards/auth-guard';
import { guestGuard } from '@core/auth/guards/guest-guard';
import { ResetPasswordComponent } from '@features/auth/pages/reset-password/reset-password.component';
import { PostDetailsComponent } from '@features/post-details/post-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [...authRoutes],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
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
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
      {
        path: 'post/:id',
        component: PostDetailsComponent,
        title: 'Post Details',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Fount',
  },
];
