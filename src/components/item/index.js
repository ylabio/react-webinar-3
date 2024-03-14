import { memo, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import useStore from "../../store/use-store";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import LinkProduct from '../linkProduct';
function Item(props) {
  const productLink = `/product/${props.item._id}`;
  const cn = bem("Item");

  const callbacks = {
    onAdd: () => props.onAdd(props.item)
  };
  console.log(props.item);
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")}>
      <LinkProduct to={productLink} title={props.item.title} closeModal={callbacks.closeModal}/>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}> {props.langData.buttons.onAddTxt}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    langData: PropTypes.object,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
