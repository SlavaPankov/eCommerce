import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import categoriesReducer from './categories/categoriesSlice';
import specialsReducer from './specials/specialSlice';

const reducerState = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  specials: specialsReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
