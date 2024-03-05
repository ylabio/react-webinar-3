import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function ModalLayout({children, onClose}) {

    const cn = bem('ModalLayout')
  
    return (
      <div className={cn()} onClick={onClose}>
        <div className={cn('container')} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  
  ModalLayout.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  }
  
  export default React.memo(ModalLayout);