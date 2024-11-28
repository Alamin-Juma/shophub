import { CartItem } from "./cartItems_types";

export interface CartState {
    cartItems: CartItem[];
    total: number;
}
