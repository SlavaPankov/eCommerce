import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainHeader } from '../MainHeader';
import { MainFooter } from '../MainFooter';

export function Layout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
}
