import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18N_CONFIG } from '@core/i18n/i18n.constants';
import { LocalizationService } from '@core/i18n/localization.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
})
export class App {
  private _translate = inject(TranslateService);
  private _localizationService = inject(LocalizationService);

  constructor() {
    this._translate.addLangs(I18N_CONFIG.languages);
    this._translate.use(localStorage.getItem(I18N_CONFIG.storageKey) || I18N_CONFIG.defaultLang);
    this._localizationService.updateDirection();
  }
}
