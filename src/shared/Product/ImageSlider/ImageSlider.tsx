import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import styles from './imageSlider.scss';
import 'swiper/css/pagination';
import { IImage } from '../../../types/interfaces/IImage';

interface ISlider {
  images: IImage[] | undefined;
}

export function ImageSlider({ images }: ISlider) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <div className={styles.container}>
        <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.thumbSwiper}>
        <Swiper
          className={styles.swiper}
          modules={[Thumbs]}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
          slidesPerGroup={1}
          slidesPerView={4}
          spaceBetween={38}>
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
