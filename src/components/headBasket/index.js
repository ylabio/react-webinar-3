import React from "react";
import PropTypes from "prop-types";
import './style.css';

function HeadBasket({title, closeBasket}) {
  return (
    <div className='HeadBasket'>
      <h1>{title}</h1>
      <div className='HeadBasket-actions'>
        <button onClick={() => closeBasket(false)}>Закрыть</button>
      </div>
    </div>
  )
}

HeadBasket.propTypes = {
  title: PropTypes.node,
};

export default React.memo(HeadBasket);
