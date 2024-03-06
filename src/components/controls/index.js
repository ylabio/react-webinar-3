import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({goToBasket, getBasket = {}, place}) {
  return (
    place === 'catalog' ?
    <div className='Controls'>
      <div>В корзине: </div>
      <div className={'Count'}>{getBasket().itemsCount === 0 ? 'Пусто' : `${getBasket().itemsCount} товар${plural(getBasket().itemsCount, { one: '', few: 'а', many: 'ов' })} / ${getBasket().finalPrice} ₽`}</div>
      <button onClick={() => goToBasket()}>Перейти</button>
    </div>
      :
    <div className='Controls'>
      <button onClick={() => goToBasket()}>Закрыть</button>
    </div>

  )
}

Controls.propTypes = {
  goToBasket: PropTypes.func,
  getBasket: PropTypes.func,
};

Controls.defaultProps = {
  goToBasket: () => {},
  getBasket: () => {},
}

export default React.memo(Controls);
