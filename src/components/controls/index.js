import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onClickOpen}){
  return ( 
    <div className='Controls'>
      <button className='Controls-button' onClick={() => onClickOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onClickOpen: PropTypes.func
};

Controls.defaultProps = {
  onClickOpen: () => {}
}

export default React.memo(Controls);
