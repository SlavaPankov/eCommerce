import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { MainFooter } from './MainFooter';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainHeader />} />
      </Routes>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>
        <Route path="*" element={<MainFooter />} />
      </Routes>
    </BrowserRouter>
  );
}
