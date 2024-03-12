import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import { NavLink } from "react-router-dom";
import './style.css';

function MainMenu({ title }) {

  const cn = bem('MainMenu');

  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to='/'>{title}</NavLink>
    </div>
  )
}

export default memo(MainMenu);
