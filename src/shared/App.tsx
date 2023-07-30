import React, { ChangeEvent, useState } from 'react';
import { BaseButton } from './BaseButton';
import { BaseInputField } from './BaseTextInputField';

interface INameInput {
  value: string;
  error: string;
  isTouched: boolean;
}

export function App() {
  const [nameInput, setNameInput] = useState<INameInput>({
    value: '',
    error: '',
    isTouched: false
  });

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setNameInput({
      ...nameInput,
      value: event.target.value,
      error: ''
    });

    if (event.target.value.length > 10) {
      setNameInput({
        ...nameInput,
        value: event.target.value,
        error: 'Слишком много буков!'
      });
    }
  }

  return (
    <>
      <BaseInputField
        type="password"
        name="name"
        value={nameInput.value}
        placeholder="Как вас зовут?"
        onChange={handleOnChange}
        error={nameInput.error}
      />
      <BaseButton textContent="Получить" onClick={() => console.log(nameInput.value)} />
    </>
  );
}
