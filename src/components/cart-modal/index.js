import React from 'react';
import Modal from '../modal';
import List from '../list';
import CartSummary from '../cart-summary';

function CartModal({
  items = [],
  totalAmount = 0,
  isOpen = false,
  onClose = () => {},
  onRemove = () => {}
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Корзина"
    >
      <List
        list={items}
        isCart={true}
        onRemove={onRemove}
      />
      {items.length > 0 && <CartSummary totalAmount={totalAmount} />}
    </Modal>
  );
}

export default React.memo(CartModal);
