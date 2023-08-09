import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useProductsData } from '../hooks/useProductsData';
import { MainHeader } from './MainHeader';
import { BaseSpinner } from './BaseSpinner';
import { MainFooter } from './MainFooter';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>
        <Route path="*" element={<MainFooter />} />
      </Routes>
    </BrowserRouter>
  );
}
