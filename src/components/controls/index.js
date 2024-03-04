import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural, numGoods, sumGoods} from "../../utils";

function Controls(props) {
  return (
    <div className='Controls'>
      <div className='Controls-description'>
        {props.description}
      </div>
      {props.actions.map((action, index) => <button key={action.name + index} onClick={action.action}>{action.name}</button>)}
    </div>
  )
}

Controls.propTypes = {
  description: PropTypes.string,
  actions: PropTypes.node.isRequired,
}

export default React.memo(Controls);
