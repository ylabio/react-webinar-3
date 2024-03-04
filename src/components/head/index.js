import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {

  console.log("head")

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <div className='Head-actions'>
        {props.actions?.current.map((action, index) => <button key={action.name + index} onClick={action.action}>{action.name}</button>)}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.shape({current:
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      action: PropTypes.func
    }))}).isRequired,
};

export default React.memo(Head);
