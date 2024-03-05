import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ShopLayout ({ children }) {

  const cn = bem('ShopLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

ShopLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ShopLayout);