import React from 'react';
import styles from './productDescription.scss';

interface IProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: IProductDescriptionProps) {
  return (
    <div className={styles.description}>
      {description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus velit hic
      molestiae doloremque, cumque earum eaque tenetur suscipit tempore labore nesciunt odit alias
      non fuga qui commodi incidunt porro? Ex?
    </div>
  );
}
