// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
});

export default rootReducer;
