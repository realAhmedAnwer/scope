import { initFlowbite } from 'flowbite';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly _authService = inject(AuthService);
  ngOnInit(): void {
    initFlowbite();
  }
  logout(): void {
    this._authService.signout();
  }
}
