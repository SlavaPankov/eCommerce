import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { getMeRequestAsync } from '../store/user/userSlice';

export function useUserData() {
  const dispatch = useAppDispatch();
  const { error, loading, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
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
