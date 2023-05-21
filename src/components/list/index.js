import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props){
  return (
    <div className='List'>
      {props.list.map(item =>
            <div key={item.code} className='List-item'>
              <Item item={item}
                    onAddItem={props.onAddItem}
                    active={props.active}
              />
            </div>
        )
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  onAddItem: PropTypes.func,
};

List.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(List);
