import React from "react";
import PropTypes from 'prop-types';
import ItemShop from "../item-shop";
import ItemBasket from "../item-basket";
import './style.css';

function List({list, listBasket, onFunc, action}) {
  return (
    <div className='List'>{
      (action == 0 ?
        list.map(item =>
        <div key={item.code} className='List-item'>
          <ItemShop item={item} onFunc={onFunc}/>
        </div>
        ) :
        listBasket.map(itemBasket => (itemBasket.qproduct > 0 ?
          list.map(item =>  (itemBasket.code === item.code) ?
            <div key={item.code} className='List-item'>
              <ItemBasket item={item} qproduct={itemBasket.qproduct} onFunc={onFunc}/>
            </div>
           : false)
           : false)
        )
      )
    }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  listBasket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    qproduct: PropTypes.number,
  })).isRequired,
  onFunc: PropTypes.func,
  action: PropTypes.number
};

List.defaultProps = {
  onFunc: () => {
  },
}

export default React.memo(List);
