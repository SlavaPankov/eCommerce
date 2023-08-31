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
    guarantee: 'Гарантия',
    'vendor-code': 'Артикул',
    length: 'Длина',
    width: 'Ширина',
    height: 'Высота',
    depth: 'Глубина',
    sku: 'Артикул',
    'bed-width': 'Ширина кровати',
    'bed-height': 'Высота кровати',
    'bed-length': 'Длина кровати',
    'bed-color-pick': 'Цвет кровати',
    'bed-legs': 'Материал опор',
    'bed-size': 'Спальное место',
    delivery: 'Вариант доставки',
    'sleepping-area': 'Спальное место',
    'landing-height': 'Высота посадки',
    'bed-mechanism': 'Подъёмный механизм кровати',
    mechanism: 'Механизм',
    'upholstery-type': 'Тип обивки',
    color: 'Цвет',
    'supports-material': 'Материал опор',
    frame: 'Каркас',
    'dresser-height': 'Высота комода',
    'dresser-width': 'Ширина комода',
    'dresser-depth': 'Глубина комода',
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
