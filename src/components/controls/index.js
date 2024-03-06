import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice, plural, variants } from "../../utils";

function Controls({totalCost, basket, onClick}) {

  return (
    <div className='Controls'>
      <p className='Controls-basket'>В корзине:</p>
      <div className='Controls-cost'>{basket.length !== 0 ? `${basket.length} ${plural(basket.length,variants)} /  ${formatPrice(totalCost())} ₽` : ' пусто'}</div>
      <button onClick={() => onClick()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalCost: PropTypes.func,
  onClick: PropTypes.func
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
