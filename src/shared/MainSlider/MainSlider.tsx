import React, { useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { BaseButton } from '../BaseButton';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './mainSlider.scss';
import { Modal } from '../Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getDiscountCodeRequestAsync } from '../../store/discountCode/discountCodeSlice';
import { ElephantIcon } from '../Icons';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';

export function MainSlider() {
  const dispatch = useAppDispatch();
  const { discountCode } = useAppSelector((state) => state);
  const { token } = useAppSelector((state) => state.token.payload);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickDiscount = () => {
    if (!token) {
      return;
    }

    if (!discountCode.discountCode) {
      dispatch(getDiscountCodeRequestAsync(token));
    }
    setIsModalOpen(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(discountCode.discountCode).then(() => console.log('copied'));
  };

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

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
            {isModalOpen && !discountCode.loading && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <div className={styles.modal}>
                  <ElephantIcon />
                  <h4 className={styles.modal_title}>Ваш промокод:</h4>
                  <div className={styles.modal_content}>{discountCode.discountCode}</div>
                  <BaseButton
                    textContent="Копировать"
                    onClick={handleCopyClick}
                    mode={EBaseButtonMode.secondary}
                  />
                </div>
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
