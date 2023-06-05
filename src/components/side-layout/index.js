import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, side, gap, padding, border, margin}) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, padding, gap, border, margin})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOf(["medium"]),
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium', "small-medium"]),
  border: PropTypes.oneOf(["bottom"]),
  margin: PropTypes.oneOf(["no"]),
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
