import React from 'react';
import { Content } from '../../shared/Content';
import { MainSlider } from '../../shared/MainSlider';
import { SpecialsListContainer } from '../../shared/SpecialsListContainer';
import { HighRatingContainer } from '../../shared/HighRatingContainer';
import { CommerceBanner } from '../../shared/CommerceBanner';
import { TopCategoriesContainer } from '../../shared/TopCategoriesContainer';
import { CallbackFormContainer } from '../../shared/CallbackFormContainer';

export function MainPage() {
  return (
    <Content>
      <MainSlider />
      <SpecialsListContainer />
      <HighRatingContainer />
      <CommerceBanner />
      <TopCategoriesContainer />
      <CallbackFormContainer />
    </Content>
  );
}
