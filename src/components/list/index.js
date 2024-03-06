import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({list, showAmount, actionBtn, addToCart, priceStyle, style, deleteFromCart}) {
  const cn = bem('List')
  const uniqueList = list.filter((item, index) => list.findIndex(e => e.code === item.code) === index)

  return (
    <div className={cn()} style={style ? style : {}}>{
      uniqueList.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} showAmount={showAmount} actionBtn={actionBtn} priceStyle={priceStyle} count={list.filter(e => e.code === item.code).length} addToCart={addToCart} deleteFromCart={deleteFromCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  actionBtn: PropTypes.string,
  showAmount: PropTypes.bool,
  priceStyle: PropTypes.object,
  style: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  addToCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

List.defaultProps = {
  addToCart: () => {
  },
  deleteFromCart: () => {
  }
}

export default React.memo(List);
