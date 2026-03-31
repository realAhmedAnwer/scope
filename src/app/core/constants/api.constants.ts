export const API_ENDPOINTS = {
  users: {
    signin: 'users/signin',
    signup: 'users/signup',
  },
  posts: {
    single: (id: string): string => `posts/${id}`,
    all: 'posts',
    create: 'posts',
    delete: (id: string): string => `posts/${id}`,
  },
  comments: {
    all: (postId: string, page: number = 1, limit: number = 10): string =>
      `posts/${postId}/comments?page=${page}&limit=${limit}`,
    create: (postId: string): string => `posts/${postId}/comments`,
  },
} as const;
