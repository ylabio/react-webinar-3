import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import ItemBasket from "../itemBasket";
import FooterBasket from "../footerBasket";
import './style.css';

function Basket({listInBasket, deleteFromBasket, summaryPrice}) {

  const elements = listInBasket.filter(item => item.count > 0);

  if (elements.length === 0) return (<div className='Modal-info'>Ваша корзина пуста</div>)
  return (
    <>  
      <List>
        {elements.map(item => 
          <div key={item.code} className='List-item'>
            <ItemBasket item={item} onDelete={deleteFromBasket}/>
          </div>
        )}
      </List>
      <FooterBasket summaryPrice={summaryPrice}/>
    </>
  )
}

Basket.propTypes = {
  listInBasket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  deleteFromBasket: PropTypes.func,
  summaryPrice: PropTypes.number
};

Basket.defaultProps = {
  deleteFromBasket: () => {
  },
}

export default React.memo(Basket);