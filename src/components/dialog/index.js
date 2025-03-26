import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn } from '@bem-react/classname';

function Dialog({ open, onClose, title, children }) {
  const Dialog = cn('Dialog');

  const callbacks = {
    onOverlayClick: e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
  };

  return (
    <div className={Dialog({ open })} onClick={callbacks.onOverlayClick}>
      <div className={Dialog("body")}>
        <p className={Dialog("title")}>{title}</p>
        <div className={Dialog("close")} onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(Dialog);
