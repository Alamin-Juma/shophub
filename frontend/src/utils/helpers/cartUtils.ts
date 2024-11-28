import { CartItem } from "../types/cartItems_types";

interface CartState {
    cartItems: CartItem[];
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

const addDecimals = (num: number): number => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: CartState): CartState => {
    // Recalculate prices
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        )
    );

    // Calculate shipping price (e.g., free shipping for orders over $100, otherwise $10)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calculate tax price (e.g., 15% tax)
    state.taxPrice = addDecimals(+(state.itemsPrice * 0.15).toFixed(2));

    // Calculate total price
    state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    );

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
};
