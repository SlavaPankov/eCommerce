import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import styles from './imageSlider.scss';
import 'swiper/css/pagination';
import { IImage } from '../../../types/interfaces/IImage';
import { Modal } from '../../Modal';

interface ISlider {
  images: IImage[] | undefined;
}

export function ImageSlider({ images }: ISlider) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClickSlider = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container} onClick={handleClickSlider}>
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
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.modal_container}>
            <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
              {images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.url} alt="image" />
                </SwiperSlide>
              ))}
            </Swiper>
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
        </Modal>
      )}
    </>
  );
}
