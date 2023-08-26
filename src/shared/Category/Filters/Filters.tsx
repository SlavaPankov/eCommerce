import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './filters.scss';
import { ISubcategory } from '../../../types/interfaces/ISubcategory';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { productsFiltersRequestAsync } from '../../../store/products/productsSlice';
import { ICategory } from '../../../types/interfaces/ICategory';
import { CheckboxFilter } from './CheckboxFilter';
import { IColor } from '../../../types/interfaces/IColor';
import { PriceFilter } from './PriceFilter';

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
  offset: number;
  sort: Array<string>;
  isDesktop?: boolean;
}

const colors: Array<IColor> = [
  {
    id: 'brown',
    name: 'Коричневый',
    slug: 'brown'
  },
  {
    id: 'black',
    name: 'Черный',
    slug: 'black'
  },
  {
    id: 'beige',
    name: 'Бежевый',
    slug: 'beige'
  },
  {
    id: 'grey',
    name: 'Серый',
    slug: 'grey'
  },
  {
    id: 'white',
    name: 'Белый',
    slug: 'white'
  },
  {
    id: 'blue',
    name: 'Синий',
    slug: 'blue'
  },
  {
    id: 'orange',
    name: 'Оранжевый',
    slug: 'orange'
  },
  {
    id: 'yellow',
    name: 'Желтый',
    slug: 'yellow'
  },
  {
    id: 'green',
    name: 'Зеленый',
    slug: 'green'
  }
];

const initialPrice = [0, 100000];

export function Filters({
  categories,
  currentCategory,
  id,
  offset,
  sort,
  isDesktop = true
}: IFiltersProps) {
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
      console.log(currentCategory[0].id);
      setFilter({
        ...filter,
        'categories.id:': `"${currentCategory[0].id}"`
      });
    }
  }, [checkedSubcategories, currentCategory]);

  useEffect(() => {
    if (checkedColors.length > 0) {
      setFilter({
        ...filter,
        'variants.attributes.color.key:': `"${checkedColors.join('", "')}"`
      });
    } else if (filter['variants.attributes.color.key:']) {
      const temp = { ...filter };
      delete temp['variants.attributes.color.key:'];
      setFilter({
        ...temp
      });
    }
  }, [checkedColors]);

  useEffect(() => {
    const tempFilter = Object.entries(filter).map(([key, value]) => `${key} ${value}`);

    if (tempFilter.length > 0) {
      dispatch(productsFiltersRequestAsync({ filter: tempFilter, offset, sort }));
    }
  }, [filter, offset, sort]);

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
    if (priceValue[0] !== 0) {
      setFilter({
        ...filter,
        'variants.price.centAmount:range': `(${priceValue.join('00 to ')}00)`
      });
    } else {
      setFilter({
        ...filter,
        'variants.price.centAmount:range': `(${priceValue.join(' to ')}00)`
      });
    }
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
      <h2 className={styles.heading}>{isDesktop ? 'Фильтровать по:' : 'Фильтры'}</h2>
      <div className={styles.wrapper}>
        <CheckboxFilter
          title="Категория"
          list={subcategories}
          prefix="subcategory"
          onChange={handleChange}
          checkboxValues={checkboxValues}
          isDesktop={isDesktop}
        />
        <PriceFilter
          priceValue={priceValue}
          onChange={handleInputChange}
          onChangeSlider={handleChangeSlider}
          onChangeCommitted={handleChangeCommitted}
          isDesktop={isDesktop}
        />
        <CheckboxFilter
          title="Цвет"
          list={colors}
          prefix="color"
          onChange={handleChange}
          checkboxValues={checkboxValues}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}
