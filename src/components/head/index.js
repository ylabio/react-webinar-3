import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, inCart, showModal}) {
  return (
    <div className={inCart ? 'Head inCart' : 'Head'}>
      <h1 style={inCart && {width: '100%', padding: '20px 10px 10px 20px'}}>{title}</h1>
      {inCart &&
        <button onClick={() => showModal(false)}>
          Закрыть
        </button>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  inCart: PropTypes.bool,
  showModal: PropTypes.func
};

Head.defaultProps = {
  showModal: () => {}
}

export default React.memo(Head);
