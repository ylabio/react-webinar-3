import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onGo}){
  return (
    <div className='Controls'>
      <span>В корзине: </span>
      <button onClick={() => onGo()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onGo: PropTypes.func
};

Controls.defaultProps = {
  onGo: () => {}
}

export default React.memo(Controls);
