import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onToggleModal}){

  return (
    <div className='Head'>
      <h1>{title}</h1>
      {onToggleModal && <button onClick={onToggleModal}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  onToggleModal: PropTypes.func
};

export default React.memo(Head);
