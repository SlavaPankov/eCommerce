import React, { ChangeEvent, useState, FormEvent, MouseEvent } from 'react';
import { BaseInputField } from '../../../BaseTextInputField';
import styles from './searchForm.scss';
import { SearchIcon } from '../../../Icons';
import { BaseRoundButton } from '../../../BaseRoundButton';
import { BaseDropdown } from '../../../BaseDropdown';
import { SelectedCategory } from './SelectedCategory';
import { CategoriesList } from './CategoriesList';

export function SearchForm() {
  const [value, setValue] = useState<string>('');
  const [category, setCategory] = useState('Категория');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(`Ищем ${[...formData][0][1]} в категории Все`);
  };

  const handleClick = (event?: MouseEvent<HTMLLIElement>) => {
    setCategory(event?.currentTarget.textContent || 'Категория');
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
          button={<SelectedCategory text={category} />}
          className={styles.dropdown_list}>
          <CategoriesList handleClick={handleClick} />
        </BaseDropdown>
      </div>
    </form>
  );
}
