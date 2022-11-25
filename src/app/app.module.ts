import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';

import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { PostsByUserComponent } from './posts-by-user/posts-by-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CommentsComponent,
    PostsComponent,
    PostsByUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
