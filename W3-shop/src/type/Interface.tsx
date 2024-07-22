export interface Products {
  _id?: number | string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  category?:string;
}

export interface User {
  _id?: number | string;
  username: string;
  email: string;
  password: string;
  role?:string;
}

export interface Category{
  _id?:number|string
  name:string
  description?:string
}
