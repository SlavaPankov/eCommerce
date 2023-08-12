import React, { useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { BaseButton } from '../BaseButton';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './mainSlider.scss';
import { Modal } from '../Modal';

export function MainSlider() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickDiscount = () => {
    setIsModalOpen(true);
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
            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aut debitis
                  facilis illum iure nostrum numquam perferendis quidem, repellat similique
                  suscipit! Atque eligendi modi sapiente soluta tenetur voluptate? Ipsam!
                </span>
              </Modal>
            )}
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
