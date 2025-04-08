import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CurrentItem({ item = {} }) {
  const cn = bem('currentItem');

  return (
    <div className={cn()}>
        <div className='product-description'>
        {item.description}
        </div>
        <div className='product-info'>
            <span className='product-info-span'>Страна-изготовитель: </span><b>{item.madeIn?.title}</b>
            <p />
            <span className='product-info-span'>Категория: </span><b>{item.category?.title}</b>
            <p />
            <span className='product-info-span'>Год выпуска: </span><b>{item.edition}</b>
        </div>
        <div className='product-price'>
            <b>Цена: {item.price} ₽</b>
        </div>
    </div>
  );
}

CurrentItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default memo(CurrentItem);