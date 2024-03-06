import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";

function Head({ title, active, onCloseModal }) {
  return (
    <div className='Head'>
      { active ? 
      <div className='Head-block'>
        <h1>{title}</h1> 
        <Button btnText='Закрыть' onClick={onCloseModal}/>
      </div>
      :
      <h1>{title}</h1>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  active: PropTypes.bool,
  closeModal: PropTypes.func,
};

Head.defaultProps = {
  closeModal: () => {},
};

export default React.memo(Head);
