import React from "react";
import './style.css';

function Overlay({children}) {

  return (
    <div className='Overlay'>
      {children}
    </div>  
  )
}

export default Overlay;
