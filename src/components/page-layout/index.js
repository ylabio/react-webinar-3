import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({children,page}) {

  const cn = bem((page == 0 ? 'PageLayout' : 'PageLayoutBasket'));

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  page: PropTypes.number
}

export default React.memo(PageLayout);
