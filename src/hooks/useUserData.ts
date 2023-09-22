import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { getMeRequestAsync } from '../store/user/userSlice';

export function useUserData() {
  const dispatch = useAppDispatch();
  const { error, loading, user } = useAppSelector((state) => state.user);
  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    if (user.id || !isAuth) {
      return;
    }

    dispatch(getMeRequestAsync());
  }, []);

  return {
    error,
    loading,
    user
  };
}
