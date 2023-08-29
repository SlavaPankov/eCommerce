import React, { MouseEvent, useState } from 'react';
import styles from './categoryHead.scss';
import { BaseHeading } from '../../BaseHeading';
import { BaseSelect } from '../../BaseSelect';
import { SelectedSort } from '../ProductsContainer/SelectedSort';

interface ICategoryHeadProps {
  heading: string;
  sort: Array<string>;
  setSort: (sort: Array<string>) => void;
}

export function CategoryHead({ heading, sort, setSort }: ICategoryHeadProps) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('Самые популярные');

  const handleClickSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleClickSelectItem = (event: MouseEvent<HTMLLIElement>) => {
    setIsSelectOpen(false);
    const dataSort = event.currentTarget.getAttribute('data-sort');

    setSelectedValue(event.currentTarget.textContent || selectedValue);

    if (!dataSort) {
      return;
    }

    switch (dataSort) {
      case '0':
        setSort(['']);
        break;
      case '1':
        setSort(['price asc']);
        break;
      case '2':
        setSort(['price desc']);
        break;
      default:
        setSort(sort);
        break;
    }
  };

  return (
    <div className={styles.head_wrapper}>
      <BaseHeading textContent={heading} />
      <BaseSelect
        className={styles.list}
        selectedValue={
          <SelectedSort textContent={isSelectOpen ? 'Выводить сначала' : selectedValue} />
        }
        isOpen={isSelectOpen}
        onClick={handleClickSelect}>
        <ul className={styles.sort}>
          <li data-sort="0" className={styles.sort_item} onClick={handleClickSelectItem}>
            Самые популярные
          </li>
          <li data-sort="1" className={styles.sort_item} onClick={handleClickSelectItem}>
            Самые дешевые
          </li>
          <li data-sort="2" className={styles.sort_item} onClick={handleClickSelectItem}>
            Самые дорогие
          </li>
        </ul>
      </BaseSelect>
    </div>
  );
}
