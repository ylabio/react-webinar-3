import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";
import Item_basket from "../item_basket";

function Basket({listOfProducts,onButtonAction,totalProductPrice}) {
  return (
    <div className='Basket'>
					<List list={listOfProducts} onButtonAction={onButtonAction}>
            <Item_basket/>
          </List>
					<div className="Basket__count">
						<span>Итого</span>
						<span>{totalProductPrice}₽</span>
					</div>
    </div>
  )
}

Basket.propTypes = {
	listOfProducts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
	onButtonAction:PropTypes.func,
	totalProductPrice:PropTypes.number,
};

Basket.defaultProps = {
	listOfProducts:[]
}

export default React.memo(Basket);
