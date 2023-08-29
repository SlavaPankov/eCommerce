import React from 'react';
import classNames from 'classnames';
import { ICategory } from '../../../types/interfaces/ICategory';
import styles from './topCategoriesList.scss';
import { CategoryCard } from '../../CaterogyCard';

interface ITopCategoriesListProps {
  categories: Array<ICategory>;
}

export function TopCategoriesList({ categories }: ITopCategoriesListProps) {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={listClassName}>
      {categories.map((category) => (
        <li className={styles.item} key={category.id}>
          <CategoryCard
            imageSrc={category.imageSrc}
            subcategories={category.subcategories}
            name={category.name}
            slug={category.slug}
          />
        </li>
      ))}
    </ul>
  );
}
