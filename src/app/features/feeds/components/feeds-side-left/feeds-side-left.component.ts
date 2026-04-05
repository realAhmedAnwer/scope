import { Component, EventEmitter, Output } from '@angular/core';
import { FeedNavPayload } from '../../feed-nav.types';

export type SideSelection = 'feed-all' | 'feed-me' | 'feed-following' | 'explore' | 'bookmarks';

@Component({
  selector: 'app-feeds-side-left',
  imports: [],
  templateUrl: './feeds-side-left.component.html',
})
export class FeedsSideLeftComponent {
  @Output() navChange = new EventEmitter<FeedNavPayload>();

  selected: SideSelection = 'feed-all';

  setTimeline(only: 'all' | 'me' | 'following', key: SideSelection): void {
    this.selected = key;
    this.navChange.emit({ view: 'timeline', only });
  }

  setExplore(): void {
    this.selected = 'explore';
    this.navChange.emit({ view: 'explore' });
  }

  setBookmarks(): void {
    this.selected = 'bookmarks';
    this.navChange.emit({ view: 'bookmarks' });
  }
}
