import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';

const ItemLayout = (
  { 
    description = '',
    title = '',
    category = '',
    edition = '',
    price = 0,
    onAddToBasket = ()=>{}
  }) => {
  return (
    <>
      <div className='mb-24'>{description}</div>
      <div className="info-grid">
        <label>Страна производитель:</label>
        <span>{title}</span>

        <label>Категория:</label>
        <span>{category}</span>

        <label>Год выпуска:</label>
        <span>{edition}</span>
      </div>
      <h3 className='mb-24'>Цена: {price}</h3>
      <Button style={'primary'} onClick={onAddToBasket} title={'Добавить'} type={'button'} />
    </>
  );
};

ItemLayout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.number,
  onAddToBasket: PropTypes.func,
};

export default ItemLayout;