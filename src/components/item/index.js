import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      if (props.showModal) {
        e.stopPropagation()
        props.onDeleteItemFromBasket(props.item.code)
      } else {
        props.onAddItemToBasket(props.item)
      }
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <Controls showModal={props.showModal} count={props.item.count} price={props.item.price} callback={callbacks.onClick}
                  title={props.showModal ? 'Удалить' : 'Добавить'}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  showModal: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAddItemToBasket: PropTypes.func,
  onDeleteItemFromBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddItemToBasket: () => {
  },
  onDeleteItemFromBasket: () => {
  },

};

export default React.memo(Item);
