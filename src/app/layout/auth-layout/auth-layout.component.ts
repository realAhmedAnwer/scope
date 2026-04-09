import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangSwitchComponent } from '@shared/components/lang-switch/lang-switch.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LangSwitchComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {

}
