import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ControlsBasket(props) {
  const cn = bem('Controls-Basket')
  return (
    <div className={cn()}>
        <div className={cn('price')}>
          <b>Итого</b>
          <b>{props.totalPrice} ₽</b>
        </div>
    </div>
  )
}

ControlsBasket.propTypes = {
  totalPrice: PropTypes.number,
}

export default React.memo(ControlsBasket)