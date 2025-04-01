import React from 'react';
import { CartIcon } from '../../icons';
import { formatPriceWithCurrency, plural } from '../../utils';
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
     ${formatPriceWithCurrency(totalPrice)}`}
      </button>
    </div>
  )
}

export default ButtonCart;
