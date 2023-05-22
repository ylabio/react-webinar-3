import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatter, plural} from '../../utils';

function Controls({shopCart, onOpenPupup}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('title')}>В корзине:</p>
      {shopCart.itemsCount ?
        <b className={cn('cart')}>{shopCart.itemsCount} {plural(shopCart.itemsCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {formatter(shopCart.itemsPrice)}</b> :
        <b>пусто</b>}
      <button className={cn('btn')} onClick={() => onOpenPupup()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  shopCart: PropTypes.shape({
    itemsCount: PropTypes.number,
    itemsPrice: PropTypes.number
  }).isRequired,
  onOpenPupup: PropTypes.func
};

Controls.defaultProps = {
  onOpenPupup: () => { }
}

export default React.memo(Controls);
