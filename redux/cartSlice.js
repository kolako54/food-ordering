import {createSlice} from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        total: 0
    },
    reducer: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.total = action.payload.price * action.payload.quantity;
        },
        reset: (state) => {
            state = initialState;
        }
    }
})
export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;