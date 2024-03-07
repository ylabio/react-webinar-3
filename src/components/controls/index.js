import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural, numGoods, sumGoods} from "../../utils";

function Controls(props) {

console.log("controls")

  return (
    <div className='Controls'>
      <div className='Controls-description'>
        {props.description}
      </div>
      {props.actions.current.map((action, index) => <button key={action.name + index} onClick={action.action}>{action.name}</button>)}
    </div>
  )
}

Controls.propTypes = {
  description: PropTypes.node,
  actions: PropTypes.shape({current:
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      action: PropTypes.func
    }))}).isRequired,
}

export default React.memo(Controls);
