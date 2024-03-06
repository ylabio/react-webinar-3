import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function BasketItem(props) {

  return (
    <div className='BasketItem'>
      <div className='BasketItem-code'>{props.item.code}</div>
      <div className='BasketItem-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <Controls showModal={props.showModal} count={props.item.count} price={props.item.price}
                  callback={() => props.onDeleteItemFromBasket(props.item.code)}
                  title={'Удалить'}/>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  showModal: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDeleteItemFromBasket: PropTypes.func,
};

BasketItem.defaultProps = {
  onDeleteItemFromBasket: () => {
  },

};

export default React.memo(BasketItem);
