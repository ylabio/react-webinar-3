import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {localeNum, plural} from "../../utils";

function Controls({onAdd, store}) {
  const cn = bem('Controls');

  const cartCount = store.getState().storeList.length;
  const cartPrice = store.getCartPrice();

  return (
    <div className={cn()}>
      <p className={cn("subtitle")}>В корзине: </p>
      {cartCount > 0 ? <p className={cn("bold_span")}>{`${cartCount} ${plural(cartCount, {one: "товар", few: "товара", many: "товаров"})} / ${localeNum(cartPrice)} ₽`}</p> : <p className={cn("bold_span")}>пусто</p>}
      <button onClick={() => onAdd()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
