import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, showModal, title, onHideModal}) {

  const cn = bem('Modal');

  return (
    <div className={cn({ active: showModal })}>
      <div className={cn('container')}>
        <div className={cn("header")}>
          <h2>{title}</h2>
          <button onClick={() => onHideModal()}>
            Закрыть
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  title: PropTypes.string,
}

Modal.defaultProps = {
  onHideModal: () => {
  },
  showModal: false,
}

export default React.memo(Modal);
