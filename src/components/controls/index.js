import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice, plural } from "../../utils";

function Controls(props) {
  const shortInfoCard = `${props.cardInfo.cardNum} ${plural(props.cardInfo.cardNum, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  })} / ${formatPrice(props.cardInfo.cardTotalCost)} ₽` 

  return (
    <div className='Controls'>
      <div className="Constrols-card-info">
      <span>В корзине:</span>
      <span><b>{props.cardInfo.cardNum > 0 ? shortInfoCard : "пусто"}</b></span>
      </div>
      <div className="Constrols-button">
      <button onClick={props.openModalCallback}>Перейти</button>
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
