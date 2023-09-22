import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Content } from '../../shared/Content';
import { MainSlider } from '../../shared/MainSlider';
import { SpecialsListContainer } from '../../shared/SpecialsListContainer';
import { HighRatingContainer } from '../../shared/HighRatingContainer';
import { CommerceBanner } from '../../shared/CommerceBanner';
import { TopCategoriesContainer } from '../../shared/TopCategoriesContainer';
import { CallbackFormContainer } from '../../shared/CallbackFormContainer';
import { ERoutes } from '../../types/enums/ERoutes';

export function MainPage() {
  const location = useLocation();

  return (
    <Content>
      {location.pathname === ERoutes.main ? (
        <>
          <MainSlider />
          <SpecialsListContainer />
          <HighRatingContainer />
          <CommerceBanner />
          <TopCategoriesContainer />
          <CallbackFormContainer />
        </>
      ) : (
        <Outlet />
      )}
    </Content>
  );
}
