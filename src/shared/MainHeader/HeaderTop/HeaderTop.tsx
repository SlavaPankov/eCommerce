import React from 'react';
import { PhoneLink } from './PhoneLink';

export function HeaderTop() {
  return (
    <div>
      <div>
        <span>Ваш регион:</span>
      </div>
      <PhoneLink />
      <nav>
        <ul>
          <li>
            <a href="#">
              <span>О компании</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Гарантия и возврат</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Корпоративным клиентам</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Дизайн-решение</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
