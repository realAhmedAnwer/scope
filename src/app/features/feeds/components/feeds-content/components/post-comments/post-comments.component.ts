import { Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comment.interface';

@Component({
  selector: 'app-post-comments',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './post-comments.component.html',
})
export class PostCommentsComponent implements OnInit {
  private readonly _commentsService = inject(CommentsService);

  @Input() postId: string = '';
  @Input() userId: string = '';
  @Input() userPhoto = '/assets/avatar.png';

  comments: Comment[] = [];
  newComment = new FormControl('');
  newCommentFile: File | null = null;

  activeReplyTo: string | null = null;
  replyText = new FormControl('');

  repliesLoaded = new Set<string>();
  repliesById: Record<string, Comment[]> = {};
  loadingReplies = new Set<string>();

  editingCommentId: string | null = null;
  editText = new FormControl('');

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this._commentsService.getComments(this.postId, 1, 30).subscribe({
      next: (res) => {
        this.comments = res?.data?.comments ?? [];
      },
    });
  }

  selectCommentImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.newCommentFile = input.files?.[0] ?? null;
  }

  submitComment(): void {
    const text = this.newComment.value?.trim();
    if (!text && !this.newCommentFile) return;

    const fd = new FormData();
    if (text) fd.append('content', text);
    if (this.newCommentFile) fd.append('image', this.newCommentFile);

    this._commentsService.createComment(this.postId, fd).subscribe({
      next: () => {
        this.newComment.reset();
        this.newCommentFile = null;
        this.loadComments();
      },
    });
  }

  toggleReply(commentId: string): void {
    this.activeReplyTo = this.activeReplyTo === commentId ? null : commentId;
    this.replyText.reset();
    if (this.activeReplyTo && !this.repliesLoaded.has(commentId)) {
      this.fetchReplies(commentId);
    }
  }

  fetchReplies(commentId: string): void {
    if (this.loadingReplies.has(commentId)) return;
    this.loadingReplies.add(commentId);
    this._commentsService.getReplies(this.postId, commentId, 1, 20).subscribe({
      next: (res) => {
        this.repliesById[commentId] = res?.data?.comments ?? res?.data?.replies ?? [];
        this.repliesLoaded.add(commentId);
      },
      complete: () => this.loadingReplies.delete(commentId),
    });
  }

  submitReply(parentId: string): void {
    const text = this.replyText.value?.trim();
    if (!text) return;

    const fd = new FormData();
    fd.append('content', text);

    this._commentsService.createReply(this.postId, parentId, fd).subscribe({
      next: () => {
        this.replyText.reset();
        this.activeReplyTo = null;
        this.repliesLoaded.delete(parentId);
        this.fetchReplies(parentId);
        this.loadComments();
      },
    });
  }

  toggleCommentLike(comment: Comment): void {
    this._commentsService.toggleCommentLike(this.postId, comment._id).subscribe({
      next: (res) => {
        const updated = res?.data?.comment;
        if (updated) {
          const idx = this.comments.findIndex((c) => c._id === comment._id);
          if (idx >= 0) {
            const newComments = [...this.comments];
            newComments[idx] = updated as Comment;
            this.comments = newComments;
          }
        } else {
          this.loadComments();
        }
      },
    });
  }

  startEdit(comment: Comment): void {
    this.editingCommentId = comment._id;
    this.editText.setValue(comment.content ?? '');
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editText.reset();
  }

  saveEdit(commentId: string): void {
    const fd = new FormData();
    fd.append('content', this.editText.value?.trim() ?? '');

    this._commentsService.updateComment(this.postId, commentId, fd).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadComments();
      },
    });
  }

  deleteComment(commentId: string): void {
    this._commentsService.deleteComment(this.postId, commentId).subscribe({
      next: () => this.loadComments(),
    });
  }

  isCommentOwner(comment: Comment): boolean {
    return comment.commentCreator?._id === this.userId;
  }
}
