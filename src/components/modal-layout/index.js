import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ModalLayout({ children }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('dialog')}>
        <div className={cn('content')}>
            { children }
        </div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalLayout);