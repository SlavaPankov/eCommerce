import React, { useState, MouseEvent, useEffect } from 'react';
import styles from './pagination.scss';

interface IPaginationProps {
  countPerPage: number;
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export function Pagination({
  countPerPage,
  totalCount,
  currentPage,
  setCurrentPage
}: IPaginationProps) {
  const [countPage, setCountPage] = useState<number>(Math.ceil(totalCount / countPerPage));

  useEffect(() => {
    setCountPage(Math.ceil(totalCount / countPerPage));
  }, [totalCount]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.textContent;

    if (!page) {
      setCurrentPage(1);
      return;
    }

    setCurrentPage(+page);
  };

  return (
    <>
      {countPage > 1 ? (
        <div className={styles.pagination}>
          {Array(countPage)
            .fill(1)
            .map((item, index) => (
              <button
                onClick={handleClick}
                className={
                  index + 1 === currentPage
                    ? `${styles.button} ${styles.button_active}`
                    : `${styles.button}`
                }
                key={index}>
                {index + 1}
              </button>
            ))}
        </div>
      ) : null}
    </>
  );
}
