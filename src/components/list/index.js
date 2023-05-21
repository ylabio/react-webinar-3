import React, { Children } from "react";
import './style.css';

function List({children}){
  return (
    <div className='List'>
      {Children.map(children, child =>
        <div className='List-item'>
          {child}
        </div>
      )}
    </div>
  )
}

export default React.memo(List);
