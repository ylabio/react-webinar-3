import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CloseIcon from '../icons/close-icon';

function ModalHead({ title, onClose }) {
  const cn = bem('ModalHead');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <button  className={cn('closeBtn')} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
};

export default React.memo(ModalHead);
