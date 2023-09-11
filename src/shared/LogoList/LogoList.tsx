import React from 'react';
import classNames from 'classnames';
import styles from './logoList.scss';
import Agile from '../../assets/images/LogoAgile.png';
import Figma from '../../assets/images/LogoFigma.png';
import Github from '../../assets/images/LogoGithub.png';
import Jira from '../../assets/images/LogoJira.png';
import ReactLogo from '../../assets/images/LogoReact.png';
import TS from '../../assets/images/LogoTS.png';
import ReduxLogo from '../../assets/images/LogoRedux.png';
import ReactRouter from '../../assets/images/LogoReactRouter.png';
import CommerceTools from '../../assets/images/LogoCommerceTools.jpg';

const logos = [Agile, Jira, TS, ReactLogo, ReduxLogo, ReactRouter, Figma, Github, CommerceTools];

export function LogoList() {
  const listClassName = classNames('list list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={listClassName}>
      {logos.map((logo, index) => (
        <li className={styles.item} key={index}>
          <img className={styles.image} src={logo} />
        </li>
      ))}
    </ul>
  );
}
