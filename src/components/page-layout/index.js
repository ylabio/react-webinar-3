import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({children, cartOpen}) {
  const cn = bem('PageLayout');

  return (
    <div className={cartOpen === false ? cn() : cn('shade')}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  cartOpen: PropTypes.bool
}

export default React.memo(PageLayout);
