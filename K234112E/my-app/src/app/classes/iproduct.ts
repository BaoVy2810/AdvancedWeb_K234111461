export interface IProduct
{
    id: string;
    name: string;
    quantity: number;
    price: number;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/** Order saved to MongoDB only on checkout (Session → DB). */
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface Order {
  _id?: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt?: Date;
}
