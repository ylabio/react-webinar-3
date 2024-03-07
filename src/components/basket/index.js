import React from "react";
import List from "../list"
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import "./style.css";

function Basket(props) {
  return (
    <>
      <div className="Basket__header">
        <h1 className="Basket__header-title">
          {props.titleModal}
        </h1>
        <div className="Basket__header-button">
          <button onClick={props.onCloseModal}>
            Закрыть
          </button>
        </div>
      </div>
      <div className="Basket__body">
        <List
          list={props.basket.products}
          funcButton={props.funcButton}
          buttonTitle="Удалить"
        />
      </div>
      <div className="Basket__footer">
        <strong className="Basket__footer-info">
          <span className="Basket__footer-info_sum">
            Итого
          </span>
          <span
            className="Basket__footer-info_price">
            {`${numberFormat(props.basket.allPrice)} ₽`}
          </span>
        </strong>
      </div>
    </>
  )
}

Basket.propTypes = {
  titleModal: PropTypes.node,
  isOpen: PropTypes.bool,
  basket: PropTypes.shape({
    products: PropTypes.array,
    allPrice: PropTypes.number
  }),
  onCloseModal: PropTypes.func,
  funcButton: PropTypes.func
};

Basket.defaultProps = {
  funcButton: () => {
  },
}

export default React.memo(Basket);
