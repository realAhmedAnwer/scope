import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';

@Component({
  selector: 'app-edit-post-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-post-dialog.component.html',
})
export class EditPostDialogComponent implements OnChanges {
  private readonly _postsService = inject(PostsService);

  @Input() post: Post | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Post>();

  form = new FormGroup({
    body: new FormControl('', { nonNullable: true }),
    privacy: new FormControl<'public' | 'following' | 'only_me'>('public', { nonNullable: true }),
  });

  file: File | null = null;
  preview: string | ArrayBuffer | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.form.patchValue({
        body: this.post.body ?? '',
        privacy: (this.post.privacy as 'public' | 'following' | 'only_me') || 'public',
      });
      this.file = null;
      this.preview = this.post.image || null;
    }
  }

  selectFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    this.file = f;
    const r = new FileReader();
    r.onload = () => (this.preview = r.result);
    r.readAsDataURL(f);
  }

  submit(): void {
    if (!this.post || this.form.invalid) return;
    const fd = new FormData();
    fd.append('body', this.form.get('body')!.value);
    fd.append('privacy', this.form.get('privacy')!.value);
    if (this.file) fd.append('image', this.file);

    this._postsService.updatePost(this.post._id, fd).subscribe({
      next: (res) => {
        const p = res?.data?.post;
        if (p) this.saved.emit(p);
        this.close();
      },
    });
  }

  close(): void {
    this.closed.emit();
  }
}
