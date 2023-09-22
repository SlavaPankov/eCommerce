import React, { ChangeEvent, useState } from 'react';
import { Slider } from '@mui/material';
import classNames from 'classnames';
import styles from './priceFilter.scss';
import { CustomThumb } from './CustomThumb';

interface IPriceFilterProps {
  priceValue: Array<number>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSlider: (event: Event, newValue: number | number[]) => void;
  onChangeCommitted: () => void;
  isDesktop: boolean;
}

export function PriceFilter({
  priceValue,
  onChange,
  onChangeCommitted,
  onChangeSlider,
  isDesktop = true
}: IPriceFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const headingClassName = classNames({
    [`${styles.heading}`]: true,
    [`${styles.open}`]: isOpen
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const labelsClassName = classNames({
    [`${styles.labels}`]: true,
    [`${styles.labels_tablet}`]: isOpen
  });

  return (
    <div className={styles.filter}>
      <h3 className={headingClassName} onClick={handleButtonClick}>
        {isDesktop ? 'Цена:' : 'Цена'}
      </h3>
      {!isDesktop && isOpen && (
        <div className={labelsClassName}>
          <label htmlFor="min">
            <span>от</span>
            <input
              className={styles.price_input}
              id="min"
              type="number"
              name="minPrice"
              value={priceValue[0]}
              onChange={onChange}
            />
          </label>
          <label htmlFor="max">
            <span>до</span>
            <input
              className={styles.price_input}
              id="max"
              type="number"
              name="maxPrice"
              value={priceValue[1]}
              onChange={onChange}
            />
          </label>
        </div>
      )}
      {isDesktop && (
        <>
          <div className={styles.labels}>
            <label htmlFor="min">
              <span>от</span>
              <input
                className={styles.price_input}
                id="min"
                type="number"
                name="minPrice"
                value={priceValue[0]}
                onChange={onChange}
              />
            </label>
            <label htmlFor="max">
              <span>до</span>
              <input
                className={styles.price_input}
                id="max"
                type="number"
                name="maxPrice"
                value={priceValue[1]}
                onChange={onChange}
              />
            </label>
          </div>
          <Slider
            value={priceValue}
            slots={{ thumb: CustomThumb }}
            onChange={onChangeSlider}
            max={100000}
            step={1000}
            onChangeCommitted={onChangeCommitted}
          />
        </>
      )}
    </div>
  );
}
