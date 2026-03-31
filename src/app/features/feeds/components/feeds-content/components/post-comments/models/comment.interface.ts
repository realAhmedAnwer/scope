export interface Comment {
  _id: string;
  content: string;
  image: string;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  post: string;
  parentComment: any;
  likes: any[];
  createdAt: string;
  repliesCount: number;
}
