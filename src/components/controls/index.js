import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartModal from "../cartModal";

const plural = require('plural-ru'); 


function Controls({items,totalUniqueItems, totalPrice, renderItem}) {
  const formattedTotalPrice = totalPrice.toLocaleString('ru-RU');
  
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className='Controls'>

     <div>В корзине: 
       <span className='Controls-total'>
         {totalUniqueItems > 0 
         ? `${totalUniqueItems} ${plural(totalUniqueItems, 'товар', 'товара', 'товаров')} / ${formattedTotalPrice} ₽` 
         : 'пусто'
         }
       </span>
     </div>

      <button onClick={() => handleOpenModal()}>Перейти</button>

      <CartModal 
      items={items} 
      openCart={openModal} 
      closeCart={() => setOpenModal(false)}  
      totalSum={totalPrice}
      renderItem={renderItem}
      />

    </div>
  )
}

Controls.propTypes = {
  items: PropTypes.array,
  totalUniqueItems: PropTypes.number,
  totalPrice: PropTypes.number,
  renderItem: PropTypes.func
};

Controls.defaultProps = {
  items: [],
  totalUniqueItems: 0,
  totalPrice: 0,
  renderItem: () => {}
}

export default React.memo(Controls);
