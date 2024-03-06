import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural, formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemShop(props) {
  const cn = bem("ItemShop");

  const callbacks = {
    onBucketAdd: () => {
      props.onBucketAdd(props.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.code}</div>
      <div className={cn("title")}>{props.title}</div>
      <div className={cn("price")}>{formatPrice(props.price)} &#8381;</div>
      <div className={cn("actions")}>
        <button className="Btn" onClick={callbacks.onBucketAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ItemShop.propTypes = {
  code: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  price: PropTypes.number.isRequired,
};

ItemShop.defaultProps = {
  onBucketAdd: () => {},
};

export default React.memo(ItemShop);
