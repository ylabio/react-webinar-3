import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

function Menu({ menu, translate }) {
  const cn = bem('Menu');
  
  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {menu.map((item,i) => <li key={i} className={cn('item')}><Link to={item.link} className={cn('link')}>{translate('mainLink')}</Link></li>)}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};

export default memo(Menu);
