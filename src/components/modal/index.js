import React from "react";
import './style.css';
import Head from "../head";
import List from "../list";
import {getNumberFormat} from "../../utils";
import ItemCart from "../itemCart";
import PropTypes from "prop-types";

function Modal({cart, onDeleteItem, onOpenModal, totalPriceCart}){

  return (
  <div className='Modal-overlay'>
    <div className='Modal-window'>
      <Head title={'Корзина'}>
          <button className='Modal-btn-close' onClick={() => onOpenModal()}>Закрыть</button>
      </Head>
      <div className='Modal-space'></div>
      <List list={cart}>
        <ItemCart onDeleteItem={onDeleteItem}/>
      </List>
      <div className='Modal-footer'>
        <p><strong><span>Итого</span> <span>{getNumberFormat(totalPriceCart)} ₽</span></strong></p>
      </div>
    </div>
</div>
)
}
Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  totalPriceCart: PropTypes.number,
  onDeleteItem: PropTypes.func,
  onOpenModal: PropTypes.func
};

Modal.defaultProps = {
  onDeleteItem: () => {},
  onOpenModal: () => {},
}

export default React.memo(Modal);
