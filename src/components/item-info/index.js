import React from "react";
import PropTypes from "prop-types";
import {formatNum} from "../../utils";
import './style.css';

function ItemInfo({type, price, count}) {
  return (
    <div className='item-info'>
      <div>{`${formatNum(price)} ₽ `}</div>
      {(type === 'Cart') && <div className="item-info-count">{`${count} шт.`}</div>}
    </div>
  )
}

ItemInfo.propTypes = {
  type: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(ItemInfo);