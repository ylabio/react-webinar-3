import React from 'react';
import PropTypes, { any } from 'prop-types';
import Item from '../item';
import './style.css';
import CartProductCard from "../cart-product-card";
import { cn as bem } from "@bem-react/classname";

const ListDefaultProps = {
  list: [],
  onClickAction: () => {},
  isCart: false,
};

function List( {
                 list = ListDefaultProps.list,
                 onClickAction = ListDefaultProps.onClickAction,
                 isCart = ListDefaultProps.isCart,
               } ) {

  const cn = bem( 'List' );

  return (
    <ul className={ cn() }>
      { list.map( item => (
        <li key={ item.code } className={ cn( "item" ) }>
          { isCart ? <CartProductCard item={ item } onClickAction={ onClickAction }/> :
            <Item item={ item } onClickAction={ onClickAction }/> }
        </li>
      ) ) }
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape( {
      code: PropTypes.number,
    } ),
  ).isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default React.memo( List );
