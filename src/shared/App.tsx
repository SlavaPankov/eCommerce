import React, { useEffect } from 'react';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { RegistrationPage } from '../pages/RegistrationPage';
import { NotFound } from '../pages/NotFound';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { UserProfile } from '../pages/UserProfile';
import { useAppDispatch } from '../hooks/storeHooks';
import { createCartRequestAsync, getActiveCartRequestAsync } from '../store/cart/cartSlice';
import { ERoutes } from '../types/enums/ERoutes';
import { CatalogPage } from '../pages/CatalogPage';
import { CategoryPage } from '../pages/CategoryPage';
import { SearchPage } from '../pages/SearchPage';
import { Layout } from './Layout';
import { ProductPage } from '../pages/ProductPage';
import { categoriesAsyncRequest } from '../store/categories/categoriesSlice';
import { AboutUs } from '../pages/AboutUs';
import { CartPage } from '../pages/CartPage';

export const routeObject = createRoutesFromElements(
  <Route path={ERoutes.main} element={<Layout />}>
    <Route path={ERoutes.main} element={<MainPage />} handle={{ crumb: () => 'Главная' }}>
      <Route
        index={true}
        path={ERoutes.login}
        element={<LoginPage />}
        handle={{ crumb: () => 'Авторизация' }}
      />
      <Route
        index={true}
        path={ERoutes.registration}
        element={<RegistrationPage />}
        handle={{ crumb: () => 'Регистрация' }}
      />
      <Route
        index={true}
        path={ERoutes.person}
        element={<UserProfile />}
        handle={{ crumb: () => 'Личный кабинет' }}
      />
      <Route
        index={true}
        path={ERoutes.about}
        element={<AboutUs />}
        handle={{ crumb: () => 'О нас' }}
      />
      <Route path={ERoutes.catalog} element={<CatalogPage />} handle={{ crumb: () => 'Каталог' }}>
        <Route
          index={true}
          path={ERoutes.category}
          element={<CategoryPage />}
          handle={{ crumb: () => 'Категория' }}
        />
      </Route>
      <Route path={ERoutes.product} element={<ProductPage />} handle={{ crumb: () => '' }} />
      <Route
        index={true}
        path={ERoutes.search}
        element={<SearchPage />}
        handle={{ crumb: () => 'Результаты поиска' }}
      />
      <Route
        index={true}
        path={ERoutes.cart}
        element={<CartPage />}
        handle={{ crumb: () => 'Корзина' }}
      />
      <Route
        index={true}
        path={ERoutes.all}
        element={<NotFound />}
        handle={{ crumb: () => 'Страница не найдена' }}
      />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeObject);

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAsyncRequest());

    dispatch(getActiveCartRequestAsync()).then(({ type }) => {
      if (!type.includes('reject')) {
        return;
      }

      dispatch(createCartRequestAsync());
    });
  }, []);

  return <RouterProvider router={router} />;
}
