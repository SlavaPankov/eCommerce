import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import styles from './category.scss';
import { Filters } from './Filters';
import { ProductsContainer } from './ProductsContainer';
import { useCategoriesData } from '../../hooks/useCategoriesData';
import { ICategory } from '../../types/interfaces/ICategory';
import { CategoryHead } from './CategoryHead';

export function Category() {
  const { categories } = useCategoriesData();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState<Array<ICategory>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(9);
  const [sort, setSort] = useState<Array<string>>(['']);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    if (window.innerWidth <= 1180) {
      setIsDesktop(false);
    }

    const checkWidth = () => {
      if (window.innerWidth <= 1180) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    };

    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    setCurrentCategory(categories.filter((category) => category.slug === id));
  }, [categories]);

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage]);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        {!isDesktop && (
          <CategoryHead
            heading={currentCategory[0]?.name || 'Каталог'}
            sort={sort}
            setSort={setSort}
          />
        )}
        <Filters
          categories={categories}
          currentCategory={currentCategory}
          id={id}
          offset={offset}
          sort={sort}
          isDesktop={isDesktop}
        />
        <ProductsContainer
          countPerPage={limit}
          heading={currentCategory[0]?.name || 'Каталог'}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sort={sort}
          setSort={setSort}
        />
      </div>
    </section>
  );
}
