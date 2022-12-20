import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import productsReducer from "./features/products-slice";
import categoriesReducer from "./features/categories-slice";
import checkoutReducer from "./features/checkOut-slice";

export const store= configureStore({
    // here we pass different reducers
    reducer:{
        cart:cartReducer,
        products:productsReducer,
        categories:categoriesReducer,
        checkout: checkoutReducer,
    }
});