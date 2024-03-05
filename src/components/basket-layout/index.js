import React from "react"
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function BasketLayout ({ children }) {

    const cn = bem('BasketLayout');

    return (
        <div className={cn()}>
          <div className={cn('center')}>
            {children}
          </div>
        </div>
      );
    }
    
    BasketLayout.propTypes = {
      children: PropTypes.node
    }
    
export default React.memo(BasketLayout);