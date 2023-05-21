import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout({children, isOpen}) {

  const cn = bem('ModalLayout');

  const getStyle = () => {
    return (isOpen ?  "" : ' ModalLayout_unvisible');
    
}

  return (
    <div className={cn()+getStyle()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout);
