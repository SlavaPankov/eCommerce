import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import categoriesReducer from './categories/categoriesSlice';
import specialsReducer from './specials/specialSlice';
import tokenReducer from './token/tokenSlice';
import cartReducer from './cart/cartSlice';

const reducerState = combineReducers({
  token: tokenReducer,
  products: productsReducer,
  categories: categoriesReducer,
  specials: specialsReducer,
  cart: cartReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
