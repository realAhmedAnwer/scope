export type FeedTimelineOnly = 'all' | 'me' | 'following';

export type FeedNavPayload =
  | { view: 'timeline'; only: FeedTimelineOnly }
  | { view: 'explore' }
  | { view: 'bookmarks' };

export function defaultFeedNav(): Extract<FeedNavPayload, { view: 'timeline' }> {
  return { view: 'timeline', only: 'all' };
}
