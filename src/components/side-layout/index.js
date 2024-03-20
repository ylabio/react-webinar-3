import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, side, padding, border}) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, border, padding})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  border: PropTypes.oneOf(['bottom', 'top', 'left', 'right', 'standart', 'none']),
  padding: PropTypes.oneOf(['small', 'medium']),
}

SideLayout.defaultProps = {
  border: 'none'
};

export default memo(SideLayout);
