import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {
  return (
    <>
      {title == 'Магазин' 
      ? (
        <div className='Head1 Head'>
          <h1>{title}</h1>
        </div>) 
      : (
        <div className='Head2 Head'>
          <h1>{title}</h1>
        </div>
      )}
    </> 
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
