import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { IServerPost } from '../posts/post';
import { EMPTY, Observable, Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {

  filteredPosts: IServerPost[] = [];
  errorMessage: string = '';
  filterTerm!: string;

  constructor(private usersService: UsersService) {}

  posts$ = this.usersService.postsResponse$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
