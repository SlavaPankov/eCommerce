import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useCategoriesData } from '../../hooks/useCategoriesData';
import { ICategory } from '../../types/interfaces/ICategory';
import { TopCategoriesList } from './TopCategoriesList';
import { BaseHeading } from '../BaseHeading';
import styles from './topCategoriesContainer.scss';

export function TopCategoriesContainer() {
  const { categories, loading } = useCategoriesData();
  const [topCategories, setTopCategories] = useState<Array<ICategory>>(categories);

  useEffect(() => {
    setTopCategories(categories.slice(0, 5));
  }, [categories]);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      {!loading ? (
        <div className={className}>
          <BaseHeading textContent="Топ категории" />
          <TopCategoriesList categories={topCategories} />
        </div>
      ) : null}
    </section>
  );
}
