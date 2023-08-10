import React from 'react';
import classNames from 'classnames';
import styles from './footerTop.scss';
import { HeaderLogo } from '../../Icons';
import { SocialsList } from '../../SocialsList';
import { IFooterList } from '../../../types/interfaces/IFooterList';
import { FooterList } from './FooterList';

const aboutUsList: Array<IFooterList> = [
  {
    label: 'О компании',
    link: '#'
  },
  {
    label: 'Блог',
    link: '#'
  }
];

const servicesList: Array<IFooterList> = [
  {
    label: 'Доставка',
    link: '#'
  },
  {
    label: 'Рассрочка и кредит',
    link: '#'
  },
  {
    label: 'Сборка и установка',
    link: '#'
  }
];

const callbackList: Array<IFooterList> = [
  {
    label: 'Обратная связь',
    link: '#'
  },
  {
    label: 'Контакты',
    link: '#'
  }
];

const collaborationList: Array<IFooterList> = [
  {
    label: 'Поставщикам',
    link: '#'
  },
  {
    label: 'Оптовикам',
    link: '#'
  },
  {
    label: 'Карьера',
    link: '#'
  }
];

export function FooterTop() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={styles.top}>
      <div className={containerClassName}>
        <div className={styles.left}>
          <HeaderLogo />
          <SocialsList />
        </div>
        <div className={styles.right}>
          <FooterList heading="О нас" list={aboutUsList} />
          <FooterList heading="Услуги" list={servicesList} />
          <FooterList heading="Связь с нами" list={callbackList} />
          <FooterList heading="Сотрудничество" list={collaborationList} />
        </div>
      </div>
    </div>
  );
}
