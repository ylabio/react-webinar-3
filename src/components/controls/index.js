import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname'
import './style.css';
import {formatPrice, plural} from "../../utils";

function Controls({onClick, totalPrice, count}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div>
        В корзине:
        <span className={cn('info')}>{count || 'пусто'} {count > 0 && (`${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(totalPrice)}`)}</span>
      </div>
      <button onClick={() => onClick()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func,
  totalPrice: PropTypes.number,
  count: PropTypes.number
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
