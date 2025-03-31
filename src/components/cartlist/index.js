import React from 'react';
import PropTypes from 'prop-types';
import { numberWithSpaces } from '../../utils';
import './style.css';
import Cartitem from '../cartitem';

function Cartlist({
    list = [],
    onDeleteFromCart = () => {},
}) {

  return (
        <div className='Cart-items'>
            {list.map(item => {
                return (
                    <Cartitem
                        key={item.code}
                        title={item.title}
                        count={item.count}
                        price={item.price}
                        code={item.code}
                        onDeleteFromCart={onDeleteFromCart}
                    />
                )
            })}
        </div>
  );
}

Cartlist.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default Cartlist;