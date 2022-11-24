import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscription, catchError, EMPTY } from 'rxjs';
import { IPost } from '../posts/post';
import { IUser } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent  {

  constructor(private usersService: UsersService) {}

  // filteredUsers: IUser[] = [];
  errorMessage: string = '';


  users$ = this.usersService.streamUsersAndPosts$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );


}
