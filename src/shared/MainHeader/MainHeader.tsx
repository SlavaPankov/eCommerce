import React from 'react';
import { HeaderTop } from './HeaderTop';
import { HeaderMiddle } from './HeaderMiddle';
import { HeaderBottom } from './HeaderBottom';

export function MainHeader() {
  return (
    <header>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  );
}
