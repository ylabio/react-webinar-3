import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal";
import Head from "../head";
import List from "../list";
import { numberWithSpaces } from "../../utils";
import { calcPrice } from "../../utils";

import './style.css';

function Basket({modalIsActive, list, toggleModal, onDeleteItem}) {

  return (
    <Modal modalIsActive={modalIsActive}
            toggleModal={toggleModal}
            title={"Корзина"}>
      
        <List list={list.filter(item => item.count)}
                actionItem={onDeleteItem}
                buttonText="Удалить"
                isModal={true}/>

        <div className='Basket-result'>
            <div>Итого</div>
            <div>{`${numberWithSpaces(calcPrice(list.filter(item => item.count)))} ₽`}</div>
        </div>
    </Modal>
  );
}

Basket.propTypes = {
  modalIsActive: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  toggleModal: PropTypes.func,
  onDeleteItem: PropTypes.func
}

Basket.defaultProps = {
  modalIsActive: false,
}

export default React.memo(Basket);
