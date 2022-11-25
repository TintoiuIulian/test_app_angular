import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.css'],
})
export class PostsByUserComponent {
  constructor(private usersService: UsersService) {}
  errorMessage: string = '';
 
  usersFiltered$ = this.usersService.streamUsersAndPosts$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
}
