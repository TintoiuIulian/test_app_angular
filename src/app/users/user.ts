import { IServerPost } from "../posts/post";

export interface IServerUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    },
  },
  posts: IServerPost[]
}

// export interface IUser {
//   UserId: number;
//   Name: string;
//   Username: string;
//   Email: string;
//   FullAddress:string;

// }
