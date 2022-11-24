export interface IUser  {
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
    }
}
}

// export interface IAddress extends IGeo {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: Array<IGeo>;
// }

// export interface IGeo {
//   lat: string;
//   lng: string;
// }
