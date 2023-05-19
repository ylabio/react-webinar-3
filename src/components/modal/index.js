import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Item from "../item";
import { countAllPrices, formatNumbers } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ onToggle, openStatus, basket, onDeleteItemFromBasket }) {
  const cn = bem("Modal");

  if (!openStatus) return null;
  return (
    <div className="wrapper">
      <div className={cn()}>
        <Head title="Корзина">
          <button onClick={() => onToggle(false)}>Закрыть</button>
        </Head>
        <div className={cn("body")}>
          {basket.length > 0 || (
            <div className={cn("item") + " empty"}>
              Добавьте товары в корзину
            </div>
          )}
          {basket.map((o) => (
            <div key={o.code} className={cn("item")}>
              <Item
                onDeleteItemFromBasket={onDeleteItemFromBasket}
                isInModal={true}
                item={o}
              />
            </div>
          ))}

          <div className={cn("results")}>
            <p>Итого</p>
            <p>
              {formatNumbers(countAllPrices(basket), {
                style: "currency",
                currency: "RUB",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onToggle: PropTypes.func,
  onDeleteItemFromBasket: PropTypes.func,
  openStatus: PropTypes.bool,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      selected: PropTypes.bool,
      count: PropTypes.number,
    })
  ),
};

Modal.defaultProps = {
  onToggle: () => {},
  onDeleteItemFromBasket: () => {},
  openStatus: false,
  basket: [],
};

export default React.memo(Modal);
