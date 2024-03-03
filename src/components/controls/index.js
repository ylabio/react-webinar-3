import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import modal from "../modal/modal";


function Controls({setModalActive}) {

  const handleClick = () => {
    // Вызываем колбэк при необходимости
    callback('count');
  };

  return (
    <div className='Controls'>
      
      <button className='Controls_btn' onClick={() => setModalActive(true)}>Перейти</button>
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
