import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-feeds-content',
  imports: [ReactiveFormsModule, PostCommentsComponent, RouterLink],
  templateUrl: './feeds-content.component.html',
  styleUrl: './feeds-content.component.css',
})
export class FeedsContentComponent implements OnInit {
  private readonly _postsService = inject(PostsService);

  public content: FormControl = new FormControl('');
  public privacy: FormControl = new FormControl('public');
  public file!: File;

  public userId: string = '';
  public posts: Post[] = [];
  public imagePreviewUrl: string | ArrayBuffer | null | undefined;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!)?._id;
    this.getFeedPosts();
  }

  getFeedPosts(): void {
    this._postsService.getAllPosts().subscribe({
      next: (res) => {
        this.posts = res.data.posts;
        console.log(this.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
          this.getFeedPosts();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(id: string): void {
    this._postsService.deletePost(id).subscribe({
      next: (res) => {
        if (res.success) this.getFeedPosts();
      },
      error: (err) => {},
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
