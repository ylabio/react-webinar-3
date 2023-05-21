import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function ModalList({order, totalPrice, onDelete}){
  return ( 
    <div className='ModalList'>
      <List list={order}
            type='cart'
            onClickItem={onDelete}/>
        <div className='ModalList-result-content'>
          <b className='ModalList-result'>Итого: </b>
          { totalPrice &&
            <b className='ModalList-result'>{totalPrice}</b>
          }
        </div>
  </div>
  )
}

ModalList.propTypes = {
  onDelete: PropTypes.func,
  totalPrice: PropTypes.string,
  order:PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
};

ModalList.defaultProps = {
  onDelete: () => {},
}

export default React.memo(ModalList);
