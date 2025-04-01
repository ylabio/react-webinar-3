import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CloseButton from '../close-button';
import './style.css';

function ModalHeader({ title, onClose }) {
  const cn = bem('ModalHeader');

  return (
    <header className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <CloseButton onClick={onClose} />
    </header>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalHeader); 