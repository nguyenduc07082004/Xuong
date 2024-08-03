export interface Products {
  _id?: number | string | undefined;
  title: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
  price: number | undefined;
  category?: string | undefined;
}

export interface Category {
  _id?: number | string | undefined;
  name: string | undefined;
  description?: string | undefined;
}

export interface User {
  _id?: number | string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: string | undefined;
}
