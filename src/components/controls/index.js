import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import { plural } from "../../utils";
import './style.css';

function Controls({onToggleCartView, totalCount, totalPrice }){
  
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <span>В корзине:</span>
        <span className={cn('total')}>{totalCount > 0 ? `${totalCount.toLocaleString()} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice.toLocaleString()} ₽` : 'пусто'}</span>
      </div>
      <button className={cn('toggle')} onClick={() => onToggleCartView()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onToggleCartView: PropTypes.func,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  onToggleCartView: () => {}
}

export default React.memo(Controls);
