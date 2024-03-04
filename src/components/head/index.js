import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, isCart, closeModal}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className={isCart ? "" : "hidden"} onClick={closeModal}>Закрыть</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
