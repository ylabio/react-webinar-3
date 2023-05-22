import React from "react";
import PropTypes from "prop-types";
import './style.css';

function BasketHead({title, onTaggle}){
  return (
    <div className='BasketHead'>
      <h2>{title}</h2>
      <button onClick={onTaggle}>Закрыть</button>
    </div>
  )
}

BasketHead.propTypes = {
  title: PropTypes.node,
};

export default React.memo(BasketHead);
