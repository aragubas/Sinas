import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { PostItemComponent } from './posts-view/post-item/post-item.component';
import { UpvoteDownvoteComponentComponent } from './posts-view/post-item/upvote-downvote-component/upvote-downvote-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
    PostsViewComponent,
    PostItemComponent,
    UpvoteDownvoteComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
