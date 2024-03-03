import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onHideCart, hideCart}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {hideCart
        ? <></>
        : (<button onClick={() => onHideCart()}>Закрыть </button>)
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  hideCart: PropTypes.bool,
  onHideCart: PropTypes.func,
};

Head.defaultProps = {
  onHideCart: () => {
  },
}

export default React.memo(Head);
