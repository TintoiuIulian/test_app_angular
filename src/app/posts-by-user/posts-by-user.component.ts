import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.css'],
})
export class PostsByUserComponent {

  errorMessage: string = '';
  id: string | undefined | null;
  constructor(private usersService: UsersService, private readonly route: ActivatedRoute) { }


  usersFiltered$ = this.usersService.streamUsersAndPosts$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if(this.id)
        {
          this.usersService.getSingleUser(this.id).subscribe(usersData => console.log(usersData));
        }
      }
     
    )

  }
}
