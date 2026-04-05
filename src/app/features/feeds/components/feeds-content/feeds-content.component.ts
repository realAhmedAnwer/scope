import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FeedNavPayload } from '../../feed-nav.types';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { RouterLink } from '@angular/router';
import { PostEngagementBarComponent } from '@shared/components/post-engagement-bar/post-engagement-bar.component';
import { PostLikesModalComponent } from '@shared/components/post-likes-modal/post-likes-modal.component';
import { EditPostDialogComponent } from '@shared/components/edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-feeds-content',
  imports: [
    ReactiveFormsModule,
    PostCommentsComponent,
    RouterLink,
    PostEngagementBarComponent,
    PostLikesModalComponent,
    EditPostDialogComponent,
    DatePipe
  ],
  templateUrl: './feeds-content.component.html',
})
export class FeedsContentComponent implements OnInit, OnChanges {
  private readonly _postsService = inject(PostsService);

  @Input() nav: FeedNavPayload = { view: 'timeline', only: 'all' };

  public content: FormControl = new FormControl('');
  public privacy: FormControl = new FormControl('public');
  public file!: File;

  public userId: string = '';
  public currentUser: any = null;
  public posts: Post[] = [];
  public imagePreviewUrl: string | ArrayBuffer | null | undefined;

  likesForPostId: string | null = null;
  editingPost: Post | null = null;

  page = 1;
  loadingPosts = false;
  hasMorePosts = true;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.loadingPosts || !this.hasMorePosts) return;
    
    const pos = Math.ceil(window.innerHeight + window.scrollY);
    const max = document.documentElement.scrollHeight;
    
    if (pos >= max) {
      this.page++;
      this.loadPosts(true);
    }
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') ?? 'null');
    this.userId = this.currentUser?._id ?? '';
    this.loadPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nav'] && !changes['nav'].firstChange) {
      this.loadPosts();
    }
  }

  get showComposer(): boolean {
    return this.nav.view === 'timeline';
  }

  loadPosts(append = false): void {
    if (!append) {
      this.page = 1;
      this.hasMorePosts = true;
      this.posts = [];
    }
    if (!this.hasMorePosts) return;

    this.loadingPosts = true;

    if (this.nav.view === 'explore') {
      this._postsService.getAllPosts().subscribe({
        next: (res) => {
          this.posts = res?.data?.posts ?? [];
          this.loadingPosts = false;
          this.hasMorePosts = false;
        },
      });
      return;
    }
    if (this.nav.view === 'bookmarks') {
      this._postsService.getBookmarkedPosts().subscribe({
        next: (res) => {
          this.posts = res?.data?.bookmarks ?? [];
          this.loadingPosts = false;
          this.hasMorePosts = false;
        },
      });
      return;
    }
    this._postsService.getFeedPosts(this.nav.only, this.page).subscribe({
      next: (res) => {
        const fetched = res?.data?.posts ?? [];
        if (append) {
          this.posts = [...this.posts, ...fetched];
        } else {
          this.posts = fetched;
        }
        if (fetched.length === 0) {
          this.hasMorePosts = false;
        }
        this.loadingPosts = false;
      },
    });
  }

  onPostUpdated(updated: Post): void {
    const i = this.posts.findIndex((p) => p._id === updated._id);
    if (i >= 0) {
      const newPosts = [...this.posts];
      newPosts[i] = updated;
      this.posts = newPosts;
    }
  }

  closeLikes(): void {
    this.likesForPostId = null;
  }

  closeEditor(): void {
    this.editingPost = null;
  }

  onEdited(saved: Post): void {
    this.onPostUpdated(saved);
  }

  bookmarkFromMenu(post: Post, ev: Event): void {
    ev.stopPropagation();
    this._postsService.toggleBookmark(post._id).subscribe({
      next: (res) => {
        const p = res?.data?.post;
        if (p) this.onPostUpdated(p);
      },
    });
  }

  openEditFromMenu(post: Post, ev: Event): void {
    ev.stopPropagation();
    this.editingPost = post;
  }

  selectImage(e: Event): void {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.updateImagePreview();
    }
  }

  createNewPost(e: Event): void {
    e.preventDefault();

    const formData = new FormData();
    if (this.privacy.value) formData.append('privacy', this.privacy.value);
    if (this.content.value) formData.append('body', this.content.value);
    if (this.file) formData.append('image', this.file);

    this._postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          const form = e.target as HTMLFormElement;
          form.reset();
          this.imagePreviewUrl = '';
          this.loadPosts();
        }
      },
    });
  }

  deletePost(id: string): void {
    this._postsService.deletePost(id).subscribe({
      next: (res) => {
        if (res.success) this.loadPosts();
      },
    });
  }

  private updateImagePreview(): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      this.imagePreviewUrl = e.target?.result;
    };
  }
}
