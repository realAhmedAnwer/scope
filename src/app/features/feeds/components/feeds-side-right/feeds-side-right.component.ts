import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-feeds-side-right',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './feeds-side-right.component.html',
})
export class FeedsSideRightComponent implements OnInit {
  private readonly _usersService = inject(UsersService);

  suggestions: any[] = [];
  suggestionsReady = false;

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this._usersService
      .getSuggestions(1, 8)
      .pipe(finalize(() => (this.suggestionsReady = true)))
      .subscribe({
        next: (res) => {
          this.suggestions = res?.data?.users ?? res?.data?.suggestions ?? [];
        },
      });
  }

  followUser(userId: string): void {
    this._usersService.toggleFollow(userId).subscribe({
      next: (res) => {
        this.suggestions = this.suggestions.filter(u => u._id !== userId);
      }
    });
  }
}
