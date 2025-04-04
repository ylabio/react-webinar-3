import React from 'react';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { formattedNumber } from "../../utils";

import { Link } from 'react-router-dom';

function Item({ item, onClickAction }) {
  const cn = bem("Item");

  const onClick = () => {
    onClickAction(item._id);
  };

  return (
    <div className={cn()}>
      <Link className={cn("title")} to={`/product/${item._id}`}>
        <b >{item.title}</b>
      </Link>
      <span className={cn("price")}>{formattedNumber(item.price)} ₽</span>
      <div className={cn("actions")}>
        <button onClick={onClick}>Добавить</button>
      </div>
    </div>
  );
}


export default React.memo( Item );
