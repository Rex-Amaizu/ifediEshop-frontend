// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer,
  orders: orderReducer,
  payment: paymentReducer,
});

export default rootReducer;
