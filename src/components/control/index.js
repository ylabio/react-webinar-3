import { memo } from 'react';
import './style.css'

function Control({children}) {
  return (
    <div className='control-options'>
        {children}
    </div>
  );
}

export default memo(Control);
