import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ShoppingCartItem = {
    id:string
    product: string;
    quantity: number;
    name: string;
    price: string;
    currency: string;
    image: string;

}


export type ShoppingCartState ={
  cartItems: ShoppingCartItem[];
}

const initialState: ShoppingCartState = {
  cartItems: [],
};



const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShoppingCartItem>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        // If the product already exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the product is not in the cart, add it with quantity 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);

      if (existingItem) {
        // If the product exists, decrease the quantity, remove if quantity becomes 0
        existingItem.quantity -= 1;

        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

  },
});



export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

