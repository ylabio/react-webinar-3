import React from "react";
import PropTypes from 'prop-types';
import CartCount from "../cart-count";
import './style.css';

function Controls({list, setModal}){
  return (
    <div className='Controls'>
      <CartCount list={list}/>
      <button onClick={() => setModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.array,
  setModal: PropTypes.func
}

Controls.defaultProps = {
  list: [],
  setModal: () => {}
}

export default React.memo(Controls);
