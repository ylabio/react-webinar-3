import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls() {
  return (
    <div className='Controls'>
      <div className='Controls-vidget'>В корзине:
        <strong className='Controls-vidget-inform'>пусто</strong>
      </div>
      <button className="Controls-button">Перейти</button>
    </div>
  )
}

/* Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
} */

export default React.memo(Controls);
