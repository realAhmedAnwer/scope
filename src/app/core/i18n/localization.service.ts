import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { I18N_CONFIG } from './i18n.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private readonly _translateService = inject(TranslateService);
  private readonly _rendererFactory = inject(RendererFactory2);
  private readonly _renderer: Renderer2;

  constructor() {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  updateLanguage(language: string): void {
    localStorage.setItem(I18N_CONFIG.storageKey, language);
    this._translateService.use(language);
    this.updateDirection();
  }

  updateDirection(): void {
    const htmlElement = document.documentElement;
    if (localStorage.getItem(I18N_CONFIG.storageKey) === 'ar') {
      this._renderer.setAttribute(htmlElement, 'lang', 'ar');
      this._renderer.setAttribute(htmlElement, 'dir', 'rtl');
    } else {
      this._renderer.setAttribute(htmlElement, 'lang', 'en');
      this._renderer.setAttribute(htmlElement, 'dir', 'ltr');
    }
  }
}
