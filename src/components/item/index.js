import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item({ item, onAdd = () => {}, language }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };


  const handleAddClick = (e) => {
    e.preventDefault()
    e.stopPropagation(); 
    callbacks.onAdd(); 
  };

  return (

    <Link to={`/product/${item._id}`}> 
    <div className={cn()}>
      
      <h4 className={cn('title')}>{item.title}</h4>
      
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={handleAddClick} title={language === 'ru' ? "Добавить" : "Add" } />
      </div>
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
  language: PropTypes.string,
};



export default memo(Item);
