import React from "react";
import {plural, addSpaceInPrice} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Controls({openModal, quantityProducts, summaryPrice}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}> 
      <div className={cn('text')}>В корзине:</div>
      <div className={cn('result')}> {quantityProducts != 0 ? `${quantityProducts} ${plural(quantityProducts, {one: 'товар', few: 'товара', many: 'товаров'})} / ${addSpaceInPrice(summaryPrice)} ₽` : 'пусто'}</div>
      <button onClick={() => openModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenBasket: PropTypes.func,
  quantityProducts: PropTypes.number,
  summaryPrice: PropTypes.number
};

Controls.defaultProps = {
  onOpenBasket: () => {}
}

export default React.memo(Controls);
