import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";

function Head({ title, callback }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Close-modal">
        {callback && typeof callback === 'function' ? <Button title="Закрыть" callback={callback} /> : ''}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
