import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { errorInterceptor } from '@core/interceptors/error-interceptor';
import { headerInterceptor } from '@core/interceptors/header-interceptor';
import { loadingInterceptor } from '@core/interceptors/loading-interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { I18N_CONFIG } from '@core/i18n/i18n.constants';

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
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: I18N_CONFIG.assetsPath,
        suffix: I18N_CONFIG.fileExtension,
      }),
      fallbackLang: I18N_CONFIG.defaultLang,
      lang: I18N_CONFIG.defaultLang,
    }),
  ],
};
