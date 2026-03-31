import { Component } from '@angular/core';
import { FeedsContentComponent } from './components/feeds-content/feeds-content.component';
import { FeedsSideLeftComponent } from './components/feeds-side-left/feeds-side-left.component';
import { FeedsSideRightComponent } from './components/feeds-side-right/feeds-side-right.component';

@Component({
  selector: 'app-feeds',
  imports: [FeedsContentComponent, FeedsSideLeftComponent, FeedsSideRightComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
})
export class FeedsComponent {}
