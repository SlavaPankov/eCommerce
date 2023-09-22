import React from 'react';
import classNames from 'classnames';
import { IFooterList } from '../../../../types/interfaces/IFooterList';
import styles from './footerList.scss';

interface IFooterListProps {
  heading: string;
  list: Array<IFooterList>;
}

export function FooterList({ heading, list }: IFooterListProps) {
  const className = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <div className={styles.list_container}>
      <h6 className={styles.heading}>{heading}</h6>
      <ul className={className}>
        {list.map((item, index) => (
          <li className={styles.item} key={index}>
            <a className={styles.link} href={item.link}>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
