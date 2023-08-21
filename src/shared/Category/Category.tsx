import React from 'react';
import classNames from 'classnames';
import styles from './category.scss';
import { Filters } from './Filters';
import { ProductsContainer } from './ProductsContainer';

export function Category() {
  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <Filters />
        <ProductsContainer />
      </div>
    </section>
  );
}
