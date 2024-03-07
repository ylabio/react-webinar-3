import React from "react";
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Button from "../button";
import { formatPrice } from '../../utils';

function Controls({cartSum, onShowModal}) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        {"В корзине: "}
        <b>{cartSum.items === 0
        ? "пусто"
        : `${cartSum.items} ${plural(cartSum.items, {
          one: "товар",
          few: "товара",
          many: "товаров"})} / ${formatPrice(cartSum.sum)} `}</b>
      </div>
      <Button title="Перейти" onClick={() => onShowModal(true)}/>
    </div>
  )
}

Controls.propTypes = {
  cartSum: PropTypes.shape({
    items: PropTypes.number,
    sum: PropTypes.number,
  }).isRequired,
  onShowModal: PropTypes.func
};

Controls.defaultProps = {
  onShowModal: () => {}
}

export default React.memo(Controls);
