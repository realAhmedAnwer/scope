import { Component } from '@angular/core';
import { FeedsContentComponent } from './components/feeds-content/feeds-content.component';
import { FeedsSideLeftComponent } from './components/feeds-side-left/feeds-side-left.component';
import { FeedsSideRightComponent } from './components/feeds-side-right/feeds-side-right.component';
import { defaultFeedNav, FeedNavPayload } from './feed-nav.types';

@Component({
  selector: 'app-feeds',
  imports: [FeedsContentComponent, FeedsSideLeftComponent, FeedsSideRightComponent],
  templateUrl: './feeds.component.html',
})
export class FeedsComponent {
  nav: FeedNavPayload = defaultFeedNav();

  onNavChange(payload: FeedNavPayload): void {
    this.nav = payload;
  }
}
