import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onCloseCart}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {title === 'Корзина' && (<button onClick={onCloseCart}>Закрыть</button>)}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onCloseCart: PropTypes.func
};

Head.defaultProps = {
  onCloseCart: () => {}
}

export default React.memo(Head);
