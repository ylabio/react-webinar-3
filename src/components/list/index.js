import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List(props) {
  
  return (
    <div className='List'>{
      props.list.length === 0 ?
        <div className='List-text'>Упс. В корзине пока пусто</div>
          :
        props.list.map(item =>
          <div key={item.code} className='List-item'>
            {props.defineItem(item)}
          </div>
        )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  defineItem: PropTypes.func,
  onClick: PropTypes.func,
};

List.defaultProps = {
  onClick: () => {
  },
  defineItem: () => {
  }
}

export default React.memo(List);
