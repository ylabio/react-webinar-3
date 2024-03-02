import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, withGap, children}) {
  const modifier = withGap ? ' Head--gap' : '';
  return (
    <>
      <div className={'Head' + modifier}>
        <h1>{title}</h1>
        {children}
      </div>
    </>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  withGap: PropTypes.bool,
};

export default React.memo(Head);
