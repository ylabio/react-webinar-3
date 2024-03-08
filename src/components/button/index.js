import React from "react";
import './style.css';

function Button({callback, title}) {
  return (
      <div className='actions'>
        <button onClick={(e) => callback(e)}>{title}</button>
      </div>
  )
}


export default React.memo(Button);