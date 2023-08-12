import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MainFooter } from './MainFooter';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { saveToken, tokenRequestAsync } from '../store/token/tokenSlice';
import { createCartRequestAsync, getActiveCartRequestAsync } from '../store/cart/cartSlice';

export function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string>((state) => state.token.payload.token);
  const { error: cartError } = useAppSelector((state) => state.cart);
  const localToken = localStorage.getItem('token');

  useEffect(() => {
    if (!token && localToken) {
      dispatch(saveToken());
    } else {
      dispatch(tokenRequestAsync());
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (!cartError) {
      dispatch(getActiveCartRequestAsync(token));
    }

    if (cartError) {
      dispatch(createCartRequestAsync(token));
    }
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
