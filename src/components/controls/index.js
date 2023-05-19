import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls(props){

  function countind() {
    let result = 0;
    for(let a in props.shoppingСart.shoppingList) {
      result += props.shoppingСart.shoppingList[a].cound;
    }

    return result
  }

  return (
    <div className='Controls'>
      <p className="CartInformation">В корзине: <span className="Bold">{props.shoppingСart.shoppingList.length == 0 ? "пусто" : `${countind()} товара / ${props.shoppingСart.price} ₽`}</span></p>
      <button onClick={() => props.onCloseBasket()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default Controls;
