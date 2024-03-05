import React from "react";
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartInfo({totalAmount, totalSum}) {
  
  const cn = bem('CartInfo');

  const pluralizedWord = plural(totalAmount, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  });

  return (
    <div className={cn()}>
        <span className={cn('label')}>В корзине:</span>
        {totalAmount
        ? 
          <span className={cn('value')}>{totalAmount} {pluralizedWord} / {totalSum}</span>
        :
          <span className={cn('value')}>пусто</span>
        }
    </div>
  )
}

CartInfo.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  totalSum: PropTypes.string.isRequired
};

export default React.memo(CartInfo);