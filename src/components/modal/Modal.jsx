import React, {useEffect} from 'react'
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./style.css"
import Head from '../head';
import List from '../list';
import Button from '../button';

function Modal({cart, cartSum, onRemoveItem, onShowModal}) {
  const cn = bem("Modal");
  cart = cart.filter(item => item.count > 0)

  return (
    <div className={cn()}>
      <div className={cn("layout")}>
        <Head title="Корзина">
          <Button title="Закрыть" onClick={()=>onShowModal(false)}/>
        </Head>
        <div className="Main">
          <List list={cart} onClick={onRemoveItem} isCart={true}/>
          {Boolean(cart.length) &&
            <div className="Main-sum">
              <b>Итого</b>
              <b>{cartSum+" ₽"}</b>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartSum: PropTypes.number,
  onShowModal: PropTypes.func
};

Modal.defaultProps = {
  getCart: () => {},
  onShowModal: () => {}
}

export default Modal