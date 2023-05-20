import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({setShowModal, products}){

  const productsCount = useMemo(() => {
    return products.length 
      ? `${products.length} ${plural(products.length, {one: 'товар', few: 'товара', many: 'товаров'})}`
      : 'пусто'
  },[products])

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => acc += item.price * item.count, 0).toLocaleString('ru')
  }, [products])

  return (
    <div className='Controls'>
      <div>В корзине <b>{productsCount} / {totalPrice} &#8381;</b></div>
      <button onClick={() => setShowModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setShowModal: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

Controls.defaultProps = {
  setShowModal: () => {},
  products: []
}

export default React.memo(Controls);
