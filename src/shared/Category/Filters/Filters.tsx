import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [subcategories, setSubcategories] = useState<Array<ISubcategory>>([]);
  const [checkboxValues, setCheckboxValues] = useState<ICheckboxValue>({});
  const [checkedSubcategories, setCheckedSubcategories] = useState<Array<string>>([]);
  const [checkedColors, setCheckedColors] = useState<Array<string>>([]);
  const [priceValue, setPriceValue] = useState<Array<number>>(initialPrice);
  const [filter, setFilter] = useState<IFilterData>({});

  const addToQueryString = (key: string, value: string) => {
    const queryValue = queryParams.get(key);

    if (queryValue) {
      queryParams.set(key, `${queryValue} ${value}`);
    } else {
      queryParams.set(key, value);
    }

    const newSearch = `?${queryParams.toString()}`;
    navigate({ search: newSearch });
  };

  const deleteFromQueryString = (key: string, value: string) => {
    const queryValue = queryParams.get(key);
    const newValue = queryValue
      ?.split(' ')
      .filter((item) => item !== value)
      .join(' ');

    if (queryValue && newValue) {
      queryParams.set(
        key,
        queryValue
          ?.split(' ')
          .filter((item) => item !== value)
          .join(' ')
      );
    } else {
      queryParams.delete(key);
    }

    const newSearch = `?${queryParams.toString()}`;
    navigate({ search: newSearch });
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.name.includes('subcategory')) {
      const checkedCategory = subcategories.find(
        (subcategory) => subcategory.id === event.currentTarget.value
      );

      if (event.currentTarget.checked) {
        if (checkedCategory) {
          addToQueryString('subcategory', checkedCategory.slug);
        }

        setCheckedSubcategories([...checkedSubcategories, event.currentTarget.value]);
      } else {
        if (checkedCategory) {
          deleteFromQueryString('subcategory', checkedCategory.slug);
        }

        setCheckedSubcategories([
          ...checkedSubcategories.filter((value) => value !== event.currentTarget.value)
        ]);
      }
    }

    if (event.currentTarget.name.includes('color')) {
      if (event.currentTarget.checked) {
        addToQueryString('color', event.currentTarget.value);

        setCheckedColors([...checkedColors, event.currentTarget.value]);
      } else {
        deleteFromQueryString('color', event.currentTarget.value);

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

  useEffect(() => {
    const queryColor = queryParams.get('color');

    if (queryColor) {
      let tempCheckboxValue: { [k: string]: boolean } = {};
      const tempCheckedColors: Array<string> = [];

      queryColor.split(' ').forEach((color) => {
        const currentColor = colors.find((item) => item.slug === color);

        if (currentColor) {
          tempCheckboxValue = {
            ...tempCheckboxValue,
            [`color_${currentColor.slug}`]: true
          };
          tempCheckedColors.push(currentColor.id);
        }
      });

      setCheckboxValues({
        ...checkboxValues,
        ...tempCheckboxValue
      });
      setCheckedColors([...tempCheckedColors]);
    }
  }, []);

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
    if (!subcategories.length) {
      return;
    }

    const subcategory = queryParams.get('subcategory');

    if (subcategory) {
      let tempCheckboxValue: { [k: string]: boolean } = {};
      const tempCheckedSubcategories: Array<string> = [];

      subcategory.split(' ').forEach((item) => {
        const checkedSubcategory = subcategories.find(
          (subcategoryItem) => subcategoryItem.slug === item
        );

        if (checkedSubcategory) {
          tempCheckboxValue = {
            ...tempCheckboxValue,
            [`subcategory_${checkedSubcategory.slug}`]: true
          };
          tempCheckedSubcategories.push(checkedSubcategory.id);
        }
      });

      setCheckboxValues({
        ...checkboxValues,
        ...tempCheckboxValue
      });
      setCheckedSubcategories([...tempCheckedSubcategories]);
    }
  }, [subcategories]);

  useEffect(() => {
    if (checkedSubcategories.length > 0) {
      setFilter({
        ...filter,
        'categories.id:': `"${checkedSubcategories.join('", "')}"`
      });
    } else if (
      currentCategory.length > 0 &&
      Object.entries(Object.fromEntries(queryParams)).length === 0
    ) {
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
