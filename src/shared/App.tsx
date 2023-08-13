import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MainFooter } from './MainFooter';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { refreshTokenRequestAsync, saveToken, tokenRequestAsync } from '../store/token/tokenSlice';
import { createCartRequestAsync, getActiveCartRequestAsync } from '../store/cart/cartSlice';

export function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string>((state) => state.token.payload.token);
  const tokenTimeCreate = useAppSelector<number>((state) => state.token.payload.created_at);
  const expiresIn = useAppSelector<number>((state) => state.token.payload.expires_in);
  const refreshToken = useAppSelector<string>((state) => state.token.payload.refresh_token);
  const { error: cartError } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const tokenLS = localStorage.getItem('token');
    if (!tokenLS) {
      dispatch(tokenRequestAsync());
    } else {
      dispatch(saveToken());
    }
  }, []);

  useEffect(() => {
    if (!expiresIn || !refreshToken) {
      return;
    }

    const currDate = new Date(Date.now()).getTime();
    const tokenExpires = new Date(tokenTimeCreate + expiresIn).getTime();

    if (currDate >= tokenExpires) {
      dispatch(refreshTokenRequestAsync(refreshToken));
    }
  }, [expiresIn, refreshToken]);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (cartError) {
      dispatch(createCartRequestAsync(token));
      return;
    }

    dispatch(getActiveCartRequestAsync(token));
  }, [token, cartError]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainHeader />} />
      </Routes>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registrate" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>
        <Route path="*" element={<MainFooter />} />
      </Routes>
    </BrowserRouter>
  );
}
