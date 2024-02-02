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


//Global state for shoppingCart
const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShoppingCartItem>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);

      if (existingItem) {
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

