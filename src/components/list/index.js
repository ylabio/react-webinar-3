import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({itemsList, itemButtonsAction, itemButtonsName}) {
  return (
    <div className='List'>{
      itemsList.map(item =>
        <div key={item.code} className='List-item'>
          <Item
          item={item}
          itemButtonsAction={itemButtonsAction}
          itemButtonsName={itemButtonsName}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  itemButtonAction: PropTypes.func,
  itemButtonsName: PropTypes.string
};

List.defaultProps = {
  itemButtonsAction: () => {},
}

export default React.memo(List);
