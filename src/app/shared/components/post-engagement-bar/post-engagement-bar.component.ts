import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-engagement-bar',
  imports: [TranslatePipe],
  templateUrl: './post-engagement-bar.component.html',
})
export class PostEngagementBarComponent {
  private readonly _postsService = inject(PostsService);

  @Input({ required: true }) post!: Post;
  @Input() userId = '';

  @Output() postUpdated = new EventEmitter<Post>();
  @Output() openLikers = new EventEmitter<string>();
  @Output() openEditor = new EventEmitter<Post>();

  showLikes(): void {
    this.openLikers.emit(this.post._id);
  }

  isLiked(): boolean {
    return this.post.likes?.some((like: any) => like._id === this.userId || like === this.userId) ?? false;
  }

  like(): void {
    this._postsService.toggleLike(this.post._id).subscribe({
      next: (res: any) => {
        if (res?.data?.post) {
          this.postUpdated.emit(res.data.post);
        }
      },
    });
  }

  share(): void {
    this._postsService.share(this.post._id).subscribe({
      next: (res: any) => {
        if (res?.data?.post) {
          this.postUpdated.emit(res.data.post);
        }
      },
    });
  }

  edit(): void {
    this.openEditor.emit(this.post);
  }

  bookmark(): void {
    this._postsService.toggleBookmark(this.post._id).subscribe({
      next: (res: any) => {
        if (res?.data?.post) {
          this.postUpdated.emit(res.data.post);
        }
      },
    });
  }
}
