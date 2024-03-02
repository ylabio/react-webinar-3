import React from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function Controls ({ openCart, sum , count}) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      {count ? (
        <>
          <div>В корзине: </div>
          <h3>{count} товара / {sum} ₽ </h3>
        </>
      ) : ''}
      <button onClick={openCart}>{count ? 'Перейти' : 'Корзина'}</button>
    </div>
  )
}

Controls.propTypes = {

};

export default React.memo(Controls);