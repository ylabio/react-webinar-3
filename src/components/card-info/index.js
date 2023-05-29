import {memo} from 'react';
import './style.css';

function CardInfo({ product, flag, onAdd}) {

  const callbacks = {
    onAddItem: (e) => onAdd(product._id),
  }

  return (
    <div className='Card-info'>
      <p className='card-info-text'>
        {flag && product.description}
      </p>
      <p className='card-info-text'>
        Страна производитель: <span className='card-info-bold'>{flag && product.madeIn._type}</span>
      </p>
      <p className='card-info-text'>
        Категория: <span className='card-info-bold'>{flag && product.category._type}</span>
      </p>
      <p className='card-info-text'>
        Год выпуска: <span className='card-info-bold'>{flag && product.edition}</span>
      </p>
      <p className='card-info-text card-info-price'>
        Цена: {flag && product.price} ₽
      </p>
      <button className='card-indo-button' onClick={callbacks.onAddItem}>Добавить</button>
    </div>
  );
}

export default memo(CardInfo);