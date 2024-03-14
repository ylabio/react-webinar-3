import {memo} from 'react';
import './style.css';

function Navigation({children}) {
  return (
    <div className="Navigation">
      {children}
    </div>
  )

}

export default memo(Navigation);
