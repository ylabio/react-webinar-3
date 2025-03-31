import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

import Button from '../button';
import CloseIcon from '../../assets/close.svg';

import './style.css';

function Modal({ isOpen = false, onClose, title, children, totalPrice }) {
  const cn = bem('Modal');

  return (
    <>
      {isOpen && (
        <div className={cn()}>
          <div className={cn('wrapper')}>
            <div className={cn('content')}>
              <Button variant="icon Modal-close" onClick={onClose}>
                <CloseIcon width="100%" height="100%" />
              </Button>
              <h3 className={cn('title')}>{title}</h3>
              {children}
              {totalPrice > 0 && (
                <div className="Modal-footer">
                  <span className="Modal-text">Итого:</span>
                  <span className="Modal-text">{totalPrice.toLocaleString('ru-RU')}&nbsp;₽</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  totalPrice: PropTypes.number,
};

export default React.memo(Modal);
