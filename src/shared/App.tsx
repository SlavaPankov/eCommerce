import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useProductsData } from '../hooks/useProductsData';
import { MainHeader } from './MainHeader/MainHeader';

export function App() {
  const { products } = useProductsData();

  useEffect(() => {
    if (products.length) {
      console.log(products);
    }
  }, [products]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainHeader />} />
      </Routes>
      <Routes>
        <Route path="/" element={<h1>eCommerce App with Router & Store</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
