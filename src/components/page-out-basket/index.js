import React, { useRef } from "react";
import List from "../list";
import PropTypes from "prop-types";
import './style.css'
import TotalSum from "../total-sum";
import Modal from "../modal";

function PageOutBasket({list, setBasketOpen, onDeleteBasketItem}) {
console.log(list)
let price;
if (Object.keys(list).length === 0) {
    price=0;
    list.list=[]
  } else {
    price=list.total.price;
  }

  return (
    <Modal title={'Корзина'} setBasketOpen={setBasketOpen}>
        <List list={list.list} onDeleteBasketItem={onDeleteBasketItem} />
        <TotalSum price={price}/>
    </Modal>

  );
}

PageOutBasket.propTypes = {
  list: PropTypes.shape(
   {total:PropTypes.object,
list:PropTypes.array} 
  ),
  onDeleteBasketItem: PropTypes.func,
  setBasketOpen:PropTypes.func,
}

export default React.memo(PageOutBasket);