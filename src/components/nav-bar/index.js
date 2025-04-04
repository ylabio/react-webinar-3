import { memo } from 'react';
import './style.css';
import { NavLink } from 'react-router';

function NavBar() {
  return (
    <nav className={'NavBar'}>
      <NavLink to="/">Главная</NavLink>
    </nav>
  );
}

export default memo(NavBar);
