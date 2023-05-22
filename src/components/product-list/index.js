import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import Item from "../item";
import {memo} from "react";
import "./style.css";


function ProductList({items, onAddItem}) {

  const cn = bem("ProductList");

  return <div className={cn()}>
    {items.map(item => {
      return <div key={item.code} className={cn("item")}>
        <Item item={item} onAdd={onAddItem} />
      </div>
    })}
  </div>
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    code: PropTypes.number,
  })),
  onAddItem: PropTypes.func
}

export default memo(ProductList);