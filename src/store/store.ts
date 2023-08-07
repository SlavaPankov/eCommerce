import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';

const reducerState = combineReducers({
  products: productsReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
