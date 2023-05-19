import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onToggleCartView, isCart}){
  return (
    <div className={`Head ${isCart ? 'Head_modal' : ''}`}>
      <h1>{title}</h1>
      {isCart && <button className='Head-button' onClick={onToggleCartView}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onToggleCartView: PropTypes.func,
  isCart: PropTypes.bool
};

export default React.memo(Head);
