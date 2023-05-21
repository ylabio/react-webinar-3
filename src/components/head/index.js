import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({button, onOpenCart, title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {button && <button onClick={onOpenCart}>{button}</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
  onOpenCart: PropTypes.func,
};

Head.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(Head);
