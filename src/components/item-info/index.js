import React from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import {formatNum} from "../../utils";
import './style.css';

function ItemInfo({type, price, count}) {
  const cn = bem('ItemInfo');

  return (
    <div className={cn()}>
      <div>{`${formatNum(price)} ₽ `}</div>
      {(type === 'Cart') && <div className={cn('count')}>{`${count} шт.`}</div>}
    </div>
  )
}

ItemInfo.propTypes = {
  type: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(ItemInfo);