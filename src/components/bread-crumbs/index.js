import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function BreadCrumbs(props) {
  const { path, children } = props;

  const cn = bem('BasketTool');
  return (
    <Link to={path} className={cn('link')}>
      {children}
    </Link>
  );
}

BreadCrumbs.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};

export default memo(BreadCrumbs);
