import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Modal from '../modal/index';

function PageLayout({
  children,
  cart = [],
  price = 0,
  showModal = false,
  onShowModal = () => {},
  onDeleteItem = () => {},
}) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
      <Modal
        cart={cart}
        price={price}
        showModal={showModal}
        onShowModal={onShowModal}
        onDeleteItem={onDeleteItem}
      ></Modal>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
