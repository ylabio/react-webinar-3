import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpen}) {
  return (
    <div className='Controls'>
      <span className='Controls-info'>В корзине: <b>N товаров / 100 &#8381;</b></span>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
