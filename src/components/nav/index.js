import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router';
function Nav(props) {
  const cn = bem('Nav');

  return (
    <div className={cn()}>
      <nav>
        <Link to="/">{props.homeText}</Link>
      </nav>
      {props.children}
    </div>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
  homeText: PropTypes.string,
};

export default memo(Nav);
