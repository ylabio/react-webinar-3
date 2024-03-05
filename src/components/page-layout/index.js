import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({children, showModal }) {

  const cn = bem('PageLayout');

  return (
    <div className={cn({ noScroll: showModal })}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  showModal: PropTypes.bool,
}

PageLayout.defaultProps = {
  showModal: false,
}

export default React.memo(PageLayout);
