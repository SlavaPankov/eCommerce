import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { anonymousTokenRequestAsync } from '../store/token/tokenSlice';

export function useToken() {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string>((state) => state.token.payload.token);

  useEffect(() => {
    dispatch(anonymousTokenRequestAsync());
  }, []);

  return {
    token
  };
}
