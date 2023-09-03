import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { getProductByKeyAsyncRequest } from '../store/product/productSlice';

export function useProductData(key: string) {
  const { error, loading, product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!key) {
      return;
    }

    dispatch(getProductByKeyAsyncRequest(key));
  }, []);

  return {
    error,
    loading,
    product
  };
}
