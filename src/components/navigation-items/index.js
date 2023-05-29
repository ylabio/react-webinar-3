import { memo } from "react";
import './style.css';
import { Link } from "react-router-dom";
import l from '../../languages/lang-rendering';

function NavigationItems() {
  return (
    <div className='Navigation-item'>
      <Link className='Navigation-link' to='/' >{l('mainLink')}</Link>
    </div>
  );
}

export default memo(NavigationItems);
