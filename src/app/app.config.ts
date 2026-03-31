import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '@core/interceptors/header-interceptor';
import { errorInterceptor } from '@core/interceptors/error-interceptor';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from '@core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withHashLocation(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, errorInterceptor, loadingInterceptor]),
    ),
    provideHotToastConfig(),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
