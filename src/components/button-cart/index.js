import React from 'react';
import { CartIcon } from '../icons';
import { plural } from '../../utils';
import './style.css';

function ButtonCart({ setIsOpen, totalCount, totalPrice }) {
  return (
    <div className='Controls'>
      <button onClick={() => setIsOpen(true)}><CartIcon/>
        {totalCount === 0 ? 'Пусто' : `${totalCount
          ? ` ${totalCount} ${plural(totalCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}`
          : ''} /
     ${totalPrice} ₽`}
      </button>
    </div>
  )
}

export default ButtonCart;
