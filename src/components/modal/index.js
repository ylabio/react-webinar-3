import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Portal from "../portal";

function Modal({children, isOpen, onClose}) {
  const cn = bem('Modal');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(cn('hide-overflow'));
      return;
    }
    document.body.classList.remove(cn('hide-overflow'));

  }, [isOpen]);

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', close);

    return () => {
      document.removeEventListener('keydown', close);
    }

  }, [isOpen])


  return (
    <Portal>
      <>
        <CSSTransition
          in={isOpen}
          nodeRef={ref}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: cn('enter'),
            enterActive: cn('enter-active'),
            exit: cn('exit'),
            exitActive: cn('exit-active'),
          }}
        >
          <div className={cn()} onClick={onClose} ref={ref}>
            {children}
          </div>
        </CSSTransition>
      </>
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Modal


