import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostCommentsComponent } from '@features/feeds/components/feeds-content/components/post-comments/post-comments.component';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';
import { PostEngagementBarComponent } from '@shared/components/post-engagement-bar/post-engagement-bar.component';
import { PostLikesModalComponent } from '@shared/components/post-likes-modal/post-likes-modal.component';
import { EditPostDialogComponent } from '@shared/components/edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-post-details',
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    PostCommentsComponent,
    PostEngagementBarComponent,
    PostLikesModalComponent,
    EditPostDialogComponent,
  ],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _postsService = inject(PostsService);

  postId: string = '';
  postDetails: Post | null = null;
  userId: string = '';

  likesForPostId: string | null = null;
  editingPost: Post | null = null;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user') ?? 'null')?._id ?? '';
    this._activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;
      this.getPostDetails();
    });
  }

  getPostDetails(): void {
    this._postsService.getPost(this.postId).subscribe({
      next: (res) => {
        this.postDetails = res.data.post;
      },
    });
  }

  closeLikes(): void {
    this.likesForPostId = null;
  }

  closeEditor(): void {
    this.editingPost = null;
  }

  onEdited(saved: Post): void {
    this.postDetails = saved;
  }
}
