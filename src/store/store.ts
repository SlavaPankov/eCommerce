import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './products/productsSlice';

const reducerState = combineReducers({
  products: tokenReducer
});

const store = configureStore({
  reducer: reducerState
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
