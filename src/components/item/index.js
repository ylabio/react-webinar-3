import { memo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function Item(props, onAdd = () => {}) {
  const cn = bem('Item');
  const { language } = useContext(LanguageContext);
  const href = props.item.href ? props.item.href : `/products/${props.item._id}`;

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
        <Link to={href} className={cn('title')}>{props.item.title}</Link>
        <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={translations[language].addToCart} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
