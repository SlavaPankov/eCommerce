import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import styles from './category.scss';
import { Filters } from './Filters';
import { ProductsContainer } from './ProductsContainer';
import { useCategoriesData } from '../../hooks/useCategoriesData';
import { ICategory } from '../../types/interfaces/ICategory';

export function Category() {
  const { categories } = useCategoriesData();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState<Array<ICategory>>([]);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    setCurrentCategory(categories.filter((category) => category.slug === id));
  }, [categories]);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <Filters categories={categories} currentCategory={currentCategory} id={id} />
        <ProductsContainer heading={currentCategory[0]?.name || 'Каталог'} />
      </div>
    </section>
  );
}
