import React, { useEffect, useRef } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatPrices } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function ModalLayout({ sum, title, closeModal = () => {}, children }) {
  const formatedSum = formatPrices(sum);

  const cn = bem('ModalLayout');

  const modalLayout = useRef();
  const body = useRef();
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      modalLayout.current.style.alignItems =
        modalLayout.current.clientHeight < body.current.clientHeight ? 'flex-start' : 'center';
    });

    resizeObserver.observe(modalLayout.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={modalLayout}>
      <div className={cn('body')} ref={body}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{title}</h1>
          <button className={cn('close')} onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
        <div className={cn('total')}>
          <span className={cn('sum')}>Итого: </span>
          <span className={cn('sum')}>{formatedSum} ₽</span>
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  sum: PropTypes.number,
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

export default React.memo(ModalLayout);
