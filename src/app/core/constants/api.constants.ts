export const API_ENDPOINTS = {
  users: {
    signin: 'users/signin',
    signup: 'users/signup',
    profileData: 'users/profile-data',
    changePassword: 'users/change-password',
    uploadPhoto: 'users/upload-photo',
    suggestions: (page: number = 1, limit: number = 10): string =>
      `users/suggestions?page=${page}&limit=${limit}`,
  },
  posts: {
    single: (id: string): string => `posts/${id}`,
    all: 'posts',
    feed: (
      only: 'following' | 'me' | 'all' | 'bookmarks' = 'all',
      page: number = 1,
      limit: number = 10,
    ): string => `posts/feed?only=${only}&page=${page}&limit=${limit}`,
    create: 'posts',
    delete: (id: string): string => `posts/${id}`,
    update: (id: string): string => `posts/${id}`,
    toggleLike: (id: string): string => `posts/${id}/like`,
    likes: (id: string, page: number = 1, limit: number = 10): string =>
      `posts/${id}/likes?page=${page}&limit=${limit}`,
    toggleBookmark: (id: string): string => `posts/${id}/bookmark`,
    share: (id: string): string => `posts/${id}/share`,
    bookmarked: 'users/bookmarks'
  },
  comments: {
    all: (postId: string, page: number = 1, limit: number = 10): string =>
      `posts/${postId}/comments?page=${page}&limit=${limit}`,
    create: (postId: string): string => `posts/${postId}/comments`,
    replies: (postId: string, commentId: string, page: number = 1, limit: number = 10): string =>
      `posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
    createReply: (postId: string, commentId: string): string =>
      `posts/${postId}/comments/${commentId}/replies`,
    update: (postId: string, commentId: string): string => `posts/${postId}/comments/${commentId}`,
    delete: (postId: string, commentId: string): string => `posts/${postId}/comments/${commentId}`,
    toggleLike: (postId: string, commentId: string): string =>
      `posts/${postId}/comments/${commentId}/like`,
  },
  notifications: {
    all: (page: number = 1, limit: number = 10): string => `notifications?page=${page}&limit=${limit}`,
    unreadCount: 'notifications/unread-count',
    markRead: (notificationId: string): string => `notifications/${notificationId}/read`,
    readAll: 'notifications/read-all',
  },
} as const;
