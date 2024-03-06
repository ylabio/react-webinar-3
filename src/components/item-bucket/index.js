import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemBucket(props) {
  const cn = bem("ItemBucket");

  const callbacks = {
    onBucketRemove: () => {
      props.onBucketRemove(props.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.code}</div>
      <div className={cn("title")}>{props.title}</div>
      <div className={cn("price")}>{formatPrice(props.price)} &#8381;</div>
      <div className={cn("amount")}>{props.amount} шт</div>
      <div className={cn("actions")}>
        <button className="Btn" onClick={callbacks.onBucketRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemBucket.propTypes = {
  code: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

ItemBucket.defaultProps = {
  onBucketAdd: () => {},
};

export default React.memo(ItemBucket);
