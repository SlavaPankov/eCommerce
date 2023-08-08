/* eslint-disable no-param-reassign */
import React, { useEffect, useState, FocusEvent } from 'react';
import classNames from 'classnames';
import { BaseDropdown } from '../../../BaseDropdown';
import styles from './regionDropdown.scss';
import { IRegion } from '../../../../types/interfaces/IRegion';
import { RegionDropdownItem } from './RegionDropdownItem';

const initialRegions: Array<IRegion> = [
  {
    label: 'Москва',
    isSelected: true
  },
  {
    label: 'Казань',
    isSelected: false
  },
  {
    label: 'Уфа',
    isSelected: false
  },
  {
    label: 'Пермь',
    isSelected: false
  }
];

export function RegionDropdown() {
  const [regions, setRegions] = useState<Array<IRegion>>(initialRegions);
  const [buttonText, setButtonText] = useState<string>(
    regions.find((region) => region.isSelected)?.label || ''
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleClick = (region: IRegion) => {
    const temp = regions.map((item) => {
      return {
        ...item,
        isSelected: item.label === region.label
      };
    });

    setRegions(temp);
  };

  const handleBlurListItem = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.target.nextElementSibling) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    setButtonText(regions.find((region) => region.isSelected)?.label || '');
  }, [regions]);

  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  const selectedClassName = classNames({
    [`${styles.selected}`]: true,
    [`${styles.selected_open}`]: isDropdownOpen
  });

  return (
    <div className={styles.container}>
      <span className={styles.text}>Ваш регион:</span>
      <BaseDropdown
        button={
          <div className={selectedClassName} tabIndex={0}>
            <span>{buttonText}</span>
          </div>
        }
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onOpen={() => setIsDropdownOpen(true)}>
        <ul className={listClassName}>
          {regions
            .filter((region) => !region.isSelected)
            .map((item, index) => (
              <RegionDropdownItem
                handleClick={handleClick}
                handleBlur={handleBlurListItem}
                region={item}
                key={index}
              />
            ))}
        </ul>
      </BaseDropdown>
    </div>
  );
}
