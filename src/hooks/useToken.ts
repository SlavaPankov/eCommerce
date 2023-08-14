import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { tokenRequestAsync } from '../store/token/tokenSlice';

export function useToken() {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string>((state) => state.token.payload.token);

  useEffect(() => {
    dispatch(tokenRequestAsync());
  }, []);

  return {
    token
  };
}
