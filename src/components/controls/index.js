import React from 'react';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Controls({totalCartAmount, sumPrices, setShowModal}) {
  return (
    <div className='Controls'>
      <div className='Controls-title'>
        В корзине:
        <span className='Controls-amount'>
          {totalCartAmount === 0 ? 'пусто' : `${totalCartAmount} ${plural(totalCartAmount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
            })} / ${sumPrices} ₽`
          }
        </span>
      </div>
      <button onClick={() => setShowModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalCartAmount: PropTypes.number,
  sumPrices: PropTypes.number,
  setShowModal: PropTypes.func
};

Controls.defaultProps = {
  totalCartAmount: 0,
  sumPrices: 0,
  setShowModal: () => {
  }
}

export default React.memo(Controls);
