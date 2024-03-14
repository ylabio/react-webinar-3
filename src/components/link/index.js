import { Link } from 'react-router-dom'
import propTypes from 'prop-types';
import { memo } from 'react';

const LinkComponent = ({children, to, onClick, className}) => {
  return (
    <Link to={to} className={className} onClick={onClick}>{children}</Link>
  );
};

Link.propTypes = {
  children: propTypes.node,
  href: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func
}

LinkComponent.defaultProps = {
  onClick: () => {},
}

export default memo(LinkComponent);