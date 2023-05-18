import './style.css';
import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";

function List({list, onBtnClick, basketMode, buttonText}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}
                onBtnClickAction={onBtnClick}
                basketMode={basketMode}
                buttonText={buttonText}
                count={item.count}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  basketMode: PropTypes.bool,
  buttonText: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default React.memo(List);
