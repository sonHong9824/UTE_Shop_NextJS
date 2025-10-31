export interface IProductImage {
  _id: string;
  url: string;
  alt?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  slug?: string;
  images?: IProductImage[];
}
