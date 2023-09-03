import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import categoriesReducer from './categories/categoriesSlice';
import specialsReducer from './specials/specialSlice';
import cartReducer from './cart/cartSlice';
import discountCodeReducer from './discountCode/discountCodeSlice';
import userReducer from './user/userSlice';
import productReducer from './product/productSlice';

const reducerState = combineReducers({
  product: productReducer,
  products: productsReducer,
  categories: categoriesReducer,
  specials: specialsReducer,
  cart: cartReducer,
  discountCode: discountCodeReducer,
  user: userReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
