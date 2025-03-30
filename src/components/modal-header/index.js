import React from 'react';
import cross from '../../images/cross.svg';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function ModalHeader({ onShowModal = () => {} }) {
  const cn = bem('Modal');

  return (
    <header className={cn('header')}>
      <h2 className={cn('header_title')}>Корзина</h2>
      <button className={cn('header_button')} type="button" onClick={onShowModal}>
        <img src={cross} alt="Закрыть корзину" />
      </button>
    </header>
  );
}

ModalHeader.propTypes = {
  onShowModal: PropTypes.func.isRequired,
};

export { ModalHeader };
