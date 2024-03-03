import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import ModalCard from "../modal-card";
import Overlay from "../overlay";
import { formatPrice, plural } from "../../utils";

function Controls(props) {
  const [isOpen, setIsOpen] = useState(false);
  const shortInfoCard = `${props.cardInfo.cardNum} ${plural(props.cardInfo.cardNum, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  })} / ${formatPrice(props.cardInfo.cardTotalCost)} ₽` 

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className='Controls'>
      <div className="Constrols-card-info">
      <span>В корзине:</span>
      <span><b>{props.cardInfo.cardNum > 0 ? shortInfoCard : "пусто"}</b></span>
      </div>
      <div className="Constrols-button">
      <button onClick={() => openModal()}>Перейти</button>
      <ModalCard isOpen={isOpen} onClose ={closeModal} list={props.cardInfo.cardList}
        onButtonClickHandler = {props.onButtonClickInModalHandler}
        totalCost = {props.cardInfo.cardTotalCost}
      />
      </div>
    </div>
  )
}


Controls.propTypes = {
  cardInfo: PropTypes.shape({
    cardList: PropTypes.array.isRequired,
    cardTotalCost:PropTypes.number.isRequired,
    cardNum : PropTypes.number.isRequired,
  }).isRequired,
  onClick : PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
