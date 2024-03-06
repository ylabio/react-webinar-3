import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const action = () => {
    props.onSelect(props.item, props.item.quantity ? props.item.quantity : 0);
  };

  const actionDelete = () => {
    props.onSelect(props.item);
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item?.code}</div>
      <div className="Item-title">{props.item?.title}</div>
      <div className="Item-price">
        {props.item?.price.toLocaleString("ru")} ₽
      </div>
      {props.btnText ? (
        <>
          <div className="Item-quantity">{props.item?.quantity} шт</div>
          <div className="Item-actions">
            <button className="button-classic" onClick={() => actionDelete()}>
              Удалить
            </button>
          </div>
        </>
      ) : (
        <div className="Item-actions">
          <button className="button-classic" onClick={() => action()}>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onSelect: () => {},
};

export default React.memo(Item);
