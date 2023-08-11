import React from 'react';
import { Content } from '../../shared/Content';
import { MainSlider } from '../../shared/MainSlider';
import { SpecialsListContainer } from '../../shared/SpecialsListContainer';
import { HighRatingContainer } from '../../shared/HighRatingContainer';
import { CommerceBanner } from '../../shared/CommerceBanner';

export function MainPage() {
  return (
    <Content>
      <MainSlider />
      <SpecialsListContainer />
      <HighRatingContainer />
      <CommerceBanner />
    </Content>
  );
}
