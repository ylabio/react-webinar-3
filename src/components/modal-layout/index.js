import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function ModalLayout({children, onClose, totalPrice}) {

    const cn = bem('ModalLayout')
  
    return (
      <div className={cn()} onClick={onClose}>
        <div className={cn('container')} onClick={(e) => e.stopPropagation()}>
          {children}
          <div className={cn('bottom')}>
            <span className={cn('total')}>Итого</span>
            <span className={cn('totalPrice')}>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    );
  }
  
  ModalLayout.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    totalPrice: PropTypes.number
  }
  
  export default React.memo(ModalLayout);