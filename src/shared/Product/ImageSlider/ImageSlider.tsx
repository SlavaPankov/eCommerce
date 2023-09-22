import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import styles from './imageSlider.scss';
import { IImage } from '../../../types/interfaces/IImage';
import { Modal } from '../../Modal';
import { BaseRoundButton } from '../../BaseRoundButton';

interface ISlider {
  images: IImage[] | undefined;
}

enum ESliderDirection {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export function ImageSlider({ images }: ISlider) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiperModal, setThumbsSwiperModal] = useState<SwiperType | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
    thumbsSwiperModal?.destroy();
    setThumbsSwiperModal(null);
  };

  const handleClickSlider = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container} onClick={handleClickSlider}>
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={{
            prevEl: '#main-prev',
            nextEl: '#main-next'
          }}>
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} width={624} height={420} alt="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.thumbSwiper}>
        <div className={styles.button_container} id={styles.mainPrev}>
          <BaseRoundButton isLeft={true} id="main-prev" />
        </div>
        <div className={styles.thumb_container}>
          <Swiper
            className={styles.swiper}
            modules={[Thumbs]}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            slidesPerGroup={1}
            slidesPerView={4}
            spaceBetween={38}
            direction={ESliderDirection.horizontal}
            breakpoints={{
              320: {
                direction: ESliderDirection.horizontal,
                slidesPerView: 2.5,
                spaceBetween: 18
              },
              685: {
                direction: ESliderDirection.vertical,
                slidesPerView: 4,
                spaceBetween: 18
              },
              850: {
                direction: ESliderDirection.horizontal,
                slidesPerView: 3.5,
                spaceBetween: 38
              },
              1024: {
                direction: ESliderDirection.horizontal,
                slidesPerView: 4
              }
            }}>
            {images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.url} alt="image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.button_container} id={styles.mainNext}>
          <BaseRoundButton id="main-next" />
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.modal_container}>
            <div className={styles.swiper_main}>
              <Swiper
                modules={[Thumbs, Navigation]}
                thumbs={{ swiper: thumbsSwiperModal }}
                navigation={{
                  prevEl: '#prev',
                  nextEl: '#next'
                }}>
                {images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.url} alt="image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.modal_thumb}>
              <div className={styles.button_container}>
                <BaseRoundButton isLeft={true} id="prev" />
              </div>
              <Swiper
                className={styles.swiper}
                modules={[Thumbs]}
                watchSlidesProgress={true}
                onSwiper={setThumbsSwiperModal}
                slidesPerGroup={1}
                slidesPerView={4}
                spaceBetween={38}
                breakpoints={{
                  320: {
                    slidesPerView: 1
                  },
                  685: {
                    slidesPerView: 2
                  },
                  850: {
                    slidesPerView: 3
                  },
                  1180: {
                    slidesPerView: 3
                  }
                }}>
                {images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.url} alt="image" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={styles.button_container}>
                <BaseRoundButton id="next" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
