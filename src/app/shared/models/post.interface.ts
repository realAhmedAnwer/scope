export interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  sharedPost: any;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: any;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}
