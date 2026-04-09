import { Component, inject, OnInit } from '@angular/core';
import { LocalizationService } from '@core/i18n/localization.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { I18N_CONFIG } from '@core/i18n/i18n.constants';

@Component({
  selector: 'app-lang-switch',
  imports: [TranslatePipe],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.css',
})
export class LangSwitchComponent implements OnInit {
  private readonly _localizationService = inject(LocalizationService);
  private readonly _translateService = inject(TranslateService);
  public currentLanguage = 'en';

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem(I18N_CONFIG.storageKey) || this._translateService.getDefaultLang() || 'en';
  }

  updateLanguage(language: string): void {
    if (this.currentLanguage === language) return;
    this._localizationService.updateLanguage(language);
    this.currentLanguage = language;
  }
}
