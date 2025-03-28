import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

import Button from '../button';
import CloseIcon from '../../assets/close.svg';

import './style.css';

function Modal({ isOpen = false, onClose, title, children }) {
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
};

export default React.memo(Modal);
