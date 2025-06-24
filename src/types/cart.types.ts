export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  name: string;
  price: number;
  price_2: number;
  quantity: number;
  img: string;
}
