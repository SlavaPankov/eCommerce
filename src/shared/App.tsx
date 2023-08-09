import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useProductsData } from '../hooks/useProductsData';
import { MainHeader } from './MainHeader/MainHeader';
import { BaseSpinner } from './BaseSpinner';
import { RegistrationPage } from '../pages/RegistrationPage';
import { NotFound } from '../pages/NotFound';

export function App() {
  useProductsData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainHeader />} />
      </Routes>
      <Routes>
        <Route path="/" element={<BaseSpinner />} />
        <Route path="/registrate" element={<RegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
