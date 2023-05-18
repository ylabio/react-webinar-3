import './style.css';
import React from "react";
import PropTypes from 'prop-types';

function Controls({onClick}){
  return (
    <div className='Controls'>
      <button onClick={onClick}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func
};

export default React.memo(Controls);