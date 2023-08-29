import React from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderTop } from './HeaderTop';
import { HeaderMiddle } from './HeaderMiddle';
import { HeaderBottom } from './HeaderBottom';
import { Breadcrumbs } from '../Breadcrumbs';
import { ERoutes } from '../../types/enums/ERoutes';

export function MainHeader() {
  const location = useLocation();

  return (
    <header>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
      {location.pathname !== ERoutes.main && <Breadcrumbs />}
    </header>
  );
}
