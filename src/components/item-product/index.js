import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemProduct({ item, onActionType }) {
  const { price, code, title } = item;

  const formattedPriceNumber = formatNumber(price);
  
  const cn = bem('ItemProduct');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('actions')}>
      <div className={cn('price')}>{formattedPriceNumber} ₽</div>
      <button onClick={() => onActionType(code)}>Добавить</button>
      </div>
    </div>
  );
}

ItemProduct.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onActionType: PropTypes.func.isRequired
};

export default React.memo(ItemProduct);
