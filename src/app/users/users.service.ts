import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { IServerPost } from '../posts/post';
import {  IServerUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IServerUser[]> {
    return this.http.get<IServerUser[]>(this.usersUrl + '/users').pipe(
      tap((data) => console.log('All users', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  usersResponse$ = this.http.get<IServerUser[]>(this.usersUrl + '/users').pipe(
    tap((data) => console.log('All users', JSON.stringify(data))),
    catchError(this.handleError)
  );

  postsResponse$ = this.http.get<IServerPost[]>(this.usersUrl + '/posts').pipe(
    tap((data) => console.log('All posts', JSON.stringify(data))),
    catchError(this.handleError)
  );

  streamUsersAndPosts$ = combineLatest([
    this.usersResponse$,
    this.postsResponse$,
  ]).pipe(
    map(([users, posts]) =>
     users.map(
        (user: IServerUser) =>
          ({
            // ...user,
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            posts: posts.filter((post) => user.id === post.userId),
          } as IServerUser)
      )
    )
  );

  // {
  //   let usersArray: any[] = [];
  //   let user: any;
  //   for(const item of users){
  //       let post:IUser;
  //       user.UserId = item.id;

  //       for(const post of posts){
  //         if(post.userId === item.id){
  //           user.posts.push(post)
  //         }
  //       }

  //       users.push(user);
  //     }
  //     return usersArray;

  // }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
