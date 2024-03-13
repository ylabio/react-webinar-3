import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import { memo } from 'react';

const LinkComponent = ({children, to, className}) => {
  return (
    <Link to={to} className={className}>{children}</Link>
  );
};

Link.propTypes = {
  children: propTypes.node,
  href: propTypes.string,
  className: propTypes.string
}

export default memo(LinkComponent);