import React, { useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname"
import './style.css';
import Modal from "../modal";
import { plural } from "../../utils";

function Controls({ list, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cn = bem('Controls')

  const totalPrice = list.reduce((acc, val) => {
    return acc + (val.price * val.quantity);
  }, 0);

  const renderCartInfo = () => {
    const itemCount = list.length;
    const itemWord = plural(itemCount, { one: 'товар', few: "товара", many: 'товаров' });

    return (
      <p className={cn('basket')}>В корзине: <b>{itemCount ? `${itemCount} ${itemWord} / ${totalPrice} ₽` : "Пусто"}</b></p>
    );
  };

  return (
    <div className={cn()}>
      <div className={cn("count")}>{renderCartInfo()}</div>
      <button onClick={() => setIsMenuOpen(true)}>Перейти</button>
      {isMenuOpen && <Modal title={"Корзина"} onClose={() => setIsMenuOpen(false)}>
        {children}
        {<b className={cn("counter")}>Итого <span>{totalPrice} ₽</span></b>}
      </Modal>}
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  children: PropTypes.node
};

export default React.memo(Controls);