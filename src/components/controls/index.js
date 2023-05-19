import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onToggleModal}){
  return (
    <div className='Controls'>
      <p>В корзине: <b>2 товара / 223 ₽</b></p>
      <button onClick={onToggleModal}>Перейти</button>
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
