import React from 'react';
import classNames from 'classnames';
import { useCategoriesData } from '../../hooks/useCategoriesData';
import { TopCategoriesList } from '../TopCategoriesContainer/TopCategoriesList';
import { BaseHeading } from '../BaseHeading';
import styles from './categoriesContainer.scss';

export function CategoriesContainer() {
  const { categories, error, loading } = useCategoriesData();

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      {!error && !loading && (
        <div className={className}>
          <BaseHeading textContent="Каталог" />
          <TopCategoriesList categories={categories} />
        </div>
      )}
    </section>
  );
}
