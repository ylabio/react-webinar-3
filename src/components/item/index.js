import {memo, useState,useContext} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../languages/languagesContext";

function Item(props) {

  let { dict } = useContext(LanguageContext)

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
      <NavLink to={props.link}>
        {props.item.title}
      </NavLink>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{dict.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  link: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
