import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Item({ item, onAdd = () => { } }) {
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: e => onAdd(item._id),
    itemClick: id => navigate(`/product-page/${id}`)
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')} onClick={() => callbacks.itemClick(item._id)}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} titleKey="addButton" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titleKey: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
