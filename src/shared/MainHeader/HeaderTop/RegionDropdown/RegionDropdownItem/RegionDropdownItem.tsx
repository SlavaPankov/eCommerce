import React, { KeyboardEvent, FocusEvent } from 'react';
import { IRegion } from '../../../../../types/interfaces/IRegion';
import styles from './redionDropdownItem.scss';

interface IRegionDropdownItemProps {
  region: IRegion;
  handleClick: (region: IRegion) => void;
  handleBlur?: (event: FocusEvent<HTMLLIElement>) => void;
}
export function RegionDropdownItem({ region, handleClick, handleBlur }: IRegionDropdownItemProps) {
  const handleKeydown = (event: KeyboardEvent<HTMLLIElement>, currentRegion: IRegion) => {
    if (event.code.toLowerCase().trim() === 'space') {
      handleClick(currentRegion);
    }
  };

  return (
    <li
      className={styles.item}
      onClick={() => handleClick(region)}
      onKeyDown={(event) => handleKeydown(event, region)}
      onBlur={handleBlur}
      tabIndex={0}>
      <span>{region.label}</span>
    </li>
  );
}
