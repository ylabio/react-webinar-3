import React from "react";
import PropTypes from 'prop-types';
import './style.css';


function Controls(props) {
  return (
    <div className='Controls'>
      <div>
        <div>В корзине: {props.number ? <span>{props.number} / {props.price}</span> : <span>пусто</span>}</div>
      </div>
      <button onClick={props.callback}>{props.title}</button>
    </div>
  )
}

Controls.propTypes = {
  callback: PropTypes.func,
  number: PropTypes.number,
  price: PropTypes.number,
};

Controls.defaultProps = {
  callback: () => {
  }
}

export default React.memo(Controls);
