import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PostsService } from '@shared/services/posts.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-likes-modal',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './post-likes-modal.component.html',
})
export class PostLikesModalComponent implements OnChanges {
  private readonly _postsService = inject(PostsService);

  @Input() postId: string | null = null;
  @Output() closed = new EventEmitter<void>();

  users: any[] = [];
  page = 1;
  hasMore = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId) {
      this.page = 1;
      this.users = [];
      this.hasMore = true;
      this.loadPage();
    }
  }

  loadPage(): void {
    if (!this.postId || !this.hasMore) return;
    this._postsService.getPostLikes(this.postId, this.page, 20).subscribe({
      next: (res) => {
        const list = res?.data?.users ?? res?.data?.likes ?? [];
        this.users = this.page === 1 ? list : [...this.users, ...list];
        this.hasMore = list.length >= 20;
      },
    });
  }

  loadMore(): void {
    if (!this.hasMore) return;
    this.page += 1;
    this.loadPage();
  }

  close(): void {
    this.closed.emit();
  }
}
