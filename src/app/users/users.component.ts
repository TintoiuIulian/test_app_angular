import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, EMPTY } from 'rxjs';
import { IServerPost } from '../posts/post';
import { IServerUser } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent  {

  constructor(private usersService: UsersService, private router: Router) {}


  errorMessage: string = '';


  users$ = this.usersService.usersResponse$.pipe(
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

  filteredUsers: IServerUser[] = [];
  users: IServerUser[] = [];
  sub!: Subscription;


  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.performFilter(value);
    console.log('setter', value);
  }

  performFilter(filterBy: string): IServerUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: IServerUser) =>
      user.name.toLocaleLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    this.sub = this.usersService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error: err => this.errorMessage = err
    });
  }

}
