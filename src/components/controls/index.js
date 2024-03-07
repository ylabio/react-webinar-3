import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from '../../utils';

function Controls({shoppingCartList, handleOpenModal, total}) {
  const status = shoppingCartList.length
    ? (total.totalAmount + ' ' + plural(total.totalAmount, ['товар', 'товара', 'товаров'])
      + " / " + priceFormat(total.totalCost))
    : 'пусто'

  return (
    <div className='Controls'>
      В корзине:
      <span className="Controls-status">
        {status}
      </span>
      <button className="Controls-btn" onClick={handleOpenModal}>Перейти</button>
    </div>
  )
}

const itemListPropTypes = PropTypes.shape({
  code: PropTypes.number,
  price: PropTypes.number,
  title: PropTypes.string,
})

Controls.propTypes = {
  shoppingCartList: PropTypes.arrayOf(itemListPropTypes),
  handleClickOpenModal: PropTypes.func,
  total: PropTypes.shape({
    totalAmount: PropTypes.number,
    totalCost: PropTypes.number
  })
};

Controls.defaultProps = {
  handleOpenModal: () => {}
}

export default React.memo(Controls);
