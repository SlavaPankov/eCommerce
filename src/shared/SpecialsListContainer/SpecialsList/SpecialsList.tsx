import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IProduct } from '../../../types/interfaces/IProduct';

import 'swiper/css';
import { SpecialCard } from '../../SpecialCard';

interface ISpecialsListProps {
  list: Array<IProduct>;
}

export function SpecialsList({ list }: ISpecialsListProps) {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },

    600: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },

    850: {
      slidesPerView: 3,
      slidesPerGroup: 3
    }
  };

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerGroup={3}
      slidesPerView={3}
      spaceBetween={32}
      breakpoints={breakpoints}
      navigation={{
        prevEl: '#special-prev',
        nextEl: '#special-next'
      }}>
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
