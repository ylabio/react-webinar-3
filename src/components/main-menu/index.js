import {memo} from 'react';
import './style.css';

function MainMenu({children}) {
  return (
    <div className="Main-menu">
      {children}
    </div>
  )
}

export default memo(MainMenu);
