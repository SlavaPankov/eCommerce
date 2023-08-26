import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { productsRequestAsync } from '../store/products/productsSlice';

export function useProductsData() {
  const dispatch = useAppDispatch();
  const error = useAppSelector<string>((state) => state.products.error);
  const loading = useAppSelector<boolean>((state) => state.products.loading);
  const payload = useAppSelector((state) => state.products.payload);
  const offset = useAppSelector<number>((state) => state.products.offset);

  useEffect(() => {
    if (payload.products.products.length) {
      return;
    }

    dispatch(productsRequestAsync({ offset }));
  }, [offset]);

  return {
    error,
    loading,
    payload,
    offset
  };
}
