import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { basketList } from "../../basket";
import './style.css';

const onAddItem = (code, title, price) => {
  basketList.push({ code, title, price });
}

function List({list}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAction={onAddItem} buttonText={"Добавить"}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

List.defaultProps = {
  list: []
}

export default React.memo(List);
