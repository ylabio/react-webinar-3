import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonTitle, buttonFunction}) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <Item item={item} buttonFunction={buttonFunction} buttonTitle={buttonTitle} />
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonFunction: PropTypes.func,
  buttonTitle: PropTypes.string,
};

List.defaultProps = {
  buttonFunction: () => {},
  buttonTitle: 'Кнопка',
}

export default React.memo(List);
