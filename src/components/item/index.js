import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/use-language';
import translations from '../../locales/index'

function Item({ item, onAdd = () => {}}) {
  const cn = bem('Item');
  const { language } = useLanguage();

  const callbacks = {
    onAdd: e => {
      e.preventDefault();
      onAdd(item._id);
    }
  };

  return (
    <Link to={`/product/${item._id}`} className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={(e) => callbacks.onAdd(e)} title={translations[language].add} />
      </div>
    </Link>
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
