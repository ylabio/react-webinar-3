import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onCloseButtonClick}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {onCloseButtonClick && <button onClick={onCloseButtonClick}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  onCloseButtonClick: PropTypes.func,
};

Head.defaultProps = {
  onCloseButtonClick: null
}


export default React.memo(Head);
