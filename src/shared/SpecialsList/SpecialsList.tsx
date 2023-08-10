import React from 'react';
import { IProduct } from '../../types/interfaces/IProduct';

interface ISpecialsListProps {
  list: Array<IProduct>;
}

export function SpecialsList({ list }: ISpecialsListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
