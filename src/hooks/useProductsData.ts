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

  useEffect(() => {
    dispatch(productsRequestAsync());
  }, []);

  return {
    error,
    loading,
    products,
    offset
  };
}
