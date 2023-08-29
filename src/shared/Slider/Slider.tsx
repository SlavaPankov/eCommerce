import React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './slider.scss';
import 'swiper/css/pagination';
import { IImage } from '../../types/interfaces/IImage';

interface ISlider {
  imagePreview: IImage | undefined;
  imageSlider: IImage[] | undefined;
}

export function ImageSlider({ imagePreview, imageSlider }: ISlider) {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section className={containerClassName}>
      <div className={styles.mainImageContainer}>
        <img
          src={imagePreview?.url}
          className={styles.mainImage}
          width={imagePreview?.dimensions?.w}
          height={imagePreview?.dimensions?.h}
          alt="main picture"
        />
      </div>
      <Swiper className={styles.swiper} spaceBetween={10} slidesPerView={5}>
        {imageSlider?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              className={styles.thumbnailImage}
              width={image.dimensions?.w}
              height={image.dimensions?.h}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
