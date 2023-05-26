import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function Nav({navConfig}) {
  const cn = bem('Nav');

  return (
    <nav className={cn()}>
      {navConfig.map(item => (
        <Link key={item.key} to={item.path} className={cn('main-link')}>{item.title}</Link>
      ))}
    </nav>);
}

Nav.propTypes = {
  navConfig: PropTypes.array,
};


export default memo(Nav);
