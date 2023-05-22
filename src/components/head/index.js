import React from "react";
import PropTypes from "prop-types";
import './style.css';
import PrimaryButton from "../primary-button";

function Head({title, withButton, onClick}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {withButton &&
        <PrimaryButton description={'Закрыть'} onClick={onClick}/>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
