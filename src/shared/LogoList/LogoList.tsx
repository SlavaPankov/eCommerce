import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
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

const logos = [
  { name: Agile, link: 'https://agilemanifesto.org/' },
  { name: Jira, link: 'https://www.atlassian.com/software/jira' },
  { name: TS, link: 'https://www.typescriptlang.org/' },
  { name: ReactLogo, link: 'https://react.dev/' },
  { name: ReduxLogo, link: 'https://redux.js.org/' },
  { name: ReactRouter, link: 'https://reactrouter.com/en/main' },
  { name: Figma, link: 'https://www.figma.com/' },
  { name: Github, link: 'https://github.com/' },
  { name: CommerceTools, link: 'https://docs.commercetools.com/' }
];

export function LogoList() {
  const listClassName = classNames('list list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={listClassName}>
      {logos.map((logo, index) => (
        <li className={styles.item} key={index}>
          <Link to={logo.link}>
            <img className={styles.image} src={logo.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
