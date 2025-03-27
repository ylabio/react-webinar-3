import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ModalOverlay = ({ children, onClick }) => {
  const cn = bem('ModalOverlay');
  return (
    <div className={cn()} onClick={onClick}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
