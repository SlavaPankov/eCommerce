import React, { ChangeEvent, useState, FormEvent, MouseEvent } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { BaseInputField } from '../../../BaseInputField';
import styles from './searchForm.scss';
import { SearchIcon } from '../../../Icons';
import { BaseRoundButton } from '../../../BaseRoundButton';
import { BaseDropdown } from '../../../BaseDropdown';
import { SelectedCategory } from './SelectedCategory';
import { CategoriesList } from './CategoriesList';

export function SearchForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [category, setCategory] = useState('Категория');
  const [categoryId, setCategoryId] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries([...formData]);
    const searchParam: { [k: string]: string } = {};

    if (!data.search) {
      return;
    }

    searchParam.search = value;

    if (data.category) {
      searchParam.category = data.category.toString();
    }

    navigate({
      pathname: '/search',
      search: createSearchParams(searchParam).toString()
    });
  };

  const handleClick = (event?: MouseEvent<HTMLLIElement>) => {
    setCategory(event?.currentTarget.textContent || 'Категория');
    setCategoryId(event?.currentTarget.getAttribute('data-id') || '');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input_wrapper}>
        <SearchIcon />
        <BaseInputField
          name="search"
          value={value}
          placeholder="Я хочу купить..."
          onChange={handleChange}
        />
        <div className={styles.button_wrapper}>
          <BaseRoundButton />
        </div>
      </div>
      <div className={styles.dropdown_wrapper}>
        <BaseDropdown
          button={<SelectedCategory value={categoryId} text={category} />}
          className={styles.dropdown_list}>
          <CategoriesList handleClick={handleClick} />
        </BaseDropdown>
      </div>
    </form>
  );
}
