import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../utils/types/cartItems_types";
import { updateCart } from "../utils/helpers/cartUtils";

interface CartState {
    cartItems: CartItem[];
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

const initialState: CartState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : {
        cartItems: [],
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const existingItemIndex = state.cartItems.findIndex(
                (x) => x._id === item._id
            );
        
            if (existingItemIndex !== -1) {
                // Replace existing item's quantity entirely
                state.cartItems[existingItemIndex].quantity = item.quantity;
            } else {
                // Add new item
                state.cartItems.push(item);
            }
        
            return updateCart(state); 
        },
        
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },

        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(x => x._id === id);

            if (itemIndex !== -1) {
                if (quantity > 0) {
                    state.cartItems[itemIndex].quantity = quantity;
                } else {
                    // Remove item if quantity is 0 or negative
                    state.cartItems.splice(itemIndex, 1);
                }
                return updateCart(state);
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
} = cartSlice.actions;

export default cartSlice.reducer;