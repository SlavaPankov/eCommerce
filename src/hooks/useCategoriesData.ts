import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { categoriesAsyncRequest } from '../store/categories/categoriesSlice';

export function useCategoriesData() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);
  const error = useAppSelector((state) => state.categories.error);
  const token = useAppSelector((state) => state.token.payload.token);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(categoriesAsyncRequest(token));
  }, [token]);

  return {
    categories,
    loading,
    error
  };
}
