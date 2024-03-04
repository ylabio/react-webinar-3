import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.closeCart&&<button className="Head-button" onClick={props.closeCart}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  closeCart: PropTypes.func
};

export default React.memo(Head);
