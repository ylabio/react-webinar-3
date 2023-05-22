import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import {memo} from "react";
import "./styles.css";
import CartItem from "../cart-item";


function CartList({items, onDeleteItem}) {

  const cn = bem("CartList");

  return <div className={cn()}>
    {items.map(item => {
      return <div key={item.code} className={cn("item")}>
        <CartItem item={item} onDelete={onDeleteItem} />
      </div>
    })}
  </div>
}

CartList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })),
  onDeleteItem: PropTypes.func
}

export default memo(CartList);