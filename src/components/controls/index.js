import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){

  return (
    <div className='Controls'>
      <div className='Cart-amount'>В корзине:</div>
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
