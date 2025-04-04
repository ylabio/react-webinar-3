import React from "react";
import ItemCart from "../item-cart";
import Item from "../item";

const RenderItemDefaultProps = {
  item: {},
  onClickAction: ()=>{},
  isCart: false
};

const RenderItem = ({ item = RenderItemDefaultProps.item, onClickAction = RenderItemDefaultProps.onClickAction, isCart = RenderItemDefaultProps.isCart, articleService }) => {
  if (isCart) {
    return (<ItemCart item={ item } onClickAction={ onClickAction } articleService={articleService} />)
  } else {
    return (<Item item={ item } onClickAction={ onClickAction } articleService={articleService} />)
  }
};

export default RenderItem;
