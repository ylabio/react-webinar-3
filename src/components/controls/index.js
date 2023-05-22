import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import HeaderBasket from "../header-basket";

function Controls(props){
  return (
    <div className='Controls'>
      <HeaderBasket totalPrice={props.totalPrice} totalCount={props.totalCount}/>
      <button className='Controls-action' onClick={() => props.onOpenModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
};

Controls.defaultProps = {
  onOpenModal: () => {}
}

export default React.memo(Controls);
