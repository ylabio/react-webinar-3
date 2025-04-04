import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../button';
import './style.css';

function ItemBasket({ item, onRemove = () => {},  onClose = () => {}, language}) {
  const cn = bem('ItemBasket');


  const callbacks = {
    onRemove: e => onRemove(item._id),
    onClose: e => onClose(),
  };

  
  const handleAddClick = (e) => {
    e.preventDefault()
    e.stopPropagation(); 
    callbacks.onRemove(); 
  };


  return (
    <Link to={`/product/${item._id}`} onClick={()=>  callbacks.onClose()}> 
    <div className={cn()}>
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {language === 'ru' ? "шт" : "pc"}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={handleAddClick} title={language === 'ru' ? "Удалить" : "Remove"} />
        </div>
      </div>
    </div>
    </Link>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  language: PropTypes.string,
};


export default memo(ItemBasket);
