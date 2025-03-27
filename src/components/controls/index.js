import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';
import CartIcon from "../icons/cart-icon";

import {formatPrice, plural} from '../../utils';

import './style.css';

function Controls(props) {
  const totalProductCount = props.productCount;

  const isProductCount = !!totalProductCount;

  const cn = bem("Controls");

  function getBtnTitle(isCountOfProducts) {
    if (isCountOfProducts) {
      return (
        <span className={cn("full--text")}>
          {totalProductCount}{' '}
          {plural(totalProductCount, {one: 'товар', few: 'товара', many: 'товаров'})} /{' '}
          {formatPrice(props.totalPrice, 'ru', '₽')}
        </span>
      );
    }
    return <span className={cn("empty--text")}>пусто</span>;
  }

  return (
    <div className="Controls">
      <Button
        onClickButton={() => {
          console.log('ffff');
        }}
      >
        <CartIcon className={cn("icon")} />
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
