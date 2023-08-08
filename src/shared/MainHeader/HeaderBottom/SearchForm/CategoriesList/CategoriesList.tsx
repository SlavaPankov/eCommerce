import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './categoriesList.scss';
import { useCategoriesData } from '../../../../../hooks/useCategoriesData';
import { CategoryItem } from './CategoryItem';

interface ICategoryListProps {
  handleClick?: (event?: MouseEvent<HTMLLIElement>) => void;
}

export function CategoriesList({ handleClick }: ICategoryListProps) {
  const { categories, loading } = useCategoriesData();

  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={listClassName}>
      {!loading &&
        categories.map((category) => (
          <CategoryItem text={category.name} handleClick={handleClick} key={category.id} />
        ))}
    </ul>
  );
}
