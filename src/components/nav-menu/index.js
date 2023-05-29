import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function NavMenu() {

  const cn = bem('NavMenu');

  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>Главная</Link>
    </div>
  );
}

export default memo(NavMenu);
