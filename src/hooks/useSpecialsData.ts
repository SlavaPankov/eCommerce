import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { IProduct } from '../types/interfaces/IProduct';
import { specialsRequestAsync } from '../store/specials/specialSlice';

export function useSpecialsData() {
  const dispatch = useAppDispatch();
  const specials = useAppSelector<Array<IProduct>>((state) => state.specials.payload);
  const loading = useAppSelector<boolean>((state) => state.specials.loading);
  const error = useAppSelector<string>((state) => state.specials.error);

  useEffect(() => {
    if (specials.length === 0) {
      dispatch(specialsRequestAsync());
    }
  }, [specials]);

  return {
    specials,
    loading,
    error
  };
}
