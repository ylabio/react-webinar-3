import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate, useLocation } from 'react-router-dom';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item({ onAdd = () => {}, labelCurr = '₽', labelAdd = 'Добавить', link, item }) {
  const cn = bem('Item');
  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    onAdd: e => onAdd(item._id),
    onLinkClick: () => {
      // Сохраняем текущий путь в state перед переходом
      navigate(link, { state: { from: location }, replace: true });
    },
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn('title')}>
        {/* Заменяем Link на button с обработчиком */}
        <button onClick={callbacks.onLinkClick} className={cn('link')}>
          {item.title}
        </button>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <Button style="primary" onClick={callbacks.onAdd} title={labelAdd} />
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
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

export default memo(Item);
