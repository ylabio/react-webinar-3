import React from "react";
import PropTypes from "prop-types";
import './style.css';

/**
 * Шапка приложения
 */
function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      { props.children &&
          <div className='Head-actions'>
            {props.children}
          </div>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
}

Head.defaultProps = {
  title: '',
  children: null,
}

export default React.memo(Head);
