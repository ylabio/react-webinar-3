import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, active, setActive}){
  return (
    <div className={active?'Head active': 'Head' }>
      <h1>{title}</h1>
        {active?
          <button onClick={()=>setActive(false)}>Закрыть</button>
          : <></>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  active: PropTypes.bool,
  setActive: PropTypes.func
};

export default React.memo(Head);
