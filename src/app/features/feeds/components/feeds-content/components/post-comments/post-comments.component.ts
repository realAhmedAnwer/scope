import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comment.interface';

@Component({
  selector: 'app-post-comments',
  imports: [],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {
  private readonly _commentsService = inject(CommentsService);

  @Input() postId: string = '';

  comments: Comment[] = [];

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this._commentsService.getComments(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.comments = res.data.comments;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
