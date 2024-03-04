import React from 'react';
import Item from '../item';
import './style.css'
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

function CartList(props) {

  const cn = bem('CartList');

  return (
    <div className={cn()}>
      {props.cartList&&props.cartList.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} inList={false} inCartList={true} onDelete={props.onDeleteItem}/>
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
};

CartList.defaultProps = {
  onDeleteItem: () => {
  },
}

export default React.memo(CartList);