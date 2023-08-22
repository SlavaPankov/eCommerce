import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import styles from './filters.scss';
import { ISubcategory } from '../../../types/interfaces/ISubcategory';
import { BaseCheckbox } from '../../BaseCheckbox';
import { CustomThumb } from './CustomThumb';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { productsFiltersRequestAsync } from '../../../store/products/productsSlice';
import { ICategory } from '../../../types/interfaces/ICategory';

interface IColor {
  label: string;
  key: string;
}

interface ICheckboxValue {
  [k: string]: boolean;
}

interface IFilterData {
  [k: string]: string;
}

interface IFiltersProps {
  categories: Array<ICategory>;
  currentCategory: Array<ICategory>;
  id?: string;
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

const initialPrice = [0, 100000];

export function Filters({ categories, currentCategory, id }: IFiltersProps) {
  const dispatch = useAppDispatch();
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>([]);
  const [checkboxValues, setCheckboxValues] = useState<ICheckboxValue>({});
  const [checkedSubcategories, setCheckedSubcategories] = useState<Array<string>>([]);
  const [checkedColors, setCheckedColors] = useState<Array<string>>([]);
  const [priceValue, setPriceValue] = useState<Array<number>>(initialPrice);
  const [filter, setFilter] = useState<IFilterData>({});

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    const temp = categories
      .filter((category) => category.slug === id)
      .map((item) => item.subcategories);

    setSubcategories(temp.flat());
  }, [categories]);

  useEffect(() => {
    if (checkedSubcategories.length > 0) {
      setFilter({
        ...filter,
        'categories.id:': `"${checkedSubcategories.join('", "')}"`
      });
    } else if (currentCategory.length > 0) {
      setFilter({
        ...filter,
        'categories.id:': `"${currentCategory[0].id}"`
      });
    }

    if (checkedColors.length > 0) {
      setFilter({
        ...filter,
        'variants.attributes.color.key:': `"${checkedColors.join('", "')}"`
      });
    }
  }, [checkedSubcategories, checkedColors, currentCategory]);

  useEffect(() => {
    const tempFilter = Object.entries(filter).map(([key, value]) => `${key} ${value}`);

    if (tempFilter.length > 0) {
      dispatch(productsFiltersRequestAsync({ filter: tempFilter }));
    }
  }, [filter]);

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

    if (event.currentTarget.name.includes('color')) {
      if (event.currentTarget.checked) {
        setCheckedColors([...checkedColors, event.currentTarget.value]);
      } else {
        setCheckedColors([...checkedColors.filter((value) => value !== event.currentTarget.value)]);
      }
    }

    setCheckboxValues({
      ...checkboxValues,
      [event.currentTarget.name]: event.currentTarget.checked
    });
  };

  const handleChangeCommitted = () => {
    setFilter({
      ...filter,
      'variants.price.centAmount:range': `(${priceValue.join(' to ')}00)`
    });
  };

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'minPrice') {
      const tempPrice = priceValue.slice();
      tempPrice[0] = +event.target.value;

      setPriceValue(tempPrice);
    }

    if (event.target.name === 'maxPrice') {
      const tempPrice = priceValue.slice();
      tempPrice[1] = +event.target.value;

      setPriceValue(tempPrice);
    }
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.heading}>Фильтровать по:</h2>
      <div>
        <h3>Категории:</h3>
        <ul className={styles.checkboxes}>
          {subcategories.map((subcategory) => (
            <li key={subcategory.slug}>
              <BaseCheckbox
                name={`subcategory_${subcategory.slug}`}
                value={subcategory.id}
                onChange={handleChange}
                isChecked={checkboxValues[`subcategory_${subcategory.slug}`] || false}
                label={subcategory.name}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Цена:</h3>
        <div className={styles.labels}>
          <label htmlFor="min">
            <span>от</span>
            <input
              className={styles.price_input}
              id="min"
              type="number"
              name="minPrice"
              value={priceValue[0]}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="max">
            <span>до</span>
            <input
              className={styles.price_input}
              id="max"
              type="number"
              name="maxPrice"
              value={priceValue[1]}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <Slider
          value={priceValue}
          slots={{ thumb: CustomThumb }}
          onChange={handleChangeSlider}
          max={100000}
          step={1000}
          onChangeCommitted={handleChangeCommitted}
        />
      </div>
      <div>
        <h3>Скидка:</h3>
        <ul className={styles.checkboxes}>
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
        <ul className={styles.checkboxes}>
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
