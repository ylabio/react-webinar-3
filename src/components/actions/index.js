import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Actions({ children }) {
  const cn = bem('Actions');

  return <div className={cn()}>{children}</div>;
}

Actions.propTypes = {
  children: PropTypes.node,
};

export default memo(Actions);
