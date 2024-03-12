import { Link } from "react-router-dom";
import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { useLanguage } from '../../language-context';
import './style.css';

function Item(props) {

  const cn = bem('Item');
  const { translate } = useLanguage();

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <Link to={props.productLink} className={cn('title')}>
        {/*<div className={cn('code')}>{props.item._id}</div>*/}
          {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate('Добавить')}</button>
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
  productLink: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
