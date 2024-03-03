import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <span className='Controls-info'>В корзине: <b>N товаров / 100 &#8381;</b></span>
      <button onClick={() => onAdd()}>Перейти</button>
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
