import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <div className='Item-basket'>В корзине: 2 товара / 223 ₽</div>
      <button onClick={() => onAdd()} className='Basket-actions'>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
