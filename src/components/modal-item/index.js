import React from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import {cn as bem} from "@bem-react/classname"
import './style.css';

function ModalItem(props) {
    const cn = bem("Modal-item")
    const callbacks = {
        deleteFromCard: (e) => {
        e.stopPropagation();
        props.onClick(props.item.code);
        }
    }       

    return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>
        {props.item.title}
      </div>
      <div className={cn("price-info")}>
      {`${formatPrice(props.item.price)} ₽`} 
      </div>
      <div className={cn("quantity-info")}>
        { props.item.quantity} шт
      </div>
      <div className={cn("delete-button")}>
        <button onClick={callbacks.deleteFromCard}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onClick : PropTypes.func,
};

ModalItem.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(ModalItem);
