import { writable } from 'svelte/store';

// Define the type for a cart item
interface CartItem {
    sectionId: string;
    crs_code: string;
    sect_days: string;
    sect_start_time: string;
    sect_end_time: string;
}

// Initialize the writable store with an empty array of CartItems
export const cartStore = writable<CartItem[]>([]);

// Add item to cart
export const addToCart = (item: CartItem) => {
    cartStore.update((cart) => {
        // Avoid duplicates based on sectionId
        if (!cart.some((cartItem) => cartItem.sectionId === item.sectionId)) {
            return [...cart, item];
        }
        return cart;
    });
};

// Remove from cart function
export const removeFromCart = (sectionId: string) => {
    cartStore.update((cart) => cart.filter((item) => item.sectionId !== sectionId));
};

// Clear cart function
export const clearCart = () => {
    cartStore.set([]);
};
