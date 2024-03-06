import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onClose, cartInfo }) {

  return (
    <div className='Controls'>
      <div className='Controls-count'>{cartInfo}</div>
      <button onClick={() => onClose()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onClose: PropTypes.func.isRequired,
  cartInfo: PropTypes.node.isRequired,
};

Controls.defaultProps = {
  onClose: () => {
  },
}

export default React.memo(Controls);