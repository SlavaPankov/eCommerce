import React from 'react';
import { Link } from 'react-router-dom';
import styles from './devProfile.scss';

interface IDevProfileProps {
  name: string;
  title: string;
  github: string;
  bio: string;
  imageLink: string;
}

export function DevProfile({ name, title, bio, github, imageLink }: IDevProfileProps) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageLink} alt="Фото" />
      <span className={styles.name}>{name}</span>
      <span className={styles.title}>{title}</span>
      <Link className={styles.link} to={github}>
        GitHub
      </Link>
      <p className={styles.text}>{bio}</p>
    </div>
  );
}
