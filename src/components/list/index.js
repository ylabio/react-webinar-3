import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ itemsList, itemButtonsAction, itemButtonsName, renderListItem }) {
  return (
    <div className='List'>{
      itemsList.map(item =>
        <div key={item.code} className='List-item'>
          {renderListItem({item, itemButtonsAction, itemButtonsName})}
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
  itemButtonsName: PropTypes.string.isRequired,
  renderListItem: PropTypes.func.isRequired
};

List.defaultProps = {
  itemButtonsAction: () => {},
}

export default React.memo(List);
