import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { productsRequestAsync } from '../store/products/productsSlice';
import { IProduct } from '../types/interfaces/IProduct';

export function useProductsData() {
  const dispatch = useAppDispatch();
  const error = useAppSelector<string>((state) => state.products.error);
  const loading = useAppSelector<boolean>((state) => state.products.loading);
  const products = useAppSelector<Array<IProduct>>((state) => state.products.products);
  const offset = useAppSelector<number>((state) => state.products.offset);
  const token = useAppSelector<string>((state) => state.token.payload.token);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(productsRequestAsync({ offset, token }));
  }, [offset, token]);

  return {
    error,
    loading,
    products,
    offset
  };
}
