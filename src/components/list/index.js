import React from 'react';
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import UniversalBtn from '../universalBtn';

function List({ list, onAddItemIntoCart }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            btn={
              <UniversalBtn
                btnText={"Добавить"}
                onClick={() => onAddItemIntoCart(item)}
              />
            }
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddItemIntoCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemIntoCart: () => {},
};

export default React.memo(List);
