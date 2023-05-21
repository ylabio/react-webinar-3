import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List(props){

  return (
    <div className='List'>{
      props.list.length ? props.list.map(item =>
        <div key={item.code} className='List-item'>
          {React.cloneElement(props.children, {
            item,
            ...props,
          })}
        </div>
      ) : null
    }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onChangeItemInCart: PropTypes.func
};

List.defaultProps = {
  onChangeItemInCart: () => {}
}

export default React.memo(List);
