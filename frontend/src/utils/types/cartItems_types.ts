import { Product } from "./product_Type";

// Extend Product type to include optional quantity
export interface CartItem extends Product {
    quantity: number;
}
