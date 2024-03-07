import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onOpen, countItem, sumItems}) {
  const formatSumItems = sumItems.toLocaleString("ru-RU");

  return (
    <div className='Controls'>
      <span className='Controls-info'>
        В корзине:
        <b>{countItem ? `${countItem} ${plural(countItem, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${formatSumItems} \u20BD` : ' пусто'}</b>
      </span>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  countItem: PropTypes.number,
  sumItems: PropTypes.number
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
