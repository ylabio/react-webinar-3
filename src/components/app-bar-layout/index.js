import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AppBarLayout({children, side, padding}) {
  const cn = bem('AppBarLayout');
  return (
    <div className={cn({side, padding})}>
      {React.Children.map(children, (child) => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
}

AppBarLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
}

AppBarLayout.defaultProps = {};

export default memo(AppBarLayout);
