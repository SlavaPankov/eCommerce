import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import styles from './product.scss';
import { BaseButton } from '../BaseButton';
import { useProductData } from '../../hooks/useProductData';

export function Product() {
  const { id } = useParams();
  const { product } = useProductData(id || '');

  useEffect(() => {
    if (!product.id) {
      return;
    }
    console.log(product);
  }, [product]);

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section className={containerClassName}>
      <div>{product.rating}</div>
      <h1>{product.name}</h1>
      <h2>{product.name.repeat(3)}</h2>
      <h1>28 490 руб</h1>
      <BaseButton textContent="Добавить в корзину" />

      <div>Опорный механизм</div>
      <div>
        Опорный механизм напоминает пантограф, к которому добавили дополнительную секцию. У опорного
        дивана сиденье «выпрыгивает» вперёд и вытаскивает вторую часть спального места.
        Заключительный штрих — опустить спинку. Этот механизм не портит пол и не боится ковров.
        Требуется чуть больше силы, чтобы разложить диван, но подросток справится.
      </div>
    </section>
  );
}
