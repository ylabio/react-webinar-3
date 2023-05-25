import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Horizontal container with justifyContent option
 * Вообще, тут можно целую пачку стилей кинуть, но пока не будем
 */

function HorizontalContainer({ children, justifyContent }) {
  const cn = bem('HorizontalContainer');

  return (
    <div className={cn()} style={{ justifyContent }}>
      {children}
    </div>
  );
}

HorizontalContainer.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.string
}

HorizontalContainer.defaultProps = {
  justifyContent: 'flex-start'
}

export default React.memo(HorizontalContainer);