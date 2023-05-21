import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartItem from "../cart-item";
import List from "../list";

// какое-то время ковырял Item, чтобы юзать его и тут, и в List
// в итоге почитал сообщения в чате, кажется, что это не нужно
// и необходимо просто сделать новый компонент. ну ок, сделал просто новый.
function Modal({ cartList, setModal, total, onDeleteItem }) {

  return (
    <>
      <div className={'Modal-header'}>
        <h1 className={'Modal-title'}>Корзина</h1>
        <button className={'Modal-close'} onClick={() => setModal(false)}>Закрыть</button>
      </div>

      {cartList.length > 0 ? <List
        cartList={cartList}
        onDelete={onDeleteItem} /> :
        <div className="Modal-empty">Ваша корзина пуста</div>}
      <div className={'Modal-footer'}>
        <h3 className={'modal-footer_title'}>Итого</h3>
        <h3 className={'Modal-count'}>{total.toLocaleString('ru-RU')} ₽</h3>
      </div>
    </>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func,
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  total: PropTypes.number.isRequired,
  onDeleteItem: PropTypes.func,
};

Modal.defaultProps = {
  setModal: () => { },
  total: 0,
  onDeleteItem: () => { },
}

export default React.memo(Modal);