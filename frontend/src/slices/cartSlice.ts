import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../utils/types/product_Type";

// Extend Product type to include optional quantity
interface CartItem extends Product {
    quantity: number;
}

// Define the type for the initial state interface
interface CartState {
    cartItems: CartItem[];
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

// Retrieve initial state from local storage or set default values
const initialState: CartState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : {
        cartItems: [],
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    };


    const addDecimals = (num: number) => {
        return Number((Math.round(num * 100) / 100).toFixed(2))
    }
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const item = action.payload;
            const existingItemIndex = state.cartItems.findIndex(
                (x) => x._id === item._id
            );

            if (existingItemIndex !== -1) {
                // Update existing item - increment quantity
                const updatedCartItems = [...state.cartItems];
                const existingItem = updatedCartItems[existingItemIndex];

                updatedCartItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: (existingItem.quantity || 1) + 1
                };

                state.cartItems = updatedCartItems;
            } else {
                // Add new item with quantity of 1
                state.cartItems = [
                    ...state.cartItems,
                    { ...item, quantity: 1 }
                ];
            }

            // Recalculate prices
            state.itemsPrice = addDecimals(state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ));

            // Calculate shipping price (e.g., free shipping for orders over $100, otherwise $10)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10) ;

            // Calculate tax price (e.g., 15% tax)
            state.taxPrice = addDecimals(+(state.itemsPrice * 0.15).toFixed(2));

            // Calculate total price
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) + 
                Number(state.taxPrice)
            );
            
            // Update localStorage
            localStorage.setItem("cart", JSON.stringify(state));
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            // Remove item
            state.cartItems = state.cartItems.filter((x) => x._id !== id);

            // Recalculate prices
            state.itemsPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
            state.taxPrice = +(state.itemsPrice * 0.15).toFixed(2);
            state.totalPrice =
                state.itemsPrice + state.shippingPrice + state.taxPrice;

            // Update localStorage
            localStorage.setItem("cart", JSON.stringify(state));
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;

            const itemIndex = state.cartItems.findIndex(x => x._id === id);

            if (itemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];

                if (quantity > 0) {
                    updatedCartItems[itemIndex] = {
                        ...updatedCartItems[itemIndex],
                        quantity
                    };
                } else {
                    // Remove item if quantity is 0 or negative
                    updatedCartItems.splice(itemIndex, 1);
                }

                state.cartItems = updatedCartItems;

                // Recalculate prices
                state.itemsPrice = state.cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
                state.taxPrice = +(state.itemsPrice * 0.15).toFixed(2);
                state.totalPrice =
                    state.itemsPrice + state.shippingPrice + state.taxPrice;

                // Update localStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.itemsPrice = 0;
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;

            // Clear localStorage
            localStorage.removeItem("cart");
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