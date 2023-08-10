import React from 'react';
import { Content } from '../../shared/Content';
import { MainSlider } from '../../shared/MainSlider';
import { SpecialsList } from '../../shared/SpecialsList';
import { useSpecialsData } from '../../hooks/useSpecialsData';

export function MainPage() {
  const { specials } = useSpecialsData();

  return (
    <Content>
      <MainSlider />
      {specials.length > 0 ? <SpecialsList list={specials} /> : null}
    </Content>
  );
}
