import React from "react";
import './style.css';

function Controls({children}){
  return (
    <div className='Controls'>
      {children}
    </div>
  )
}

export default React.memo(Controls);
