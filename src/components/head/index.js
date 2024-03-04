import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button"

function Head({title, onClose}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {onClose && <Button onClick={onClose}>Закрыть</Button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
