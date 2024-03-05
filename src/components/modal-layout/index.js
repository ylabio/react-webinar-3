import React, { useEffect, useMemo } from 'react';
import Portal from '../portal';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onClose, isVisible }) {
  const cn = bem('ModalLayout');

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleClose = useMemo(() => () => onClose(), [onClose]);

  return (
    <Portal>
      {isVisible && (
        <div className={cn('overlay')} onClick={handleClose}>
          <div className={cn('position')}>{children}</div>
        </div>
      )}
    </Portal>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default React.memo(ModalLayout);
