import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function Nav({getRoutePath, mainLinkTitle}) {
  const cn = bem('Nav');

  return (
    <div className={cn()}>
      <Link to={getRoutePath('main')} className={cn('main-link')}>{mainLinkTitle}</Link>
    </div>);
}

Nav.propTypes = {
  getRoutePath: PropTypes.func,
  mainLinkTitle: PropTypes.string.isRequired,
};


export default memo(Nav);
