import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IProduct } from '../../../types/interfaces/IProduct';
import { IImage } from '../../../types/interfaces/IImage';
import 'swiper/css';
import { ProductCard } from '../../ProductCard';

interface ISpecialsListProps {
  list: Array<IProduct>;
  loading?: boolean;
}

const imageEmpty: IImage = {
  url: ''
};

export function SpecialsList({ list }: ISpecialsListProps) {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },

    850: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },

    1024: {
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
          <ProductCard
            productKey={item.key}
            discountedPrice={item.discountedPrice}
            rating={item.rating}
            imagePreview={item.images?.preview || imageEmpty}
            title={item.name}
            price={item.price}
            id={item.id}
            variantId={item.variantId}
            mode={'discount'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
