import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { createPortal } from "react-dom";

function ModalLayout({ children }) {

  const cn = bem('ModalLayout');
  const portal = document.getElementById('portal')

  return createPortal(
    <div className={cn()}>
      <div className={cn('block')}>
        {children}
      </div>
    </div>
    , portal)
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout);
