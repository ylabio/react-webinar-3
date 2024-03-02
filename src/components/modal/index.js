import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartItem from "../cart-item/index";
import { formatSum } from "../../utils";
import './style.css';

function Modal({ closeModal, title, children }) {

  const cn = bem('Modal');

  return (
    <div className={cn('background')}>
      <div className={cn()}>
        <div className={cn('head')}>
          <div className={cn('title')}>{title}</div>
          <button className={cn('button')} onClick={() => closeModal()}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  closeModal: () => {
  },
  title: 'Заголовок'
}

export default React.memo(Modal);
