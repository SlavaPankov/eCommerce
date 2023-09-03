import React from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import styles from './productCharacteristics.scss';

interface IProductCharacteristicsProps {
  characteristics: Array<Attribute>;
}

type AttributeTranslations = {
  [key: string]: string;
};

export function ProductCharacteristics({ characteristics }: IProductCharacteristicsProps) {
  const attributeTranslations: AttributeTranslations = {
    guarantee: 'Гарантия, мес',
    'vendor-code': 'Артикул',
    length: 'Длина, см',
    width: 'Ширина, см',
    height: 'Высота, см',
    depth: 'Глубина, см',
    sku: 'Артикул',
    'bed-width': 'Ширина кровати, см',
    'bed-height': 'Высота кровати, см',
    'bed-length': 'Длина кровати, см',
    'bed-color-pick': 'Цвет кровати',
    'bed-legs': 'Материал опор',
    'bed-size': 'Спальное место, см',
    delivery: 'Вариант доставки',
    'sleepping-area': 'Спальное место',
    'landing-height': 'Высота посадки, см',
    'bed-mechanism': 'Подъёмный механизм кровати',
    mechanism: 'Механизм',
    'upholstery-type': 'Тип обивки',
    color: 'Цвет',
    'supports-material': 'Материал опор',
    frame: 'Каркас',
    'dresser-height': 'Высота комода, см',
    'dresser-width': 'Ширина комода, см',
    'dresser-depth': 'Глубина комода, см',
    'dresser-color': 'Цвет',
    'dresser-material': 'Материал корпуса',
    'max-weight': 'Максимальная нагрузка',
    'countertop-material': 'Материал столешницы'
  };

  return (
    <ul className={styles.list}>
      {characteristics.map(({ name, value }, index) => (
        <li key={index} className={styles.item}>
          <span className={styles.name}>{attributeTranslations[name]}</span>
          {typeof value !== 'object' ? (
            <span className={styles.value}>{value}</span>
          ) : (
            <span className={styles.value}>{value.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
