import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({setActive, sumPrice, sumCount}){
  return (
    <div className='Controls'>
      <div>
        <span>В корзине: {sumCount}</span>
        <span> товара / {sumPrice} &#8381;</span>
      </div>
      <button onClick={() => setActive(true)}>Перейти</button>
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
