// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  auth: authReducer,
});

export default rootReducer;
