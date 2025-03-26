import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import { formatPrice, plural } from '../../utils';

import './style.css';

function Controls(props) {
  const totlaProductCount = props.productCount;

  const isProductCount = !!totlaProductCount;

  function getBtnTitle(isCountOfProducts) {
    if (isCountOfProducts) {
      return (
        <span>
          {totlaProductCount}{' '}
          {plural(totlaProductCount, { one: 'товар', few: 'товара', many: 'товаров' })} /{' '}
          {formatPrice(props.totalPrice, 'ru', '₽')}
        </span>
      );
    }
    return <span>пусто</span>;
  }

  return (
    <div className="Controls">
      <Button
        onClickButton={() => {
          console.log('ffff');
        }}
      >
        {getBtnTitle(isProductCount)}
      </Button>
    </div>
  );
}

Controls.propTypes = {
  productCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onButtonClick: PropTypes.func,
};

export default React.memo(Controls);
