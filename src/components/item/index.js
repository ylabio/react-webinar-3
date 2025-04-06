import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/use-translation';
import './style.css';

function Item({ item, onAdd = () => {} }) {
  const cn = bem('Item');
  const { t } = useTranslation();

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <Link to={`/product/${item._id}`} className={cn('title')}>
        {item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={t('addToCart')} />
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
