import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({onModal, basket}) {

  const total = basket.reduce((acc, item) => {
    return acc + (item.price * item.count)
  }, 0)
  
  return (
    <div className='Controls'>
      <div className="Controls-info">
        В корзине:
        <span className="Controls-total">{basket.length ? ` ${basket.length} ${plural(basket.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })}` : 'пусто'} {basket.length ? ` / ${total} ₽` : ''}</span>
      </div>
      <button onClick={onModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModal: PropTypes.func
};

Controls.defaultProps = {
  onModal: () => {}
}

export default React.memo(Controls);
