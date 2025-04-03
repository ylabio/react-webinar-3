import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { formattedNumber } from "../../utils"; // Assuming you have this utility

const CartDefaultProps = {
  list: [],
  onClickAction: () => {},
  isCart: false,
  total: 0,
};


function List( {
                 list = CartDefaultProps.list,
                 renderItem,
                 onClickAction = CartDefaultProps.onClickAction,
                 isCart = CartDefaultProps.isCart,
                 total = CartDefaultProps.total,
               } ) {
  const cn = bem( 'List' );

  return (
    <div>
      <ul className={ cn() }>
        { list.map( ( item ) => (
          <li key={ item._key } className={ cn( "item" ) }>
            { renderItem( { item, onClickAction, isCart } ) }
          </li>
        ) ) }
      </ul>
      { isCart && (
        <div className={ cn( "wrapper" ) }>
          <b className={ cn( "title" ) }>Итого:</b>
          <b className={ cn( "price" ) }>{ formattedNumber( total ) } ₽</b>
        </div>
      ) }
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape( {
      code: PropTypes.number,
    } ),
  ).isRequired,
  onClickAction: PropTypes.func.isRequired,
  isCart: PropTypes.bool,
  total: PropTypes.number.isRequired,
};


export default React.memo( List );

