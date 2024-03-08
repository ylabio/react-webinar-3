import React from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import {plural, formatNum} from "../../utils";
import './style.css';

function CartInfo({count, totalSumm}) {
  const cn = bem('CartInfo');

  return (
    <div className={cn()}>
      <p>В корзине: <b>{count ? `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${formatNum(totalSumm)} ₽` : 'пусто'}</b></p>
    </div>
  )
}

CartInfo.propTypes = {
  count: PropTypes.number,
  totalSumm: PropTypes.number,
};

export default React.memo(CartInfo);