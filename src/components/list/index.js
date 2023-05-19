import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(props){
  // console.log(props.children);
  return (
    <div className='List'>{
      props.list.length ? props.list.map(item =>
        <div key={item.code} className='List-item'>
          {/* <Item item={item} {...props} /> */}
            {React.cloneElement(props.children, {
            ...props,
            item,
          })}
        </div>
      ) : <span className='List-empty'>Элементы отсутствуют</span>}
    </div>
  )
}

List.propTypes = {
  props: PropTypes.shape({
    list: PropTypes.array.isRequired
  })
};

export default React.memo(List);
