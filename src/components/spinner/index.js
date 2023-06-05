import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Spinner({ active, children, hide }) {
  const cn = bem('Spinner');
  if (active) {
    return <div className={cn({ hide })}>{children}</div>;
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Spinner.defaultProps = {
  active: false,
};

export default memo(Spinner);
