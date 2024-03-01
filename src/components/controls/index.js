import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatSum, plural } from "../../utils";

function Controls({count, sum, onAdd}) {

  const variants = {one:'товар', few:'товара', many:'товаров'}

  return (
    <div className='Controls'>
      <div className='Controls-sum'>
        <p className='Controls-basket'>В корзине:</p>
        <p className='Controls-count'>{count ? `${count} ${plural(count, variants)} / ${formatSum(sum)} ₽` : `пусто` }</p>
      </div>
      <button className='Controls-button' onClick={() => onAdd()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  count: PropTypes.number,
  sum: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
