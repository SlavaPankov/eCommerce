import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import categoriesReducer from './categories/categoriesSlice';

const reducerState = combineReducers({
  products: productsReducer,
  categories: categoriesReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
