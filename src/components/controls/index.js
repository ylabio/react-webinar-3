import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onOpenCart }){
  return (
    <div className='Controls'>
      <button onClick={() => onOpenCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func
};

Controls.defaultProps = {
  onOpenCart: () => {}
}

export default React.memo(Controls);
