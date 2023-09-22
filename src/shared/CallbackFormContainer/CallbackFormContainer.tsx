import React from 'react';
import classNames from 'classnames';
import styles from './callbackFormContainer.scss';
import { BaseHeading } from '../BaseHeading';
import { CallbackForm } from './CallbackForm';

export function CallbackFormContainer() {
  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <BaseHeading textContent="Мы всегда вам рады!" />
        <p className={styles.subtitle}>
          Безусловно, новая модель организационной деятельности в значительной степени обусловливает
          важность распределения внутренних резервов и ресурсов.
        </p>
        <CallbackForm />
      </div>
    </section>
  );
}
