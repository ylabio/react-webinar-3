import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.closeButton &&
        <button onClick={props.handleClick}>Закрыть</button>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  closeButton: PropTypes.bool,
  handleClick: PropTypes.func
};

Head.defaultProps = {
  title: '',
  closeButton: false,
  handleClick: () => {}
};

export default React.memo(Head);
