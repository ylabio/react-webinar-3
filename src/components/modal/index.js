import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({active, setActive, children}){
  return (
    <div className={active? 'Modal active': 'Modal'} onClick={()=>setActive(false)}>
      <div className={active?'Modal-basket active':'Modal-basket'}  onClick={e => e.stopPropagation()}>
          {children}


      </div>
    </div>
  )
}

Modal.propTypes = {
    calculatePrice: PropTypes.number,
    setActive: PropTypes.func,
    active: PropTypes.bool,
    onDeleteItem: PropTypes.func,
};

export default React.memo(Modal);
