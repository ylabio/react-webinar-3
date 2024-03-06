import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function ListItem(props) {

  return (
    <div className='ListItem'>
      <div className='ListItem-code'>{props.item.code}</div>
      <div className='ListItem-title'>
        {props.item.title}
      </div>
      <div className='ListItem-actions'>
        <Controls count={props.item.count} price={props.item.price}
                  callback={() => props.onAddItemToBasket(props.item.code)}
                  title={'Добавить'}/>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAddItemToBasket: PropTypes.func,
};

ListItem.defaultProps = {
  onAddItemToBasket: () => {
  },
  onDeleteItemFromBasket: () => {
  },

};

export default React.memo(ListItem);
