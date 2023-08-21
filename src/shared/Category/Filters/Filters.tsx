import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './filters.scss';
import { useCategoriesData } from '../../../hooks/useCategoriesData';
import { ISubcategory } from '../../../types/interfaces/ISubcategory';
import { BaseCheckbox } from '../../BaseCheckbox';

interface IColor {
  label: string;
  key: string;
}

interface ICheckboxValue {
  [k: string]: boolean;
}

const colors: Array<IColor> = [
  {
    label: 'Коричневый',
    key: 'brown'
  },
  {
    label: 'Черный',
    key: 'black'
  },
  {
    label: 'Бежевый',
    key: 'beige'
  },
  {
    label: 'Серый',
    key: 'grey'
  },
  {
    label: 'Белый',
    key: 'white'
  },
  {
    label: 'Синий',
    key: 'blue'
  },
  {
    label: 'Оранжевый',
    key: 'orange'
  },
  {
    label: 'Желтый',
    key: 'yellow'
  },
  {
    label: 'Зеленый',
    key: 'green'
  }
];

const discounts: Array<{ label: string; value: string }> = [
  {
    label: 'Менее 5000',
    value: '-5000'
  },
  {
    label: 'Более 5000',
    value: '5000'
  },
  {
    label: 'Не важно',
    value: '0'
  }
];

export function Filters() {
  const { categories } = useCategoriesData();
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>([]);
  const [checkboxValues, setCheckboxValues] = useState<ICheckboxValue>({});
  const [checkedSubcategories, setCheckedSubcategories] = useState<Array<string>>([]);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    const temp = categories
      .filter((category) => category.slug === id)
      .map((item) => item.subcategories);

    setSubcategories(temp.flat());
  }, [categories]);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.name.includes('subcategory')) {
      if (event.currentTarget.checked) {
        setCheckedSubcategories([...checkedSubcategories, event.currentTarget.value]);
      } else {
        setCheckedSubcategories([
          ...checkedSubcategories.filter((value) => value !== event.currentTarget.value)
        ]);
      }
    }

    setCheckboxValues({
      ...checkboxValues,
      [event.currentTarget.name]: event.currentTarget.checked
    });
  };

  useEffect(() => {
    console.log(checkedSubcategories);
  }, [checkedSubcategories]);

  return (
    <div className={styles.filters}>
      <h2 className={styles.heading}>Фильтровать по:</h2>
      <div>
        <h3>Категории:</h3>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory.slug}>
              <BaseCheckbox
                name={`subcategory_${subcategory.slug}`}
                value={subcategory.slug}
                onChange={handleChange}
                isChecked={checkboxValues[`subcategory_${subcategory.slug}`] || false}
                label={subcategory.name}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Скидка:</h3>
        <ul>
          {discounts.map((discount) => (
            <li key={discount.value}>
              <BaseCheckbox
                name={`discount`}
                type="radio"
                value={discount.value}
                onChange={handleChange}
                isChecked={checkboxValues.discount || true}
                label={discount.label}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Цвет:</h3>
        <ul>
          {colors.map((color) => (
            <li key={color.key}>
              <BaseCheckbox
                name={`color_${color.key}`}
                value={color.key}
                onChange={handleChange}
                isChecked={checkboxValues[`color_${color.key}`] || false}
                label={color.label}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
