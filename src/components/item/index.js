import {memo, useState} from "react";
import { Link } from 'react-router-dom';
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const language = useSelector(state => ({
    language: state.language.language,
    itemTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    itemTextEn: {...state.language.en.itemPage, ...state.language.en.values},
  }));

  const text = language.language === "ru" ? language.itemTextRu : language.itemTextEn;

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <Link to={`/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {text.currency}</div>
        <button onClick={callbacks.onAdd}>{text.itemAddButtonText}</button>
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
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
