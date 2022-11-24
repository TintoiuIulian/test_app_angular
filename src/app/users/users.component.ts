import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usersService: UsersService, private router: Router) {}

  // filteredUsers: IUser[] = [];
  errorMessage: string = '';


  users$ = this.usersService.usersResponse$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  users12$ = this.usersService.streamUsersAndPosts$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  goToMoreInfo($myParam: string = ''): void {
    const navigationDetails: string[] = ['/posts'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }


}
