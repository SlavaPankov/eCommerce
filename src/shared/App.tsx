import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MainFooter } from './MainFooter';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { useAppDispatch } from '../hooks/storeHooks';
import { saveToken, tokenRequestAsync } from '../store/token/tokenSlice';

export function App() {
  const dispatch = useAppDispatch();
  const localToken = localStorage.getItem('token');

  useEffect(() => {
    if (localToken) {
      dispatch(saveToken());
    } else {
      dispatch(tokenRequestAsync());
    }
  }, []);

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
