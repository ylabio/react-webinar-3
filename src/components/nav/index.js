import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Nav() {
  const cn = bem('Nav');

  const menuItems = [
    { label: "Главная", link: "/" },
  ];

  const menuStyle = cn('item');
  const menuStyleActive = cn('item_active');

  return (
    <nav className={cn()}>
      {menuItems.map(({ label, link }) => (
        <NavLink key={label} className={({ isActive }) => isActive ? menuStyleActive : menuStyle} to={link}>
          {label}
        </NavLink>
      ))}
    </nav>
)}


export default memo(Nav);
