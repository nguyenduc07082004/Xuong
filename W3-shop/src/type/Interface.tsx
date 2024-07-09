export interface Products{
    id?: number|string;
    name: string;
    imageUrl:string;
    description: string;
    price: number;
}

export interface Email{
    id?:number|string;
    name:string;
    email:string;
    pass:string;
    userName:string;
}