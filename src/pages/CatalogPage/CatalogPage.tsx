import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Content } from '../../shared/Content';
import { CategoriesContainer } from '../../shared/CategoriesContainer';
import { ERoutes } from '../../types/enums/ERoutes';

export function CatalogPage() {
  const location = useLocation();

  return (
    <Content>
      {location.pathname === ERoutes.catalog ? <CategoriesContainer /> : <Outlet />}
    </Content>
  );
}
