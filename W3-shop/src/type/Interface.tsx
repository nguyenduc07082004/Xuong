export interface Products{
    id?: number|string;
    name: string;
    imageUrl:string;
    description: string;
    price: number;
}

export interface Email{
    id?:number|string;
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}