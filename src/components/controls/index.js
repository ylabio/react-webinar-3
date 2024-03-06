import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({onModal, totalSum, amount}) {

  return (
    <div className='Controls'>
      <div className="Controls-info">
        В корзине:
        <span className="Controls-total">{amount ? ` ${amount} ${plural(amount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })}` : 'пусто'} {amount ? ` / ${totalSum.toLocaleString('ru')} ₽` : ''}</span>
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
