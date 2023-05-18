import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAddBasket: () => {
      props.onAddBasket(props.item);
    },
    onDeleteBasket: () => {
      props.onDeleteBasket(props.item);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <span className="Item-price">{`${props.item.price.toLocaleString(
          "ru-RU"
        )} ₽`}</span>
        {props.count ? (
          <>
            <span className="Item-count">{`${props.count} шт`}</span>
            <button onClick={callbacks.onDeleteBasket}>Удалить</button>
          </>
        ) : (
          <button onClick={callbacks.onAddBasket}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddBasket: PropTypes.func,
  onDeleteBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddBasket: () => {},
  onDeleteBasket: () => {},
};

export default React.memo(Item);
