import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './checkboxFilter.scss';
import { BaseCheckbox } from '../../../BaseCheckbox';
import { ISubcategory } from '../../../../types/interfaces/ISubcategory';
import { IColor } from '../../../../types/interfaces/IColor';

interface IColorFilterProps {
  title: string;
  list: Array<ISubcategory | IColor>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkboxValues: { [k: string]: boolean };
  prefix: string;
  isDesktop: boolean;
}

export function CheckboxFilter({
  title,
  list,
  onChange,
  checkboxValues,
  prefix,
  isDesktop
}: IColorFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const buttonClassName = classNames({
    [`${styles.button}`]: true,
    [`${styles.open}`]: isOpen
  });

  return (
    <>
      {isDesktop && (
        <div>
          <h3 className={styles.heading}>{title}:</h3>
          <ul className={styles.checkboxes}>
            {list.map((item) => (
              <li key={item.slug}>
                <BaseCheckbox
                  name={`${prefix}_${item.slug}`}
                  value={item.id}
                  onChange={onChange}
                  isChecked={checkboxValues[`${prefix}_${item.slug}`] || false}
                  label={item.name}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isDesktop && (
        <div className={styles.wrapper}>
          <div className={buttonClassName} onClick={handleClick}>
            {title}
          </div>
          {isOpen && (
            <div className={styles.category_dropdown}>
              <ul className={styles.checkboxes}>
                {list.map((item) => (
                  <li key={item.slug}>
                    <BaseCheckbox
                      name={`${prefix}_${item.slug}`}
                      value={item.id}
                      onChange={onChange}
                      isChecked={checkboxValues[`${prefix}_${item.slug}`] || false}
                      label={item.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
