import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({
  title,
  children
}) {
  return (
    <div className='head'>
      <h1 className='head__title'>{title}</h1>
      {children ?? <div>{children}</div>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
};

export default React.memo(Head);
