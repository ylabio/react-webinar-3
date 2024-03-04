import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenModal}) {
  return (
    <div className='Controls'>
      <button className='Controls-button' onClick={() => onOpenModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenModal: PropTypes.func
};

Controls.defaultProps = {
  onOpenModal: () => {}
}

export default React.memo(Controls);
