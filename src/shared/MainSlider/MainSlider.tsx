import React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { BaseButton } from '../BaseButton';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './mainSlider.scss';

export function MainSlider() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  const handleClickDiscount = () => {
    console.log('click');
  };

  return (
    <div className={styles.swiper__container}>
      <Swiper
        className={styles.swiper}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.bullet}`,
          bulletActiveClass: `${styles.bullet__active}`
        }}>
        <SwiperSlide className={styles.slide}>
          <div className={containerClassName}>
            <h2 className={styles.heading}>Скидка 15% на первую покупку</h2>
            <BaseButton textContent="Получить" onClick={handleClickDiscount} />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={containerClassName}>
            <h2 className={styles.heading}>1000+ аксессуаров для дома</h2>
            <BaseButton textContent="Перейти" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={containerClassName}>
            <h2 className={styles.heading}>Коллекция стильного и яркого текстиля</h2>
            <BaseButton textContent="Перейти" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
