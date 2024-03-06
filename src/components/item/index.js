import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname"
import './style.css';

function Item(props) {
  const cn = bem("Item");
  const { code, title, price } = props.item;
  const callbacks = {
    onClick: () => {
      props.onClick(code);
    },
  }
  console.log(props.onClick)
  return (
    <div className={cn()}>
      <div className={cn("code")}>{code}</div>
      <div className={cn("title")}>
        {title}
      </div>
      <div className={cn("info")}>
        <p className={cn("price")}>{`${price.toLocaleString()} ₽`}</p>
      </div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClick}>
          Добавить
        </button>
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
