import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MainFooter } from './MainFooter';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { useAppDispatch } from '../hooks/storeHooks';
import { createCartRequestAsync, getActiveCartRequestAsync } from '../store/cart/cartSlice';
import { ERoutes } from '../types/enums/ERoutes';
import { CatalogPage } from '../pages/CatalogPage';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getActiveCartRequestAsync()).then(({ type }) => {
      if (type.includes('rejected')) {
        dispatch(createCartRequestAsync());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ERoutes.all} element={<MainHeader />} />
      </Routes>
      <Routes>
        <Route path={ERoutes.main} element={<MainPage />} />
        <Route path={ERoutes.registration} element={<RegistrationPage />} />
        <Route path={ERoutes.login} element={<LoginPage />} />
        <Route path={ERoutes.catalog} element={<CatalogPage />} />
        <Route path={ERoutes.all} element={<NotFound />} />
      </Routes>
      <Routes>
        <Route path={ERoutes.all} element={<MainFooter />} />
      </Routes>
    </BrowserRouter>
  );
}
