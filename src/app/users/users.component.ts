import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.sub = this.usersService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
