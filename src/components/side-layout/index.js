import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, side, padding, border, gap}) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, padding, border, gap})}>
      {React.Children.map(children, (child) => {
        return <div key={child} className={cn('item')}>{child}</div>
})}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium', 't10_r20']),
  border: PropTypes.oneOf(['none', 'bottom']),
  gap: PropTypes.oneOf(['small']),
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
