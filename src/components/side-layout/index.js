import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout({ children, side, padding, gap, line }) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({ side, padding, gap, line })}>
      {React.Children.map(children, (child) => {
        if (child === null) return null;
        return (
          <div key={child.key} className={cn('item')}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  gap: PropTypes.bool,
  line: PropTypes.oneOf(['bottom', 'top', 'both']),
};

SideLayout.defaultProps = {
  gap: false,
};

export default memo(SideLayout);
