import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@shared/models/post.interface';
import { PostsService } from '@shared/services/posts.service';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _postsService = inject(PostsService);

  postId: string = '';
  postDetails: Post = {} as Post;

  ngOnInit(): void {
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
      error: (err) => {
        console.log(err);
      },
    });
  }
}
