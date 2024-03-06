import React from 'react';
import './style.css';

function Info({children}) {
  return (
    <div className='Info'>
      {children}
    </div>
  )
}

export default React.memo(Info);
