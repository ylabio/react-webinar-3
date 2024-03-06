import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({size, children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn({ size: size })}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node,
}

export default React.memo(PageLayout);
