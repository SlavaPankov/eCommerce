import React from 'react';
import { Content } from '../../shared/Content';
import { MainSlider } from '../../shared/MainSlider';
import { SpecialsListContainer } from '../../shared/SpecialsListContainer';
import { HighRatingContainer } from '../../shared/HighRatingContainer';

export function MainPage() {
  return (
    <Content>
      <MainSlider />
      <SpecialsListContainer />
      <HighRatingContainer />
    </Content>
  );
}
