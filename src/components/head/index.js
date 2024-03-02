import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Title from "../title";

function Head({title}) {
  return (
    <div className='Head'>
      <Title>{title}</Title>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
