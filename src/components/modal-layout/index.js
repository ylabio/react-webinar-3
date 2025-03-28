import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { formatPrices } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function ModalLayout({ sum, title, closeModal = () => {}, children }) {
  const formatedSum = formatPrices(sum);

  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('body')}>
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
