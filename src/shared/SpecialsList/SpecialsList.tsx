import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IProduct } from '../../types/interfaces/IProduct';

import 'swiper/css';
import { SpecialCard } from '../SpecialCard';

interface ISpecialsListProps {
  list: Array<IProduct>;
}

export function SpecialsList({ list }: ISpecialsListProps) {
  return (
    <Swiper modules={[Navigation]} slidesPerGroup={3} slidesPerView={3} spaceBetween={32}>
      {list.map((item) => (
        <SwiperSlide key={item.id}>
          <SpecialCard
            imageSrc={item.images?.preview || ''}
            title={item.name}
            price={item.price}
            discountedPrice={item.discountedPrice}
            productKey={item.key}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
