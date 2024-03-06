import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ modal, children }) {

  const cn = bem('Modal');

  return (
    <div className={cn({ opened: modal })}>
      <div className={cn('wrapper')}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number
  })).isRequired,
  cartSum: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  children: PropTypes.node
};

Modal.defaultProps = {
  onItemClick: () => {

  },
}

export default Modal;
