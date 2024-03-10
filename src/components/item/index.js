<<<<<<< HEAD
import {memo, useContext, useState} from "react";
=======
import {memo, useState} from "react";
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
<<<<<<< HEAD
import {Link} from "react-router-dom";
import {useLanguage} from "../../language-provider";

function Item(props) {

  const { t } = useLanguage()

=======

function Item(props) {

>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
<<<<<<< HEAD
      <Link to={`/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t('add')}</button>
=======
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
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
