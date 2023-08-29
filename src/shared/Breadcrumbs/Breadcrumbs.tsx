import React from 'react';
import { NavLink, useMatches } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/storeHooks';
import styles from './breadcrumbs.scss';

export function Breadcrumbs() {
  const { categories } = useAppSelector((state) => state.categories);
  const matches = useMatches();
  const crumbs = matches.filter((match) =>
    Boolean((match.handle as { [k: string]: () => string })?.crumb)
  );

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <nav className={className}>
      <ul className={styles.list}>
        {crumbs.map((crumb, index) => {
          if (/\/catalog\/[a-z]/gi.test(crumb.pathname)) {
            const currentCategory = categories.find(
              (category) => category.slug === crumb.params.id
            );
            const handle = crumb.handle as { [k: string]: () => string };

            if (handle) {
              handle.crumb = () => currentCategory?.name || '';
            }
          }

          const crumbClassName = classNames({
            [`${styles.item}`]: true,
            [`${styles.active}`]: index === crumbs.length - 1
          });

          if (index === crumbs.length - 1) {
            return (
              <li key={index} className={crumbClassName}>
                {(crumb.handle as { [k: string]: () => string })?.crumb()}
              </li>
            );
          }
          return (
            <li key={index} className={crumbClassName}>
              <NavLink to={crumb.pathname}>
                {(crumb.handle as { [k: string]: () => string })?.crumb()}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
